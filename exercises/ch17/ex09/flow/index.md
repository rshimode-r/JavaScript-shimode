## 動作確認

### 型エラーの場合

型定義に違反するコードを追加

```
const badUser = {
  id: "文字列",
  name: 123,
};
```

`npm run flow`を実行(そもそもIDE側で警告はあったが)

```
node ➜ /workspaces/exercises-public/exercises/ch17 (main) $ npm run flow

> ch17@1.0.0 flow
> flow

Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ex09/flow/task.js:74:7

Cannot assign object literal to badUser because in property id: string [1] is incompatible with number [2].
[incompatible-type]

 [2]  4│   id: number,
       :
     71│   return (arg: A) => !f(arg);
     72│ }
     73│ const badUser: User = {
 [1] 74│   id: '文字列にしてみる', // number じゃないので型エラーになる
     75│   name: 123, // string じゃない
     76│ };
     77│


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ex09/flow/task.js:75:9

Cannot assign object literal to badUser because in property name: number [1] is incompatible with string [2].
[incompatible-type]

 [2]  5│   name: string,
       :
     72│ }
     73│ const badUser: User = {
     74│   id: '文字列にしてみる', // number じゃないので型エラーになる
 [1] 75│   name: 123, // string じゃない
     76│ };
     77│



Found 2 errors
```

## 実行

- ビルド

```
npm run flow:build -- ex09/flow/task.js --out-file ex09/flow/task.flow.js
```

- 実行

```
node ex09/flow/caller.js
```

- 結果

```
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
```
