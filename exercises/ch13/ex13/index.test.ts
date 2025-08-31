import * as fs from "fs";
import * as path from "path";
import { walk } from "./index.ts";
import * as os from "os";

describe("walk", () => {
  let tempDir: string;

  beforeEach(() => {
    // テスト用の一時ディレクトリを作成
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "test-"));

    // A ディレクトリ
    fs.mkdirSync(path.join(tempDir, "A"));

    // B/C ディレクトリ
    const dirB = path.join(tempDir, "B");
    const dirC = path.join(dirB, "C");
    fs.mkdirSync(dirB);
    fs.mkdirSync(dirC);

    // B/C/buz.txt ファイル
    fs.writeFileSync(path.join(dirC, "buz.txt"), "buz content");

    // foo.txt ファイル
    fs.writeFileSync(path.join(tempDir, "foo.txt"), "foo content");
  });

  afterEach(() => {
    // 一時ディレクトリを削除（再帰的）
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("指定されたディレクトリ内のファイルとディレクトリを再帰的に探索できる", async () => {
    const result: Array<{ path: string; isDirectory: boolean }> = [];

    for await (const entry of walk(tempDir)) {
      result.push(entry);
    }

    const expectedPaths = [
      {
        path: path.join(tempDir, "A"),
        isDirectory: true,
      },
      {
        path: path.join(tempDir, "B"),
        isDirectory: true,
      },
      {
        path: path.join(tempDir, "B", "C"),
        isDirectory: true,
      },
      {
        path: path.join(tempDir, "B", "C", "buz.txt"),
        isDirectory: false,
      },
      {
        path: path.join(tempDir, "foo.txt"),
        isDirectory: false,
      },
    ];

    expect(result).toEqual(expect.arrayContaining(expectedPaths));
    expect(result.length).toBe(expectedPaths.length);
  });
});
