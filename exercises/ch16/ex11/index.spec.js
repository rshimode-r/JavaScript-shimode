import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:8080";

test.describe("問題 16.11", () => {
  it("GET / が HTML フォームを返す", async ({ page }) => {
    await page.goto(BASE_URL + "/");
    const content = await page.content();
    expect(content).toContain('<form action="/greeting" method="POST">');
    expect(content).toContain('id="name" name="name"');
    expect(content).toContain('id="greeting" name="greeting"');
  });

  it("POST /greeting が送信した name と greeting を返す", async ({ page }) => {
    await page.goto(BASE_URL + "/");

    await page.fill("#name", "Alice");
    await page.fill("#greeting", "Hello");
    await page.click('button[type="submit"]');
    const content = await page.content();
    expect(content).toContain("name : Alice ,  greeting : Hello");
  });

  it("存在しないパスにアクセスすると 404 が返る", async ({ request }) => {
    const response = await request.get(BASE_URL + "/invalid");
    expect(response.status()).toBe(404);
  });

  it("対応していない HTTP メソッドを使うと 405 が返る", async ({ request }) => {
    const response = await request.put(BASE_URL + "/");
    expect(response.status()).toBe(405);
  });
});
