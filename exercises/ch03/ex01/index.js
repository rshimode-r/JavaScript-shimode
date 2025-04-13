const inf = Infinity;
const ninf = -Infinity;
const nan = NaN;
const values = [inf, ninf, nan];
const operator = ["+", "-", "*", "/"];

// 式を作る関数expression
function expression(a, b) {
  let output = "";
  for (const ope of operator)
    output += a + " " + ope + " " + b + " = " + calculate(a, b, ope) + "\n";
  return output;
}

//計算する関数
function calculate(a, b, ope) {
  switch (ope) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

// 結果を表示
for (const value1 of values) {
  for (const value2 of values) {
    console.log(expression(value1, value2));
  }
}
