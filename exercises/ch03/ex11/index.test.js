import { equals } from "./index.js";

describe("equals", () => {
  it("`o1` と `o2` が [厳密に等価]である場合 `true` を返す。", () => {
    const o = { x: "a", y: "b" };
    let o1 = o;
    let o2 = o;
    expect(equals(o1, o2)).toBe(true);
  });

  it("`o1` または `o2` に `null` が指定された場合 `false` を返す", () => {
    let o1 = null;
    let o2 = {};
    expect(equals(o1, o2)).toBe(false);
  });

  it("`o1` または `o2` に オブジェクト以外が指定された場合 `false` を返す", () => {
    let o1 = {};
    let o2 = 123;
    expect(equals(o1, o2)).toBe(false);
  });

  it("`o1` と `o2` のプロパティの数が一致しない場合は `false` を返す", () => {
    let o1 = { x: 1 };
    let o2 = { x: 1, y: 2 };
    expect(equals(o1, o2)).toBe(false);
  });

  it("`o1` と `o2` の名前が一致しない場合は `false` を返す", () => {
    let o1 = { x: 1, y: 2 };
    let o2 = { xx: 1, yy: 2 };
    expect(equals(o1, o2)).toBe(false);
  });

  it("`o1` と `o2` のプロパティの各値を `equals` で比較し、全て `true` ならば `true` を返す", () => {
    let o1 = { x: 1, y: 2, z: 3 };
    let o2 = { x: 1, y: 2, z: 3 };
    expect(equals(o1, o2)).toBe(true);
  });

  it("`o1` と `o2` のプロパティの各値を `equals` で比較し、1つでも `false` があれば `false` を返す", () => {
    let o1 = { x: 1, y: 2, z: 2 };
    let o2 = { x: 1, y: 2, z: 3 };
    expect(equals(o1, o2)).toBe(false);
  });
});
