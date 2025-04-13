[出力]  
0 1 0  
1 1 0

後置演算子として使う場合は、式と同じ行に記述する必要がある。

【以下のコードと同様の挙動】  
let a = 0,  
 b = 0;

const c = a;  
++b;

console.log(a, b, c);

const e = a++;  
b;

console.log(a, b, e);
