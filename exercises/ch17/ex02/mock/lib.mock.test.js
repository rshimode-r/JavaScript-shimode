import { jest } from '@jest/globals';
import { mockResponse, mockRequest } from './mockSetup.js';

const { apiRequest, createIssue, closeIssue, listIssues } =
  await import('../lib.js');

beforeEach(() => {
  jest.clearAllMocks();
  mockResponse.statusCode = 200;
  mockResponse.on.mockReset();
  mockRequest.on.mockReset();
});

describe('apiRequest', () => {
  it('正常レスポンス', async () => {
    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') {
        handler(JSON.stringify({ ok: true }));
      }
      if (event === 'end') handler();
    });

    const res = await apiRequest('GET', 'https://test.com', null, 'token');

    expect(res).toEqual({ ok: true });
  });

  it('HTTPエラー', async () => {
    mockResponse.statusCode = 500;

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') handler('error');
      if (event === 'end') handler();
    });

    await expect(
      apiRequest('GET', 'https://test.com', null, 'token'),
    ).rejects.toThrow('HTTP 500');
  });

  it('JSON parse error', async () => {
    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') handler('invalid json');
      if (event === 'end') handler();
    });

    await expect(
      apiRequest('GET', 'https://test.com', null, 'token'),
    ).rejects.toThrow();
  });

  it('network error', async () => {
    mockRequest.on.mockImplementation((event, handler) => {
      if (event === 'error') handler(new Error('network'));
    });

    await expect(
      apiRequest('GET', 'https://test.com', null, 'token'),
    ).rejects.toThrow('network');
  });

  it('verboseログ', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') handler('{}');
      if (event === 'end') handler();
    });

    await apiRequest('GET', 'https://test.com', null, 'token', true);

    expect(spy).toHaveBeenCalled();
  });
});

describe('createIssue', () => {
  it('Issueを作成できる', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') {
        handler(JSON.stringify({ number: 1, title: 'テスト' }));
      }

      if (event === 'end') {
        handler();
      }
    });

    await createIssue('owner', 'repo', 'title', 'body', 'token');

    expect(consoleSpy).toHaveBeenCalledWith('Created Issue #1: テスト');
  });

  it('reject伝播', async () => {
    mockResponse.statusCode = 500;

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'end') handler();
    });

    await expect(
      createIssue('owner', 'repo', 't', 'b', 'token'),
    ).rejects.toThrow();
  });
});

describe('closeIssue', () => {
  it('Issueをクローズできる', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') {
        handler(JSON.stringify({ number: 2, title: 'closed' }));
      }
      if (event === 'end') handler();
    });

    await closeIssue('owner', 'repo', 2, 'token');

    expect(consoleSpy).toHaveBeenCalledWith('Closed Issue #2: closed');
  });

  it('reject伝播', async () => {
    mockResponse.statusCode = 500;

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'end') handler();
    });

    await expect(closeIssue('owner', 'repo', 2, 'token')).rejects.toThrow();
  });
});

describe('listIssues', () => {
  it('Issue一覧を表示できる', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') {
        handler(
          JSON.stringify([
            { number: 1, title: 'A' },
            { number: 2, title: 'B' },
          ]),
        );
      }
      if (event === 'end') handler();
    });

    await listIssues('owner', 'repo', 'token');

    expect(consoleSpy).toHaveBeenCalledWith('#1: A');
    expect(consoleSpy).toHaveBeenCalledWith('#2: B');
  });

  it('Issueがない場合メッセージ表示', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') handler(JSON.stringify([]));
      if (event === 'end') handler();
    });

    await listIssues('owner', 'repo', 'token');

    expect(consoleSpy).toHaveBeenCalledWith('No open issues');
  });

  it('Issueなし', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'data') handler(JSON.stringify([]));
      if (event === 'end') handler();
    });

    await listIssues('owner', 'repo', 'token');

    expect(consoleSpy).toHaveBeenCalledWith('No open issues');
  });

  it('reject伝播', async () => {
    mockResponse.statusCode = 500;

    mockResponse.on.mockImplementation((event, handler) => {
      if (event === 'end') handler();
    });

    await expect(listIssues('owner', 'repo', 'token')).rejects.toThrow();
  });
});
