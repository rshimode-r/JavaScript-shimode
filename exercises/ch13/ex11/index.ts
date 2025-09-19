export async function retryWithExponentialBackoff(
  func: () => Promise<boolean>,
  maxRetry: number,
  callback: (result: boolean) => void
): Promise<boolean> {
  for (let i = 0; i < maxRetry; i++) {
    try {
      const result = await func();
      if (result) {
        // callback要らない？
        callback(true);
        return true;
      }
    } catch (_) {
      // funcが失敗した場合もリトライ
    }
    // catchの中の方が題意に合ってる？
    if (i !== maxRetry - 1) {
      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
    }
  }
  callback(false);
  return false;
}
