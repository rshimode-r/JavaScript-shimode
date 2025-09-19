import { fibonacciSequence2 } from "./index.js";

// ちゃんとフィボナッチ数列になっているかもテストするべき（どちらかというとそっちがメイン）
// 書き換える前と同じ処理かどうかはオマケ程度

function* fibonacciSequence() {
  let x = 0,
    y = 1;
  while (true) {
    yield y;
    [x, y] = [y, x + y];
  }
}

describe("fibonacciIterator", () => {
  it("元のジェネレータ関数と同じ出力を返す", () => {
    const iter1 = fibonacciSequence2();
    const iter2 = fibonacciSequence();

    for (let i = 0; i < 10; i++) {
      const v1 = iter1.next().value;
      const v2 = iter2.next().value;

      expect(v1).toBe(v2);
    }
  });

  it("for...of でも動作し、元のジェネレータと同じ値を返すこと", () => {
    const fib1 = fibonacciSequence2();
    const fib2 = fibonacciSequence();

    let i = 0;
    for (const v1 of fib1) {
      const v2 = fib2.next().value;
      expect(v1).toBe(v2);

      i++;
      if (i >= 10) break; //最初の10個を確認
    }
  });
});
