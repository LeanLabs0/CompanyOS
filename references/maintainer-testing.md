# Testing and releasing the kit

`kit.json` identifies this kit revision. The public handoff is maintained outside this repository at `https://www.leanlabs.com/unbound/brain.md`.

## Automated checks

Run from this folder with Python 3.11 or newer:

```text
python scripts/check-kit.py
python -m unittest discover -s tests -v
```

The checks cover static routing and adapter consistency, default identity, optional composer behavior, and retired scripts stopping without mutations. They do not prove that an AI app follows the instructions or remembers across conversations.

## App acceptance checks

Use a disposable folder and invented client data. Record the app version, OS, mode, kit version, date, and observed results. A documentation review does not count as an app test.

| Scenario | Pass condition |
|---|---|
| ZIP install with no Git/Node/Python | Folder access is verified; no runtime or account is required; first task is saved. |
| No persistent folder access | Agent explains the limitation and gives a concrete recovery step; no false installation claim. |
| Skip writing samples or revenue details | Setup proceeds with unknowns and a useful task. |
| Interrupted setup | Existing answers are reused and no unrelated file is overwritten. |
| Return in a fresh conversation | Priority and a confirmed preference or identity fact are retrieved from disk with citations. |
| Existing brain receives the setup URL again | It resumes or loads existing context without reinstalling. |
| New client after a default brand | Active-client rules are applied and the default profile remains intact. |
| Explicit correction or "remember this" | Correct authoritative file and index are updated without another save permission request. |
| "Forget this" | Active rule and index are updated; limits of history/backups are stated when relevant. |
| Conflicting source | The conflict remains visible; unsupported claims do not become confirmed facts. |
| Backup and restore | Hidden adapters and a real deliverable survive restoration to a new folder. |
| Old Git sync hook | Retired script reports failure and performs no Git mutation. |

Prioritize ChatGPT Work Local and Claude Cowork on the operating systems clients use, then the CLI tools you advertise. Record untested paths honestly. Keep per-client installation results in their `context/setup.md`, not this shared template.

## Release order

1. Review changes and run the automated checks. Do the app acceptance checks before claiming app-specific verification.
2. Publish the kit changes to the public repository, then verify the downloadable ZIP contains `kit.json`, `AGENTS.md`, and `.agents/skills/onboard/SKILL.md` with setup schema 2 or newer.
3. Publish the matching handoff page from `unbound-web/brain.md`. It requires the new setup schema, so publishing it before the kit would direct clients to an outdated download.
4. Fetch both public URLs and run one clean install from the actual download.

Do not store personalized client data in a release or treat changing template files as an upgrade strategy for an existing client brain. See [backup and selective upgrades](backup.md).

## Verification record

2026-09-04, version 0.2.0, Windows local development environment:

- Structural checks passed for five canonical skills, their Claude/Gemini adapters, release metadata, and local Markdown links.
- All 12 maintenance behavior tests passed, including execution of the retired entry points under PowerShell, Git Bash, and Node in isolated folders.
- All ten canonical/adapter skill files passed the skill frontmatter validator. Script syntax checks passed.
- A ZIP smoke test extracted all 73 kit files without a `.git` directory and passed structural checks. A backup/restore round trip preserved all 76 file hashes after adding synthetic priority, memory, and deliverable examples, including hidden adapters. This verifies packaging, not AI behavior.
- Cross-app installation and fresh-conversation acceptance tests have not been run. These remain required before claiming app-specific verification.
