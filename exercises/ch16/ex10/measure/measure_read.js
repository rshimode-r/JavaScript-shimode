import fs from "fs";
import path from "path";

const fileName = "largefile.txt";
const filePath = path.resolve(fileName);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

function printMemory(label) {
  const mem = process.memoryUsage();
  console.log(`${label} - rss: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
}

function measureRead(filePath) {
  printMemory("Before fs.read");

  const fd = fs.openSync(filePath, "r");
  const stats = fs.fstatSync(fd);
  const buffer = Buffer.alloc(stats.size);

  fs.readSync(fd, buffer, 0, stats.size, 0);
  fs.closeSync(fd);

  printMemory("After fs.read");
  console.log("fs.read total bytes:", buffer.length);
}

measureRead(filePath);

// Before fs.read - rss: 45.38 MB
// After fs.read - rss: 1046.50 MB
// fs.read total bytes: 1048576000
