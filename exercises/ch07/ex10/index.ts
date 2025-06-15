type FixedSizeArray<T> = {
  get(index: number): T | undefined;
  set(index: number, value: T): void;
  length(): number;
};

function makeFixedSizeArray<T>(size: number): FixedSizeArray<T> {
  const array = new Array(size);
  return {
    get(index: number) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index: number, value: T) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray<T> {
  static INITIAL_SIZE = 4; // 初期サイズ
  private len: number;
  private array: FixedSizeArray<T>;

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index: number) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Array index out of range: ${index}`);
    }
    return this.array.get(index);
  }
  set(index: number, value: T) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index, value);
  }
  length() {
    return this.len;
  }
  push(value: T) {
    // this.array に空が無い場合は「再配置」を行う
    if (this.len >= this.array.length()) {
      // 新しい固定長配列を作成
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列 (old) の要素を新しい配列にコピー
      for (let i = 0; i < old.length(); i++) {
        const oldVal = old.get(i);
        if (oldVal === undefined) continue;
        this.array.set(i, oldVal);
      }
    }
    this.array.set(this.len, value);
    this.len++;
  }
}
