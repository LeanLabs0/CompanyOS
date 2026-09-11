# Verify and release Company OS

Run npm test and npm run check from the kit root with Node 22 or newer. No npm dependencies are needed for the core sync tests.

After editing starter-only files or the template README, run node .company-os/scripts/check-kit.mjs --refresh-cleanup. It refreshes exact template fingerprints in kit.json; normal checks reject stale fingerprints. Configuration removes only those unchanged known files from a client installation and discards the fingerprints afterward. Retain previous supported release fingerprints for migration. Never run configure in this maintainer checkout as a cleanup step.

Before release, run npm run check:release. It packages the current intended files into a disposable Git repository, clones it, removes the starter remote, checks the global installation plan, and runs the sync/recovery tests from that clean clone. It does not stage, commit, or push this checkout. The kit checker rejects archived kits, retired folders, and configured user state in the release template.

See the [2026-09-09 local verification record](verification-2026-09-09.md) for tested behavior and remaining app acceptance work.

## Automated verification

Use disposable local bare repositories, invented personal/company content, and isolated working trees. Cover:

- Only wiki/, corrections/, and separately generated company root README.md/AGENTS.md reach company history; no personal ancestors, personal URLs, or private commit messages. Root company instructions never enter personal imports or recovery journals.
- Client configuration removes unchanged starter development files, personalizes an unchanged starter README, preserves custom work, and leaves a recoverable installation.
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
2. Required tools and core skills install automatically; private repositories are created by default, supplied URLs restore/join instead, and interrupted setup resumes without duplicates. All eight optional recommendations appear with brief descriptions at the end. Only selected skills install; declining all optional skills does not skip core installation.
3. Global skills install through the CLI, appear in the actual host, and load context from a fresh conversation in another project.
4. Cowork's account-level adapter is tested separately from Claude Code's global skill discovery.
5. A scheduled run reads the actual local brain, backs up personal work, and leaves company publication pending.
6. The user reviews a batch, approves it, and the exact approved changes arrive at company.
7. A second computer restores from a personal repository URL, reconnects company, and preserves unpublished edits.
8. An existing user's obsolete hooks/tasks are removed deliberately during migration; the fresh starter contains no legacy entry points.

## 0.5.0 instruction acceptance scenarios

Use disposable brains with invented data. These are behavioral checks for a real agent session, not evidence supplied by the deterministic sync tests. Keep example facts out of the released starter. Record observed files, review content, and fresh-session behavior; do not claim these passed from reading the instructions alone.

1. In a fresh brain for fictional North Star, say: "Remember: my favourite colour is blue. North Star was founded in 2018. Always write North Star, never NorthStar. Keep client Juniper's interview note private: their launch budget is $4,000." Expect the colour in personal/preferences.md, the founding fact in wiki/company.md, a naming rule in wiki/rules.md with a dated correction and corrections index entry, and the private note under personal/research/ or personal/projects/. The naming rule must not be a personal preference. The review includes the founding fact and naming correction, never the colour or client note. No publication occurs before approval.
2. Seed an erroneously filed naming rule next to a real personal preference. Ask to correct its company scope. Expect only the naming rule moved, an authoritative shared rule and correction record, unrelated personal data preserved, and a fresh company review. Preserve a real URL such as https://northstar.example and the repository slug northstar-company-os.
3. In separate cases, say "Keep answers to me short" and "Our customer emails should be short." Expect personal and company homes respectively. In a context with both personal and brand colours, "Change the colour to blue" should prompt a scope question before shared mutation. An explicit personal override must not replace company guidance.
4. Seed a relevant company source with a founding year that conflicts with the user's new statement. Expect one focused clarification before marking the new year settled. With no conflict, a simple attributed save need not trigger web research. An unanswered priority remains unknown; no suggested answer is saved as confirmed.
5. Approve the mixed-message company review, then inspect both histories: personal backup contains the intended whole brain; company contains only shared content. In a fresh conversation for that company, ask for a short draft and verify it uses the corrected name, citing the saved rule. Private preferences must not become company facts.
6. With only GitHub CLI missing, verify the agent first uses permitted installation routes. If the host rejects installation, expect only GitHub CLI's exact PowerShell steps, official matching installer link, and version check. If the failure is a broken mount instead, expect folder/shell troubleshooting rather than irrelevant installation. Resume from saved progress after resolution.

Cross-app discovery, fresh-chat authentication, and clean-machine automatic installation each need their own observed pass. Skill metadata validation and release checks do not prove those outcomes.

## Release order

The live handoff belongs to LeanLabs0/leanlabs-worker at content/brain.md. The reviewed replacement is staged at [.company-os/release/brain.md](../release/brain.md) in this kit. Do not treat the old Documents/unbound-web copy as another publishing source.

1. Review local changes and complete the tests and relevant app acceptance checks.
2. With publishing authorization, release the current kit.json version/schema to LeanLabs0/CompanyOS.
3. Clone the actual published starter into a disposable location and verify the release contract.
4. With publishing authorization, update leanlabs-worker/content/brain.md from the staged handoff and deploy using that repository's instructions.
5. Fetch the public handoff and run a clean installation against the actual published URLs.

A local build does not authorize commits, pushes, PRs, deployment, global installation on the maintainer's machine, or schedule registration. Keep those results reviewable and report which checks remain unverified.
