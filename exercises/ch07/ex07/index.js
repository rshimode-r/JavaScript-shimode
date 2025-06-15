export function sort(
  array,
  compare = function (a, b) {
    if (String(a) < String(b)) return -1;
    if (String(a) > String(b)) return 1;
    return 0;
  }
) {
  //バブルソート
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}
