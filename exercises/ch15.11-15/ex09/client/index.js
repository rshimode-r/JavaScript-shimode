// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const ws = new WebSocket("ws://localhost:3003");

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("decision1.mp3");

// ライフゲームのセル (true or false) を初期化する
let grid = [];

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "update") {
    grid = data.grid;
    renderGrid(grid);
  }
});

canvas.addEventListener("click", (evt) => {
  if (!grid.length) return;
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  sound.cloneNode().play();

  ws.send(
    JSON.stringify({
      type: "toggle",
      row,
      col,
    })
  );
});

startButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "pause" }));
});
