## `babel/preset-typescript`と`tsc`の違い

- tsc は構文レベルの変換を行うが、`Promise`などの組み込みAPIの`polyfill`(`Promise`など最近の機能をサポートしていない古いブラウザーで、その機能を使えるようにするためのコード)は追加しない。対して、`babel`はプラグインを利用することで`polyfill`を追加することができる
- `babel/preset-typescript`ではTSの型チェックが実行されない。対して、`tsc`は型のチェックが行われる
  - `tsc`はTypeScript公式のコンパイラである(`babel`のプラグインではない)
  - `babel/preset-typescript`はTSの型情報を削除してJSに変換する
  - そのため、変換速度は`tsc`が型チェックする分遅くなる

## 参考

https://t-yng.jp/post/tsc-and-babel
https://developer.mozilla.org/ja/docs/Glossary/Polyfill
