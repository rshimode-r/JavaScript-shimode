## 試したコード

```
console.log("前");
import "./export.js";
import "./export.js";
import "./export.js";
console.log("後");
```

## 予想

```
export.js is executed
前
後
```

## 結果

```
export.js is executed
前
後
```

### import文の前後やimport先のコードの実行順序はどうなるか

- インポートは先頭に巻き上げられる。そのため、記述した位置に依らず最初に実行される。
- 最初にインポートされたときに実行され、その後2回目以降は実行されない。
