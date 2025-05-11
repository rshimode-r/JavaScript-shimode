### 出力の予想

実行予想: `false`

return文で処理がtryブロックから移動する場合は、処理が移動する前にfinallyブロックが実行される。
finally節でreturn文を使うと、呼び出し元に正常に戻る

### 実際の出力

`false`
