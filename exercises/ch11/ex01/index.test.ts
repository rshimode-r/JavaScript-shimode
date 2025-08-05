import { TypeMap } from "./index.ts";

class Foo {}

describe("TypeMap", () => {
  let typeMap: TypeMap;

  beforeEach(() => {
    typeMap = new TypeMap();
  });

  it("クラスのインスタンスをget/setできる", () => {
    const foo = new Foo();
    typeMap.set(Foo, foo);

    expect(typeMap.get(Foo)).toBe(foo);
  });

  it("プリミティブラッパーの値をget/setできる", () => {
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Boolean, true);

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  it("プリミティブラッパーと値の型が合わない場合にエラーを投げる", () => {
    expect(() => typeMap.set(String, 123)).toThrow(Error);
    expect(() => typeMap.set(Number, "string")).toThrow(Error);
    expect(() => typeMap.set(Boolean, "true")).toThrow(Error);
  });

  it("クラスのインスタンスでない値をセットしようとした場合にエラーを投げる", () => {
    expect(() => typeMap.set(Date, "not a date")).toThrow(Error);
  });
});
