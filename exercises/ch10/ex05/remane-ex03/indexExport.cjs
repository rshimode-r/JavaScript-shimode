const renameSum = (x, y) => x + y;
const square = (x) => x * x;

class RenameHello {
  sayHi() {
    console.log("こんにちは！");
  }
}

module.exports = { sum: renameSum, square, Hello: RenameHello };
