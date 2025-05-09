// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
// set42("while(true)console.log('ありがとう');hello");
set42("while(true)console.log('ありがとう');hello");
console.log(hello); // 42
