import process, { exit } from 'process';
import 'dotenv/config.js';
import { createIssue, closeIssue, listIssues } from './lib.js';

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error('GITHUB_TOKENが設定されてません');
  process.exit(1);
}

// コマンドライン引数取得
let args = process.argv.slice(2);

let verbose = false;
args = args.filter((arg) => {
  if (arg === '-v' || arg === '--verbose') {
    verbose = true;
    return false;
  }
  if (arg === '-h' || arg === '--help') {
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

if (command === 'create') {
  const [owner, repo, title, body] = args.slice(1);
  if (!owner || !repo || !title) {
    console.error('create requires owner, repo, and title');
    process.exit(1);
  }
  try {
    await createIssue(owner, repo, title, body || '', TOKEN, verbose);
  } catch (err) {
    console.error('Failed to create issue:', err.message || err);
    exit(1);
  }
} else if (command === 'close') {
  const [owner, repo, number] = args.slice(1);
  if (!owner || !repo || !number) {
    console.error('close requires owner, repo, and issue_number');
    process.exit(1);
  }
  try {
    await closeIssue(owner, repo, number, TOKEN, verbose);
  } catch (err) {
    console.error('Failed to close issue:', err.message || err);
    exit(1);
  }
} else if (command === 'list') {
  const [owner, repo] = args.slice(1);
  if (!owner || !repo) {
    console.error('list requires owner and repo');
    process.exit(1);
  }
  try {
    await listIssues(owner, repo, TOKEN, verbose);
  } catch (err) {
    console.error('Failed to list issues:', err.message || err);
    exit(1);
  }
} else {
  console.error('Unknown command:', command);
  showHelp();
  process.exit(1);
}
