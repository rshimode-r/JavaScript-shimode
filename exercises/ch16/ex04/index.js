import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import iconv from "iconv-lite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "hello.txt");

fs.createReadStream(filePath)
  .pipe(iconv.decodeStream("shift_jis"))
  .on("data", (chunk) => {
    process.stdout.write(chunk);
  });
