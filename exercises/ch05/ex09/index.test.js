// index.test.js
import { jsonParse } from "./index.js";

describe("jsonParse", () => {
  it("引数がオブジェクト形式のJSON文字列の場合", () => {
    const data = '{"name": "Rio", "age": 25}';
    const expected = { success: true, data: { name: "Rio", age: 25 } };
    expect(jsonParse(data)).toEqual(expected);
  });

  it("引数が配列形式のJSON文字列の場合", () => {
    const data = "[1, 2, 3]";
    const expected = { success: true, data: [1, 2, 3] };
    expect(jsonParse(data)).toEqual(expected);
  });

  it("	引数がプリミティブ型のJSON文字列の場合", () => {
    expect(jsonParse('"hello"')).toEqual({ success: true, data: "hello" });
    expect(jsonParse("123")).toEqual({ success: true, data: 123 });
    expect(jsonParse("true")).toEqual({ success: true, data: true });
  });
  // errorの文字列でテストするのは良くない。
  it("無効なJSON文字列を渡した場合、success: false になり、エラーメッセージが含まれる", () => {
    const data = "{name: Alice}";
    const result = jsonParse(data);
    expect(result.success).toBe(false);
    //toBeDefined();はundefinedでないことを判定するもの
    expect(result.error).toBeDefined();
  });

  it("空文字列を渡した場合、パースエラーになる", () => {
    const result = jsonParse("");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
