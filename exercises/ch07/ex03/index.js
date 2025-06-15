// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
export function sum(array = []) {
  return array.reduce((sum, value) => sum + value, 0);
}

export function join(array, separator = ",") {
  if (!Array.isArray(array)) {
    throw new Error("配列を渡してください");
  }

  //明示的にStringにしておかないと数値の加算になる
  return array.reduce((str, value, i) => {
    return i === 0
      ? String(value ?? "")
      : str + separator + String(value ?? "");
  }, "");
}

export function reverse(array) {
  if (!Array.isArray(array)) {
    throw new Error("配列を渡してください");
  }
  return array.reduce((acc, val) => [val, ...acc], []);
}

export function every(array, fnc) {
  return array.reduce(
    (result, value, index, arr) =>
      fnc(value, index, arr) && result ? true : false,
    true
  );
}
export function some(array, fnc) {
  return array.reduce(
    (result, value, index, arr) =>
      fnc(value, index, arr) || result ? true : false,
    false
  );
}
