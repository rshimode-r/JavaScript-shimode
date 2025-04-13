import { isEqual } from "./index.js";

describe("isEqual", () => {
  it("2つの同じ整数が与えられたときにTrueを返す", () => {
    expect(isEqual(1, 1)).toBe(true);
  });

  it("2つの異なる整数が与えられたときにTrueを返す", () => {
    expect(isEqual(1, 2)).toBe(false);
  });

  it("(0.3-0.2)と0.1が与えられたときにTrueを返す", () => {
    expect(isEqual(0.3 - 0.2, 0.1)).toBe(true);
  });

  it("(0.2-0.1)と0.1が与えられたときにTrueを返す", () => {
    expect(isEqual(0.2 - 0.1, 0.1)).toBe(true);
  });

  it("与えられた2つの値の差が10^(-10)の場合falseを返す", () => {
    expect(isEqual(0.0000000001, 0.0000000002)).toBe(false);
  });

  it("与えられた2つの値の差が10^(-11)の場合trueを返す", () => {
    expect(isEqual(0.00000000001, 0.00000000002)).toBe(true);
  });
});
