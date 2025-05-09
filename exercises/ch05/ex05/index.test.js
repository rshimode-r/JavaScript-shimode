import { OmitOddNumberOfObject } from "./index.js";

describe("OmitEvenNumberOfObject", () => {
  it("偶数の値を持つプロパティだけを残した新しいオブジェクトを返す", () => {
    const o = { x: 1, y: 2, z: 3 };
    const expected = { y: 2 };
    expect(OmitOddNumberOfObject(o)).toEqual(expected);
  });

  it("引数のオブジェクトのプロパティの中に偶数の値を持つものがなかった場合、空のオブジェクトを返す", () => {
    const o = { x: 1, y: 3, z: 5 };
    const expected = {};
    expect(OmitOddNumberOfObject(o)).toEqual(expected);
  });

  it("空のオブジェクトを引数で受け取った場合、空のオブジェクトを返す", () => {
    expect(OmitOddNumberOfObject({})).toEqual({});
  });
});
