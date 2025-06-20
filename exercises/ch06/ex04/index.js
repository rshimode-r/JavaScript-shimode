let object1 = {};

Object.defineProperty(object1, "allTrue", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(object1, "writableFalse", {
  value: 2,
  writable: false,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(object1, "enumerableFalse", {
  value: 3,
  writable: true,
  enumerable: false,
  configurable: true,
});

Object.defineProperty(object1, "configurableFalse", {
  value: 4,
  writable: true,
  enumerable: true,
  configurable: false,
});

//hasOwnProperty
console.log(object1.hasOwnProperty("allTrue")); //true
console.log(object1.hasOwnProperty("writableFalse")); //true
console.log(object1.hasOwnProperty("enumerableFalse")); //true
console.log(object1.hasOwnProperty("configurableFalse")); //true

//propertyIsEnumerable
console.log(object1.propertyIsEnumerable("allTrue")); //true
console.log(object1.propertyIsEnumerable("writableFalse")); //true
console.log(object1.propertyIsEnumerable("enumerableFalse")); //false
console.log(object1.propertyIsEnumerable("configurableFalse")); //true

//プロパティの変更
object1.allTrue = 100;
//object1.writableFalse = 100;//エラー出る
object1.enumerableFalse = 100;
object1.configurableFalse = 100;
console.log(object1);
// {
//     allTrue: 100,
//     writableFalse: 2,
//     configurableFalse: 100,
//   }

//プロパティの削除
delete object1.allTrue;
delete object1.writableFalse;
delete object1.enumerableFalse;
//delete object1.configurableFalse; //エラー出る
console.log(object1);
//{ enumerableFalse: 100 }
