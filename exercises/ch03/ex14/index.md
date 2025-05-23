### 【コードを実行するとどのように表示されるか予想】

**予想：**  
for文の中は 0, 1, 2, ... と順に表示され、for文の外の出力は `i` が無いためエラーが起きる？

**理由：**  
0  
1  
2  
3  
4  
5  
6  
7  
8  
9  
file:///workspaces/exercises-public/exercises/ch03/ex14/index.js:8
console.log(i);
^
ReferenceError: i is not defined

### 【なぜそのような実行結果になったのか】

- `for (let i = 0; i < 10; i++)` で宣言されている `i` はforループの中でのみ有効なブロックスコープの変数である。
- 無名関数内の `let i = 100;` も関数内でのみ有効であり、ループの外で参照されない。
- 最後の `console.log(i);` は参照できる `i` が存在しないためエラーとなる。

---

### 【コード内の全ての `let` を `var` に変えた場合の結果と理由】

**結果：**  
0  
1  
2  
3  
4  
5  
6  
7  
8  
9  
10

**理由：**

- `var` で変数を宣言した場合、その変数は関数スコープとなり、ブロック内だけに閉じない。
- `for (var i = 0; i < 10; i++)` の `i` はループ外でも有効なので、ループ後の `console.log(i)` は `10` を出力する。
- 無名関数内で `var i = 100;` としても、それは関数スコープ内の別の `i` であり、外側の `i` に影響を与えない。

参考：https://qiita.com/katsukii/items/cfe9fd968ba0db603b1e

---

### 【すべての `let` を消した場合の結果と理由】

**結果：**  
100  
101

**理由：**

- 非 strict モードでは、宣言されていない名前で代入を行った場合、グローバル変数として定義される。
- `for (i = 0; i < 10; i++)` の時点で、`i` はグローバル変数として自動生成される。
- 無名関数内で `i = 100` と代入され、1回目のループ内で `100` が表示される。
- その後 `i++` により `i = 101` となり、`i < 10` の条件を満たさなくなってループ終了。
- 最後の `console.log(i)` は `101` を出力する。
