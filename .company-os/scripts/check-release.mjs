#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { CompanyOS, run } from './lib.mjs';

// Package current intended files without staging or committing the maintainer's checkout.
// Test the resulting Git clone, including hidden instructions and the executable hook.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const git = (cwd, args) => run('git', ['-c', 'core.hooksPath=', '-c', 'commit.gpgSign=false', ...args], cwd);
let temp;
try {
  run(process.execPath, ['.company-os/scripts/check-kit.mjs'], root);
  const source = new CompanyOS(root);
  source.ensureRoot();
  source.scanPersonalFiles();
  const names = [...new Set(git(root, ['ls-files', '-z', '--cached', '--others', '--exclude-standard']).stdout.split('\0').filter(Boolean))];
  temp = fs.mkdtempSync(path.join(os.tmpdir(), 'company-os-release-'));
  const candidate = path.join(temp, 'candidate');
  fs.mkdirSync(candidate);
  let files = 0;
  for (const name of names) {
    const from = source.safeFile(name);
    if (!fs.existsSync(from)) continue; // Git still lists unstaged deletions.
    const to = path.join(candidate, name);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    files++;
  }
  git(candidate, ['init', '-b', 'main']);
  git(candidate, ['config', 'user.name', 'Company OS release check']);
  git(candidate, ['config', 'user.email', 'release-check@example.invalid']);
  git(candidate, ['add', '--all']);
  git(candidate, ['update-index', '--chmod=+x', '.company-os/scripts/hooks/pre-push']);
  git(candidate, ['commit', '-m', 'Disposable release candidate']);
  const clone = path.join(temp, 'fresh-clone');
  git(temp, ['clone', '--no-local', candidate, clone]);
  git(clone, ['remote', 'remove', 'origin']);
  if (git(clone, ['remote']).stdout.trim()) throw new Error('Starter remote removal failed.');
  const check = run(process.execPath, ['.company-os/scripts/check-kit.mjs'], clone);
  process.stdout.write(check.stdout);
  const preview = JSON.parse(run(process.execPath, ['.company-os/scripts/install-skills.mjs', '--agent', 'codex', '--skill', 'company-os,company-os-sync,company-os-restore'], clone).stdout);
  if (preview.install !== false || !preview.global || preview.source !== clone || !preview.command.includes('--global')) {
    throw new Error('Fresh clone global installation plan is incorrect.');
  }
  const tests = run(process.execPath, ['--test', 'tests/sync.test.mjs'], clone, { allowFailure: true });
  process.stdout.write(tests.stdout);
  process.stderr.write(tests.stderr);
  if (tests.status !== 0) throw new Error('Fresh clone tests failed.');
  if (git(clone, ['status', '--porcelain']).stdout.trim()) throw new Error('Verification changed the fresh starter.');
  console.log('Release check passed: ' + files + ' files, clean Git clone, starter remote removed, global install preview, and sync/recovery tests.');
  console.log('No source checkout commit, hosted push, global installation, or schedule registration was performed.');
} catch (error) {
  console.error('Company OS release check: ' + error.message);
  process.exitCode = 1;
} finally {
  if (temp && fs.existsSync(temp)) {
    const resolved = fs.realpathSync(temp);
    if (!resolved.startsWith(fs.realpathSync(os.tmpdir()) + path.sep) || !path.basename(resolved).startsWith('company-os-release-')) {
      throw new Error('Refusing cleanup outside the disposable release directory.');
    }
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}
