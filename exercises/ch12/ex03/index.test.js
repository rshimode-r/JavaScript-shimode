import { Counter } from "./index.js";

describe("Counter", () => {
  it("通常の next() でカウントアップする", () => {
    const counter = Counter();
    expect(counter.next().value).toBe(1);
    expect(counter.next().value).toBe(2);
    expect(counter.next().value).toBe(3);
  });

  it("throw() でカウントがリセットされる", () => {
    const counter = Counter();
    counter.next();
    counter.next();
    counter.next();
    //countは3まで進んでいる
    const resetResult = counter.throw();
    expect(resetResult.value).toBe(0);
    expect(counter.next().value).toBe(1);
  });
});
