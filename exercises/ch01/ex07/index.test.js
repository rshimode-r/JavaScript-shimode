import { Point } from "./index.js";

describe("Point", () => {
  describe("add", () => {
    it("座標が正しく加算される", () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(3, 4);
      p1.add(p2);
      expect(p1.x).toBe(4);
      expect(p1.y).toBe(6);
    });
  });
});
