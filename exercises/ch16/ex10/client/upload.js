import fs from "fs";
import process from "process";
import path from "path";

const fileName = process.argv[2];

if (!fileName) {
  console.error("Usage: node upload.js <file-to-upload>");
  process.exit(1);
}

const scriptDir = path.dirname(process.argv[1]);
const filePath = path.join(scriptDir, fileName);
if (!fs.existsSync(filePath)) {
  console.error(`File does not exist in script directory: ${filePath}`);
  process.exit(1);
}
const url = `http://localhost:8000/${fileName}`;

fetch(url, {
  method: "PUT",
  body: fs.createReadStream(filePath),
  duplex: "half",
})
  .then((res) => res.text())
  .then((text) => console.log(text))
  .catch((err) => console.error(err));
