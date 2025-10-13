const q1 = document.querySelectorAll("nav a");
q1.forEach((link) => {
  console.log(`問1 : nav 要素内のリンク: ${link.textContent}`);
});
// 問1 : nav 要素内のリンク: ホーム
// 問1 : nav 要素内のリンク: 商品一覧
// 問1 : nav 要素内のリンク: お問い合わせ
// 問1 : nav 要素内のリンク: 会社情報

const q2 = document.querySelector(".product-list .product-item");
console.log("問2 : 商品名:", q2.querySelector("h3").textContent);
// 問2 : 商品名: 商品1

const q3 = document.querySelector(".cart img");
console.log("問3 : src:", q3.src);
console.log("問3 : alt:", q3.alt);
// 問3 : src: http://127.0.0.1:5500/exercises/ch15.01-03/ex13/30
// 問3 : alt: カート

const q4 = document.querySelectorAll(".product-list .price");
q4.forEach((link) => {
  console.log("問4 : ", link.textContent);
});
// 問4 :  ¥12,000
// 問4 :  ¥25,000
// 問4 :  ¥8,000
// 問4 :  ¥15,000

const q5 = document.querySelectorAll(".product-list .product-item img");
q5.forEach((img) => {
  console.log("問5 :", img.src);
});
// 問5 : http://127.0.0.1:5500/exercises/ch15.01-03/ex13/200が4回出力

const q6 = document.querySelector(".search-bar button");
console.log("問6 :", q6.textContent);
// 問6 : 検索

const q7 = document.querySelector("footer p");
console.log("問7 :", q7.textContent);
// 問7 : © 2024 家電オンラインショップ. All rights reserved.

const q8 = document.querySelectorAll(".product-list .product-item");
q8.forEach((item, index) => {
  if ((index + 1) % 2 === 0) {
    console.log(`問8 : ${item.textContent}`);
  }
});
// 問8 : 商品2
//           最新モデルの家電です。
//           ¥25,000
//           カートに追加
// 問8 : 商品4
//           耐久性のある家電製品。
//           ¥15,000
//           カートに追加

const q9 = document.querySelector("header .account img");
console.log("問9 : src =", q9.src);
console.log("問9 : alt =", q9.alt);
// 問9 : src = http://127.0.0.1:5500/exercises/ch15.01-03/ex13/30
// 問9 : alt = アカウント

const q10 = document.querySelectorAll("nav a");
const about = Array.from(q10).find((link) => link.textContent === "会社情報");
console.log("問10 :", about.href);
// 問10 : http://127.0.0.1:5500/exercises/ch15.01-03/ex13/index.html#about
