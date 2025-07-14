import { any, catching } from "./index.js";

describe("any", () => {
  it("anyが返す関数は、受け取った関数の内、いずれかの関数がtrueを返せばtrueを返す", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });

  it("anyが返す関数は、受け取った関数の内、いずれの関数もtrueを返さないならfalseを返す", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
  });

  it("受け取った関数が1つの場合でも、anyが正常に動作する", () => {
    const isEven = any((n) => n % 2 === 0);
    expect(isEven(4)).toBe(true);
    expect(isEven(5)).toBe(false);
  });

  it("引数0の場合、anyが返す関数は必ずfalseを返す関数となる", () => {
    const noCheck = any();
    expect(noCheck(1)).toBe(false);
  });

  it("引数に関数以外が含まれている場合、any()はエラーを返す", () => {
    expect(() =>
      any(
        (n) => n > 0,
        (n) => n < 0,
        1
      )
    ).toThrow(Error);
  });
});

describe("catching", () => {
  it("func1 が正常に実行される場合はその結果を返す", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
  });

  it("func1 が例外を投げた場合は func2 の結果を返す", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse("{Invalid Json}")).toHaveProperty("error");
  });

  it("引数に関数以外が含まれている場合、catching()はエラーを返す", () => {
    expect(() => catching(JSON.parse, 1)).toThrow(Error);
  });
});
