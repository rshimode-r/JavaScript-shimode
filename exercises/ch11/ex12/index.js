class FileTooBigError extends Error {
  constructor(filePath) {
    super(`ファイル "${filePath}" のサイズが大きすぎます`);
    this.filePath = filePath;
  }

  get name() {
    return "FileTooBigError";
  }
}
try {
  throw new FileTooBigError("sample.txt");
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}
