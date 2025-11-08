import { test, expect } from "@playwright/test";

test.describe("inline-circle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://127.0.0.1:5500/exercises/ch15.04-10/ex05/index.html"
    );
  });

  const baseFontSize = 16; // 1em = 16px

  const cases = [
    {
      name: "デフォルトの円",
      selector: "inline-circle",
      diameterEm: 0.8,
      expectedBg: null,
      expectedBorder: "rgb(0, 0, 0)",
    },
    {
      name: "3.2em, 青, 金色",
      selector:
        'inline-circle[diameter="3.2em"][color="blue"][border-color="gold"]',
      diameterEm: 3.2,
      expectedBg: "rgb(0, 0, 255)",
      expectedBorder: "rgb(255, 215, 0)",
    },
    {
      name: "2.6em, 金色, 赤",
      selector:
        'inline-circle[diameter="2.6em"][color="gold"][border-color="red"]',
      diameterEm: 2.6,
      expectedBg: "rgb(255, 215, 0)",
      expectedBorder: "rgb(255, 0, 0)",
    },
  ];

  for (const c of cases) {
    test(`属性が正しく適用されること: ${c.name}`, async ({ page }) => {
      const circle = await page.$(c.selector);
      expect(circle).not.toBeNull();

      const width = await circle.evaluate((el) =>
        parseFloat(getComputedStyle(el).width)
      );
      const height = await circle.evaluate((el) =>
        parseFloat(getComputedStyle(el).height)
      );

      const expectedPx = c.diameterEm * baseFontSize;

      expect(width).toBeCloseTo(expectedPx, 1);
      expect(height).toBeCloseTo(expectedPx, 1);

      if (c.expectedBg) {
        const bg = await circle.evaluate(
          (el) => getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(c.expectedBg);
      }

      const borderColor = await circle.evaluate(
        (el) => getComputedStyle(el).borderTopColor
      );
      expect(borderColor).toBe(c.expectedBorder);
    });
  }
});
