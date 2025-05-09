### Node で debugger 文を使ってデバッグする方法を調べなさい。

実行を停止させたい箇所にdebugger文を入れる。  
`node inspect myscript.js`でスクリプトを実行する。  
debugger文で指定された最初のブレークポイントまで実行される。

以下、操作コマンド

- cont, c: 実行を続行
- next、n：次のステップ
- step、s：ステップイン
- out、o：ステップアウト
- pause: 実行中のコードを一時停止します（開発者ツールの一時停止ボタンと同様

〇参照  
https://nodejs.org/api/debugger.html (Node.js v23.11.0 ドキュメント)
