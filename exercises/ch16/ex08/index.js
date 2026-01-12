import process from "process";
import "dotenv/config";
import https from "https";

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error("GITHUB_TOKENが設定されてません");
  process.exit(1);
}

// コマンドライン引数取得
let args = process.argv.slice(2);

let verbose = false;
args = args.filter((arg) => {
  if (arg === "-v" || arg === "--verbose") {
    verbose = true;
    return false;
  }
  if (arg === "-h" || arg === "--help") {
    showHelp();
    process.exit(0);
  }
  return true;
});

const command = args[0];

function showHelp() {
  console.log(`
GitHub Issue CLI
Usage:
  node index.js create <owner> <repo> <title> [body]   Create a new Issue
  node index.js close <owner> <repo> <issue_number>   Close an Issue
  node index.js list <owner> <repo>                  List open Issues
Options:
  -h, --help      Show this help
  -v, --verbose   Show HTTP requests
`);
}

async function apiRequest(method, urlString, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);

    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "javaScript-Exercise",
      },
    };

    if (verbose) console.log(method, urlString, body || "");

    const request = https.request(requestOptions, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        if (
          response.statusCode &&
          (response.statusCode < 200 || response.statusCode >= 300)
        ) {
          console.error("Request failed:", data);
          process.exit(1);
        }
        resolve(JSON.parse(data));
      });
    });

    request.on("error", (err) => {
      reject(err);
    });

    if (body) {
      request.write(JSON.stringify(body));
    }

    request.end();
  });
}

// Issue 作成
async function createIssue(owner, repo, title, body) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const data = await apiRequest("POST", url, { title, body });
  console.log(`Created Issue #${data.number}: ${data.title}`);
}

// Issue クローズ
async function closeIssue(owner, repo, number) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;
  const data = await apiRequest("PATCH", url, { state: "closed" });
  console.log(`Closed Issue #${data.number}: ${data.title}`);
}

// Issue 一覧表示
async function listIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;
  const data = await apiRequest("GET", url);
  if (data.length === 0) {
    console.log("No open issues");
    return;
  }
  data.forEach((issue) => {
    console.log(`#${issue.number}: ${issue.title}`);
  });
}

if (command === "create") {
  const [owner, repo, title, body] = args.slice(1);
  if (!owner || !repo || !title) {
    console.error("create requires owner, repo, and title");
    process.exit(1);
  }
  await createIssue(owner, repo, title, body || "");
} else if (command === "close") {
  const [owner, repo, number] = args.slice(1);
  if (!owner || !repo || !number) {
    console.error("close requires owner, repo, and issue_number");
    process.exit(1);
  }
  await closeIssue(owner, repo, number);
} else if (command === "list") {
  const [owner, repo] = args.slice(1);
  if (!owner || !repo) {
    console.error("list requires owner and repo");
    process.exit(1);
  }
  await listIssues(owner, repo);
} else {
  console.error("Unknown command:", command);
  showHelp();
  process.exit(1);
}
