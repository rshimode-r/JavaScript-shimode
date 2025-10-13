import { showTypes } from "./index.ts";

describe("showTypes", () => {
  it("補間値の型名を文字列として返す", () => {
    const result = showTypes`${"A"}`;
    expect(showTypes`${"A"}`).toBe("string");
    expect(showTypes`${{ x: 1 }}`).toBe("object");
  });

  it("複数の補間値の型名を文字列として返す", () => {
    const result = showTypes`Name: ${"Alice"}, Age: ${30}, Admin: ${true}`;
    expect(result).toBe("Name: string, Age: number, Admin: boolean");
  });

  it("object, null, undefined, array を正しく処理する", () => {
    const result = showTypes`Object: ${{}}, Null: ${null}, Undefined: ${undefined}, Array: ${[
      1, 2, 3,
    ]}`;
    expect(result).toBe(
      "Object: object, Null: null, Undefined: undefined, Array: array"
    );
  });

  it("補間値がない場合、テンプレート文字列だけを返す", () => {
    const result = showTypes`Hello world!`;
    expect(result).toBe("Hello world!");
  });
});
