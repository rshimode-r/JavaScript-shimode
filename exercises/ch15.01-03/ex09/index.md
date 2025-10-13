## Reactを使っていればどのように XSS 対策がされるか

- JSX内の式埋め込みでは、基本的にHTMLとして解釈されないようエスケープされる。`例 : {userInputText1}`
- ユーザーからの入力や外部データに `<script>` や `<img onerror=...>` のようなタグがあっても、タグとして認識されず、テキストとしてそのまま表示される。

## Reactを使っていてもどのような XSS の危険が残るか

- しかし、`dangerouslySetInnerHTML`を利用するとHTMLとして認識されてしまうため、上記のXSSの対策が無効化されてしまう。なので使わないほうが良い。

(参考)https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de
