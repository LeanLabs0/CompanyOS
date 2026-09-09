import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CompanyOS } from './lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const errors = [];
const read = name => fs.readFileSync(path.join(root, name), 'utf8').replace(/\r\n/g, '\n');
const kit = JSON.parse(read('kit.json'));
if (kit.name !== 'Company OS' || kit.setup_schema !== 3 || !kit.requires_git || !kit.requires_scripts) errors.push('Kit metadata does not describe the current product contract.');
const expected = ['company-os', 'company-os-sync', 'company-os-restore', 'grill-me'];
const skillDirectories = fs.readdirSync(path.join(root, '.agents', 'skills')).sort();
if (JSON.stringify(skillDirectories) !== JSON.stringify([...expected].sort())) errors.push('The release must contain exactly the four current skill packages.');
for (const retired of ['archives', 'scripts', '.claude', '.gemini', 'companies', 'context', 'decisions', 'memory', 'projects', 'references', 'rules']) {
  if (fs.existsSync(path.join(root, retired))) errors.push('Obsolete starter directory: ' + retired);
}
const setup = JSON.parse(read('.company-os/setup.json'));
if (setup.personal !== null || setup.company !== null) errors.push('The release must not contain configured user repositories.');
const state = JSON.parse(read('.company-os/sync-state.json'));
if (state.company !== null || state.head !== null) errors.push('The release must not contain a user sync baseline.');
if (JSON.parse(read('.company-os/skills.json')).installed.length) errors.push('The release must not contain machine-specific skill installations.');
for (const personalState of ['.company-os/setup.md', '.company-os/schedule.md', '.company-sync']) {
  if (fs.existsSync(path.join(root, personalState))) errors.push('Local user state must not ship: ' + personalState);
}
for (const name of expected) {
  const body = read('.agents/skills/' + name + '/SKILL.md');
  if (!body.startsWith('---\nname: ' + name + '\ndescription: ')) errors.push('Invalid skill metadata: ' + name);
  if (!body.includes('\n---\n')) errors.push('Missing skill metadata boundary: ' + name);
}
const ignored = new Set(['.git', '.company-sync', 'node_modules']);
const documents = [];
function walk(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.md')) documents.push(file);
  }
}
walk(root);
for (const file of documents) {
  let body = fs.readFileSync(file, 'utf8');
  body = body.replace(/~~~[\s\S]*?~~~/g, '');
  for (const match of body.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target = match[1];
    if (/^[a-z]+:\/\//i.test(target) || target.startsWith('#')) continue;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target.split('#')[0]));
    if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved)) errors.push(path.relative(root, file) + ': broken local link ' + target);
  }
  if (/archive\/refs\/heads\/|Default, no Git|requires_git.*false|GitHub is optional/.test(body)) errors.push(path.relative(root, file) + ': obsolete installation guidance');
}
for (const required of ['.company-sync/', '.env', '.env.*', 'credentials.json', 'node_modules/']) {
  if (!read('.gitignore').split('\n').includes(required)) errors.push('Missing ignore rule: ' + required);
}
if (read('CLAUDE.md').trim() !== '@AGENTS.md') errors.push('Claude root adapter is incorrect.');
const brain = new CompanyOS(root);
try {
  const seed = JSON.parse(read('.company-os/seed-shared.json'));
  const current = brain.sharedSnapshot();
  // This check targets the unpersonalized release template, not a user's working brain.
  if (JSON.stringify(seed) !== JSON.stringify(current)) errors.push('Starter shared snapshot differs from seed-shared.json. Refresh the seed for a deliberate template change.');
} catch (error) { errors.push(error.message); }
if (errors.length) {
  console.error(errors.join('\n')); process.exitCode = 1;
} else console.log('Company OS kit checks passed: metadata, four skill sources, active links, sharing seed, and install contract.');
