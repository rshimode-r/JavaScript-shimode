## Graceful Shutdownとは？

- Webサーバを安全にシャットダウンする方法
- システムやアプリケーションを停止させる際に、現在の処理やタスクを可能な限り安全に完了させ、リソースの解放を適切に行いながら停止する一連の流れ

## Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類

- ECS はタスクを停止する際にコンテナに SIGTERM シグナルを送信し、30秒経過してもコンテナが残っている場合は、強制終了のために SIGKILL シグナルを送信する。

(参考)https://zenn.dev/tksx1227/articles/7108aa7a2072aa
