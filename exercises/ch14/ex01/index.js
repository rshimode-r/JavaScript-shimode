export function unwritableAndUnconfigurableObj() {
  const obj = { a: 1 };
  Object.freeze(obj); //拡張不可、プロパティ再定義不可、オブジェクトの独自プロパティを読み出し専用にする
  return obj;
}

export function writableAndUnconfigurableObj() {
  const obj = { b: 2 };
  Object.seal(obj); //sealは書き込み可能なプロパティの値は変更できる。
  return obj;
}

export function nestedUnwritableObj() {
  const obj = { c: { d: { e: 3 } } };

  // freezeはプロパティの値に対してまで影響が無いため再帰的に実行する。
  function deepFreeze(obj) {
    for (const val of Object.values(obj)) {
      if (val && typeof val === "object") {
        deepFreeze(val);
      }
    }
    return Object.freeze(obj);
  }

  return deepFreeze(obj);
}
