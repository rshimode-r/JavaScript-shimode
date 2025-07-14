## 結果の予想

`false true`  
`true false`

## 実行結果

`false true`  
`true false`

## 説明

nmはfunctionキーワードで定義されており、arrowはアロー関数で定義されている。  
アロー関数以外の入れ子型の関数は外側のthisの値を継承しないため、nest.nm()ではthisキーワードでnestが参照される。  
アロー関数の場合、thisの値を継承するためomを呼び出したobjがthisキーワードで参照される。
