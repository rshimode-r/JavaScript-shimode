import fs from "fs";

const file = process.argv[2];
const size = parseInt(process.argv[3], 10);

if (!file || isNaN(size)) {
  console.error("使い方: node index.js <ファイル名> <サイズ>");
  process.exit(1);
}

fs.truncate(file, size, (err) => {
  if (err) {
    console.error("エラー:", err.message);
    process.exit(1);
  }
  console.log(`${file} を ${size} バイトに変更しました`);
});
