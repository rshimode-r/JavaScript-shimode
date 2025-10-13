import { test, expect } from "@playwright/test";

test.describe("SRI (Subresource Integrity) check with static HTML files", () => {
  test("正しい integrity のとき、スクリプトが実行される", async ({ page }) => {
    await page.goto(
      "http://127.0.0.1:5500/exercises/ch15.01-03/ex03/index.html"
    );
    await expect(page.locator("#status")).toHaveText("スクリプト実行済み");
  });

  test("間違った integrity のとき、スクリプトはブロックされる", async ({
    page,
  }) => {
    await page.goto(
      "http://127.0.0.1:5500/exercises/ch15.01-03/ex03/invalid.html"
    );
    await expect(page.locator("#status")).toHaveText("未実行");
  });
});
