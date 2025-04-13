//Symbol
const name1 = Symbol("abcd");
const name2 = Symbol("abcd");
const o = {};
o[name1] = 123;
o[name2] = 456;
console.log("o[name1] is " + o[name1] + ", o[name2] is " + o[name2]);

//Symbol.for
const name3 = Symbol.for("abcd");
const name4 = Symbol.for("abcd");
o[name3] = 123;
o[name4] = 456;
console.log("o[name3] is " + o[name3] + ", o[name4] is " + o[name4]);

//String
const name5 = "abcd";
const name6 = "abcd";
o[name5] = 123;
o[name6] = 456;
console.log("o[name5] is " + o[name5] + ", o[name6] is " + o[name6]);
