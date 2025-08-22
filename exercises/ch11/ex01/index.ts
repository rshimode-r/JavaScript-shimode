// new で呼び出せる関数
type AnyConstructor = new (...args: any[]) => any;
const errorMessage = "コンストラクタ関数とクラスの組み合わせが不正です";

export class TypeMap {
  private map = new Map<AnyConstructor, any>();
  // オブジェクト扱いするStringとかが入ってくるとマズい可能性あり（エラーになるかも）
  // →テストした結果テスト落ちたので、マズかった。
  // →解決させた
  set(key: AnyConstructor, value: any): void {
    if (key === String && typeof value !== "string") {
      if (!(value instanceof String)) throw new Error(errorMessage);
    } else if (key === Number && typeof value !== "number") {
      if (!(value instanceof Number)) throw new Error(errorMessage);
    } else if (key === Boolean && typeof value !== "boolean") {
      if (!(value instanceof Boolean)) throw new Error(errorMessage);
    } else if (key !== String && key !== Number && key !== Boolean) {
      if (!(value instanceof key)) {
        throw new Error(errorMessage);
      }
    }
    this.map.set(key, value);
  }

  get(key: AnyConstructor): any {
    return this.map.get(key);
  }
}
