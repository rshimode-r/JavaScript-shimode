## 1. [Tailwind CSS](https://tailwindcss.com/) がどういったフレームワークか調べなさい。

- Tailwind CSSはutility classを活用したCSS フレームワーク
- BootstrapやMUIとは異なり、コンポネントが提供されているわけではない。
- そのため、開発者がutility classを適用してコンポーネントを作成していくことになる。

(参考)https://qiita.com/Hirohana/items/2a33c96cbdf494958a2e

(手順)

- tailwind.config.js内のcontentでファイルを指定
- `npx @tailwindcss/cli -i ./exercises/ch15.04-10/ex02/input.css -o ./exercises/ch15.04-10/ex02/style.css`のようなコマンドでビルド
