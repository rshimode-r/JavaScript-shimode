import { test, expect } from "@playwright/test";

test.describe("Product filtering by category", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://127.0.0.1:5500/exercises/ch15.01-03/ex14/index.html"
    );
  });

  test("初期状態ですべての商品が表示される", async ({ page }) => {
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("食品のみを表示する", async ({ page }) => {
    await page.getByTestId("select").selectOption("food");
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeHidden();
    await expect(page.getByTestId("stationery2")).toBeHidden();
  });

  test("文房具のみを表示する", async ({ page }) => {
    await page.getByTestId("select").selectOption("stationery");
    await expect(page.getByTestId("food1")).toBeHidden();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("すべてを表示する", async ({ page }) => {
    // 一度カテゴリを切り替えてから「すべて」に戻す
    await page.getByTestId("select").selectOption("food");
    await page.getByTestId("select").selectOption("all");
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });
});
