export class PromisePool {
  private queueSize: number;
  private maxRunningPromises: number; //同時に実行可能なPromiseの最大数
  private queue: {
    promiseTask: () => Promise<void>;
    resolve: () => void;
    reject: (e: any) => void;
  }[] = [];
  private running = 0;
  private started = false;
  private _stopPromise: Promise<void> | null = null;
  private _resolveStop: (() => void) | null = null; //_resolveStopが実行されたら_stopPromiseが解決
  /**
   * Constructs PromisePool.
   *
   * @param queueSize the max size of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queueSize or maxRunningPromises is less than 1
   */
  constructor(queueSize: number, maxRunningPromises: number) {
    if (queueSize < 1 || maxRunningPromises < 1) {
      throw new Error("queueSizeとmaxRunningPromisesは1以上でお願いします。");
    }
    this.queueSize = queueSize;
    this.maxRunningPromises = maxRunningPromises;
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start() {
    if (this.started) {
      return Promise.reject(
        new Error("PromisePoolは既にスタートしております。")
      );
    }
    this.started = true;
    this._stopPromise = new Promise((resolve) => {
      this._resolveStop = resolve;
    });
    this._runTasks();
    return Promise.resolve();
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop() {
    if (!this.started) {
      return Promise.reject(
        new Error("PromisePoolはまだスタートしておりません。")
      );
    }
    await this._stopPromise;
    this.started = false;
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseTask the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  //ここでタスク実行しても
  async dispatch(promiseTask: () => Promise<void>): Promise<void> {
    if (!this.started) {
      return Promise.reject(
        new Error("PromisePoolはまだスタートしておりません。")
      );
    }

    if (this.queue.length >= this.queueSize)
      await new Promise<void>((resolve) => {
        // 10ミリ秒ごとにキューの様子を伺う
        // 監視ではなくて、空いてたら入れるようにしたい
        // https://qiita.com/tagotyan/items/4d4ae0059d690bf79fe3
        const interval = setInterval(() => {
          if (this.queue.length < this.queueSize) {
            clearInterval(interval);
            resolve();
          }
        }, 10);
      });

    return new Promise<void>((resolve, reject) => {
      //queue.resolve()で解決、queue.reject()で失敗 → runTasksで実行
      // タスクに積まれたら解決という仕様なので、改善ポイント
      this.queue.push({ promiseTask, resolve, reject });
      this._runTasks();
    });
  }

  private async _runTasks() {
    while (this.running < this.maxRunningPromises && this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) break;

      this.running++;
      task
        .promiseTask()
        .then(() => task.resolve())
        .catch((e) => task.reject(e))
        .finally(() => {
          this.running--;
          this._runTasks(); // 1つ終わったら次のタスクを開始
        });
    }
    // dispatchする前にstop()しても終わる
    if (this.running === 0 && this.queue.length === 0 && this._resolveStop) {
      this._resolveStop();
    }
  }
}
