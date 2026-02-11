import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FsPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

export function startPolly(testName) {
  const polly = new Polly(testName, {
    adapters: ['node-http'],
    persister: 'fs',

    persisterOptions: {
      fs: {
        recordingsDir: new URL('./recordings', import.meta.url).pathname,
      },
    },
    matchRequestsBy: {
      headers: false,
    },

    recordIfMissing: true,
  });

  return polly;
}
