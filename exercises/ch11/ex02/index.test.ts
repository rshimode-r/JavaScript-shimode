import { cache } from "./index.ts";
import { jest } from "@jest/globals";

describe("cache", () => {
  let slowFn: jest.MockedFunction<(obj: object) => number>;
  let cachedSlowFn: (obj: object) => number;

  beforeEach(() => {
    // 時間のかかる処理(という設定)
    slowFn = jest.fn((obj: object): number => {
      if ("id" in obj && typeof (obj as any).id === "number") {
        return (obj as any).id * 2;
      }
      return 0;
    });
    cachedSlowFn = cache(slowFn);
  });

  it("初回呼び出し時にslowFnが呼ばれることを検証", () => {
    const arg = { id: 5 };
    expect(cachedSlowFn(arg)).toBe(10);
    expect(slowFn).toHaveBeenCalledTimes(1);
  });

  it("同じ引数での2回目以降の呼び出しはslowFnが呼ばれずキャッシュ結果が返ることを検証", () => {
    const arg = { id: 5 };
    cachedSlowFn(arg);
    slowFn.mockClear(); //2回目でslowFnが呼ばれないことを確認する目的

    expect(cachedSlowFn(arg)).toBe(10);
    expect(slowFn).not.toHaveBeenCalled();
  });

  it("異なる引数ではslowFnが呼ばれることを検証", () => {
    const arg1 = { id: 5 };
    const arg2 = { id: 7 };

    cachedSlowFn(arg1);
    slowFn.mockClear(); //2回目でslowFnが呼ばれないことを確認する目的

    expect(cachedSlowFn(arg2)).toBe(14);
    expect(slowFn).toHaveBeenCalledTimes(1);
  });
});
