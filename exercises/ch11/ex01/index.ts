// new で呼び出せる関数
type AnyConstructor = new (...args: any[]) => any;
const errorMessage = "コンストラクタ関数とクラスの組み合わせが不正です";

export class TypeMap {
  private map = new Map<AnyConstructor, any>();

  set(key: AnyConstructor, value: any): void {
    if (key === String && typeof value !== "string") {
      throw new Error(errorMessage);
    } else if (key === Number && typeof value !== "number") {
      throw new Error(errorMessage);
    } else if (key === Boolean && typeof value !== "boolean") {
      throw new Error(errorMessage);
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
