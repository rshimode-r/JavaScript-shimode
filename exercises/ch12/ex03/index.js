export function* Counter() {
  let count = 1;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      count = 0;
    }
  }
}
