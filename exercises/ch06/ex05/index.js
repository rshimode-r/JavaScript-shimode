const protoObj = { 1: "proto", abc: "proto", enumerable: "proto" };
const newObj = Object.create(protoObj);
Object.defineProperty(newObj, 1, {
  value: "new",
  enumerable: true,
});

Object.defineProperty(newObj, 2, {
  value: "new",
  enumerable: true,
});

Object.defineProperty(newObj, "abc", {
  value: "new",
  enumerable: true,
});
Object.defineProperty(newObj, "def", {
  value: "new",
  enumerable: true,
});
Object.defineProperty(newObj, "enumerable", {
  value: "new",
  enumerable: false,
});
for (const key in newObj) console.log(key + " : " + newObj[key]);

// 出力
// 1 : new
// 2 : new
// abc : new
// def : new
