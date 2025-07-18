export function any(...funcs) {
  if (funcs.some((fn) => typeof fn !== "function")) {
    throw new Error("関数以外の引数をサポートしておりません");
  }
  return function (value) {
    // applyでthisを渡す方が良い
    return funcs.some((func) => func(value));
  };
}

export function catching(func1, func2) {
  if (typeof func1 !== "function" || typeof func2 !== "function") {
    throw new Error("関数以外の引数をサポートしておりません");
  }
  return function (value) {
    try {
      return func1(value);
    } catch (e) {
      return func2(e);
    }
  };
}
