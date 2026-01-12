import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(rootDirectory) {
  const app = express();

  app.use("/test/mirror", express.raw({ type: "*/*" }), (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

    for (const [key, value] of Object.entries(req.headers)) {
      res.write(`${key}: ${value}\r\n`);
    }
    res.write("\r\n");

    res.end(req.body);
  });

  //例: /test.txt にアクセスすると自動で rootDirectory/test.txt を返す
  app.use(express.static(rootDirectory));
  return app;
}

// テストが正常に終了するようにするため、直接実行された場合のみサーバーを起動
if (import.meta.url === `file://${process.argv[1]}`) {
  const rootDir = process.argv[2] || __dirname;
  const port = parseInt(process.argv[3], 10) || 8000;

  const app = createApp(rootDir);
  app.listen(port, () => {
    console.log("Listening on port", port);
  });
}
