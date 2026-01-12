## 拡張されたファイルの内容をバイナリエディタ(Stirling や VSCode の HexEditor 拡張機能等)で確認しなさい。

- 元のファイル

```
abcde
```

- `fs.truncate()` を利用してファイルを拡張した後

![](./hex.png)

ASCII の"0"ではなく、バイト値 0x00 が書き込まれている。
