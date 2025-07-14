const args = [];
const args2 = [];

function call() {
  args.push(Array.from(arguments));
}

function notArgumentsCall(...array) {
  args2.push(Array.from(array));
}

call(1, 2, 3);
call("A", "B");
notArgumentsCall(1, 2, 3);
notArgumentsCall("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]

console.log(args2[0]); // [1, 2, 3]
console.log(args2[1]); // ["A", "B"]
