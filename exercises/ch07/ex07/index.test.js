import { sort } from "./index.js";

describe("sort", () => {
  it("昇順にソートする", () => {
    const baseArray = [3, 1, 4, 2];
    const result = sort(baseArray, (a, b) => a - b);
    expect(result).toStrictEqual([1, 2, 3, 4]);
    expect(baseArray).toStrictEqual([1, 2, 3, 4]);
  });

  it("元の配列が空でもエラーなく空配列を返す", () => {
    const baseArray = [];
    const result = sort(baseArray, (a, b) => a - b);
    expect(result).toStrictEqual([]);
    expect(baseArray).toStrictEqual([]);
  });

  it("文字列配列もソートできる", () => {
    const baseArray = ["banana", "apple", "cherry"];
    const result = sort(baseArray, (a, b) => a.localeCompare(b));
    expect(result).toStrictEqual(["apple", "banana", "cherry"]);
    expect(baseArray).toStrictEqual(["apple", "banana", "cherry"]);
  });

  it("比較関数が指定されない場合、デフォルトの文字列比較を使う", () => {
    const baseArray = [33, 4, 1111, 222];
    const result = sort(baseArray);
    expect(result).toStrictEqual([1111, 222, 33, 4]);
    expect(baseArray).toStrictEqual([1111, 222, 33, 4]);
  });
});
