export async function retryWithExponentialBackoff(
  func: () => Promise<boolean>,
  maxRetry: number,
  callback: (result: boolean) => void
): Promise<boolean> {
  for (let i = 0; i < maxRetry; i++) {
    try {
      const result = await func();
      if (result) {
        callback(true);
        return true;
      }
    } catch (_) {
      // funcの返り値が失敗した場合もリトライ
    }

    if (i !== maxRetry - 1) {
      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
    }
  }
  callback(false);
  return false;
}
