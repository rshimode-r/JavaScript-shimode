import { readdir, stat } from "fs/promises";
import { join } from "path";

export function fetchFirstFileSize(path) {
  return readdir(path).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return stat(join(path, files[0])).then((stats) => stats.size);
  });
}

export function fetchSumOfFileSizes(path) {
  return readdir(path).then((files) => {
    let total = 0;
    // すべてのstat()をPromise配列で取得
    const statPromises = files.map((file) => stat(join(path, file)));
    // 全部のstatが終わったらサイズを合計
    return Promise.all(statPromises).then((statsArray) => {
      statsArray.forEach((stats) => {
        total += stats.size;
      });
      return total;
    });
  });
}
