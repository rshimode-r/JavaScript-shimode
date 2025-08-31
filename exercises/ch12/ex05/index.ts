import * as fs from "fs";

export function* readLines(filePath: string): Generator<string> {
  const BUFFER_SIZE = 100; //一度に読むサイズ
  const buffer = Buffer.alloc(BUFFER_SIZE); // 入れ物準備
  let fd: number | undefined;
  // https://blog.katsubemakito.net/nodejs/file-read#%E6%8C%87%E5%AE%9A%E3%83%90%E3%82%A4%E3%83%88%E5%88%86%E3%82%92%E5%8F%96%E5%BE%97-fsreadSync
  try {
    const fd = fs.openSync(filePath, "r");
    let leftover = "";
    let bytesRead: number;

    while ((bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE, null)) > 0) {
      const chunk = leftover + buffer.toString("utf8", 0, bytesRead);
      const lines = chunk.split("\n");

      leftover = lines.pop() ?? ""; //最後の要素は次の読み取りに使う

      for (const line of lines) {
        yield line;
      }
    }

    if (leftover.length > 0) {
      yield leftover;
    }
  } finally {
    if (fd !== undefined) {
      fs.closeSync(fd);
    }
  }
}
