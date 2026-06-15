import assert from 'node:assert/strict';
import test from 'node:test';
import * as github from '@actions/github';

import * as apiUtils from '../lib/api-utils.js';
import prereleaseData from './data/pre-release.json' with {type: 'json'};
import releaseData from './data/release.json' with {type: 'json'};

const token = 'faketoken';

process.env.GITHUB_REPOSITORY = 'test/repository';

test('validateIfReleaseIsPublished throws if release is marked as pre-release', async t => {
  const octokitClient = github.getOctokit(token);
  const originalGetReleaseByTag = octokitClient.rest.repos.getReleaseByTag;

  octokitClient.rest.repos.getReleaseByTag = async () => prereleaseData;
  t.after(() => {
    octokitClient.rest.repos.getReleaseByTag = originalGetReleaseByTag;
  });

  await assert.rejects(
    apiUtils.validateIfReleaseIsPublished('v1.0.0', octokitClient),
    /The 'v1\.0\.0' release is marked as pre-release\. Updating tags for pre-release is not supported/
  );
});

test('validateIfReleaseIsPublished accepts a published release', async t => {
  const octokitClient = github.getOctokit(token);
  const originalGetReleaseByTag = octokitClient.rest.repos.getReleaseByTag;

  octokitClient.rest.repos.getReleaseByTag = async () => releaseData;
  t.after(() => {
    octokitClient.rest.repos.getReleaseByTag = originalGetReleaseByTag;
  });

  await assert.doesNotReject(
    apiUtils.validateIfReleaseIsPublished('v1.1.0', octokitClient)
  );
});
