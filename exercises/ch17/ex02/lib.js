import https from 'https';
import { URL } from 'url';

// Issue 作成
export async function createIssue(
  owner,
  repo,
  title,
  body,
  token,
  verbose = false,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const data = await apiRequest('POST', url, { title, body }, token, verbose);
  console.log(`Created Issue #${data.number}: ${data.title}`);
}

// Issue クローズ
export async function closeIssue(owner, repo, number, token, verbose = false) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;
  const data = await apiRequest(
    'PATCH',
    url,
    { state: 'closed' },
    token,
    verbose,
  );
  console.log(`Closed Issue #${data.number}: ${data.title}`);
}

// Issue 一覧表示
export async function listIssues(owner, repo, token, verbose = false) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;
  const data = await apiRequest('GET', url, null, token, verbose);
  if (data.length === 0) {
    console.log('No open issues');
    return;
  }
  data.forEach((issue) => {
    console.log(`#${issue.number}: ${issue.title}`);
  });
}

export async function apiRequest(
  method,
  urlString,
  body,
  token,
  verbose = false,
) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);

    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'javaScript-Exercise',
      },
    };

    if (verbose) console.log(method, urlString, body || '');

    const request = https.request(requestOptions, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (
          response.statusCode &&
          (response.statusCode < 200 || response.statusCode >= 300)
        ) {
          console.error('Request failed:', data);
          reject(new Error(`HTTP ${response.statusCode}`));
        }
        resolve(JSON.parse(data));
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    if (body) {
      request.write(JSON.stringify(body));
    }

    request.end();
  });
}
