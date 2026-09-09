#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { run, atomicJson } from './lib.mjs';

// No direct copies into global skill directories. Installation always delegates to Vercel's skills CLI.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const options = {};
const args = process.argv.slice(2);
try {
  while (args.length) {
    const key = args.shift();
    if (key === '--install' || key === '--update-reviewed') { options[key.slice(2)] = true; continue; }
    if (!['--source', '--skill', '--agent', '--cli-version'].includes(key) || !args.length) throw new Error('Use --agent <target> --skill <comma-separated names> [--source <source>] [--install].');
    options[key.slice(2)] = args.shift();
  }
  const agent = options.agent;
  const skills = (options.skill || '').split(',').filter(Boolean);
  if (!agent || !/^[a-z][a-z0-9-]+$/.test(agent) || !skills.length || skills.some(s => !/^[a-z0-9][a-z0-9-]{0,63}$/.test(s))) {
    throw new Error('Provide a supported agent target and the exact selected skill names.');
  }
  const requestedSource = options.source || root;
  const source = requestedSource.startsWith('brain:') ? path.resolve(root, requestedSource.slice(6)) : requestedSource;
  if (requestedSource.startsWith('brain:') && !source.startsWith(root + path.sep)) throw new Error('Owned skill source must stay inside the restored brain.');
  const version = options['cli-version'] || '1.5.25';
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Use an exact reviewed skills CLI version.');
  const sourceIsLocal = path.isAbsolute(source) && fs.existsSync(source);
  if (!sourceIsLocal && !/^(?:https:\/\/github\.com\/|git@github\.com:)[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+(?:\/tree\/[A-Za-z0-9_./-]+)?$/.test(source)) {
    throw new Error('Use a reviewed local source folder or credential-free GitHub source URL.');
  }
  const commandArgs = ['--yes', 'skills@' + version, 'add', source, '--global', '--agent', agent, '--skill', ...skills, '--yes'];
  const manifestFile = path.join(root, '.company-os', 'skills.json');
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const candidates = [
    path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js'),
    path.resolve(path.dirname(process.execPath), '..', 'lib', 'node_modules', 'npm', 'bin', 'npx-cli.js'),
  ];
  const npx = candidates.find(file => fs.existsSync(file));
  if (!options.install) {
    console.log(JSON.stringify({ install: false, global: true, agent, skills, source, cliVersion: version,
      command: ['npx', ...commandArgs], npmAvailable: Boolean(npx),
      note: 'Review the selected source and check for existing same-name skills. --install runs this global CLI installation.' }, null, 2));
    process.exit(0);
  }
  if (!npx) throw new Error('npm/npx was not found beside Node. Install a supported Node/npm distribution, or execute the displayed npx command in the host shell.');
  const knownRoots = [path.join(os.homedir(), '.agents', 'skills'), path.join(os.homedir(), '.codex', 'skills'),
    path.join(os.homedir(), '.claude', 'skills'), path.join(os.homedir(), '.cursor', 'skills')];
  if (!options['update-reviewed']) {
    for (const name of skills) {
      if (knownRoots.some(folder => fs.existsSync(path.join(folder, name)))) {
        throw new Error('A global skill named ' + name + ' already exists. Review its source before using --update-reviewed; do not overwrite unrelated skills.');
      }
    }
  }
  run(process.execPath, [npx, ...commandArgs], root, { stdio: 'inherit' });
  run(process.execPath, [npx, '--yes', 'skills@' + version, 'list', '--global', '--agent', agent], root, { stdio: 'inherit' });
  let revision = null;
  if (sourceIsLocal) {
    const result = run('git', ['rev-parse', 'HEAD'], source, { allowFailure: true });
    const dirty = run('git', ['status', '--porcelain'], source, { allowFailure: true });
    revision = result.status === 0 && dirty.status === 0 && !dirty.stdout.trim() ? result.stdout.trim() : null;
  }
  const portableSource = path.resolve(source) === root ? 'https://github.com/LeanLabs0/CompanyOS'
    : sourceIsLocal && path.resolve(source).startsWith(root + path.sep) ? 'brain:' + path.relative(root, source).split(path.sep).join('/') : source;
  for (const name of skills) {
    manifest.installed = manifest.installed.filter(item => !(item.name === name && item.agent === agent));
    manifest.installed.push({ name, agent, source: portableSource, revision, cliVersion: version,
      installedAt: new Date().toISOString(), discovery: 'pending-fresh-session-check' });
  }
  atomicJson(manifestFile, manifest);
  console.log(JSON.stringify({ installed: skills, agent, next: 'Verify discovery and recall in a fresh conversation. CLI success does not prove app loading.' }, null, 2));
} catch (error) {
  console.error('Company OS skills: ' + error.message);
  process.exitCode = 1;
}
