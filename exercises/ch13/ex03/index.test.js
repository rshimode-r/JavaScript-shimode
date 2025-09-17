import {
  PromiseReaddir,
  PromiseStat,
  promisifyReaddir,
  promisifyStat,
} from "./index";

import * as fs from "fs";
import * as path from "path";
import * as os from "os";

let tempDir;
let testFile;

beforeAll(() => {
  // 一時ディレクトリ作成
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "test"));
  testFile = path.join(tempDir, "test.txt");
  fs.writeFileSync(testFile, "hello");
});

afterAll(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

describe("PromiseReaddir", () => {
  it("ディレクトリ内のファイルを読み取れる", () => {
    return PromiseReaddir(tempDir, { encoding: "utf8" }).then((files) => {
      expect(files).toContain("test.txt");
    });
  });

  it("存在しないディレクトリはエラーになる", () => {
    return PromiseReaddir("/invalid/path").catch((err) => {
      expect(err.constructor.name).toBe("Error");
    });
  });
});

describe("PromiseStat", () => {
  it("通常ファイルであることを確認できる", () => {
    return PromiseStat(testFile).then((stats) => {
      expect(stats.isFile()).toBe(true);
    });
  });

  it("存在しないファイルはエラーになる", () => {
    return PromiseStat("/invalid/path.txt").catch((err) => {
      expect(err.constructor.name).toBe("Error");
    });
  });
});

describe("promisifyReaddir", () => {
  it("ディレクトリ内のファイルを読み取れる", () => {
    return promisifyReaddir(tempDir, { encoding: "utf8" }).then((files) => {
      expect(files).toContain("test.txt");
    });
  });

  it("存在しないディレクトリはエラーになる", () => {
    return promisifyReaddir("/invalid/path").catch((err) => {
      expect(err.constructor.name).toBe("Error");
    });
  });
});

describe("promisifyStat", () => {
  it("通常ファイルであることを確認できる", () => {
    return promisifyStat(testFile).then((stats) => {
      expect(stats.isFile()).toBe(true);
    });
  });

  it("存在しないファイルはエラーになる", () => {
    return promisifyStat("/invalid/path.txt").catch((err) => {
      expect(err.constructor.name).toBe("Error");
    });
  });
});
