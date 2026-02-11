import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { startPolly } from './pollySetup.js';
import { createIssue, closeIssue, listIssues } from '../lib.js';
import { jest } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

describe('ch17/ex02', () => {
  let polly;

  beforeEach(() => {
    polly = startPolly(expect.getState().currentTestName);
  });

  afterEach(async () => {
    await polly.stop();
  });

  it('createIssue', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    await createIssue(
      process.env.OWNER,
      process.env.REPO,
      'polly test',
      'body',
      process.env.GITHUB_TOKEN,
    );

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Created Issue'));
  });

  it('closeIssue', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    await closeIssue(
      process.env.OWNER,
      process.env.REPO,
      11,
      process.env.GITHUB_TOKEN,
    );

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Closed Issue'));
  });

  it('listIssues', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    await listIssues(
      process.env.OWNER,
      process.env.REPO,
      process.env.GITHUB_TOKEN,
    );

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('#12'));
  });
});
