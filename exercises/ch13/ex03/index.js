import * as fs from "node:fs";
import { promisify } from "node:util";

// `Promise`コンストラクタ による変換
export function PromiseReaddir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      //成功
      resolve(files);
    });
  });
}

export function PromiseStat(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      //成功
      resolve(stats);
    });
  });
}

// `promisify` 関数による変換
export const promisifyReaddir = promisify(fs.readdir);
export const promisifyStat = promisify(fs.stat);
