export function makeFibWhile() {
  let fib = [1, 1];
  while (fib.length < 10) {
    fib[fib.length] = fib[fib.length - 1] + fib[fib.length - 2];
  }
  return fib;
}

export function makeFibDoWhile() {
  let fib = [1, 1];
  do {
    fib[fib.length] = fib[fib.length - 1] + fib[fib.length - 2];
  } while (fib.length < 10);
  return fib;
}

export function makeFibFor() {
  let fib = [1, 1];
  for (
    ;
    fib.length < 10;
    fib[fib.length] = fib[fib.length - 1] + fib[fib.length - 2]
  );
  return fib;
}
