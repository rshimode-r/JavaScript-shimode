// Generator<yieldで返す値、never→無限ループ、.next(value) で渡される値>
// .throw()があるならGeneratorが良い
export function* Counter(): Generator<number, never, unknown> {
  let count = 1;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      if (e === "reset") {
        count = 1;
      } else {
        throw e;
      }
    }
  }
}
