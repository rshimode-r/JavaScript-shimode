## 手順

- `module/index.js`と`page/index.html`を用意
  index.htmlで動的インポートを実施

```
const module = await import("http://localhost:8080/index.js");
```

- moduleとpageでそれぞれ別ポート（今回は8080 と 8000）でサーバーを立てる。

```
cd module
(npm install -g http-server)//http-serverをインストールした
http-server . -p 8080 --cors

---
cd page
npx serve -l 8000
```

- ブラウザで動作確認ボタンを押すとコンソールに`こんにちは`が出力されている。

## CORS(p.464)

- `--cors` をつけると サーバーがレスポンスに Access-Control-Allow-Origin: \* ヘッダーを追加
