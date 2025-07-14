import { sequenceToObject } from "./index.ts";

describe("sequenceToObject", () => {
  it("奇数番がstring、偶数番が任意の値のペアでオブジェクトを作成できる", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
    expect(sequenceToObject("x", 10, "y", 20, "z", 30)).toEqual({
      x: 10,
      y: 20,
      z: 30,
    });
  });

  it("スプレッド演算子で配列を渡した場合にも正常に動作する", () => {
    const arr = ["key1", "val1", "key2", "val2"];
    const arr2 = ["key3", 3, "key4", 4];
    expect(sequenceToObject(...arr, ...arr2)).toEqual({
      key1: "val1",
      key2: "val2",
      key3: 3,
      key4: 4,
    });
  });

  it("引数の数が奇数の場合は例外を投げる", () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow(Error);
  });

  it("奇数番目の引数がstringでない場合は例外を投げる", () => {
    expect(() => sequenceToObject(123, "val")).toThrow(Error);
    expect(() => sequenceToObject("key", 1, 42, "val")).toThrow(Error);
  });
});
