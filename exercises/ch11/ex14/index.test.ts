import { sortJapanese, toJapaneseDateString } from "./index.ts";

describe("sortJapanese", () => {
  it("日本語文字列の配列を受け取り、ソートできる", () => {
    const input = ["うなぎ", "いす", "あり"];
    const expected = ["あり", "いす", "うなぎ"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("文字列中の大文字・小文字(つ と っ 等)を無視してソートできる", () => {
    const input = ["つか", "っか"];
    const expected = ["つか", "っか"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("濁点・半濁点(は と ば と ば 等)の違いを無視してソートする", () => {
    const input = ["ぱすた", "ばなな", "はなび"];
    const expected = ["ぱすた", "ばなな", "はなび"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("配列の中身が一つなら、そのまま返す", () => {
    expect(sortJapanese(["あ"])).toEqual(["あ"]);
  });

  it("空の配列の場合、空の配列を返す", () => {
    expect(sortJapanese([])).toEqual([]);
  });
});

describe("toJapaneseDateString", () => {
  it("令和の日付を正しくフォーマットできること", () => {
    const date = new Date(2025, 7, 8);
    const result = toJapaneseDateString(date);
    expect(result).toBe("令和7年8月8日");
  });

  it("平成の日付を正しくフォーマットできること", () => {
    const date = new Date(1999, 7, 31);
    const result = toJapaneseDateString(date);
    expect(result).toBe("平成11年8月31日");
  });

  it("昭和の日付を正しくフォーマットできること", () => {
    const date = new Date(1989, 0, 7);
    const result = toJapaneseDateString(date);
    expect(result).toBe("昭和64年1月7日");
  });
});
