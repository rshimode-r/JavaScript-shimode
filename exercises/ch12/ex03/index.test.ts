import { Counter } from "./index.ts";

describe("Counter", () => {
  it("通常の next() でカウントアップする", () => {
    const counter = Counter();
    expect(counter.next().value).toBe(1);
    expect(counter.next().value).toBe(2);
    expect(counter.next().value).toBe(3);
  });

  it("throw('reset') でカウントがリセットされる", () => {
    const counter = Counter();
    counter.next();
    counter.next();
    counter.next();
    //countは3まで進んでいる
    const resetResult = counter.throw("reset");
    expect(resetResult.value).toBe(1);
    expect(counter.next().value).toBe(2);
  });

  it("throw() に予期しないエラーを渡すと外部にスローされる", () => {
    const counter = Counter();
    counter.next();

    expect(() => {
      counter.throw("fatal error");
    }).toThrow("fatal error");
  });
});
