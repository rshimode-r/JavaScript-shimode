import { primes } from "./index.ts";

describe("primes", () => {
  it("10個の素数を正しく返す", () => {
    const expectedPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const gen = primes();

    for (const expected of expectedPrimes) {
      expect(gen.next().value).toBe(expected);
    }
  });

  it("100回呼んでも素数だけ返す", () => {
    const gen = primes();
    for (let i = 0; i < 100; i++) {
      const val = gen.next().value;
      expect(isPrime(val)).toBe(true);
    }
  });
});

// 素数チェック
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
