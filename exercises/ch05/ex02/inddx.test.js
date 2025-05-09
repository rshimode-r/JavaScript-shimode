import { ConvertEscapeUseIfElse, ConvertEscapeUseSwitch } from "./index.js";

describe("ConvertEscapeUseIfElse", () => {
  test.each([
    ["aaa\\0aaa", "aaa\0aaa", "aaa\\0aaa"],
    ["aaa\\baaa", "aaa\baaa", "aaa\\baaa"],
    ["aaa\\taaa", "aaa\taaa", "aaa\\taaa"],
    ["aaa\\naaa", "aaa\naaa", "aaa\\naaa"],
    ["aaa\\vaaa", "aaa\vaaa", "aaa\\vaaa"],
    ["aaa\\faaa", "aaa\faaa", "aaa\\faaa"],
    ["aaa\\raaa", "aaa\raaa", "aaa\\raaa"],
    // prettier-ignore
    ['aaa\\"aaa', 'aaa\"aaa', 'aaa\\"aaa'],
    // prettier-ignore
    ["aaa\\'aaa", "aaa\'aaa", "aaa\\'aaa"],
  ])("%s に対応する文字を渡すと %s を返す", (label, inputChar, expected) => {
    expect(ConvertEscapeUseIfElse(inputChar)).toBe(expected);
  });
});

describe("ConvertEscapeUseSwitch", () => {
  test.each([
    ["aaa\\0aaa", "aaa\0aaa", "aaa\\0aaa"],
    ["aaa\\baaa", "aaa\baaa", "aaa\\baaa"],
    ["aaa\\taaa", "aaa\taaa", "aaa\\taaa"],
    ["aaa\\naaa", "aaa\naaa", "aaa\\naaa"],
    ["aaa\\vaaa", "aaa\vaaa", "aaa\\vaaa"],
    ["aaa\\faaa", "aaa\faaa", "aaa\\faaa"],
    ["aaa\\raaa", "aaa\raaa", "aaa\\raaa"],
    // prettier-ignore
    ['aaa\\"aaa', 'aaa\"aaa', 'aaa\\"aaa'],
    ["aaa\\'aaa", "aaa\'aaa", "aaa\\'aaa"],
    // prettier-ignore
  ])("%s に対応する文字を渡すと %s を返す", (label, inputChar, expected) => {
    expect(ConvertEscapeUseSwitch(inputChar)).toBe(expected);
  });
});
