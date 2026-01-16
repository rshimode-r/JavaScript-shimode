(参考)https://sc.megabank.tohoku.ac.jp/ph3-doc/howto/linux/shell-io.html

## 標準入力（stdin）

- プログラムが使うデータを受け取るための読み込み元(例:キーボード)

## 標準出力（stdout）

- プログラムが使うデータの出力先

## 標準エラー出力（stderr）

- プログラムが使うデータのうち、エラーの出力先
- 例えば、標準出力がファイルに向いていても、標準エラー出力がディスプレイに接続されていれば、ユーザーはエラーに気づくことができる。

## リダイレクト

- 標準入出力を特定のファイルに向ける仕組み

(例)

```
cat > hello.txt
cat < hello.txt
cat < hello.txt > hello2.txt
cat < hello.txt >> hello2.txt
```

## パイプ

- 複数のコマンドを連携させることにより、複雑な処理を容易に実現できるようにする
- あるコマンドの標準出力を、次のコマンドの標準入力とつなぐ

```
cat hello.txt | node app.js
cat の stdout → node app.js の stdin
```

# 2. 以下のコードを `cat.mjs` というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

### `node cat.mjs`

- 標準入力を標準出力に出力する結果となる

```
$ node cat.mjs
aaa
aaa
```

### `echo FOO | node cat.mjs`

- パイプで`"FOO"`をcat.mjsに標準入力として渡すことになるので、FOOと表示される。

### `node cat.mjs > output.txt`

- cat.mjsの標準出力が output.txt にリダイレクトされる
- 以下の場合、output.txtを確認すると`ariga~`が記載されている

```
node cat.mjs > output.txt
arigatou
sayounara
```

### `node cat.mjs file`

- input.txtが直接cat.mjsにインプットされる。input.txtの中身がそのままコンソール出力される

```
node cat.mjs input.txt
JavaScript
```

### `node cat.mjs file > output.txt`

- 前述した`node cat.mjs file`の標準出力がoutput.txtにリダイレクトされる

### `node cat.mjs invalid-file > output.txt`

- `process.argv[2]`に存在しないファイルが指定されているため、エラーが生じる。
- このエラーは標準エラー出力に送られるので、output.txtにリダイレクトされない。

```
node cat.mjs invalid-file > output.txt
node:events:496
      throw er; // Unhandled 'error' event
      ^

Error: ENOENT: no such file or directory, open 'invalid-file'
Emitted 'error' event on ReadStream instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'invalid-file'
}

Node.js v22.16.0
```

### `node cat.mjs invalid-file 2> error.txt`

- 前述したとおり、存在しないファイルが指定されたことでエラーが生じ、標準エラー出力がerror.txtにリダイレクトされる。

- ファイルディスクリプタ2
