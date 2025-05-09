// 〇参照 https://www.kaoriya.net/blog/2013/02/04/
// 代入演算子を使わない方法が思いつきませんでした。

export function sub(x, y) {
  return add(x, add(~y, 1));
}

function add(x, y) {
  let z;
  while (y | 0) {
    z = (x & y) << 1;
    x ^= y;
    y = z;
  }
  return x;
}
