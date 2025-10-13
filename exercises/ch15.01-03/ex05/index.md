## index1

`<script src="./index1.js" defer="true"></script>`

- deferを使ってスクリプト実行を遅延することで`div#1000`が読み込まれてからスクリプト実行するようにする。
- script タグに defer="true"を付与した。

## index2

- index1と同じようにdeferでも対応可
  // https://developer.mozilla.org/ja/docs/Web/API/Document/DOMContentLoaded_event

```
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("1000").innerHTML = "Hello";
});
```

- js 内の処理を document.addEventListener("domcontentloaded", () => {})で囲んだ。
