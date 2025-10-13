export function unwritableAndUnconfigurableObj() {
  const obj = { a: 1 };
  Object.freeze(obj);
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
