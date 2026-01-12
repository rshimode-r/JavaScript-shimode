import fs from "fs";

export function checkEntry(path) {
  try {
    const stats = fs.statSync(path);

    if (stats.isFile()) {
      return "file";
    } else if (stats.isDirectory()) {
      return "directory";
    } else {
      return "unknown";
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      return "not found";
    }
    throw err;
  }
}

const targetPath = process.argv[2];
console.log(checkEntry(targetPath));
