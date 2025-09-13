import { readLines } from "./index.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url); //現在のファイルの絶対パス
const __dirname = dirname(__filename); //現在のファイルがあるディレクトリの絶対パス

describe("readLines", () => {
  it("全ての行を正しく読み込める", () => {
    const tempFilePath = join(__dirname, "testfile.txt");
    fs.writeFileSync(tempFilePath, "1行目\n2行目\n3行目\n4行目");
    const lines = [...readLines(tempFilePath)];
    expect(lines).toEqual(["1行目", "2行目", "3行目", "4行目"]);
    fs.unlinkSync(tempFilePath);
  });

  it("breakしてもファイルがクローズされる", () => {
    const breakErrorFile = join(__dirname, "break_error.txt");
    fs.writeFileSync(breakErrorFile, "1行目\n2行目\n3行目\n4行目");
    const iter = readLines(breakErrorFile);

    for (const line of iter) {
      break;
    }
    //break後も書き込みできるか検証
    expect(() => {
      fs.writeFileSync(breakErrorFile, "break後も書き込みできる");
    }).not.toThrow();
    fs.unlinkSync(breakErrorFile);
  });

  it("throwしてもファイルがクローズされる", () => {
    const throwErrorFile = join(__dirname, "throw_error.txt");
    fs.writeFileSync(throwErrorFile, "1行目\n2行目\n3行目\n4行目");
    const iter = readLines(throwErrorFile);

    try {
      for (const line of iter) {
        throw new Error();
      }
    } catch (e) {}
    expect(() => {
      //例外スロー後も書き込みできるか検証
      fs.writeFileSync(throwErrorFile, "例外スロー後も書き込みできる");
    }).not.toThrow();

    fs.unlinkSync(throwErrorFile);
  });

  it("空ファイルの場合、何もyieldされない", () => {
    const emptyFile = join(__dirname, "empty.txt");
    fs.writeFileSync(emptyFile, "");
    const lines = [...readLines(emptyFile)];
    expect(lines).toEqual([]);
    fs.unlinkSync(emptyFile);
  });
});
