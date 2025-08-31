import { retryWithExponentialBackoff } from "./index.ts";
import { jest } from "@jest/globals";

describe("retryWithExponentialBackoff", () => {
  jest.useFakeTimers({ legacyFakeTimers: false });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("funcがすぐtrueを返したらcallbackは一度だけtrueで呼ばれる", async () => {
    const func = jest.fn(() => Promise.resolve(true));
    const callback = jest.fn();

    await retryWithExponentialBackoff(func, 5, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("funcがfalseを返し続けたら最大リトライ回数後にfalseでcallbackが呼ばれる", async () => {
    const func = jest.fn(() => Promise.resolve(false));
    const callback = jest.fn();

    const promise = retryWithExponentialBackoff(func, 2, callback);

    //タイマーを進める
    await jest.advanceTimersByTimeAsync(1000);
    await jest.advanceTimersByTimeAsync(2000);

    await promise;

    expect(callback).toHaveBeenCalledWith(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("funcが途中でtrueを返したらそこでcallbackはtrueで呼ばれ終了する", async () => {
    const func = jest
      .fn<() => Promise<boolean>>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const callback = jest.fn();

    const promise = retryWithExponentialBackoff(func, 5, callback);

    await jest.advanceTimersByTimeAsync(1000);
    await jest.advanceTimersByTimeAsync(2000);
    await promise;

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("funcが失敗した場合もリトライし、3回目にcallbackがtrueで呼ばれる", async () => {
    const func = jest
      .fn<() => Promise<boolean>>()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValueOnce(true);

    const callback = jest.fn();

    const promise = retryWithExponentialBackoff(func, 5, callback);

    await jest.advanceTimersByTimeAsync(1000);
    await jest.advanceTimersByTimeAsync(2000);
    await promise;

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
