### 出力の予想

実行予想: `5`

ループ内でxにiが代入された後、tryブロックに入り、例外がスローされる。  
例外がスローされると、catchブロックに入りbreakが実行される前にfinallyブロックに移動する。(実行される前で合ってる、breakが実行されると終わってしまう)  
finallyブロックではcontinueが実行されfor文でインクリメントが実行→式の評価を行い再度ループが実行される。`i=6,x=5`の状態でforループが終了する。

### 実際の出力

`5`
