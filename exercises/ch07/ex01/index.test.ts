import { addMatrices, multiplyMatrices, Matrix } from "./index.ts";

describe("addMatrices", () => {
  it("2×2の行列の足し算ができる", () => {
    const A: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const B: Matrix = [
      [5, 6],
      [7, 8],
    ];
    const expected: Matrix = [
      [6, 8],
      [10, 12],
    ];

    const result = addMatrices(A, B);
    expect(result).toEqual(expected);
  });

  it("3×3の行列の足し算ができる", () => {
    const A: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected: Matrix = [
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18],
    ];

    const result = addMatrices(A, B);
    expect(result).toEqual(expected);
  });

  it("サイズの異なる２つの行列の加算はできない", () => {
    const A: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => addMatrices(A, B)).toThrow(Error);
  });
  it("一次元配列が引数に含まれる場合エラーを返す", () => {
    const A: Matrix = [];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => addMatrices(A, B)).toThrow(Error);
  });
  it("配列の行の大きさが統一されていない場合エラーを返す", () => {
    const A: Matrix = [
      [1, 2, 3],
      [4, 5],
    ];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5],
    ];

    expect(() => addMatrices(A, B)).toThrow(Error);
  });
});

describe("multiplyMatrices", () => {
  it("2×2の行列の掛け算ができる", () => {
    const A: Matrix = [
      [2, 5],
      [4, 7],
    ];
    const B: Matrix = [
      [1, 3],
      [6, 9],
    ];
    const expected: Matrix = [
      [32, 51],
      [46, 75],
    ];

    const result = multiplyMatrices(A, B);
    expect(result).toEqual(expected);
  });

  it("1行3列の行列と3行2列の行列の積が計算できる", () => {
    const A: Matrix = [[2, 4, 6]];
    const B: Matrix = [
      [7, 5],
      [3, 4],
      [6, 2],
    ];
    const expected: Matrix = [[62, 38]];

    const result = multiplyMatrices(A, B);
    expect(result).toEqual(expected);
  });

  it("行列Aの列数と行列Bの行数が一致していない場合エラーを返す", () => {
    const A: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const B: Matrix = [
      [7, 8],
      [9, 10],
    ];

    expect(() => multiplyMatrices(A, B)).toThrow(Error);
  });
  it("一次元配列が引数に含まれる場合エラーを返す", () => {
    const A: Matrix = [];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => multiplyMatrices(A, B)).toThrow(Error);
  });
  it("配列の行の大きさが統一されていない場合エラーを返す", () => {
    const A: Matrix = [
      [1, 2, 3],
      [4, 5],
    ];
    const B: Matrix = [
      [1, 2, 3],
      [4, 5],
    ];

    expect(() => multiplyMatrices(A, B)).toThrow(Error);
  });
});
