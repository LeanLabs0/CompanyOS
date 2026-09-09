import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CompanyOS, run, atomicJson, encode, digest, repoIdentity } from '../.company-os/scripts/lib.mjs';

const git = (cwd, ...args) => run('git', args, cwd).stdout.trim();
function put(root, name, text) {
  fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
  fs.writeFileSync(path.join(root, name), text);
}
function fixture(t) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'company-os-test-'));
  t.after(() => {
    const real = fs.realpathSync(temp);
    assert.ok(real.startsWith(fs.realpathSync(os.tmpdir()) + path.sep));
    assert.ok(path.basename(real).startsWith('company-os-test-'));
    fs.rmSync(real, { recursive: true, force: true });
  });
  const personal = path.join(temp, 'personal.git'), company = path.join(temp, 'company.git');
  git(temp, 'init', '--bare', '-b', 'main', personal);
  git(temp, 'init', '--bare', '-b', 'main', company);
  const create = name => {
    const root = path.join(temp, name);
    fs.mkdirSync(root);
    git(root, 'init', '-b', 'main');
    git(root, 'config', 'user.name', 'Test Person');
    git(root, 'config', 'user.email', 'test@example.invalid');
    put(root, '.gitignore', '.company-sync/\n.env\nnode_modules/\n');
    // Tests use local bare repositories. Production's hook intentionally rejects local URLs.
    // backup() always calls the identical guard directly with test-injected URL validation.
    put(root, '.company-os/scripts/hooks/pre-push', '#!/bin/sh\nexit 0\n');
    put(root, 'personal/about.md', 'Private identity\n');
    put(root, 'wiki/company.md', 'Company facts\n');
    put(root, 'corrections/index.md', 'Company corrections\n');
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'PRIVATE starter message');
    const brain = new CompanyOS(root, { allowLocal: true });
    atomicJson(path.join(root, '.company-os/seed-shared.json'), brain.sharedSnapshot());
    brain.configure({ personal: name === 'one' ? personal : 'skip', company });
    return brain;
  };
  const one = create('one');
  return { temp, personal, company, one, create };
}
function publish(brain) {
  const review = brain.prepare();
  assert.equal(review.status, 'review');
  return brain.publish(review.id);
}

test('company export contains only allowed content and no private ancestry or messages', t => {
  const { one, company } = fixture(t);
  put(one.root, 'personal/research/customer.md', 'PRIVATE customer notes');
  publish(one);
  const names = git(company, 'ls-tree', '-r', '--name-only', 'main').split('\n');
  assert.ok(names.every(name => /^(wiki|corrections)\//.test(name)));
  assert.equal(git(company, 'rev-list', '--count', 'main'), '1');
  assert.ok(!git(company, 'log', '--format=%B', 'main').includes('PRIVATE'));
  assert.equal(one.prepare().status, 'current');
});

test('plain pushes and root company pushes fail; guard rejects URLs, tags, and rewinds', t => {
  const { one, company, personal } = fixture(t);
  assert.notEqual(run('git', ['push'], one.root, { allowFailure: true }).status, 0);
  assert.notEqual(run('git', ['push', 'company', 'HEAD:main'], one.root, { allowFailure: true }).status, 0);
  assert.throws(() => one.guard('company', company, ''), /Only explicit personal/);
  assert.throws(() => one.guard('personal', company, ''), /Wrong personal/);
  const head = git(one.root, 'rev-parse', 'HEAD');
  assert.throws(() => one.guard('personal', personal, 'refs/tags/v1 ' + head + ' refs/tags/v1 ' + '0'.repeat(40)), /no deletions or tags/);
  assert.throws(() => one.guard('personal', personal, '(delete) ' + '0'.repeat(40) + ' refs/heads/main ' + head), /no deletions or tags/);
  put(one.root, 'personal/new.md', 'Newer work');
  git(one.root, 'add', '.'); git(one.root, 'commit', '-m', 'Newer work');
  const newer = git(one.root, 'rev-parse', 'HEAD');
  assert.throws(() => one.guard('personal', personal, 'HEAD ' + head + ' refs/heads/main ' + newer), /Force pushes/);
});

test('review is mandatory and becomes invalid if files or remote change', t => {
  const { one, create } = fixture(t);
  assert.throws(() => one.publish('made-up'), /approved review/);
  const review = one.prepare();
  put(one.root, 'wiki/company.md', 'Changed after review');
  assert.throws(() => one.publish(review.id), /Files changed/);
  publish(one);
  const two = create('two');
  put(two.root, 'wiki/company.md', 'Changed after review');
  assert.equal(two.prepare().status, 'current');
  put(one.root, 'wiki/new.md', 'One');
  const pending = one.prepare();
  put(two.root, 'wiki/other.md', 'Two');
  publish(two);
  assert.throws(() => one.publish(pending.id), /Company changed/);
});

test('two people exchange nonconflicting changes and stop on edits to the same content', t => {
  const { one, create } = fixture(t);
  publish(one);
  const two = create('two');
  assert.equal(two.prepare().status, 'current');
  put(one.root, 'wiki/company.md', 'Version from one\n');
  publish(one);
  put(two.root, 'wiki/research.md', 'Research from two\n');
  const review = two.prepare();
  assert.equal(review.status, 'review');
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/company.md'), 'utf8'), 'Version from one\n');
  two.publish(review.id);
  assert.equal(one.prepare().status, 'current');
  put(one.root, 'wiki/company.md', 'Launch October 12\n');
  put(two.root, 'wiki/company.md', 'Launch October 19\n');
  publish(one);
  const conflict = two.prepare();
  assert.equal(conflict.status, 'conflict');
  assert.deepEqual(conflict.paths, ['wiki/company.md']);
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/company.md'), 'utf8'), 'Launch October 19\n');
});

test('nonoverlapping edits within one text file merge', t => {
  const { one } = fixture(t);
  const base = encode('first\none\ntwo\nthree\nfour\nfive\nlast\n');
  const local = encode('FIRST\none\ntwo\nthree\nfour\nfive\nlast\n');
  const remote = encode('first\none\ntwo\nthree\nfour\nfive\nLAST\n');
  fs.mkdirSync(one.scratch, { recursive: true });
  const merged = one.merge({ 'wiki/a.md': base }, { 'wiki/a.md': local }, { 'wiki/a.md': remote });
  assert.deepEqual(merged.conflicts, []);
  assert.equal(Buffer.from(merged.snapshot['wiki/a.md'], 'base64').toString(), 'FIRST\none\ntwo\nthree\nfour\nfive\nLAST\n');
});

test('deletions propagate and deletion versus edit conflicts', t => {
  const { one, create } = fixture(t);
  put(one.root, 'wiki/obsolete.md', 'Old');
  publish(one);
  const two = create('two');
  assert.equal(two.prepare().status, 'current');
  fs.unlinkSync(path.join(one.root, 'wiki/obsolete.md'));
  publish(one);
  put(two.root, 'wiki/obsolete.md', 'Edited before deletion arrived');
  assert.equal(two.prepare().status, 'conflict');
  fs.unlinkSync(path.join(two.root, 'wiki/obsolete.md'));
  assert.equal(two.prepare().status, 'current');
});

test('personal backup restores unpublished company edits and reconnects to newer shared history', t => {
  const { one, create, temp, personal } = fixture(t);
  publish(one);
  one.backup();
  const two = create('two');
  two.prepare();
  put(two.root, 'wiki/team.md', 'New team knowledge');
  publish(two);
  put(one.root, 'wiki/draft.md', 'Unpublished company edit');
  put(one.root, 'personal/projects/brief.md', 'Private draft');
  one.backup();
  const restored = path.join(temp, 'restored');
  git(temp, 'clone', '--origin', 'personal', personal, restored);
  git(restored, 'config', 'user.name', 'Restored Person');
  git(restored, 'config', 'user.email', 'restore@example.invalid');
  const brain = new CompanyOS(restored, { allowLocal: true });
  brain.configure({});
  const review = brain.prepare();
  assert.equal(review.status, 'review');
  assert.equal(fs.readFileSync(path.join(restored, 'wiki/team.md'), 'utf8'), 'New team knowledge');
  assert.equal(fs.readFileSync(path.join(restored, 'wiki/draft.md'), 'utf8'), 'Unpublished company edit');
  assert.equal(fs.readFileSync(path.join(restored, 'personal/projects/brief.md'), 'utf8'), 'Private draft');
  brain.publish(review.id);
  brain.backup();
  assert.deepEqual(git(restored, 'remote').split('\n'), ['company', 'personal']);
});

test('tracked secrets and private files in company history are rejected', t => {
  const { one, company, temp } = fixture(t);
  put(one.root, '.env', 'PASSWORD=example');
  git(one.root, 'add', '-f', '.env');
  assert.throws(() => one.backup(), /Credential-like/);
  const rogue = path.join(temp, 'rogue');
  git(temp, 'clone', company, rogue);
  git(rogue, 'config', 'user.name', 'Rogue');
  git(rogue, 'config', 'user.email', 'rogue@example.invalid');
  put(rogue, 'personal/private.md', 'Private');
  git(rogue, 'add', '.'); git(rogue, 'commit', '-m', 'Unexpected tree');
  git(rogue, 'rm', 'personal/private.md');
  put(rogue, 'wiki/company.md', 'Clean latest tree');
  git(rogue, 'add', '.'); git(rogue, 'commit', '-m', 'Hide prior private tree');
  git(rogue, 'push', 'origin', 'HEAD:main');
  assert.throws(() => one.prepare(), /outside wiki/);
});

test('new credential patterns and host instruction files are rejected', t => {
  const { one } = fixture(t);
  put(one.root, 'wiki/token.md', 'ghp_' + 'a'.repeat(36));
  assert.throws(() => one.sharedSnapshot(), /Possible credential/);
  fs.unlinkSync(path.join(one.root, 'wiki/token.md'));
  put(one.root, 'wiki/.agents/skills/hijack/SKILL.md', 'Incoming instructions');
  assert.throws(() => one.sharedSnapshot(), /host instructions/);
});

test('cross-machine file/directory and case collisions stop before import', t => {
  const { one } = fixture(t);
  const file = encode('Page'), detail = encode('Detail');
  for (const [local, remote] of [
    [{ 'wiki/topic': file }, { 'wiki/topic/detail.md': detail }],
    [{ 'wiki/Topic.md': file }, { 'wiki/topic.md': detail }],
    [{ 'wiki/Topic/a.md': file }, { 'wiki/topic/b.md': detail }],
  ]) {
    const result = one.merge({}, local, remote);
    assert.ok(result.conflicts.length >= 2);
    assert.equal(fs.existsSync(one.journalFile), false);
  }
});

test('recover completes partial imports but preserves newer user edits', t => {
  const { one } = fixture(t);
  fs.mkdirSync(one.scratch, { recursive: true });
  const before = one.sharedSnapshot();
  const after = { ...before, 'wiki/new.md': encode('Incoming'), 'wiki/company.md': encode('New facts') };
  const state = { schema: 1, company: 'test/company', head: null };
  atomicJson(one.journalFile, { before, after, state });
  put(one.root, 'wiki/new.md', 'Incoming');
  assert.equal(one.recover().recovered, true);
  assert.equal(digest(one.sharedSnapshot()), digest(after));
  atomicJson(one.journalFile, { before: after, after: before, state });
  put(one.root, 'wiki/company.md', 'Newer user edit');
  assert.throws(() => one.recover(), /newer edits/);
  assert.equal(fs.readFileSync(path.join(one.root, 'wiki/company.md'), 'utf8'), 'Newer user edit');
});

test('locks prevent overlapping runs', t => {
  const { one } = fixture(t);
  fs.mkdirSync(one.scratch, { recursive: true });
  atomicJson(path.join(one.scratch, 'lock.json'), { pid: process.pid, machine: os.hostname() });
  assert.throws(() => one.prepare(), /holds the lock/);
});

test('URL and destination validation blocks arbitrary Git transports and identical remotes', t => {
  const { one, personal } = fixture(t);
  assert.equal(repoIdentity('git@github.com:Sarah/Brain.git'), 'sarah/brain');
  assert.equal(repoIdentity('https://github.com/Sarah/Brain'), 'sarah/brain');
  for (const url of ['ext::sh payload', 'https://token@github.com/a/b', 'https://github.com/a/b?token=x', '/tmp/repo']) {
    assert.throws(() => repoIdentity(url), /GitHub repository URL/);
  }
  assert.throws(() => one.configure({ company: personal }), /different repositories/);
});

test('first join replaces untouched seed facts but preserves a conflicting personalized claim', t => {
  const { one, create } = fixture(t);
  put(one.root, 'wiki/company.md', 'Confirmed company facts');
  publish(one);
  const two = create('two');
  assert.equal(two.prepare().status, 'current');
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/company.md'), 'utf8'), 'Confirmed company facts');
  const three = create('three');
  put(three.root, 'wiki/company.md', 'My different claim');
  assert.equal(three.prepare().status, 'conflict');
  assert.equal(fs.readFileSync(path.join(three.root, 'wiki/company.md'), 'utf8'), 'My different claim');
});

test('personal backup rejects secrets removed from latest files but still in outgoing history', t => {
  const { one, personal } = fixture(t);
  put(one.root, 'personal/old-secret.md', 'ghp_' + 'b'.repeat(36));
  git(one.root, 'add', '.'); git(one.root, 'commit', '-m', 'Accidental secret');
  git(one.root, 'rm', 'personal/old-secret.md'); git(one.root, 'commit', '-m', 'Delete latest secret');
  assert.throws(() => one.backup(), /Possible credential/);
  assert.equal(run('git', ['show-ref', '--heads'], personal, { allowFailure: true }).stdout.trim(), '');
});

test('symlinked company content is rejected without following the target', t => {
  const { one, temp } = fixture(t);
  const outside = path.join(temp, 'private-target');
  fs.mkdirSync(outside);
  put(outside, 'private.md', 'Never share');
  try { fs.symlinkSync(outside, path.join(one.root, 'wiki', 'linked'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (error.code === 'EPERM') { t.skip('Host cannot create symlinks'); return; } throw error; }
  assert.throws(() => one.sharedSnapshot(), /Symlinks|Symlink/);
});

test('file and directory replacements sync without deleting unrelated company content', t => {
  const { one, create } = fixture(t);
  put(one.root, 'wiki/topic/detail.md', 'Old detail');
  publish(one);
  const two = create('two');
  two.prepare();
  fs.unlinkSync(path.join(one.root, 'wiki/topic/detail.md'));
  fs.rmdirSync(path.join(one.root, 'wiki/topic'));
  put(one.root, 'wiki/topic', 'Single page');
  publish(one);
  assert.equal(two.prepare().status, 'current');
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/topic'), 'utf8'), 'Single page');
  fs.unlinkSync(path.join(one.root, 'wiki/topic'));
  put(one.root, 'wiki/topic/detail.md', 'Detail again');
  publish(one);
  assert.equal(two.prepare().status, 'current');
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/topic/detail.md'), 'utf8'), 'Detail again');
  assert.equal(fs.readFileSync(path.join(two.root, 'wiki/company.md'), 'utf8'), 'Company facts\n');
});
