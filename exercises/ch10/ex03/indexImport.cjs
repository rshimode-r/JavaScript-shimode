const { sum, square, Hello } = require("./indexExport.cjs");

console.log(sum(2, 3));
console.log(square(4));

const greeter = new Hello();
greeter.sayHi();
