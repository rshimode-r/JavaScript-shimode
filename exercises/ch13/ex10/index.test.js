import { fetchSumOfFileSizes } from "./index";
import fs from "fs";
import path from "path";
import os from "os";

let tempDir;

beforeAll(() => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "test-"));
  // UTF-8では1文字1バイト
  // ネストした形式や、ファイルが多いverも試したらよいかも
  fs.writeFileSync(path.join(tempDir, "a.txt"), "hello"); //5
  fs.writeFileSync(path.join(tempDir, "b.txt"), "world!"); //6
});

afterAll(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});
describe("fetchSumOfFileSizes", () => {
  it("すべてのファイルのサイズの合計を返すこと", async () => {
    const total = await fetchSumOfFileSizes(tempDir);
    expect(total).toBe(11);
  });

  it("空ディレクトリなら 0 を返すこと", async () => {
    const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "empty"));
    const total = await fetchSumOfFileSizes(emptyDir);
    expect(total).toBe(0);

    fs.rmSync(emptyDir, { recursive: true, force: true });
  });
});
