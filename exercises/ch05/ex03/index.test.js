import { check31DaysMonthIfElse, check31DaysMonthSwitch } from "./index.js";

describe("check31DaysMonthIfElse", () => {
  test.each([
    ["Jan", true],
    ["Feb", false],
    ["Mar", true],
    ["Apr", false],
    ["May", true],
    ["Jun", false],
    ["Jul", true],
    ["Aug", true],
    ["Sep", false],
    ["Oct", true],
    ["Nov", false],
    ["Dec", true],
  ])("%s では %s を返す", (month, expected) => {
    expect(check31DaysMonthIfElse(month)).toBe(expected);
  });
});

describe("check31DaysMonthSwitch", () => {
  test.each([
    ["Jan", true],
    ["Feb", false],
    ["Mar", true],
    ["Apr", false],
    ["May", true],
    ["Jun", false],
    ["Jul", true],
    ["Aug", true],
    ["Sep", false],
    ["Oct", true],
    ["Nov", false],
    ["Dec", true],
  ])("%s では %s を返す", (month, expected) => {
    expect(check31DaysMonthSwitch(month)).toBe(expected);
  });
});
