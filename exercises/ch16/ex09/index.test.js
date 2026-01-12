import request from "supertest";
import path from "path";
import fs from "fs";
import { createApp } from "./index.js";

describe("createApp", () => {
  const rootDirectory = path.join(process.cwd(), "test-files");
  let app;

  beforeAll(() => {
    if (!fs.existsSync(rootDirectory)) {
      fs.mkdirSync(rootDirectory);
    }
    fs.writeFileSync(path.join(rootDirectory, "test.txt"), "Hello World");

    app = createApp(rootDirectory);
  });

  afterAll(() => {
    fs.unlinkSync(path.join(rootDirectory, "test.txt"));
    fs.rmdirSync(rootDirectory);
  });

  describe("/test/mirror", () => {
    it("GET リクエストでリクエストラインとヘッダーが返る", async () => {
      const res = await request(app).get("/test/mirror");
      expect(res.status).toBe(200);
      expect(res.text).toContain("GET /test/mirror HTTP/");
    });

    it("POST リクエストのボディがそのまま返る", async () => {
      const payload = "テストボディ";
      const res = await request(app)
        .post("/test/mirror")
        .set("Content-Type", "text/plain")
        .send(payload);
      expect(res.status).toBe(200);
      expect(res.text).toContain(payload);
      expect(res.text).toContain("POST /test/mirror HTTP/");
    });
  });

  describe("静的ファイル配信", () => {
    it("/test.txt にアクセスするとファイル内容が返る", async () => {
      const res = await request(app).get("/test.txt");
      expect(res.status).toBe(200);
      expect(res.text).toBe("Hello World");
      expect(res.header["content-type"]).toMatch(/text\/plain/);
    });

    it("存在しないファイルにアクセスすると 404 が返る", async () => {
      const res = await request(app).get("/notfound.txt");
      expect(res.status).toBe(404);
    });
  });
});
