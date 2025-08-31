function* integers(start: number = 2): IterableIterator<number> {
  let i = start;
  while (true) {
    yield i++;
  }
}

function filter<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean
): IterableIterator<T> {
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T> {
      while (true) {
        const v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

export function primes(): IterableIterator<number> {
  function* gen(stream: IterableIterator<number>): IterableIterator<number> {
    const prime = stream.next().value;
    yield prime;

    const filtered = filter(stream, (n) => n % prime !== 0); //primeの倍数を省く
    yield* gen(filtered); //再帰
  }

  return gen(integers()); //最初は2からの整数列を返すジェネレータ
}
