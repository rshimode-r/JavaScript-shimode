import { fib } from "./index.js";

describe("fib", () => {
  it("0が与えられたとき、0を返す", () => {
    expect(fib(0)).toBe(0);
  });

  it("1が与えられたとき、1を返す", () => {
    expect(fib(1)).toBe(1);
  });

  it("2が与えられたとき、1を返す", () => {
    expect(fib(2)).toBe(1);
  });

  it("5が与えられたとき、5を返す", () => {
    expect(fib(5)).toBe(5);
  });

  it("75が与えられたとき、2111485077978050を返す", () => {
    expect(fib(75)).toBe(2111485077978050);
  });

  it("負の数が与えられたとき、NaNを返す", () => {
    expect(fib(-10)).toBeNaN();
  });

  it("小数が与えられたとき、NaNを返す", () => {
    expect(fib(7.5)).toBeNaN();
  });
});
