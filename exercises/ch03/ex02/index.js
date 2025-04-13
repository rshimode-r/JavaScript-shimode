console.log("整数の最大値 : " + Number.MAX_SAFE_INTEGER);
console.log("整数の最小値 : " + Number.MIN_SAFE_INTEGER);

const maxAddOne = Number.MAX_SAFE_INTEGER + 1;
const maxAddTwo = Number.MAX_SAFE_INTEGER + 2;
console.log("最大値 + 1 : " + maxAddOne);
console.log("最大値 + 2 : " + maxAddTwo);
console.log("最大値 + 1 === 最大値 + 2 → " + (maxAddOne === maxAddTwo));
//最大値+1 と最大値+2 を `===` で比較した結果をコンソールに出力し、そのように出力される理由を簡潔に文章で記載しなさい。

// Number.MAX_SAFE_INTEGER 定数は、JavaScript における安全な整数の最大値 (253 – 1) を表す。
// そのため、整数の制度が失われて最大値+1 と最大値+2 が同値となっている。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
