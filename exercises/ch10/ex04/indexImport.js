import { sum, Hello as Hi } from "./indexExport.js";
import { square } from "./indexExport2.js";

console.log(sum(2, 3));
console.log(square(4));

const greeter = new Hi();
greeter.sayHi();
