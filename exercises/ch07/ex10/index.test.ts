import { DynamicSizeArray } from "./index.ts";

describe("DynamicSizeArray", () => {
  test("push()で追加した要素をget()で取得できる", () => {
    const array = new DynamicSizeArray<string>();
    array.push("red");
    array.push("green");

    expect(array.length()).toBe(2);
    expect(array.get(0)).toBe("red");
    expect(array.get(1)).toBe("green");
  });

  test("set() で既存の要素を書き換えられる", () => {
    const array = new DynamicSizeArray<number>();
    array.push(1);
    array.push(2);
    array.set(0, 3);
    array.set(1, 4);
    expect(array.length()).toBe(2);
    expect(array.get(0)).toBe(3);
    expect(array.get(1)).toBe(4);
  });

  test("get() で配列の範囲外の値を引数で受け取るとエラーになる", () => {
    const array = new DynamicSizeArray<string>();
    array.push("red");
    expect(array.get(0)).toBe("red");
    expect(() => array.get(-1)).toThrow(Error);
    expect(() => array.get(100)).toThrow(Error);
  });

  test("set() で範囲外アクセスすると例外が発生すること", () => {
    const array = new DynamicSizeArray<string>();
    array.push("red");
    expect(array.get(0)).toBe("red");
    expect(() => array.set(-1, "green")).toThrow(Error);
    expect(() => array.set(100, "blue")).toThrow(Error);
  });

  test("push()に関して固定長の配列に要素を追加する空きが無い場合でも、値を追加できる", () => {
    const array = new DynamicSizeArray<number>();
    for (let i = 0; i < 10; i++) {
      array.push(i);
    }
    expect(array.length()).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(array.get(i)).toBe(i);
    }
  });
});
