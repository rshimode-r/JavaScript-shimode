import fs from "fs";

const filePath = "largefile.txt";
const sizeMB = 1000;

const stream = fs.createWriteStream(filePath);
for (let i = 0; i < sizeMB * 1024; i++) {
  stream.write("a".repeat(1024));
}
stream.end();
