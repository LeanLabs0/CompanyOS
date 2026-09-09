import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const MAX_FILE = 95 * 1024 * 1024;
export const STARTER = 'https://github.com/LeanLabs0/CompanyOS.git';
const BLOCKED_PUSH = 'company-os-disabled://use-company-os-sync';
const ZERO = /^0+$/;
export const hash = value => crypto.createHash('sha256').update(value).digest('hex');
export const digest = value => hash(JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)))));
export const encode = text => Buffer.from(text).toString('base64');
const equal = (a, b) => a === b;
const exists = p => fs.existsSync(p);

export function run(command, args, cwd, options = {}) {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith('GIT_')) delete env[key];
  }
  const result = spawnSync(command, args, {
    cwd, env: { ...env, GIT_TERMINAL_PROMPT: '0' }, encoding: 'utf8',
    maxBuffer: 128 * 1024 * 1024, windowsHide: true, ...options,
  });
  if (result.error) throw new Error(command + ' could not run: ' + result.error.message);
  if (result.status !== 0 && !options.allowFailure) {
    // URLs are credential-free; never print stdout, which may contain private file contents.
    throw new Error(command + ' failed (' + result.status + '): ' + String(result.stderr || '').slice(0, 1500));
  }
  return result;
}

export function atomicJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = file + '.' + crypto.randomUUID() + '.tmp';
  fs.writeFileSync(temp, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
  fs.renameSync(temp, file);
}

export function repoIdentity(url, allowLocal = false) {
  if (allowLocal && path.isAbsolute(url) && exists(url)) return fs.realpathSync(url);
  const match = /^(?:https:\/\/github\.com\/|git@github\.com:)([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?\/?$/.exec(url);
  if (!match || match[2] === '.' || match[2] === '..') {
    throw new Error('Use a credential-free GitHub repository URL, not a shell command, token, or URL with query parameters.');
  }
  return (match[1] + '/' + match[2]).toLowerCase();
}

export function validatePath(name, shared = false) {
  if (!name || name.includes('\\') || name.includes('\0') || /[\r\n]/.test(name) || path.posix.isAbsolute(name)) {
    throw new Error('Unsafe file path: ' + name);
  }
  for (const part of name.split('/')) {
    if (!part || part === '.' || part === '..' || /[<>:"|?*\x00-\x1f]/.test(part) ||
        /[. ]$/.test(part) || /^(?:\.git|con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(part)) {
      throw new Error('Unsafe or nonportable file path: ' + name);
    }
  }
  if (shared && !/^(wiki|corrections)\//.test(name)) throw new Error('Company content outside wiki/ or corrections/: ' + name);
  if (shared && name.split('/').some(part => /^(AGENTS(?:\.override)?\.md|CLAUDE\.md|GEMINI\.md|\.agents|\.claude|\.cursor|\.codex|\.gemini|\.github|\.gitattributes|\.gitignore|\.gitmodules|\.lfsconfig)$/i.test(part))) {
    throw new Error('Company content cannot install host instructions automatically: ' + name);
  }
}

export function checkContent(name, bytes) {
  if (bytes.length > MAX_FILE) throw new Error('File exceeds the 95 MiB Git backup limit: ' + name + '. Arrange a separate asset backup.');
  const base = path.posix.basename(name).toLowerCase();
  if ((base === '.env' || (base.startsWith('.env.') && base !== '.env.example')) ||
      /\.(pem|key|p12|pfx)$/i.test(base) ||
      /^(credentials(?:-[^.]+)?|tokens?)\.json$/i.test(base) ||
      /^(id_rsa|id_ed25519|\.npmrc|\.netrc|\.pypirc)$/.test(base)) {
    throw new Error('Credential-like file is not eligible for backup or sharing: ' + name);
  }
  const text = bytes.toString('utf8');
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text) ||
      /\bgh[pousr]_[A-Za-z0-9]{30,}\b/.test(text) ||
      /\bgithub_pat_[A-Za-z0-9_]{40,}\b/.test(text) ||
      /\bAKIA[A-Z0-9]{16}\b/.test(text) ||
      /https?:\/\/[^/\s:@]+:[^/\s@]+@github\.com/i.test(text)) {
    throw new Error('Possible credential detected in ' + name + '. Remove it and inspect history before publishing.');
  }
}

function validateSnapshot(snapshot, shared) {
  const folded = new Set();
  const prefixes = new Map();
  for (const [name, data] of Object.entries(snapshot)) {
    validatePath(name, shared);
    const components = name.split('/');
    for (let i = 1; i < components.length; i++) {
      if (Object.hasOwn(snapshot, components.slice(0, i).join('/'))) throw new Error('File/directory path collision: ' + name);
    }
    const key = name.toLowerCase();
    if (folded.has(key)) throw new Error('Case-colliding paths cannot sync across machines: ' + name);
    folded.add(key);
    const parts = name.split('/');
    for (let i = 1; i <= parts.length; i++) {
      const prefix = parts.slice(0, i).join('/');
      const prior = prefixes.get(prefix.toLowerCase());
      if (prior && prior !== prefix) throw new Error('Case-colliding path components: ' + name);
      prefixes.set(prefix.toLowerCase(), prefix);
    }
    checkContent(name, Buffer.from(data, 'base64'));
  }
}

export class CompanyOS {
  constructor(root, { allowLocal = false } = {}) {
    this.root = fs.realpathSync(root);
    this.allowLocal = allowLocal; // Tests inject this through the library; the production CLI never enables it.
    this.control = path.join(this.root, '.company-os');
    this.scratch = path.join(this.root, '.company-sync');
    this.setupFile = path.join(this.control, 'setup.json');
    this.stateFile = path.join(this.control, 'sync-state.json');
    this.pendingFile = path.join(this.scratch, 'pending.json');
    this.journalFile = path.join(this.scratch, 'journal.json');
    this.blobCache = new Map();
  }

  git(args, cwd = this.root, options = {}) {
    return run('git', ['-c', 'core.quotePath=false', ...args], cwd, options);
  }
  json(file, fallback = {}) { return exists(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback; }
  setup() { return this.json(this.setupFile, { schema: 3, personal: null, company: null, personalBranch: 'main', companyBranch: 'main' }); }
  state() { return this.json(this.stateFile, { schema: 1, company: null, head: null }); }
  ensureRoot() {
    const actual = this.git(['rev-parse', '--show-toplevel']).stdout.trim();
    if (fs.realpathSync(actual) !== this.root) throw new Error('CompanyOS must be its own Git working tree.');
    for (const folder of ['.company-os', '.company-sync']) {
      const target = path.join(this.root, folder);
      if (exists(target) && fs.lstatSync(target).isSymbolicLink()) throw new Error(folder + ' must not be a symlink.');
    }
  }
  withLock(fn, { recovery = false } = {}) {
    this.ensureRoot();
    fs.mkdirSync(this.scratch, { recursive: true });
    const lock = path.join(this.scratch, 'lock.json');
    let fd;
    try { fd = fs.openSync(lock, 'wx'); }
    catch { throw new Error('Another Company OS operation holds the lock. Run lock-status; do not remove a live lock.'); }
    fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, machine: os.hostname(), started: new Date().toISOString() }));
    try {
      if (!recovery && exists(this.journalFile)) throw new Error('An interrupted import needs recovery. Run recover before further sync.');
      return fn();
    } finally {
      fs.closeSync(fd);
      fs.unlinkSync(lock);
    }
  }
  verifyRepository(url) {
    const identity = repoIdentity(url, this.allowLocal);
    if (identity === repoIdentity(STARTER)) throw new Error('The starter repository is never a backup or company destination.');
    if (!this.allowLocal) {
      const metadata = JSON.parse(run('gh', ['api', 'repos/' + identity], this.root).stdout);
      if (!metadata.private) throw new Error('Company OS requires a private repository: ' + identity);
      if (metadata.archived) throw new Error('Repository is archived: ' + identity);
      if (!metadata.permissions?.push) throw new Error('Write access is not available yet. Accept the invitation or ask the repository owner.');
    }
    return identity;
  }
  verifyRemote(name, configured) {
    if (!configured) throw new Error(name + ' is not configured.');
    const fetchUrls = this.git(['remote', 'get-url', '--all', name]).stdout.trim().split('\n');
    if (fetchUrls.length !== 1 || repoIdentity(fetchUrls[0], this.allowLocal) !== repoIdentity(configured.url, this.allowLocal)) {
      throw new Error(name + ' remote differs from the reviewed setup. Reconfigure explicitly.');
    }
    if (name === 'personal') {
      const pushUrls = this.git(['remote', 'get-url', '--push', '--all', name]).stdout.trim().split('\n');
      if (pushUrls.length !== 1 || repoIdentity(pushUrls[0], this.allowLocal) !== repoIdentity(configured.url, this.allowLocal)) {
        throw new Error('Unexpected personal push destination.');
      }
    } else {
      const push = this.git(['remote', 'get-url', '--push', '--all', name]).stdout.trim();
      if (push !== BLOCKED_PUSH) throw new Error('Company push protection is missing. Run configure before syncing.');
    }
    this.verifyRepository(configured.url);
  }
  configure({ personal, company, personalBranch = 'main', companyBranch = 'main' }) {
    return this.withLock(() => {
      const previous = this.setup();
      const next = { ...previous, schema: 3, personalBranch, companyBranch };
      for (const branch of [personalBranch, companyBranch]) {
        if (!/^[A-Za-z0-9][A-Za-z0-9/_-]*$/.test(branch)) throw new Error('Use a simple branch name.');
        this.git(['check-ref-format', 'refs/heads/' + branch]);
      }
      for (const [name, url] of Object.entries({ personal, company })) {
        if (url === undefined) continue;
        next[name] = url === 'skip' ? null : { url, identity: this.verifyRepository(url) };
      }
      if (next.personal && next.company && next.personal.identity === next.company.identity) {
        throw new Error('Personal backup and company brain must be different repositories.');
      }
      if (previous.company && next.company?.identity !== previous.company.identity) {
        throw new Error('Switching company brains needs a reviewed migration. Existing wiki content must not be sent to a new company.');
      }
      const names = this.git(['remote']).stdout.trim().split('\n').filter(Boolean);
      for (const name of names) {
        if (['personal', 'company'].includes(name)) continue;
        const url = this.git(['remote', 'get-url', name]).stdout.trim();
        if (name !== 'origin' || repoIdentity(url, this.allowLocal) !== repoIdentity(STARTER)) {
          throw new Error('Unexpected remote ' + name + '. Preserve and review it before setup.');
        }
      }
      const hooksPath = this.git(['config', '--get', 'core.hooksPath'], this.root, { allowFailure: true }).stdout.trim();
      const expectedHooks = path.join(this.control, 'scripts', 'hooks');
      if (!exists(path.join(expectedHooks, 'pre-push'))) throw new Error('The Company OS push guard is missing. Repair the kit before setup.');
      if (hooksPath && path.resolve(this.root, hooksPath) !== expectedHooks) throw new Error('Existing hooksPath needs a reviewed integration.');
      if (!hooksPath && exists(path.join(this.root, '.git', 'hooks', 'pre-push'))) throw new Error('Existing pre-push hook needs a reviewed integration.');
      if (names.includes('origin')) this.git(['remote', 'remove', 'origin']);
      for (const name of ['personal', 'company']) {
        if (names.includes(name)) this.git(['remote', 'remove', name]);
        if (!next[name]) continue;
        this.git(['remote', 'add', name, next[name].url]);
        this.git(['config', '--local', 'remote.' + name + '.tagOpt', '--no-tags']);
        if (name === 'company') this.git(['config', '--local', 'remote.company.pushurl', BLOCKED_PUSH]);
      }
      this.git(['config', '--local', 'push.default', 'nothing']);
      this.git(['config', '--local', 'push.autoSetupRemote', 'false']);
      this.git(['config', '--local', 'push.followTags', 'false']);
      this.git(['config', '--local', 'core.hooksPath', expectedHooks]);
      fs.chmodSync(path.join(expectedHooks, 'pre-push'), 0o755);
      this.git(['config', '--local', 'protocol.company-os-disabled.allow', 'never']);
      atomicJson(this.setupFile, next);
      return { configured: next, message: 'Remote protections installed. No files were uploaded.' };
    });
  }

  safeFile(name) {
    validatePath(name);
    let cursor = this.root;
    for (const part of name.split('/')) {
      cursor = path.join(cursor, part);
      if (exists(cursor) && fs.lstatSync(cursor).isSymbolicLink()) throw new Error('Symlinks cannot be backed up or imported: ' + name);
    }
    return cursor;
  }
  sharedSnapshot() {
    const result = {};
    const walk = relative => {
      const location = this.safeFile(relative);
      if (!exists(location)) return;
      if (!fs.statSync(location).isDirectory()) throw new Error(relative + ' must be a directory.');
      for (const entry of fs.readdirSync(location, { withFileTypes: true })) {
        const name = relative + '/' + entry.name;
        const full = this.safeFile(name);
        if (entry.isSymbolicLink()) throw new Error('Symlink in company content: ' + name);
        if (entry.isDirectory()) walk(name);
        else if (entry.isFile()) {
          if (fs.statSync(full).size > MAX_FILE) throw new Error('Shared file exceeds size limit: ' + name);
          result[name] = fs.readFileSync(full).toString('base64');
        } else throw new Error('Nonregular file in company content: ' + name);
      }
    };
    walk('wiki'); walk('corrections');
    validateSnapshot(result, true);
    return result;
  }
  tree(cwd, commit, shared = true) {
    if (!commit) return {};
    if (!/^[0-9a-f]{40,64}$/.test(commit)) throw new Error('Invalid recorded Git revision.');
    const entries = this.git(['ls-tree', '-r', '-z', commit], cwd).stdout.split('\0').filter(Boolean);
    const snapshot = {};
    for (const entry of entries) {
      const split = entry.indexOf('\t');
      const [mode, type, oid] = entry.slice(0, split).split(' ');
      const name = entry.slice(split + 1);
      validatePath(name, shared);
      if (type !== 'blob' || !['100644', '100755'].includes(mode)) throw new Error('Symlink or nested repository in history: ' + name);
      if (!this.blobCache.has(oid)) {
        const size = Number(this.git(['cat-file', '-s', oid], cwd).stdout.trim());
        if (size > MAX_FILE) throw new Error('Oversized file in history: ' + name);
        this.blobCache.set(oid, this.git(['cat-file', 'blob', oid], cwd, { encoding: null }).stdout);
      }
      const bytes = this.blobCache.get(oid);
      checkContent(name, bytes);
      snapshot[name] = bytes.toString('base64');
    }
    validateSnapshot(snapshot, shared);
    return snapshot;
  }
  companyWorkspace() {
    const setup = this.setup();
    this.verifyRemote('company', setup.company);
    const directory = fs.mkdtempSync(path.join(this.scratch, 'company-'));
    this.git(['init', '-b', setup.companyBranch, directory]);
    this.git(['config', 'user.name', 'Company OS'], directory);
    this.git(['config', 'user.email', 'company-os@users.noreply.github.com'], directory);
    this.git(['config', 'core.hooksPath', path.join(directory, '.disabled-hooks')], directory);
    this.git(['config', 'core.attributesFile', path.join(directory, '.disabled-attributes')], directory);
    this.git(['config', 'core.autocrlf', 'false'], directory);
    this.git(['remote', 'add', 'company', setup.company.url], directory);
    for (const direction of [[], ['--push']]) {
      const urls = this.git(['remote', 'get-url', ...direction, '--all', 'company'], directory).stdout.trim().split('\n');
      if (urls.length !== 1 || repoIdentity(urls[0], this.allowLocal) !== setup.company.identity) {
        throw new Error('Company workspace has an unexpected effective Git destination. Review global Git URL settings.');
      }
    }
    const ref = 'refs/heads/' + setup.companyBranch;
    const advertised = this.git(['ls-remote', '--heads', 'company'], directory).stdout.trim().split('\n').filter(Boolean);
    const match = advertised.find(line => line.split('\t')[1] === ref);
    if (!match && advertised.length) throw new Error('Configured company branch does not exist. Inspect the repository before joining.');
    let head = null;
    if (match) {
      this.git(['fetch', '--no-tags', 'company', ref], directory);
      head = this.git(['rev-parse', 'FETCH_HEAD'], directory).stdout.trim();
      // Validate all reachable company history, not only its latest tree.
      for (const commit of this.git(['rev-list', head], directory).stdout.trim().split('\n')) this.tree(directory, commit, true);
      this.git(['checkout', '-B', setup.companyBranch, head], directory);
    }
    return { directory, head, snapshot: this.tree(directory, head), setup };
  }
  cleanWorkspace(directory) {
    const resolved = fs.realpathSync(directory);
    if (!resolved.startsWith(fs.realpathSync(this.scratch) + path.sep) || !path.basename(resolved).startsWith('company-')) {
      throw new Error('Refusing to remove a workspace outside .company-sync.');
    }
    fs.rmSync(resolved, { recursive: true, force: true });
  }
  merge(base, local, remote) {
    const result = {}, conflicts = [];
    const names = [...new Set([...Object.keys(base), ...Object.keys(local), ...Object.keys(remote)])].sort();
    for (const name of names) {
      const b = base[name], l = local[name], r = remote[name];
      let merged;
      if (equal(l, r)) merged = l;
      else if (equal(l, b)) merged = r;
      else if (equal(r, b)) merged = l;
      else if (b !== undefined && l !== undefined && r !== undefined &&
               [b, l, r].every(x => !Buffer.from(x, 'base64').includes(0))) {
        const directory = fs.mkdtempSync(path.join(this.scratch, 'company-merge-'));
        try {
          for (const [file, value] of [['local', l], ['base', b], ['remote', r]]) fs.writeFileSync(path.join(directory, file), Buffer.from(value, 'base64'));
          const merge = this.git(['-c', 'merge.conflictStyle=diff3', 'merge-file', '-p', 'local', 'base', 'remote'], directory, { allowFailure: true, encoding: null });
          if (merge.status === 0) merged = merge.stdout.toString('base64');
          else { conflicts.push(name); continue; }
        } finally { this.cleanWorkspace(directory); }
      } else { conflicts.push(name); continue; }
      if (merged !== undefined) result[name] = merged;
    }
    // Independently valid local/remote trees can combine into a file/directory collision.
    // Report it before creating an import journal or changing either working tree.
    const foldedNames = new Map();
    for (const name of Object.keys(result)) {
      const prior = foldedNames.get(name.toLowerCase());
      if (prior && prior !== name) conflicts.push(prior, name);
      foldedNames.set(name.toLowerCase(), name);
    }
    const prefixes = new Map();
    for (const name of Object.keys(result)) {
      const parts = name.split('/');
      for (let i = 1; i <= parts.length; i++) {
        const prefix = parts.slice(0, i).join('/');
        const prior = prefixes.get(prefix.toLowerCase());
        if (prior && prior.prefix !== prefix) conflicts.push(prior.name, name);
        prefixes.set(prefix.toLowerCase(), { prefix, name });
        const ancestor = foldedNames.get(prefix.toLowerCase());
        if (i < parts.length && ancestor) conflicts.push(ancestor, name);
      }
    }
    return { snapshot: result, conflicts: [...new Set(conflicts)].sort() };
  }
  writeShared(name, data) {
    const file = this.safeFile(name);
    if (data === undefined) {
      if (exists(file)) fs.unlinkSync(file);
      return;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    this.safeFile(name);
    if (exists(file) && fs.statSync(file).isDirectory()) fs.rmdirSync(file); // Only an empty directory can be replaced.
    const temp = file + '.' + crypto.randomUUID() + '.tmp';
    fs.writeFileSync(temp, Buffer.from(data, 'base64'));
    fs.renameSync(temp, file);
  }
  applyImport(before, after, state) {
    if (digest(this.sharedSnapshot()) !== digest(before)) throw new Error('Company files changed while preparing. Retry with the current files.');
    validateSnapshot(after, true);
    atomicJson(this.journalFile, { before, after, state });
    this.finishImport();
  }
  finishImport() {
    const journal = this.json(this.journalFile, null);
    if (!journal) return { recovered: false };
    validateSnapshot(journal.before, true);
    validateSnapshot(journal.after, true);
    const current = this.sharedSnapshot();
    const names = new Set([...Object.keys(journal.before), ...Object.keys(journal.after), ...Object.keys(current)]);
    for (const name of names) {
      if (!equal(current[name], journal.before[name]) && !equal(current[name], journal.after[name])) {
        throw new Error('Recovery found newer edits in ' + name + '. Preserve them and resolve against .company-sync/journal.json.');
      }
    }
    for (const name of names) {
      if (journal.after[name] === undefined && current[name] !== undefined) this.writeShared(name, undefined);
    }
    // Remove empty old directories before file/directory transitions, never recursively delete content.
    const parents = [...names].flatMap(name => {
      const parts = name.split('/'); return parts.slice(1).map((_, i) => parts.slice(0, i + 1).join('/'));
    }).filter(name => name.includes('/')).sort((a, b) => b.length - a.length);
    for (const name of new Set(parents)) {
      const full = this.safeFile(name);
      if (exists(full) && fs.statSync(full).isDirectory() && fs.readdirSync(full).length === 0) fs.rmdirSync(full);
    }
    for (const name of names) {
      if (journal.after[name] !== undefined && !equal(current[name], journal.after[name])) this.writeShared(name, journal.after[name]);
    }
    atomicJson(this.stateFile, journal.state);
    fs.unlinkSync(this.journalFile);
    return { recovered: true };
  }
  recover() { return this.withLock(() => this.finishImport(), { recovery: true }); }

  prepare() {
    return this.withLock(() => {
      const workspace = this.companyWorkspace();
      try {
        const local = this.sharedSnapshot(), state = this.state();
        if (state.company && state.company !== workspace.setup.company.identity) throw new Error('Sync baseline belongs to another company.');
        if (state.head && (!workspace.head ||
            this.git(['merge-base', '--is-ancestor', state.head, workspace.head], workspace.directory, { allowFailure: true }).status !== 0)) {
          throw new Error('Company history no longer contains the recorded baseline. Stop and review recovery; never overwrite remote history.');
        }
        const base = !state.company && workspace.head
          ? this.json(path.join(this.control, 'seed-shared.json'), {})
          : this.tree(workspace.directory, state.head);
        const merged = this.merge(base, local, workspace.snapshot);
        if (merged.conflicts.length) {
          if (exists(this.pendingFile)) fs.unlinkSync(this.pendingFile);
          atomicJson(path.join(this.scratch, 'conflicts.json'), { base, local, remote: workspace.snapshot, paths: merged.conflicts, remoteHead: workspace.head });
          return { status: 'conflict', paths: merged.conflicts, message: 'No shared files were overwritten and nothing was published. Ask which content is correct, edit those files, then prepare again.' };
        }
        this.applyImport(local, merged.snapshot, { schema: 1, company: workspace.setup.company.identity, head: workspace.head });
        const changes = [];
        for (const name of [...new Set([...Object.keys(workspace.snapshot), ...Object.keys(merged.snapshot)])].sort()) {
          if (equal(workspace.snapshot[name], merged.snapshot[name])) continue;
          changes.push({ path: name, action: workspace.snapshot[name] === undefined ? 'add' : merged.snapshot[name] === undefined ? 'delete' : 'edit',
            before: workspace.snapshot[name] ?? null, after: merged.snapshot[name] ?? null });
        }
        if (!changes.length) {
          if (exists(this.pendingFile)) fs.unlinkSync(this.pendingFile);
          return { status: 'current', imported: digest(local) !== digest(merged.snapshot), destination: workspace.setup.company.identity };
        }
        const pending = { schema: 1, company: workspace.setup.company.identity, branch: workspace.setup.companyBranch,
          remoteHead: workspace.head, snapshot: merged.snapshot, localDigest: digest(merged.snapshot), changes };
        pending.id = hash(JSON.stringify(pending));
        atomicJson(this.pendingFile, pending);
        this.writeReview(pending);
        return { status: 'review', id: pending.id, destination: pending.company, branch: pending.branch,
          changes: changes.map(({ path, action }) => ({ path, action })), review: path.join(this.scratch, 'review.md'),
          message: 'Personal backup is separate. No company changes have been published. Ask the user to approve this exact batch.' };
      } finally { this.cleanWorkspace(workspace.directory); }
    });
  }
  writeReview(pending) {
    const lines = ['# Company sharing review', '', 'Destination: ' + pending.company, 'Branch: ' + pending.branch,
      'Batch: ' + pending.id, '', 'Only wiki/ and corrections/ will be published. Skill sources are not installed by syncing.', ''];
    for (const change of pending.changes) {
      lines.push('## ' + change.action + ': ' + change.path, '');
      for (const side of ['before', 'after']) {
        const data = change[side];
        if (data === null) { lines.push(side + ': absent', ''); continue; }
        const bytes = Buffer.from(data, 'base64');
        lines.push(side + ' (' + bytes.length + ' bytes, SHA-256 ' + hash(bytes) + '):', '');
        if (bytes.includes(0) || bytes.length > 200000) lines.push('Binary or large file. Inspect the exact file before approving.', '');
        else lines.push(...bytes.toString('utf8').split('\n').map(line => '    ' + line), '');
      }
    }
    fs.writeFileSync(path.join(this.scratch, 'review.md'), lines.join('\n'));
  }
  publish(reviewId) {
    return this.withLock(() => {
      const pending = this.json(this.pendingFile, null);
      if (!pending || !reviewId || reviewId !== pending.id) throw new Error('A current, explicitly approved review ID is required.');
      const { id, ...payload } = pending;
      if (hash(JSON.stringify(payload)) !== id) throw new Error('Review contents changed. Prepare a new batch.');
      const setup = this.setup();
      if (pending.company !== setup.company?.identity || pending.branch !== setup.companyBranch) throw new Error('Review destination changed.');
      if (digest(this.sharedSnapshot()) !== pending.localDigest) throw new Error('Files changed after review. Prepare and review a fresh batch.');
      const workspace = this.companyWorkspace();
      try {
        if (workspace.head !== pending.remoteHead) throw new Error('Company changed after review. Prepare a new review; nothing was pushed.');
        validateSnapshot(pending.snapshot, true);
        for (const name of new Set([...Object.keys(workspace.snapshot), ...Object.keys(pending.snapshot)])) {
          const file = path.join(workspace.directory, name);
          if (pending.snapshot[name] === undefined) { if (exists(file)) fs.unlinkSync(file); }
        }
        const oldParents = Object.keys(workspace.snapshot).flatMap(name => {
          const parts = name.split('/');
          return parts.slice(1).map((_, i) => parts.slice(0, i + 1).join('/'));
        }).filter(name => name.includes('/')).sort((a, b) => b.length - a.length);
        for (const name of new Set(oldParents)) {
          const folder = path.join(workspace.directory, name);
          if (exists(folder) && fs.statSync(folder).isDirectory() && fs.readdirSync(folder).length === 0) fs.rmdirSync(folder);
        }
        for (const [name, data] of Object.entries(pending.snapshot)) {
          const file = path.join(workspace.directory, name);
          fs.mkdirSync(path.dirname(file), { recursive: true });
          if (exists(file) && fs.statSync(file).isDirectory()) fs.rmdirSync(file);
          fs.writeFileSync(file, Buffer.from(data, 'base64'));
        }
        this.git(['add', '--all', '--', 'wiki', 'corrections'].filter((arg, index) => index < 3 || exists(path.join(workspace.directory, arg)) || Object.keys(workspace.snapshot).some(n => n.startsWith(arg + '/'))), workspace.directory);
        this.git(['commit', '-m', 'Company OS: publish reviewed company knowledge'], workspace.directory);
        const head = this.git(['rev-parse', 'HEAD'], workspace.directory).stdout.trim();
        if (digest(this.tree(workspace.directory, head)) !== digest(pending.snapshot)) throw new Error('Export differs from the approved files.');
        // Only this isolated repository can publish company content. Never push from this.root.
        this.git(['-c', 'push.followTags=false', 'push', 'company', 'HEAD:refs/heads/' + pending.branch], workspace.directory);
        atomicJson(this.stateFile, { schema: 1, company: pending.company, head });
        fs.unlinkSync(this.pendingFile);
        return { status: 'published', company: pending.company, head, message: 'Run personal backup to save the updated sync baseline.' };
      } finally { this.cleanWorkspace(workspace.directory); }
    });
  }

  scanPersonalFiles() {
    const names = this.git(['ls-files', '-z', '--cached', '--others', '--exclude-standard']).stdout.split('\0').filter(Boolean);
    const snapshot = {};
    for (const name of new Set(names)) {
      const file = this.safeFile(name);
      if (!exists(file)) continue;
      if (!fs.statSync(file).isFile()) throw new Error('Nested repository or nonregular personal file: ' + name);
      const bytes = fs.readFileSync(file);
      checkContent(name, bytes);
      snapshot[name] = bytes.toString('base64');
    }
    validateSnapshot(snapshot, false);
  }
  guard(remoteName, remoteUrl, input) {
    const setup = this.setup();
    if (remoteName !== 'personal' || !setup.personal) throw new Error('Only explicit personal pushes are allowed from the full brain. Use the company helper.');
    if (repoIdentity(remoteUrl, this.allowLocal) !== setup.personal.identity) throw new Error('Wrong personal push destination.');
    this.verifyRemote('personal', setup.personal);
    for (const line of input.trim().split('\n').filter(Boolean)) {
      const [localRef, localOid, remoteRef, remoteOid] = line.split(/\s+/);
      if (ZERO.test(localOid) || remoteRef !== 'refs/heads/' + setup.personalBranch || localRef.startsWith('refs/tags/')) {
        throw new Error('Only the configured personal branch may be pushed; no deletions or tags.');
      }
      if (!ZERO.test(remoteOid) && this.git(['merge-base', '--is-ancestor', remoteOid, localOid], this.root, { allowFailure: true }).status !== 0) {
        throw new Error('Personal history diverged. Force pushes are not allowed.');
      }
      const revisions = this.git(['rev-list', localOid, ...(ZERO.test(remoteOid) ? [] : ['^' + remoteOid])]).stdout.trim().split('\n').filter(Boolean);
      for (const commit of revisions) this.tree(this.root, commit, false);
    }
    return { allowed: true };
  }
  backup() {
    return this.withLock(() => {
      const setup = this.setup();
      if (!setup.personal) return { status: 'skipped', message: 'Personal backup is not configured. Local work is not protected against laptop loss.' };
      this.verifyRemote('personal', setup.personal);
      const branch = this.git(['branch', '--show-current']).stdout.trim();
      if (branch !== setup.personalBranch) throw new Error('Backup must run on the configured personal branch, not a detached or different branch.');
      this.scanPersonalFiles();
      this.git(['add', '--all']);
      if (this.git(['diff', '--cached', '--quiet'], this.root, { allowFailure: true }).status !== 0) {
        this.git(['commit', '-m', 'Company OS: back up saved work']);
      }
      const ref = 'refs/heads/' + setup.personalBranch;
      const remote = this.git(['ls-remote', '--heads', 'personal', ref]).stdout.trim();
      let remoteHead = null;
      if (remote) {
        this.git(['fetch', '--no-tags', 'personal', ref]);
        remoteHead = this.git(['rev-parse', 'FETCH_HEAD']).stdout.trim();
        const local = this.git(['rev-parse', 'HEAD']).stdout.trim();
        if (local !== remoteHead) {
          if (this.git(['merge-base', '--is-ancestor', local, remoteHead], this.root, { allowFailure: true }).status === 0) {
            this.git(['merge', '--ff-only', remoteHead]);
            // A restored commit may change destinations. Stop if the identity moved.
            if (this.setup().personal?.identity !== setup.personal.identity || this.setup().company?.identity !== setup.company?.identity) {
              throw new Error('Repository identities changed in the incoming personal backup. Review before continuing.');
            }
          } else if (this.git(['merge-base', '--is-ancestor', remoteHead, local], this.root, { allowFailure: true }).status !== 0) {
            throw new Error('Both machines have unpublished personal changes. Local work is committed; resolve the divergent histories before syncing company content.');
          }
        }
      }
      const head = this.git(['rev-parse', 'HEAD']).stdout.trim();
      // Guard explicitly as well as through pre-push, including when tests use a stub hook.
      this.guard('personal', setup.personal.url, 'HEAD ' + head + ' ' + ref + ' ' + (remoteHead || '0'.repeat(40)));
      this.git(['-c', 'push.followTags=false', 'push', 'personal', 'HEAD:' + ref]);
      return { status: 'backed-up', destination: setup.personal.identity, head };
    });
  }
}
