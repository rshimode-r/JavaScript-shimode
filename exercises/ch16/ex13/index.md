## 動作確認

`shell.js`を実行した後、以下のコマンドを実行した。

```
tr [:upper:] [:lower:] < input.txt > hello.txt
```

- input.txtの中身

```
HELLO
```

- 生成されたhello.txtの中身

```
hello
```

## 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？

- dirやfindstrは実行ファイルではなくcmd.exeの内部コマンドなので、本処理はspawnにより実行ファイルを起動するため、内部コマンドを実施できない。cmd/cを実行してcmd.exeを実行し、その内部コマンドを実行する必要があるから。
