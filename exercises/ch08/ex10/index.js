export function addMyCall(f) {
  f.myCall = function (thisArg, ...args) {
    // thisArgでバインドした関数に対してargsの引数で実行した結果を返す。
    // this.bindの方が汎用性が高い
    return this.bind(thisArg)(...args);
  };
}
