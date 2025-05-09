export function eq(a, b) {
  // TODO: ここを実装しなさい
  if (a instanceof Date && typeof b !== "object") a = a.toString();
  if (typeof a !== "object" && b instanceof Date) b = b.toString();
  if (
    (typeof a === "object" || typeof a === "function") &&
    typeof b !== "object" &&
    a !== null
  ) {
    if (typeof a.valueOf() !== "object" || a.valueOf() === null) {
      a = a.valueOf();
    } else {
      a = a.toString();
    }
  }
  if (
    typeof a !== "object" &&
    (typeof b === "object" || typeof b === "function") &&
    b !== null
  ) {
    if (typeof b.valueOf() !== "object" || b.valueOf() === null) {
      b = b.valueOf();
    } else {
      b = b.toString();
    }
  }
  if (a === b) return true;
  if (
    (typeof a === "object" || typeof b === "object") &&
    a !== null &&
    b !== null
  )
    return false;
  if (a === null || a === undefined || b === null || b === undefined) {
    if ((a === null || a === undefined) && (b === null || b === undefined))
      return true;
    return false;
  }
  if (Number(a) === Number(b)) return true;
  return false;
}

export function lte(a, b) {
  // TODO: ここを実装しなさい
  if (
    (typeof a === "object" || typeof a === "function") &&
    typeof b !== "object" &&
    a !== null
  ) {
    if (typeof a.valueOf() !== "object" || a.valueOf() === null) {
      a = a.valueOf();
    } else {
      a = a.toString();
    }
  }
  if (
    typeof a !== "object" &&
    (typeof b === "object" || typeof b === "function") &&
    b !== null
  ) {
    if (typeof b.valueOf() !== "object" || b.valueOf() === null) {
      b = b.valueOf();
    } else {
      b = b.toString();
    }
  }
  if (typeof a === "string" && typeof b === "number") a = Number(a);
  if (typeof a === "number" && typeof b === "string") b = Number(b);
  if (a === null) a = 0;
  if (b === null) b = 0;
  if (a === true) a = 1;
  if (b === true) b = 1;
  if (a < b || a === b) return true;
  return false;
}
