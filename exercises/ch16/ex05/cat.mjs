import fs from "fs";

if (process.argv.length > 2) {
  // node →0番目, cat.js →1番目, foo.txt →2番目
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
}
