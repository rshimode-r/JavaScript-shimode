## クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい

CSRF(cross-site request forgery)脆弱性に晒される

- CSRFでは、悪意あるサイトに設置されたクロスオリジンのリンクやFormを利用者がクリックすることによって、利用者が持つ被害サイト上の認証情報を用いた操作を悪意ある第三者が代理で行使できてしまう。(参考 : https://zenn.dev/qnighy/articles/6ff23c47018380)
- つまり、ユーザーの認証情報を悪意あるサイトが利用して、勝手に別オリジンの操作ができてしまう

## クロスオリジンリクエストで メソッド(`POST`/`GET`)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

- <form>からのリクエストなど、CORS以前から存在しているSame Origin Policy の制限を受けないリクエストに対しては Preflight Requestは発生しない。(既存のアプリケーションに不具合が生じる可能性があるから)
- Preflight Requestが発生しないものはSimple Requestと呼ばれる。(条件は→https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CORS#%E5%8D%98%E7%B4%94%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88)

(参考 : https://zenn.dev/tm35/articles/ad05d8605588bd)
