import { toBigEndian, toLittleEndian } from "./index.ts";

describe("toBigEndian", () => {
  it("基本的な値の変換", () => {
    const input = new Uint32Array([0x12345678, 0x90abcdef]);
    const result = toBigEndian(input);
    // Uint32Arrayの中身をバイト単位で見たい
    const bytes = new Uint8Array(result.buffer);

    expect(bytes).toEqual(
      new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef])
    );
  });

  it("空配列は空配列のまま", () => {
    const input = new Uint32Array([]);
    const result = toBigEndian(input);
    expect(result.length).toBe(0);
  });
});

describe("toLittleEndian", () => {
  it("基本的な値の変換", () => {
    const input = new Uint32Array([0x12345678, 0x90abcdef]);
    const result = toLittleEndian(input);
    // Uint32Arrayの中身をバイト単位で見たい
    const bytes = new Uint8Array(result.buffer);

    expect(bytes).toEqual(
      new Uint8Array([0x78, 0x56, 0x34, 0x12, 0xef, 0xcd, 0xab, 0x90])
    );
  });

  it("空配列は空配列のまま", () => {
    const input = new Uint32Array([]);
    const result = toLittleEndian(input);
    expect(result.length).toBe(0);
  });
});
