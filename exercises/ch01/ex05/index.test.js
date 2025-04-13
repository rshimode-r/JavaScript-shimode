import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("正の数のみを含む配列が与えられるとその合計を返す", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });

    it("負の数のみを含む配列が与えられるとその合計を返す", () => {
      expect(sum([-1, -2, -3, -4, -5])).toBe(-15);
    });

    it("正の数と負の数の両方を含む配列が与えられるとその合計を返す", () => {
      expect(sum([1, -2, 3, -4, 5])).toBe(3);
    });

    it("からの配列が与えられると0を返す", () => {
      expect(sum([])).toBe(0);
    });

    it("配列に1つの要素がある場合、その値を返す", () => {
      expect(sum([42])).toBe(42);
    });

    it("配列に複数の小数がある場合、その合計を返す", () => {
      expect(sum([1.1, 1.2, 1.3, 1.4, 1.5])).toBe(6.5);
    });
  });

  describe("factorial", () => {
    it("正の数の階乗を返す", () => {
      expect(factorial(4)).toBe(24);
    });

    it("0が与えられたとき、1を返す", () => {
      expect(factorial(0)).toBe(1);
    });

    it("1が与えられたとき、1を返す", () => {
      expect(factorial(1)).toBe(1);
    });

    it("負の数が与えられたとき、NaNを返す", () => {
      expect(factorial(-1)).toBeNaN();
    });

    it("小数が与えられたとき、NaNを返す", () => {
      expect(factorial(4.02)).toBeNaN();
    });
  });
});
