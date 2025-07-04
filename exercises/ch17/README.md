# 練習問題 17 章

今までの章では presets に用意された package.json や設定ファイルを利用して解答を作成してきたが、この章では ch17 ディレクトリの下に npm プロジェクトを作成して、自分で package.json やその他の設定ファイルを整備しなさい。

また npm は package.json の祖先ディレクトリに package.json がある場合、そのディレクトリの node_modules にある依存パッケージを探索する。
この章ではそれを利用せずに、祖先ディレクトリの依存関係に存在しているパッケージでも、明示的に ch17 の package.json に依存関係を記述すること。

## 問題 17.1 💻

ESLint と Prettier は昨今よく使われおり、併用されることもよくある。
この二つを package.json に[scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)を追加してそれぞれ実行できるようにしなさい。
追加した Prettier の scripts 実行時は警告が表示されるだけでなく、コードの修正がされるようオプションで設定すること。
[Prettier vs. Linters](https://prettier.io/docs/en/comparison.html)にあるように ESLint ではバグ検知のための検知を、フォーマットに関しては Prettier で行うようにすること。

ESLint、Prettier の各種設定はプロジェクトで採用したスタイルによって設定すべき内容も変わるが、ここでは設定の練習として[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)になるべく従うように設定しなさい。

実行確認用のファイルとして `ex01` に`format_sample.js` と `lint_sample.js` を用意した。それぞれのファイルに追加した scripts を実行し、lint の警告は修正しなさい。
ただし `format_sample.js` は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外し、警告がでないようにすること。
実行確認用のファイルはあくまで例として上記のガイドのいくつかを反映されているのみであるため、設定に関しては実行確認用ファイルがガイドに従う最小設定ではなく、[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)に従うこと。

- **出題範囲 17.1, 17,2**

## 問題 17.2 💻🧪

まず、[問題 16.8](../ch16/README.md#問題-168-) で実施した GitHub の Issue を操作する課題に関して、Issue の各操作関数を export してライブラリとして利用できるようにしなさい。

それに対して、Jest を用いてテストを実施しなさい。
テストを実施するにあたって、実際の GitHub の API にはアクセスせずに、ライブラリ単体のテストを行うためにモックを利用する。
モックの実現方法として以下の 2 つの方法を実施しなさい。

- [Jest のモック関数](https://jestjs.io/ja/docs/mock-function-api) を利用して GitHub の API をモックする方法
- [Polly.JS](https://github.com/Netflix/pollyjs) を用いて、最初の一回だけ GitHub の API と通信し、そのインタラクションを記録して、次回以降は記録されたレスポンスをリプレイする方法

- **出題範囲 17.3**

## 問題 17.3 🖋️

npm に同梱されている npx を利用することにはどのような利点があるのか説明しなさい。

**出題範囲 17.4**

## 問題 17.4 🖋️

npm install すると作成される package-lock.json はどのような役割を持つのか。
また、リポジトリにコミットすべきか、について説明しなさい。

**出題範囲 17.4**

## 問題 17.5 💻🖋️
[問題 15.4-10.10](../ch15.04-10/README.md#問題-154-1010-) で作成したライフゲームのプログラムについて、プログラム中の関数(`updateGrid`, `renderGrid`)をそれぞれ別のファイルで export し、`index.js` から import して利用するよう修正しなさい。必要に応じて定数の export や関数の引数の変更を行ってもよい。
上記のコードを webpack を利用してバンドルし、バンドル前後のコードについて以下の点を調査して結果を記載しなさい。
- バンドルしたコードと元のコードを比較し、どのような処理が行われたかを確認しなさい。
- バンドル前後それぞれのコードを利用するページをローカルサーバで配信してブラウザから閲覧できるようにしなさい。  
開発者ツールで `ネットワーク` タブを開き、スクリプトのダウンロード時間、ページの読み込み完了時間について比較しなさい。

**出題範囲 17.5**

## 問題 17.6 🖋️
[問題 17.5](#問題-175-) について、webpack の設定でバンドル時にソースマップを生成するようにしなさい。
バンドルしたコードを利用するページをローカルサーバで配信してブラウザから閲覧し、開発者コンソールを利用して以下を確認して結果を記載しなさい。
- 開発者ツールで `ソース` タブ(Chrome, Edge, Safari) または `デバッガー` タブ(Firefox) を開き、ソースコードファイルがどのように表示されるかを確認しなさい。
- バンドルしたコードの実行中に、バンドル前のソースコードファイルに基づいたブレークポイントの設定や変数の値の確認等のデバッグが可能か確認しなさい。

**出題範囲 17.5**

## 問題 17.7 🖋

TypeScriptのトランスパイルは`@babel/preset-typescript`や`tsc`によって可能だが、それぞれの違いを調べなさい。

**出題範囲 17.6**

## 問題 17.8 💻

[問題 15.1-3.1](../ch15.01-03/README.md) で作成した ToDo 管理アプリケーションを React を用いて書きなおしなさい。
React 用のプロジェクトフォルダは ch17/ex08 に作成してよいとする。

**出題範囲 17.7**

## 問題 17.9 💻

`ex09/task.js`のコードをTypeScript、Flowを使ったコードにそれぞれ書き換えなさい。
また、`ex09/caller.ts`(TypeScript)、`ex09/caller.js`(Flow)からの呼び出しがそれぞれ動作することを確認しなさい。
ただし、関数内部の実装は変更しないこと。また、`isUserObject`の引数以外で`any`を使わないこと。


**出題範囲 17.8**

## 問題 17.10 🖋

TypeScriptとFlowについて、どちらが主流となっているかを調べなさい。
また、その理由を考えてまとめなさい。

**出題範囲 17.8**

## 問題 17.11 💪💻

React 利用の上級者を目指すチュートリアルとして、[Build Your Own React](https://pomb.us/build-your-own-react/)がある。あるライブラリ利用の上級者を目指して本質的な理解を深めるための学習方法として、ライブラリと同等の機能を実装するという方法があるが、このチュートリアルではそのような体験ができる。一般に広く使われるライブラリの実装は難易度が高い(低かったら保守性等から自分で実装したほうが早いという判断になる)ものであり、本チュートリアルが説明している概念も簡単なものではない。

Build Your Own React では簡素化した React の実装を 300 行ほどのファイルとして書く。

チュートリアルを完了すると完成する成果物 https://github.com/pomber/didact に対して、メモ化の機能を持つフックである [useMemo](https://ja.react.dev/reference/react/useMemo) を追加しなさい。

なお、./ex11 で `npm install && npm start` すると https://github.com/pomber/didact の didact.js がトランスパイルされて http://localhost:5000/index.html で動作確認できるようになっている。

**出題範囲**: **17.7**