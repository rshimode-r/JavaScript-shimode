## 開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか予想し、結果が一致するか確認しなさい。

予想：  
{ answer: 42 }  
{ answer: 0 }

結果：  
開発者ツールを開いた状態のタブで HTML を開く場合  
{ answer: 42 }  
{ answer: 0 }  
HTML を開いた状態のタブで開発者ツールを開く場合  
Object  
Object

## また、常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。

JSON.stringify()を使用する。  
console.log(life)はオブジェクトの「参照」を出力。対して、console.log(JSON.stringify(life))はオブジェクトをその時点で文字列に変換する  
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
