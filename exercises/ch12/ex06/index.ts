import * as fs from "fs";
import * as path from "path";

type WalkData = {
  path: string;
  isDirectory: boolean;
};

// ディレクトリ前提で作ってしまっている。
export function* walk(rootPath: string): Generator<WalkData> {
  // 指定されたディクトリ内のファイル/ディレクトリを取得
  const entries = fs.readdirSync(rootPath);

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry);
    const stat = fs.statSync(fullPath); //指定したファイルやディレクトリの情報を取得

    if (stat.isDirectory()) {
      yield { path: fullPath, isDirectory: true }; //isDirectoryメソッドの値を入れてもよかったかも
      yield* walk(fullPath); // 再帰的にディレクトリを探索
    } else if (stat.isFile()) {
      yield { path: fullPath, isDirectory: false };
    }
  }
}
