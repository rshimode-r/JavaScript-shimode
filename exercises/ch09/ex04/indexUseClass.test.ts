import { Warrior, MagicWarrior } from "./indexUseClass.ts";

describe("Warrior", () => {
  it("`attack` メソッドはそのインスタンスの `atk` の 2 倍の値をダメージとして返す", () => {
    const w = new Warrior(10);
    expect(w.atk).toBe(10);
    expect(w.attack()).toBe(20);
  });
  it("WarriorのatkがNaNで設定された場合、エラーを返す", () => {
    expect(() => new Warrior(NaN)).toThrow(Error);
  });
  it("Warriorのatkが負の値で設定された場合、エラーを返す", () => {
    expect(() => new Warrior(-10)).toThrow(Error);
  });
});

describe("MagicWarrior", () => {
  it(" `attack` は戦士としての `attack` の値にそのインスタンスの `mgc` の値を加算した値をダメージとして返す", () => {
    const mw = new MagicWarrior(10, 5);
    expect(mw.atk).toBe(10);
    expect(mw.mgc).toBe(5);
    expect(mw.attack()).toBe(25);
  });
  it("MagicWarriorのatkやmgcがNaNで設定された場合、エラーを返す", () => {
    expect(() => new MagicWarrior(NaN, 10)).toThrow(Error);
    expect(() => new MagicWarrior(10, NaN)).toThrow(Error);
  });
  it("MagicWarriorのatkやmgcが負の値で設定された場合、エラーを返す", () => {
    expect(() => new MagicWarrior(-10, 10)).toThrow(Error);
    expect(() => new MagicWarrior(10, -10)).toThrow(Error);
  });
});
