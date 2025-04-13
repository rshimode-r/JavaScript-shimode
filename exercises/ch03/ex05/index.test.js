import { convertLFToCRLF, convertCRLFToLF } from "./index.js";

describe("convertLFToCRLF", () => {
  it("文字列中の改行コードを１つ`LF`→`CR+LF`に変換", () => {
    expect(convertLFToCRLF("ありがとう\nこんにちは")).toBe(
      "ありがとう\r\nこんにちは"
    );
  });

  it("文字列中の改行コードを複数`LF`→`CR+LF`に変換", () => {
    expect(convertLFToCRLF("あ\nり\nが\nと\nう\nこんにちは")).toBe(
      "あ\r\nり\r\nが\r\nと\r\nう\r\nこんにちは"
    );
  });
});

describe("convertCRLFToLF", () => {
  it("文字列中の改行コードを1つ`CR+LF`→`LF`に変換", () => {
    expect(convertCRLFToLF("ありがとう\r\nこんにちは")).toBe(
      "ありがとう\nこんにちは"
    );
  });

  it("文字列中の改行コードを複数`CR+LF`→`LF`に変換", () => {
    expect(convertCRLFToLF("あ\r\nり\r\nが\r\nと\r\nう\r\nこんにちは")).toBe(
      "あ\nり\nが\nと\nう\nこんにちは"
    );
  });
});
