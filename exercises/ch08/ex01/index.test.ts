import { jest } from "@jest/globals";
import { function1, function2, function3 } from "./index.ts";

describe("function1", () => {
  let consoleLogSpyOn: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    // spyOnでconsole.logが実行されたか検証する
    // https://qiita.com/TMDM/items/bc6940fc2ed4a67fe4ff
    // mockImplementationでテスト時にconsole.logを出力させない
    // https://vitest.dev/api/mock.html#mockimplementation
    consoleLogSpyOn = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    //参考 : https://jestjs.io/docs/mock-function-api#mockfnmockrestore
    consoleLogSpyOn.mockRestore();
  });

  it("nが3, cが'A'のとき、'A'を3回出力し、配列['A','A','A']を返す", () => {
    const result = function1(3, "A");
    expect(result).toEqual(["A", "A", "A"]);
    expect(consoleLogSpyOn).toHaveBeenCalledTimes(3);
    expect(consoleLogSpyOn.mock.calls).toEqual([["A"], ["A"], ["A"]]);
  });

  it("nが2, cが'shimo'のとき、'shimo'を2回出力し、配列['shimo','shimo']を返す", () => {
    const result = function1(2, "shimo");
    expect(result).toEqual(["shimo", "shimo"]);
    expect(consoleLogSpyOn).toHaveBeenCalledTimes(2);
    expect(consoleLogSpyOn.mock.calls).toEqual([["shimo"], ["shimo"]]);
  });

  it("nが5, cが''のとき、''を5回出力し、配列['','','','','']を返す", () => {
    const result = function1(5, "");
    expect(result).toEqual(["", "", "", "", ""]);
    expect(consoleLogSpyOn).toHaveBeenCalledTimes(5);
    expect(consoleLogSpyOn.mock.calls).toEqual([[""], [""], [""], [""], [""]]);
  });

  it("nが0のとき、何も出力せず、空配列を返す", () => {
    const result = function1(0, "B");
    expect(result).toEqual([]);
    expect(consoleLogSpyOn).toHaveBeenCalledTimes(0);
  });
});

describe("function2", () => {
  it("引数が2の時4を返す", () => {
    expect(function2(2)).toEqual(4);
  });
  it("引数が999の時999*999を返す", () => {
    expect(function2(999)).toEqual(999 * 999);
  });
  it("引数が-3の時9を返す", () => {
    expect(function2(-3)).toEqual(9);
  });
});
describe("function3", () => {
  it("nowプロパティが現在時刻（ミリ秒）を持つオブジェクトを返す", () => {
    const result = function3();
    const nowTime = Date.now();
    // https://qiita.com/t-toyota/items/93cce73004b9f765cfcf#a--b
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("now");
    expect(result.now).toBeGreaterThanOrEqual(nowTime - 1000);
    expect(result.now).toBeLessThanOrEqual(nowTime + 1000);
  });
});
