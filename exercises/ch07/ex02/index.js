function fizzbuzz(n) {
  let array = Array(n).fill(0);
  array = array.map((_, index) => index + 1);
  array
    .map((i) => (i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz"))
    .forEach((x) => console.log(x));
}

function sumOfSquaredDifference(f, g) {
  return f
    .map((fValue, fIndex) => (fValue - g[fIndex]) ** 2)
    .reduce((sum, sqdiff) => sum + sqdiff, 0);
}

function sumOfEvensIsLargerThan42(array) {
  const sum = array
    .filter((x) => x % 2 === 0)
    .reduce((sum, evenNum) => sum + evenNum, 0);

  return sum >= 42;
}
