import { add, sub, mul, div } from "./index.js";

describe("add:加算", () => {
  it("複素数の加算ができる", () => {
    const x = { re: 2, im: 5 };
    const y = { re: 6, im: 3 };
    expect(add(x, y)).toEqual({ re: 8, im: 8 });
  });
  it("小数を含む複素数の加算ができる", () => {
    const x = { re: 0.2, im: 0.5 };
    const y = { re: 0.6, im: 0.3 };
    const result = add(x, y);
    expect(result.re).toBeCloseTo(0.8);
    expect(result.im).toBeCloseTo(0.8);
  });
});
describe("sub:減算", () => {
  it("複素数の減算ができる", () => {
    const x = { re: 2, im: 5 };
    const y = { re: 6, im: 3 };
    expect(sub(x, y)).toEqual({ re: -4, im: 2 });
  });
  it("小数を含む複素数の減算ができる", () => {
    const x = { re: 0.2, im: 0.5 };
    const y = { re: 0.6, im: 0.3 };
    const result = sub(x, y);
    expect(result.re).toBeCloseTo(-0.4);
    expect(result.im).toBeCloseTo(0.2);
  });
});
describe("mul:乗算", () => {
  it("複素数の乗算ができる", () => {
    const x = { re: 1, im: 2 };
    const y = { re: 3, im: 4 };
    expect(mul(x, y)).toEqual({ re: -5, im: 10 });
  });
  it("小数を含む複素数の乗算ができる", () => {
    const x = { re: 1, im: 0.2 };
    const y = { re: 0.3, im: 4 };
    const result = mul(x, y);
    expect(result.re).toBeCloseTo(-0.5);
    expect(result.im).toBeCloseTo(4.06);
  });
});
describe("div:除算", () => {
  it("複素数の除算ができる", () => {
    const x = { re: 2, im: 9 };
    const y = { re: 1, im: 2 };
    expect(div(x, y)).toEqual({ re: 4, im: 1 });
  });
  it("負の値を含む複素数の除算ができる", () => {
    const x = { re: -1, im: 2 };
    const y = { re: 3, im: -4 };
    expect(div(x, y)).toEqual({ re: -0.44, im: 0.08 });
  });
});
