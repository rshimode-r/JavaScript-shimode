import { PositiveNumber } from "./index.ts";

describe("PositiveNumber", () => {
  it("初期値で正の値を設定し、getXで値が取得できる", () => {
    const num = PositiveNumber(10);
    expect(num.getX()).toBe(10);
  });

  it("setXで正の値に更新できる", () => {
    const num = PositiveNumber(10);
    num.setX(20);
    expect(num.getX()).toBe(20);
  });

  it("初期値が0以下の場合はエラーをスローする", () => {
    expect(() => PositiveNumber(0)).toThrow(Error);
    expect(() => PositiveNumber(-5)).toThrow(Error);
  });

  it("setXに0以下の値を渡すとをエラーをスローする", () => {
    const num = PositiveNumber(10);
    expect(() => num.setX(0)).toThrow(Error);
    expect(() => num.setX(-3)).toThrow(Error);
  });

  it("初期値がNaNの場合はエラーをスローする", () => {
    expect(() => PositiveNumber(NaN)).toThrow(Error);
  });

  it("setXにNaNを渡すとをエラーをスローする", () => {
    const num = PositiveNumber(10);
    expect(() => num.setX(NaN)).toThrow(Error);
  });

  it("外部からxに直接アクセスできない", () => {
    const num = PositiveNumber(10);
    expect((num as any).x).toBeUndefined();
  });
});
