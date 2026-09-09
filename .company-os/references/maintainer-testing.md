# Verify and release Company OS

Run npm test and npm run check from the kit root with Node 22 or newer. No npm dependencies are needed for the core sync tests.

Before release, run npm run check:release. It packages the current intended files into a disposable Git repository, clones it, removes the starter remote, checks the global installation plan, and runs the sync/recovery tests from that clean clone. It does not stage, commit, or push this checkout. The kit checker rejects archived kits, retired folders, and configured user state in the release template.

See the [2026-09-09 local verification record](verification-2026-09-09.md) for tested behavior and remaining app acceptance work.

## Automated verification

Use disposable local bare repositories, invented personal/company content, and isolated working trees. Cover:

- Only wiki/ and corrections/ reach company history; no personal ancestors or private commit messages.
- Bare pushes and root company pushes fail; personal guard rejects wrong destinations, tags, deletion, and rewinds.
- Review is required; changed local files or remote state invalidate the batch.
- Person 2 joins, imports company updates, and publishes nonconflicting changes.
- Same-file edits and edit/delete conflicts stop without overwriting local work.
- A personal clone restores private files and unpublished company edits, then reconciles newer company knowledge.
- Tracked ignored secrets, credentials in outgoing history, symlinks, case collisions, and untrusted Git/host configuration are rejected.
- Interrupted imports recover only without destroying newer edits.
- Locks prevent overlapping scheduled/interactive operations.
- Global distribution packages validate and the install plan uses Vercel global scope.
- Relative documentation links and active workflow routes resolve.

Tests inject local repository URLs through the library only. The production CLI accepts credential-free GitHub URLs and verifies private visibility/access through gh. GitHub authentication, repo creation, and account invitations require separate live acceptance tests; do not imply local tests cover them.

## App acceptance before claiming support

With invented data, record app/version, OS, mode, kit version, date, and observed results:

1. A person who can create an account and approve browser login completes setup without opening files or a terminal.
2. Create / join / skip choices resume correctly after interruption.
3. Global skills install through the CLI, appear in the actual host, and load context from a fresh conversation in another project.
4. Cowork's account-level adapter is tested separately from Claude Code's global skill discovery.
5. A scheduled run reads the actual local brain, backs up personal work, and leaves company publication pending.
6. The user reviews a batch, approves it, and the exact approved changes arrive at company.
7. A second computer restores from a personal repository URL, reconnects company, and preserves unpublished edits.
8. An existing user's obsolete hooks/tasks are removed deliberately during migration; the fresh starter contains no legacy entry points.

## Release order

The live handoff belongs to LeanLabs0/leanlabs-worker at content/unbound/brain.md. The reviewed replacement is staged at [.company-os/release/brain.md](../release/brain.md) in this kit. Do not treat the old Documents/unbound-web copy as another publishing source.

1. Review local changes and complete the tests and relevant app acceptance checks.
2. With publishing authorization, release kit 0.3.0/schema 3 to LeanLabs0/CompanyOS.
3. Clone the actual published starter into a disposable location and verify the release contract.
4. With publishing authorization, update leanlabs-worker/content/unbound/brain.md from the staged handoff and deploy using that repository's instructions.
5. Fetch the public handoff and run a clean installation against the actual published URLs.

A local build does not authorize commits, pushes, PRs, deployment, global installation on the maintainer's machine, or schedule registration. Keep those results reviewable and report which checks remain unverified.
