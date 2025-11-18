import { test, expect } from "@playwright/test";

test("ex11", async ({ page }) => {
  await page.goto("http://localhost:5500/exercises/ch15.04-10/ex11/index.html");

  // 初期画面で2件追加
  const todos = ["Todo 1", "Todo 2"];
  for (const todo of todos) {
    await page.fill("#new-todo", todo);
    await page.click("#new-todo-form button");
  }

  // 追加されたことを確認
  const allItems = await page.locator("#todo-list li");
  await expect(allItems).toHaveCount(2);

  // 1件目をcompletedにする
  const firstToggle = page
    .locator("#todo-list li")
    .first()
    .locator('input[type="checkbox"]');
  await firstToggle.check();

  // All で表示確認
  const allTexts = await page.locator("#todo-list li label").allTextContents();
  expect(allTexts).toEqual(["Todo 1", "Todo 2"]);
  const firstLiClass = await page
    .locator("#todo-list li")
    .first()
    .getAttribute("class");
  expect(firstLiClass).toContain("completed"); // completedになっているか確認

  // ActiveにTodo2が表示されている
  await page.click("footer >> text=Active");
  const activeTexts = await page
    .locator("#todo-list li label")
    .allTextContents();
  expect(activeTexts).toEqual(["Todo 2"]);

  // CompletedにTodo1が表示されている
  await page.click("footer >> text=Completed");
  const completedTexts = await page
    .locator("#todo-list li label")
    .allTextContents();
  expect(completedTexts).toEqual(["Todo 1"]);
});
