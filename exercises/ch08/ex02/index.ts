export function pow(b: number, n: number): number {
  if (!Number.isInteger(n) || n < 0)
    throw new Error("負や小数などの整数以外はサポートしません。");
  if (n === 0) return 1;
  if (n === 1) return b;
  if (n % 2 === 0) {
    const halfPow: number = pow(b, n / 2);
    return halfPow * halfPow;
  } else {
    return b * pow(b, n - 1);
  }
}
