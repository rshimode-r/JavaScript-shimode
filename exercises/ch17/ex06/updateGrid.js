// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, ROWS, COLS) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)

      let liveCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue; // 対象自身の時はskip

          const ny = row + dy;
          const nx = col + dx;

          if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) continue; // 盤面の外はskip

          if (grid[ny][nx]) {
            liveCount++;
          }
        }
      }

      if (grid[row][col]) {
        // 2 つまたは 3 つの生きている隣接細胞を持つ生きている細胞は、次の世代に生き続けます。
        nextGrid[row][col] = liveCount === 2 || liveCount === 3;
      } else {
        // ちょうど 3 つの生きている隣接細胞を持つ死んだ細胞は、再生したかのように生きた細胞になります。
        nextGrid[row][col] = liveCount === 3;
      }
    }
  }
  return nextGrid;
}
