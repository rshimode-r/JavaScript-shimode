import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { checkEntry } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testDir = path.join(__dirname, "testDir");
const testFile = path.join(testDir, "testFile.txt");
const nonExistent = path.join(testDir, "nonExistent.txt");

beforeAll(() => {
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
  fs.writeFileSync(testFile, "test content");
});

afterAll(() => {
  fs.unlinkSync(testFile);
  fs.rmdirSync(testDir);
});

describe("checkEntry", () => {
  it("ディレクトリの場合は 'directory' を返す", () => {
    expect(checkEntry(testDir)).toBe("directory");
  });

  it("ファイルの場合は 'file' を返す", () => {
    expect(checkEntry(testFile)).toBe("file");
  });

  it("存在しないパスの場合は 'not found' を返す", () => {
    expect(checkEntry(nonExistent)).toBe("not found");
  });
});
