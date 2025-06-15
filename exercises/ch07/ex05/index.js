export function push(array, ...item) {
  return [...array, ...item];
}

export function pop(array) {
  return array.slice(0, -1);
}

export function unshift(array, ...item) {
  return [...item, ...array];
}

export function sort(
  array,
  compare = function (a, b) {
    if (String(a) < String(b)) return -1;
    if (String(a) > String(b)) return 1;
    return 0;
  }
) {
  const result = [...array];
  //バブルソート
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (compare(result[j], result[j + 1]) > 0) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}
