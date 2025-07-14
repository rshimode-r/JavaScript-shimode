import { TypedMap } from "./index.js";

describe("TypedMap", () => {
  it("正しい型をコンストラクタに渡すとデータを初期化できる", () => {
    const map = new TypedMap("string", "number", [["a", 1]]);
    expect(map.get("a")).toBe(1);
  });

  it("keyに関して正しくない型をコンストラクタに渡すととエラーになる", () => {
    expect(() => {
      new TypedMap("number", "string", [["string", "a"]]);
    }).toThrow(TypeError);
  });

  it("valueに関して正しくない型をコンストラクタに渡すととエラーになる", () => {
    expect(() => {
      new TypedMap("string", "number", [["a", "string"]]);
    }).toThrow(TypeError);
  });

  it("setで正しい型のデータを追加できる", () => {
    const map = new TypedMap("string", "number", []);
    map.set("b", 42);
    expect(map.get("b")).toBe(42);
  });

  it("keyに関してsetでキーの型が間違っているとエラーになる", () => {
    const map = new TypedMap("number", "string", []);
    expect(() => map.set("string", "value")).toThrow(TypeError);
  });

  it("valueに関してsetでキーの型が間違っているとエラーになる", () => {
    const map = new TypedMap("string", "number", []);
    expect(() => map.set("key", "string")).toThrow(TypeError);
  });
});
