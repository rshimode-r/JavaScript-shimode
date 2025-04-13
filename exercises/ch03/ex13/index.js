export function eq(a, b) {
  // TODO: ここを実装しなさい
  if (a === b) return true;
  if (a === null || a === undefined || b === null || b === undefined) {
    if ((a === null || a === undefined) && (b === null || b === undefined))
      return true;
    return false;
  }
  // 文字列と Date の比較
  if (a instanceof Date && typeof b === "string") {
    return a.valueOf() === new Date(b).valueOf();
  }
  if (typeof a === "string" && b instanceof Date) {
    return new Date(a).valueOf() === b.valueOf();
  }
  if (a instanceof Date || b instanceof Date) {
    return false;
  }
  if (typeof a === "object" && typeof b === "object") return false;
  if (Number(a) === Number(b)) return true;
  return false;
}

export function lte(a, b) {
  // TODO: ここを実装しなさい
  if (a === null) a = 0;
  if (b === null) b = 0;
  if (a === true) a = 1;
  if (b === true) b = 1;
  if (Number(a) < Number(b) || Number(a) === Number(b)) return true;
  if (a < b || a === b) return true;

  return false;
}
