import fs from "fs";
import iconv from "iconv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "hello.txt");

const converter = new iconv.Iconv("SHIFT_JIS", "UTF-8");
const buffer = fs.readFileSync(filePath);
const text = converter.convert(buffer).toString("utf8");

console.log(text);
