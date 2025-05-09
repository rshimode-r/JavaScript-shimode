import { makeFibWhile, makeFibDoWhile, makeFibFor } from "./index.js";

describe("makeFibWhile", () => {
  it("while文を使ってフィボナッチ数列の最初の10個を配列として返す", () => {
    expect(makeFibWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
describe("makeFibDoWhile", () => {
  it("do/while文を使ってフィボナッチ数列の最初の10個を配列として返す", () => {
    expect(makeFibDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
describe("makeFibFor", () => {
  it("for文を使ってフィボナッチ数列の最初の10個を配列として返す", () => {
    expect(makeFibFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
