let a = 0;
let x = 0;
let y = 0;
const r = 10;

a = Math.PI * r * r;
x = r * Math.cos(Math.PI);
y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);

// let a, x, y;
// const r = 10;

// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

// console.log(a, x, y);
