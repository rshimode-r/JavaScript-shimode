// fib関数の実装
export function fib(x) {
  if (x < 0 || !Number.isInteger(x)) return NaN; //0と正の整数以外はNaNを返す
  if (x === 0) return 0;
  if (x === 1) return 1;

  let dp = [0, 1];
  for (let i = 2; i <= x; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[x];
}
