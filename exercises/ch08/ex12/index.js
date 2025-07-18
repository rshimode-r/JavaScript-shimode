export function f(str) {
  const args = Array(10)
    .fill(0)
    .map((_, i) => `$${i + 1}`);
  // returnが含まれているなら、strをそのまま関数の本体にする
  // strを加工する方法もある(その方が重複少ない)
  if (str.includes("return")) {
    return new Function(...args, str);
  } else {
    return new Function(...args, `return (${str});`);
  }
}
