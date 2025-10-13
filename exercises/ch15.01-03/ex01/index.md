## index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

`type="module"`を外すとブラウザはファイルをESモジュールとして扱わない。そのためDOMがまだ生成されていないタイミングで実行される(deferされていない)ことで期待通りに動作しない。

そのためscriptタグにdeferを追加し、DOM が完全に構築された後にスクリプトを実行できるようにすると期待通りに動作する。

```
<script defer src="index.js"></script>
```
