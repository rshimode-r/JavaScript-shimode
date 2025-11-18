## Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい

【hashchange】

- ブラウザがサーバからindex.htmlを再取得する
- ページリロードすると、入力内容や配列などの JS 状態は初期化される
- ハッシュはサーバーに送らない(URLはハッシュが保存される)

【pushState】

- `Cannot GET /ch15.04-10/ex12/active`とだけ表示される。
- これは、pushStateによってURLが書き換えられているが、そのパスに対応するページはサーバー上に存在しない

## ここまでの例は [serve](https://www.npmjs.com/package/serve) コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

- ブラウザが`/ch15.04-10/ex12/XXX`にアクセスしてきた場合、`/XXX`に寄らず`/ch15.04-10/ex12/index.html`を返すようにする
