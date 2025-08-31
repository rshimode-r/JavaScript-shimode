export function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
// 0, 1, 2, 3 秒待つ
export const wait0 = () => wait(0);
export const wait1 = () => wait(1000);
export const wait2 = () => wait(2000);
export const wait3 = () => wait(3000);

// ログ出力
export const log = (v) => console.log(v);
export const logA = (v) => console.log("A");
export const logB = (v) => console.log("B");
export const logC = (v) => console.log("C");

// 例外
export const errX = () => {
  throw new Error("X");
};
export const errY = () => {
  throw new Error("Y");
};
