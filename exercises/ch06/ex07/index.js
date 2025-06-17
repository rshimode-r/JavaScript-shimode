export function assign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (typeof target !== "object") target = Object(target);

  for (const source of sources) {
    if (source === null || typeof source !== "object") continue;
    // p155 ownKeysは全てのプロパティ名の配列を返す
    const keys = Reflect.ownKeys(source);
    for (const key of keys) {
      // (参照)https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor && descriptor.enumerable) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
