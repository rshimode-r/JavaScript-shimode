import { getAllProperties } from "./index.ts";

describe("getAllProperties", () => {
  // メモ:継承の継承も列挙できているかテストするべき
  it("getAllProperties関数はオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が `Symbol` のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す", () => {
    const proto = {};
    Object.defineProperty(proto, "protoEnumerableProp", {
      value: "protoEnumerableProp",
      enumerable: true,
    });
    Object.defineProperty(proto, "protoNonEnumerableProp", {
      value: "protoNonEnumerableProp",
      enumerable: false,
    });
    const obj = Object.create(proto);
    const symbolValue = Symbol("dummy");
    Object.defineProperty(obj, "enumerableProp", {
      value: "enumerableProp",
      enumerable: true,
    });

    Object.defineProperty(obj, "nonEnumerableProp", {
      value: "nonEnumerableProp",
      enumerable: false,
    });

    Object.defineProperty(obj, symbolValue, {
      value: "symbolProp",
      enumerable: true,
    });

    const result = getAllProperties(obj);
    // (参照)https://jestjs.io/ja/docs/expect#expectarraycontainingarray
    expect(result).toEqual(
      expect.arrayContaining([
        "protoEnumerableProp",
        "enumerableProp",
        "nonEnumerableProp",
        symbolValue,
      ])
    );
  });

  it("空のオブジェクトを与えた場合、空の配列を返す", () => {
    const obj = Object.create(null);
    const result = getAllProperties(obj);
    expect(result).toEqual([]);
  });

  it("独自プロパティを持たない場合、列挙可能な継承プロパティのみ返す", () => {
    const proto = {};
    Object.defineProperty(proto, "protoEnumerableProp1", {
      value: "protoEnumerableProp1",
      enumerable: true,
    });
    Object.defineProperty(proto, "protoEnumerableProp2", {
      value: "protoEnumerableProp2",
      enumerable: true,
    });

    const obj = Object.create(proto);
    const result = getAllProperties(obj);
    expect(result).toEqual(
      expect.arrayContaining(["protoEnumerableProp1", "protoEnumerableProp2"])
    );
  });

  it("列挙可能な継承プロパティを持たない場合、独自プロパティのみ返す", () => {
    const proto = {};
    const obj = Object.create(proto);
    Object.defineProperty(obj, "ownProp", {
      value: "ownProp",
      enumerable: false,
    });

    const result = getAllProperties(obj);
    expect(result).toEqual(expect.arrayContaining(["ownProp"]));
  });
});
