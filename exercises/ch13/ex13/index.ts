import * as fsPromises from "node:fs/promises";
import * as path from "path";

type WalkData = {
  path: string;
  isDirectory: boolean;
};

export async function* walk(rootPath: string): AsyncGenerator<WalkData> {
  // 指定されたディクトリ内のファイル/ディレクトリを取得
  const entries = await fsPromises.readdir(rootPath);

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry);
    const stat = await fsPromises.stat(fullPath); //指定したファイルやディレクトリの情報を取得

    if (stat.isDirectory()) {
      yield { path: fullPath, isDirectory: true };
      yield* walk(fullPath); // 再帰的にディレクトリを探索
    } else if (stat.isFile()) {
      yield { path: fullPath, isDirectory: false };
    }
  }
}
