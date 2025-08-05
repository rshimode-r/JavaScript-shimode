## 任意の長さの文字列に対しての判定を行う正規表現を書きなさい

PHPのPCREやPerlの正規表現、Pythonのregexモジュールで使える`(?R)`を使うことで再帰呼び出しを扱うことができる(JavaScriptは非対応)

```
^\((?:[^()]++|(?R))*\)$
```

(参考)https://www.php.net/manual/ja/regexp.reference.recursive.php

## JavaScriptでも

繰り返す回数が決まっていれば書ける  
1回 : `^\([^()]*\)$`  
2回 : `^\(([^()]*|\([^()]*\))*\)$`
