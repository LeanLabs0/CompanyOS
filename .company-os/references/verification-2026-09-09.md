# Local verification — 2026-09-09

Company OS 0.3.0, setup schema 3. Windows, Node 24.14.0, Git 2.53.0. Tests use invented data and disposable local bare repositories. They do not use the maintainer's real backup or company destinations.

Final release check: npm run check:release passed using a fresh Git clone of the 46-file starter. All 17 sync/recovery tests passed with no failures or skips (168 seconds). The clone passed the kit checker, starter remote removal, global installation preview, and a check that verification left its files unchanged. JavaScript syntax checks and git diff --check also passed.

The clean-clone check exposed Windows CRLF handling in the kit validator. The validator now normalizes line endings before checking text rules.

Follow-up verification, 2026-09-10: kit 0.3.1 makes GitHub CLI/npm and all three core skills explicit requirements, creates private repositories by default, and offers only GrillMe as an optional skill. The 46-file clean-clone release check and all 17 sync/recovery tests passed again; modified skill packages validated, and core/GrillMe installation previews used the global npx skills add flow. These checks do not establish that a new agent follows the revised onboarding correctly; that remains the user's app retest.

## Verified

- Company exports contain only wiki/ and corrections/, with no private Git ancestry or personal commit messages.
- Ordinary pushes and root company pushes fail after configuration. Personal guards reject wrong destinations, tags, deletions, rewinds, and recognizable credentials in outgoing history.
- Exact review batches become invalid when local files or the company branch change.
- Two people can join, import, and publish nonconflicting changes. Content conflicts preserve local edits.
- A personal clone restores private work and unpublished company edits, reconnects the company repository, and reconciles newer team knowledge.
- First join replaces untouched starter placeholders while protecting conflicting customized facts.
- Interrupted imports preserve newer edits; locks prevent concurrent helper operations.
- File/directory replacements and symlink rejection are exercised. Combined file/directory and case collisions stop before import.
- Kit metadata, workflow links, sharing seed, and four skill sources pass the kit checker. All four skills pass the skill validator.
- Vercel skills CLI 1.5.25 discovers exactly the four intended source packages. Installer previews request global scope and an explicit host target; owned source paths resolve relative to the brain.

## Not yet verified live

GitHub browser authentication, repository creation/invitations, real hosted pushes, fresh-session global discovery in ChatGPT and Claude, Cowork account-level skill delivery, and access to local files from a Cowork scheduled task still need app acceptance tests. Local repository tests do not establish these capabilities.

During local verification, no maintainer account was connected or changed, no global skills were installed, and no schedule was registered. The release cleanup removed the temporary old-kit archive, legacy scripts, and empty leftover folders. Previous committed starter versions remain in Git history. This record covers the local build; it does not certify the subsequent hosted release or app acceptance tests.

The replacement handoff is staged at [release/brain.md](../release/brain.md). Follow the [release sequence](maintainer-testing.md) before changing the public installation route.

## 2026-09-10: version 0.4.0 local verification

The clean-clone release check passed all 19 tests with no skips (269 seconds for the test suite). New coverage verifies reviewed company root documents, preservation of team-edited instructions, exclusion of personal destinations and personal root documents, and refusal to import root instructions through the recovery journal. Client cleanup removes unchanged starter files, retains customized files, personalizes the starter README, and leaves a backup that reconnects and syncs after restoration.

The actual 47-file starter clone was then reduced by nine starter-only files. Required runtime, license, state, and recovery files remained. Runtime syntax checks and the core global-skill installation preview passed after package.json and maintainer tools were removed. Updated sync and restore skills passed the skill validator. Tests use local bare repositories and invented data; no live client repository was changed.

The setup and handoff instructions now require visible active device codes and recommend company organization ownership while keeping personal backup individually owned. CLI organization listing/repository creation and the browser organization-creation route were checked against official GitHub documentation; these revised onboarding instructions have not yet had live app acceptance testing. All syncing clients must be upgraded before publishing the new company root documents. This verification did not publish the kit or handoff, install global skills, or register a schedule.

The subsequent optional-skills update adds a final menu of eight recommendations and discovery based on saved work. Five npx skills find queries were run; upstream source names were checked against GitHub. Pinned Vercel CLI discovery found Unslop, Find Skills, and the five selected marketing skills, including the current emails/social names. Installer previews confirmed global scope, explicit agent and skill names, and pinned source URLs. Kit checks, documentation links, whitespace checks, and the updated Company OS skill validator passed. No sync engine changes were made in this follow-up; the 19-test engine result above remains applicable. No optional skills were installed globally or published while editing the kit.
