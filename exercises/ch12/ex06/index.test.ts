import * as fs from "fs";
import * as path from "path";
import { walk } from "./index.ts";
import * as os from "os";

describe("walk", () => {
  let tempDir: string;

  beforeEach(() => {
    // テスト用の一時ディレクトリを作成
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "test"));

    fs.writeFileSync(path.join(tempDir, "file1.txt"), "file1"); //file1.txt作成

    const subDir = path.join(tempDir, "subDir"); //subDir作成
    fs.mkdirSync(subDir);
    fs.writeFileSync(path.join(subDir, "file2.txt"), "file2"); //subDir/file2.txt作成
  });

  afterEach(() => {
    // 一時ディレクトリを削除（再帰的）
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("指定されたディレクトリ内のファイルとディレクトリを再帰的に探索できる", () => {
    const result = [...walk(tempDir)];

    const expectedPaths = [
      {
        path: path.join(tempDir, "file1.txt"),
        isDirectory: false,
      },
      {
        path: path.join(tempDir, "subDir"),
        isDirectory: true,
      },
      {
        path: path.join(tempDir, "subDir", "file2.txt"),
        isDirectory: false,
      },
    ];
    //expectedPathsの内容が含まれていることと、配列の長さを確認
    expect(result).toEqual(expect.arrayContaining(expectedPaths));
    expect(result.length).toBe(expectedPaths.length);
  });
});
