import { pow } from "./index.ts";

describe("pow", () => {
  it("2乗の計算ができる", () => {
    expect(pow(2, 2)).toBe(4);
    expect(pow(6, 2)).toBe(36);
  });

  it("1乗の計算ができる", () => {
    expect(pow(2, 1)).toBe(2);
    expect(pow(5, 1)).toBe(5);
  });

  it("偶数指数で正しく計算できる", () => {
    expect(pow(2, 10)).toBe(1024);
    expect(pow(3, 4)).toBe(81);
  });

  it("奇数指数で正しく計算できる", () => {
    expect(pow(2, 9)).toBe(512);
    expect(pow(5, 3)).toBe(125);
  });

  it("指数が負または小数の場合は例外を投げる", () => {
    expect(() => pow(2, -1)).toThrow(Error);
    expect(() => pow(2, 1.5)).toThrow(Error);
  });
});
