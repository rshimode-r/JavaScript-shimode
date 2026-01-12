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

async function measureStream(filePath) {
  printMemory("Before createReadStream");

  const rs = fs.createReadStream(filePath);
  let totalBytes = 0;

  rs.on("data", (chunk) => {
    totalBytes += chunk.length;
  });

  rs.on("end", () => {
    printMemory("After createReadStream");
    console.log("createReadStream total bytes:", totalBytes);
  });
}

measureStream(filePath);

// Before createReadStream - rss: 45.37 MB
// After createReadStream - rss: 86.22 MB
// createReadStream total bytes: 1048576000
