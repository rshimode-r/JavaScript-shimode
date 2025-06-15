// P149 冒頭のコード
let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = Object.create(q);

// oがpのプロトタイプチェーン上に存在するか確認
console.log(o.isPrototypeOf(p)); //true

// oがqのプロトタイプチェーン上に存在するか確認
console.log(o.isPrototypeOf(q)); //true

// pがqのプロトタイプチェーン上に存在するか確認
console.log(p.isPrototypeOf(q)); //true

// `Object`, `Array`, `Date`, `Map` のプロトタイプチェーンの継承関係を確認
const a = new Object();
const b = new Array();
const c = new Date();
const d = new Map();
const checkProtoTypeChainArray = {
  "a = new Object()に関して確認": a,
  "b = new Array()に関して確認": b,
  "c = new Date()に関して確認": c,
  "d = new Map()に関して確認": d,
};

for (const [key, value] of Object.entries(checkProtoTypeChainArray)) {
  console.log("--------------------\n" + key);
  console.log("Object : " + Object.prototype.isPrototypeOf(value));
  console.log("Array : " + Array.prototype.isPrototypeOf(value));
  console.log("Date : " + Date.prototype.isPrototypeOf(value));
  console.log("Map : " + Map.prototype.isPrototypeOf(value));
}

// 結果
// --------------------
// a = new Object()に関して確認
// Object : true
// Array : false
// Date : false
// Map : false
// --------------------
// b = new Array()に関して確認
// Object : true
// Array : true
// Date : false
// Map : false
// --------------------
// c = new Date()に関して確認
// Object : true
// Array : false
// Date : true
// Map : false
// --------------------
// d = new Map()に関して確認
// Object : true
// Array : false
// Date : false
// Map : true
