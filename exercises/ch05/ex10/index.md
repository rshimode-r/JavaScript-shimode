## console.log`の出力および`with` 文を使わずに同じ処理を書く場合にどのような文になるか

### 1ブロック目

console.log の出力: { a: 1, b: 2, obj: { a: 4, b: 4 }}  
with 文を使わずに同じ処理を書く場合: obj.a = obj.b

### 2ブロック目

console.log の出力: { a: 4, b: 2, obj: { b: 4 } }  
with 文を使わずに同じ処理を書く場合: a = obj.b;

### 3ブロック目

console.log の出力: { a: 1, b: 2, obj: { a: 2 } }  
with 文を使わずに同じ処理を書く場合: obj.a = b;

### 4ブロック目

console.log の出力: { a: 2, b: 2, obj: {} }  
with 文を使わずに同じ処理を書く場合: a = b;
