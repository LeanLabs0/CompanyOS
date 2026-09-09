#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { CompanyOS, atomicJson, run } from './lib.mjs';

const args = process.argv.slice(2);
const command = args.shift() || 'help';
const flags = {};
while (args.length) {
  const flag = args.shift();
  if (!/^--[a-z-]+$/.test(flag) || !args.length || args[0].startsWith('--')) throw new Error('Expected --option value.');
  if (flags[flag.slice(2)] !== undefined) throw new Error('Duplicate option: ' + flag);
  flags[flag.slice(2)] = args.shift();
}
const allowed = {
  help: [], status: ['root'], configure: ['root', 'personal', 'company', 'personal-branch', 'company-branch'],
  backup: ['root'], prepare: ['root'], publish: ['root', 'review'], recover: ['root'],
  sync: ['root'], locate: [], register: ['root'], 'lock-status': ['root'],
  'unlock': ['root', 'pid'], 'guard': ['root', 'remote', 'url'],
};
const registryFile = path.join(os.homedir(), '.company-os', 'brain.json');
try {
  if (!allowed[command]) throw new Error('Unknown command. Run help.');
  for (const flag of Object.keys(flags)) if (!allowed[command].includes(flag)) throw new Error('Unknown option --' + flag);
  if (command === 'help') {
    console.log('Company OS\n\nUse node <brain>/.company-os/scripts/company-os.mjs <command> [--root <brain>]\n\n' +
      'configure --personal <GitHub URL|skip> --company <GitHub URL|skip>\n' +
      'backup           Commit and back up the full brain to personal; reconcile fast-forward updates.\n' +
      'prepare          Import nonconflicting company updates; prepare a company review without publishing.\n' +
      'publish --review <id>  Publish exactly the batch the user approved.\n' +
      'sync             Back up personal, prepare company review, back up imported state. Never publishes company.\n' +
      'recover          Finish an interrupted import if no newer edits would be overwritten.\n' +
      'status           Read setup and pending review status.\n' +
      'register         Save this brain path in the machine-specific global pointer.\n' +
      'locate           Read the registered brain path.\n' +
      'lock-status      Inspect a running/stale helper lock.\n' +
      'unlock --pid <pid>  Remove a lock only after its process has ended on this machine.\n');
    process.exit(0);
  }
  if (command === 'locate') {
    if (!fs.existsSync(registryFile)) throw new Error('No registered brain. Ask for its folder or restore from the personal repository URL.');
    const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
    if (!fs.existsSync(path.join(registry.root, 'kit.json'))) throw new Error('Registered folder is unavailable. Reconnect it; do not reinstall.');
    console.log(JSON.stringify(registry, null, 2));
    process.exit(0);
  }
  // The default is the script's brain, never the shell's current project directory.
  const root = path.resolve(flags.root || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
  const brain = new CompanyOS(root);
  let result;
  if (command === 'register') {
    brain.ensureRoot();
    const prior = fs.existsSync(registryFile) ? JSON.parse(fs.readFileSync(registryFile, 'utf8')) : null;
    if (prior && path.resolve(prior.root) !== root && fs.existsSync(prior.root)) throw new Error('Another live brain is registered. Review which one should be active before replacing the pointer.');
    atomicJson(registryFile, { schema: 1, root });
    result = { registered: root, pointer: registryFile };
  } else if (command === 'configure') {
    result = brain.configure({ personal: flags.personal, company: flags.company,
      personalBranch: flags['personal-branch'] || brain.setup().personalBranch,
      companyBranch: flags['company-branch'] || brain.setup().companyBranch });
  } else if (command === 'guard') {
    result = brain.guard(flags.remote, flags.url, fs.readFileSync(0, 'utf8'));
  } else if (command === 'status') {
    brain.ensureRoot();
    const pending = brain.json(brain.pendingFile, null);
    result = { root, setup: brain.setup(), baseline: brain.state(),
      review: pending ? { id: pending.id, destination: pending.company, changes: pending.changes.map(({ path, action }) => ({ path, action })) } : null,
      needsRecovery: fs.existsSync(brain.journalFile) };
  } else if (command === 'lock-status' || command === 'unlock') {
    const lockFile = path.join(brain.scratch, 'lock.json');
    const lock = brain.json(lockFile, null);
    let running = false;
    if (lock?.machine === os.hostname()) {
      try { process.kill(lock.pid, 0); running = true; } catch (error) { if (error.code !== 'ESRCH') running = true; }
    }
    if (command === 'unlock') {
      if (!lock || String(lock.pid) !== flags.pid || lock.machine !== os.hostname() || running) throw new Error('Cannot remove a live, foreign, or mismatched lock.');
      fs.unlinkSync(lockFile);
      result = { unlocked: true };
    } else result = { lock, running };
  } else if (command === 'publish') {
    result = brain.publish(flags.review);
    console.log(JSON.stringify(result, null, 2));
    try { result = { personalBackup: brain.backup() }; }
    catch (error) { result = { companyPublished: true, personalBackup: 'pending', reason: error.message }; process.exitCode = 1; }
  } else if (command === 'sync') {
    const personal = brain.backup();
    if (!brain.setup().company) result = { personal, company: { status: 'skipped' } };
    else {
      const company = brain.prepare();
      result = { personal, company };
      if (company.status !== 'conflict') result.personalAfterImport = brain.backup();
      else process.exitCode = 2;
    }
  } else result = brain[command]();
  console.log(JSON.stringify(result, null, 2));
  if (result?.status === 'conflict') process.exitCode = 2;
} catch (error) {
  console.error('Company OS: ' + error.message);
  process.exitCode = 1;
}
