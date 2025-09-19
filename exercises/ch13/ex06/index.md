## jQuery Deferred について調べたこと

- jQueryで用意されている関数（jQuery 1.5 で導入された）
- jQuery Deferred は jQuery 独自の非同期処理管理オブジェクトで、Promise と似た仕組みを持っている。
- ES6以前の動作環境ではコールバックをネストして書くか、`jQuery Deferred`を使用する必要がある。(Promiseが使えない)
- 引数の関数を、Deferredオブジェクトが「解決」されたときに呼び出す関数に追加する`deferred.done()`や引数の関数を、Deferredオブジェクトが「拒否」されたときに呼び出す関数に追加する`deferred.fail()`がある。
  finalyに相当するalwaysもある。

## 参考

https://qiita.com/fakefurcoronet/items/cb2d2eba1a2e39f6643d
https://qiita.com/saematsu/items/41f5ab53aeaf57a3ed55
https://qiita.com/atti/items/17fd8b11305a5375a1de
