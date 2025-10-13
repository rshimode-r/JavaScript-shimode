Live Serverを使って表示しているため、設問の意図と異なる結果になっているかもしれない。  
本来なら2のasync="true"ではHelloが表示されないのではないかと思う。

## index1

0. オリジナル

- 560 ms
- Helloの表示 : ×
- DOMが構築される前に、scriptが実行されるためHelloが表示されない。(id=1000が存在しない)

1. script タグに async="true"を付与

- 657 ms
- Helloの表示 : 〇
- スクリプトのダウンロードはHTMLのパースと同時実行され、ダウンロード後にスクリプトが即実行される。環境によるが、今回はHTMLパースよりダウンロードが長かったのかHelloが表示された。

2. script タグに defer="true"を付与

- 659 ms
- Helloの表示 : 〇
- スクリプトのダウンロードはHTMLのパースと同時実行されるが、DOMが構築された後にスクリプトが実行されるためHelloが表示される。

3. js 内の処理を document.addEventListener("domcontentloaded", () => {})で囲む

- 562 ms
- Helloの表示 : 〇
- DOMの構築を待ってからスクリプトが実行されるためHelloは表示される。

4. js 内の処理を window.addEventListener("load", () => {})で囲む

- 590 ms
- Helloの表示 : 〇
- すべてのリソース読み込み後に実行される。よってid=1000が存在する状態でスクリプトが実行されるためHelloが表示される。

## index2

0. オリジナル

- 405 ms
- Helloの表示 : ×
- DOMが構築される前に、scriptが実行されるためHelloが表示されない。(id=1000が存在しない)

1. script タグに async="true"を付与

- 396 ms
- Helloの表示 : 〇
- スクリプトのダウンロードはHTMLのパースと同時実行され、ダウンロード後にスクリプトが即実行される。環境によるが、今回はHTMLパースよりダウンロードが長かったのかHelloが表示された。

2. script タグに defer="true"を付与

- 375 ms
- Helloの表示 : 〇
- スクリプトのダウンロードはHTMLのパースと同時実行されるが、DOMが構築された後にスクリプトが実行されるためHelloが表示される。

3. js 内の処理を document.addEventListener("domcontentloaded", () => {})で囲む

- 読み込み: 419 ms
- Helloの表示 : 〇
- DOMの構築を待ってからスクリプトが実行されるためHelloは表示される。

4. js 内の処理を window.addEventListener("load", () => {})で囲む

- 401 ms
- Helloの表示 : 〇
- すべてのリソース読み込み後に実行される。よってid=1000が存在する状態でスクリプトが実行されるためHelloが表示される。
