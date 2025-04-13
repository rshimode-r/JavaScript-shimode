/* eslint-disable */
// for (let i = 0; i < 10; i++) {
//   (function () {
//     let i = 100;
//   })();
//   console.log(i);
// }
// console.log(i);

//コード内の全ての `let` を `var` に変えた場合
//↑のものと同時実行するとホイスティングが生じる
for (var i = 0; i < 10; i++) {
  (function () {
    var i = 100;
  })();
  console.log(i);
}
console.log(i);
