### 過去に`void 0`が用いられた理由

グローバルオブジェクトのundefinedプロパティは ECMAScript3までは書き込み可であったため、undefiendがundefinedを参照していると限らない。  
そのため、確実にundefinedを返すvoid演算子が用いられていた。  
現在は(ECMAScript5から)undefiendは読み取り専用なため、確実にundefinedを参照するといえる。

### 現在`void 0` が用いられない理由

現在`void 0`が使われない理由としては、①undefiendが読み取り専用となり安全に使用できる。②可読性が高い等が考えられる。

### 参照ページ

〇参照 https://qiita.com/cyakarin/items/57a6dc06cdb315e31b01 (JavaScript の undefined と void 0 と)
