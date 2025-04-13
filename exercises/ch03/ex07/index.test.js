import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = ["1", "2", "3"]; // ここを変更
  const y = "123"; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
