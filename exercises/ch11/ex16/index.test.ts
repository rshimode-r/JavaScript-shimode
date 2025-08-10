import { retryWithExponentialBackoff } from "./index.ts";
import { jest } from "@jest/globals";

describe("retryWithExponentialBackoff", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("funcがすぐtrueを返したらcallbackは一度だけtrueで呼ばれる", () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("funcがfalseを返し続けたら最大リトライ回数後にfalseでcallbackが呼ばれる", async () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 2, callback);

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledWith(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("funcが途中でtrueを返したらそこでcallbackはtrueで呼ばれ終了する", async () => {
    const func = jest
      .fn<() => boolean>()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(func).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(2000);
    await Promise.resolve();

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
