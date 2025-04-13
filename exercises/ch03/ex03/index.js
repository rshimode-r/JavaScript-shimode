export function isEqual(a, b) {
  const epsilon = 1e-10; // 許容誤差を 10^-10 に設定
  return Math.abs(a - b) < epsilon; //aとbの差が許容誤差の範囲内か判定
}
