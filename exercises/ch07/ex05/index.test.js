import { push, pop, unshift, sort } from "./index.js";

describe("push", () => {
  it("新しい要素を追加し、元の配列を変更しない", () => {
    const baseArray = [1, 2, 3];
    const result = push(baseArray, 1);
    expect(result).toStrictEqual([1, 2, 3, 1]);
    expect(baseArray).toStrictEqual([1, 2, 3]);
  });

  it("複数の要素を追加できる", () => {
    const baseArray = [1, 2, 3];
    const result = push(baseArray, 1, 2, 3);
    expect(result).toStrictEqual([1, 2, 3, 1, 2, 3]);
    expect(baseArray).toStrictEqual([1, 2, 3]);
  });

  it("元の配列が空でも追加できる", () => {
    const baseArray = [];
    const result = push(baseArray, 1, 2, 3);
    expect(result).toStrictEqual([1, 2, 3]);
    expect(baseArray).toStrictEqual([]);
  });

  it("文字列も追加できる", () => {
    const baseArray = [1, 2, 3];
    const result = push(baseArray, "a");
    expect(result).toStrictEqual([1, 2, 3, "a"]);
    expect(baseArray).toStrictEqual([1, 2, 3]);
  });
});

describe("pop", () => {
  it("末尾の要素を削除し、新しい配列を返す", () => {
    const baseArray = [1, 2, 3];
    const result = pop(baseArray);
    expect(result).toStrictEqual([1, 2]);
    expect(baseArray).toStrictEqual([1, 2, 3]);
  });

  it("空の配列に対しては空の配列を返す", () => {
    const baseArray = [];
    const result = pop(baseArray);
    expect(result).toStrictEqual([]);
    expect(baseArray).toStrictEqual([]);
  });

  it("1要素の配列に対しては空配列を返す", () => {
    const baseArray = [1];
    const result = pop(baseArray);
    expect(result).toStrictEqual([]);
    expect(baseArray).toStrictEqual([1]);
  });
});

describe("unshift", () => {
  it("新しい要素を先頭に追加し、元の配列を変更しない", () => {
    const baseArray = [1, 2, 3];
    const result = unshift(baseArray, 9);
    expect(result).toStrictEqual([9, 1, 2, 3]);
    expect(baseArray).toStrictEqual([1, 2, 3]);
  });

  it("複数の要素を先頭に追加できる", () => {
    const baseArray = [4, 5];
    const result = unshift(baseArray, 1, 2, 3);
    expect(result).toStrictEqual([1, 2, 3, 4, 5]);
    expect(baseArray).toStrictEqual([4, 5]);
  });

  it("元の配列が空でも追加できる", () => {
    const baseArray = [];
    const result = unshift(baseArray, 1, 2, 3);
    expect(result).toStrictEqual([1, 2, 3]);
    expect(baseArray).toStrictEqual([]);
  });
});
// undefiendの時に最後に送られているかを確認するべきだった
describe("sort", () => {
  it("元の配列を変更せず、昇順にソートされた新しい配列を返す", () => {
    const baseArray = [3, 1, 4, 2];
    const result = sort(baseArray, (a, b) => a - b);
    expect(result).toStrictEqual([1, 2, 3, 4]);
    expect(baseArray).toStrictEqual([3, 1, 4, 2]);
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
    expect(baseArray).toStrictEqual(["banana", "apple", "cherry"]);
  });

  it("比較関数が指定されない場合、デフォルトの文字列比較を使う", () => {
    const baseArray = [33, 4, 1111, 222];
    const result = sort(baseArray);
    expect(result).toStrictEqual([1111, 222, 33, 4]);
    expect(baseArray).toStrictEqual([33, 4, 1111, 222]);
  });
});
