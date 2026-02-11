## npm install すると作成される package-lock.json はどのような役割を持つのか。

package-lock.json には npm install で実際にインストールした正確なパッケージ情報が記載されている。

- package.json では「^1.0.0」のように範囲指定されることが多いが、package-lock.json では実際にインストールされた「1.0.3」のような固定バージョンが記録される
- 直接依存だけでなく、間接依存（依存パッケージが依存するパッケージ）のバージョンも含まれる。

## リポジトリにコミットすべきか、について説明しなさい。

コミットするべき。

- package-lock.json があることで、異なる環境で `npm install` しても同じ依存関係構成を再現できる。
- `npm ci` を使用すると package-lock.json に基づき、完全に同一の環境を再現できる。
- チーム開発や本番環境でのバグ・セキュリティリスクを回避できる。

（参考）https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5
