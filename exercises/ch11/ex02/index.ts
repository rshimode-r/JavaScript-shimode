// f はオブジェクトを1つ引数に取る関数
export function cache(f: (obj: object) => number): (obj: object) => number {
  // キャッシュがガベージコレクションの対象になるように実装
  const weakMap = new WeakMap<object, any>();

  return function cachedSlowFn(obj: object): any {
    if (weakMap.has(obj)) {
      return weakMap.get(obj);
    }

    const result = f(obj);
    weakMap.set(obj, result);
    return result;
  };
}
function slowFn(obj: object): number {
  // 時間のかかる処理(という設定)
  if ("id" in obj && typeof obj.id === "number") {
    return (obj as any).id * 2;
  }
  return 0;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
