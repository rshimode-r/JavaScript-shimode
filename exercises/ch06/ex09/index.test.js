import { jest, expect, test } from "@jest/globals";
const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

// ここに１行のコードを書く
// prettier-ignore
obj.toJSON = function () {return { x: this.x, y: this.y, sum: this.sum() };};

test("objのJSON.stringifyの結果とmock呼び出し", () => {
  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
