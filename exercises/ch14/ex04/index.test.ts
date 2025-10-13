import { HiraganaChar } from "./index.ts";

describe("HiraganaChar", () => {
  test("ひらがなとコードを持つ", () => {
    const h = new HiraganaChar("あ");
    expect(h.char).toBe("あ");
    expect(h.code).toBe("あ".charCodeAt(0));
  });

  test("Symbol.toPrimitiveによる比較", () => {
    const a = new HiraganaChar("あ");
    const ka = new HiraganaChar("か");
    const sa = new HiraganaChar("さ");

    expect(a < ka).toBe(true);
    expect(ka < sa).toBe(true);
    expect(sa > a).toBe(true);
  });

  test("文字列として使える", () => {
    const t = new HiraganaChar("た");
    expect(String(t)).toBe("た");
  });

  test("数値として使える", () => {
    const n = new HiraganaChar("な");
    expect(Number(n)).toBe("な".charCodeAt(0));
  });

  test("defaultヒントで文字列としてつかえる", () => {
    //https://ja.javascript.info/object-toprimitive
    const h = new HiraganaChar("は");
    expect(h + "行").toBe("は行"); // ヒント: "default"
  });

  test("ひらがな1文字以外はエラー", () => {
    expect(() => new HiraganaChar("ab")).toThrow();
    expect(() => new HiraganaChar("ア")).toThrow();
    expect(() => new HiraganaChar("a")).toThrow();
    expect(() => new HiraganaChar("1")).toThrow();
  });
});
