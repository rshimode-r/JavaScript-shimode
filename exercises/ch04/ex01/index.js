export function add(x, y) {
  return { re: x.re + y.re, im: x.im + y.im };
}
export function sub(x, y) {
  return { re: x.re - y.re, im: x.im - y.im };
}
export function mul(x, y) {
  return { re: x.re * y.re - x.im * y.im, im: x.re * y.im + x.im * y.re };
}
export function div(x, y) {
  const tmp = { re: y.re, im: -y.im };
  x = mul(x, tmp);
  y = mul(y, tmp);
  console.log(x);
  return { re: x.re / y.re, im: x.im / y.re };
}
