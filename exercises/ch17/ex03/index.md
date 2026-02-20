## npm に同梱されている npx を利用することにはどのような利点があるのか説明しなさい。

ESlintのようなツールをローカルにインストールすると、eslintスクリプトが./node_module/.bin/eslintに入ってしまい。コマンドを実行するのが面倒になる。

例 : フルパスで実行

```
./node_modules/.bin/eslint index.js
```

例 : package.jsonのscriptsに登録

```
{
  "scripts": {
    "lint": "eslint src/index.js"
  }
}
```

`npx`コマンドを利用することで、ローカルにインストールされたツールを実行することができる。(ex. `npx eslint index.js`)
また、インストールされていないツールを`npx`で指定すると、そのツールを一時的にインストールして実行してくれる。

- 使ったらすぐ削除するようなものは、`npx`を利用するべき
- githubのリポジトリ上にあるコードを`npx github:${ユーザー名}/&{リポジトリ名}`で実行できる
