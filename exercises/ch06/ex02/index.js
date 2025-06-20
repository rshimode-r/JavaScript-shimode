const objectLiteral = { x: 0, y: 2 };
const createObject = Object.create(objectLiteral);

console.log(createObject);
// ↑の出力  : {}
console.log(Object.getPrototypeOf(createObject));
// ↑の出力  : { x: 0, y: 2 }
console.log(objectLiteral === Object.getPrototypeOf(createObject));
// true
