import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FsPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

export function startPolly(testName) {
  // testNameはテストファイル名やテストケース名など、録画ファイルを識別するための文字列
  const polly = new Polly(testName, {
    adapters: ['node-http'],
    persister: 'fs',

    persisterOptions: {
      fs: {
        recordingsDir: new URL('./recordings', import.meta.url).pathname, // 録画ファイルの保存先ディレクトリ
      },
    },
    matchRequestsBy: {
      headers: false, // ヘッダーはリクエストマッチングに使用しない
    },

    recordIfMissing: true, // 録画ファイルが存在しない場合にのみ新たに録画する
  });

  return polly;
}
