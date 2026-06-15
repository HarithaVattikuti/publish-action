import assert from 'node:assert/strict';
import test from 'node:test';

import * as versionUtils from '../lib/version-utils.js';
import stableSemver from './data/stable-semver.json' with {type: 'json'};
import stableBuildSemver from './data/stable-build-semver.json' with {type: 'json'};
import prereleaseSemver from './data/prerelease-semver.json' with {type: 'json'};
import prereleaseBuildSemver from './data/prerelease-build-semver.json' with {type: 'json'};

test('isStableSemverVersion returns true for stable versions', () => {
  assert.equal(versionUtils.isStableSemverVersion(stableSemver), true);
});

test('isStableSemverVersion returns true for build metadata versions', () => {
  assert.equal(versionUtils.isStableSemverVersion(stableBuildSemver), true);
});

test('isStableSemverVersion returns false for pre-release versions', () => {
  assert.equal(versionUtils.isStableSemverVersion(prereleaseSemver), false);
});

test(
  'isStableSemverVersion returns false for pre-release versions with build metadata',
  () => {
    assert.equal(versionUtils.isStableSemverVersion(prereleaseBuildSemver), false);
  }
);

test('validateSemverVersionFromTag accepts a valid semantic version', () => {
  assert.doesNotThrow(() => versionUtils.validateSemverVersionFromTag('1.0.0'));
});

test("validateSemverVersionFromTag accepts a valid semantic version with 'v' prefix", () => {
  assert.doesNotThrow(() => versionUtils.validateSemverVersionFromTag('v1.0.0'));
});

test('validateSemverVersionFromTag accepts a version with build metadata', () => {
  assert.doesNotThrow(() =>
    versionUtils.validateSemverVersionFromTag('v1.0.0+20130313144700')
  );
});

test('validateSemverVersionFromTag rejects an invalid semantic version', () => {
  assert.throws(
    () => versionUtils.validateSemverVersionFromTag('1.0.0invalid'),
    new Error("The '1.0.0invalid' doesn't satisfy semantic versioning specification")
  );
});

test('validateSemverVersionFromTag rejects a pre-release version', () => {
  assert.throws(
    () => versionUtils.validateSemverVersionFromTag('v1.0.0-beta.1'),
    new Error(
      'It is not allowed to specify pre-release version to update the major tag'
    )
  );
});

test(
  'validateSemverVersionFromTag rejects a pre-release version with build metadata',
  () => {
    assert.throws(
      () =>
        versionUtils.validateSemverVersionFromTag('v1.0.0-beta.1+20130313144700'),
      new Error(
        'It is not allowed to specify pre-release version to update the major tag'
      )
    );
  }
);

test('getMajorTagFromFullTag derives the expected major tag', async t => {
  const cases = [
    ['1.0.0', '1'],
    ['v1.0.0', 'v1'],
    ['v1.0.0-beta.1', 'v1'],
    ['v1.0.0+20130313144700', 'v1']
  ];

  for (const [sourceTag, expectedMajorTag] of cases) {
    await t.test(`${sourceTag} -> ${expectedMajorTag}`, () => {
      assert.equal(
        versionUtils.getMajorTagFromFullTag(sourceTag),
        expectedMajorTag
      );
    });
  }
});
