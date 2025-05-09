import { bitCount } from "./index.js";

describe("bitCount", () => {
  it("2進数で表現された`0b111`が引数の時3を返す", () => {
    expect(bitCount(0b111)).toEqual(3);
  });
  it("2進数で表現された`0b1111111111111111111111111111111`が引数の時31を返す", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toEqual(31);
  });
  it("7が引数の時3を返す", () => {
    expect(bitCount(7)).toEqual(3);
  });
  it("2147483647が引数の時31を返す", () => {
    expect(bitCount(2147483647)).toEqual(31);
  });
  it("0が引数の時0を返す", () => {
    expect(bitCount(0)).toEqual(0);
  });
  //-7→0b11111111111111111111111111111001
  it("負の値-7が引数の時3を返す", () => {
    expect(bitCount(-7)).toEqual(30);
  });
});
