describe("サロゲートペア", () => {
  it("文字名 Hundred Points Symbol の絵文字表現 💯 に対して length の値を確認", () => {
    expect("💯".length).toBe(2);
  });

  it("utf-16 コードポイント表現 \\uD83D\\uDCAF、utf-32 コードポイント表現 \\u{0001F4AF} が絵文字と同値であるか確認", () => {
    expect(`"\uD83D\uDCAF"`).toBe(`"\u{0001F4AF}"`);
  });
});
