export function retryWithExponentialBackoff(
  func: () => boolean,
  maxRetry: number,
  callback: (result: boolean) => void
) {
  (async () => {
    for (let i = 0; i < maxRetry; i++) {
      const result = func();
      if (result) {
        callback(true);
        return;
      }
      if (i !== maxRetry - 1)
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
    }
    callback(false);
  })();
}
