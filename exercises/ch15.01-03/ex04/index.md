## グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。

### ブラウザ内

- Window.window (https://developer.mozilla.org/ja/docs/Web/API/Window/window)
- Window.self (https://developer.mozilla.org/ja/docs/Web/API/Window/self)
- Window.frames (https://developer.mozilla.org/ja/docs/Web/API/Window/frames)

### node内

- global (https://nodejs.org/api/globals.html#globals_global)

### ブラウザnode問わず

- globalThis (https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

## ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。

```
node
>typeof メソッド名　-> undefiend　で確認した。
```

| 機能名                           | リンク                                                                     |
| -------------------------------- | -------------------------------------------------------------------------- |
| `window.alert()` 。              | https://developer.mozilla.org/ja/docs/Web/API/Window/alert                 |
| `window.confirm()`               | https://developer.mozilla.org/ja/docs/Web/API/Window/confirm               |
| `window.prompt()`                | https://developer.mozilla.org/ja/docs/Web/API/Window/prompt                |
| `window.document`                | https://developer.mozilla.org/ja/docs/Web/API/Document                     |
| `window.location`                | https://developer.mozilla.org/ja/docs/Web/API/Location                     |
| `window.history`                 | https://developer.mozilla.org/ja/docs/Web/API/History                      |
| `window.localStorage`            | https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage          |
| `window.sessionStorage`          | https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage        |
| `window.requestAnimationFrame()` | https://developer.mozilla.org/ja/docs/Web/API/window/requestAnimationFrame |
| `window.screen`                  | https://developer.mozilla.org/ja/docs/Web/API/Screen                       |

## グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

- [undefined](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- 古いブラウザーを除くすべてのブラウザーでは、 undefined は、設定不可、書込不可のプロパティとなっているが、かつてはundefined は代入可能なグローバルオブジェクトのプロパティだった。
- 実装に寄っては undefined に別の値が代入されることがあり得るという問題が発生していた。

- (参考)https://zenn.dev/lollipop_onl/articles/eoz-using-undef-on-js
