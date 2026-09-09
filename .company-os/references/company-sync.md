# Company sync contract

One durable brain folder has personal and company remotes. Personal contains the whole intended brain; company contains only wiki/ and corrections/. Git ignore rules exclude secrets and disposable work from personal backup. They are not a per-remote sharing filter.

The Node helper has no npm dependencies. It uses Git and, for live GitHub validation, the authenticated gh CLI.

## Boundaries

- Only credential-free github.com repository URLs are accepted by the production CLI.
- Both configured destinations must be private, writable, distinct, and different from the starter.
- Configure removes only a recognized starter origin. Unexpected remotes or custom hooks stop setup for review.
- Root company pushes have a blocked push URL; the pre-push guard permits only the configured personal branch and non-rewinding history.
- The helper's temporary repository contains company history only. It does not share objects with the personal repository or copy its .git data.
- Validate company history before checkout. Every reachable commit must contain only permitted files. A clean latest tree with private ancestors is rejected.
- Reject symlinks, gitlinks, nonportable/case-colliding paths, known credential files/patterns, and host instruction/configuration files that would auto-load from shared content.
- Ordinary company skills live under wiki/skills/ as reviewed source. Their presence does not install them or execute their scripts.
- Push exactly one reviewed company branch, without tags, force, mirrors, or arbitrary caller-supplied refspecs.
- Local hooks and configuration protect against mistakes; an unrestricted shell can bypass or change them. This is not a security sandbox for a malicious agent.

## Baseline and merge

sync-state.json stores the company identity and last imported/published commit. Fetch company history into a disposable .company-sync/company-* workspace and compare that baseline, the local shared files, and current company files.

Use whole-file equality first, then Git's text three-way merge for nonbinary files. Stop on unresolved content or edit/delete conflicts. For first join, seed-shared.json identifies the unmodified starter placeholders, so incoming company facts replace those placeholders without importing personalized private data.

A journal records the before/after import and next baseline. Recovery completes only when files still match those recorded states. Helper locks prevent overlapping operations; external editors must also avoid writing while reconciliation runs.

## Review

prepare imports nonconflicting incoming changes and records a content-addressed pending batch under the ignored sync workspace. It writes a full before/after review and returns its identity. Company publication is a separate command requiring that exact reviewed ID.

publish verifies payload integrity, current file digest, repository identity, branch, and unchanged company revision. It creates one company-only commit with a neutral company-only message. Concurrent remote changes reject the push or invalidate the review. Reprepare instead of forcing.

Review files are disposable and do not need recovery backup: the unpublished source files and company baseline are in personal backup. After a new-machine restore, create a fresh review.

## Personal backup

Check intended tracked/untracked files before staging. Scan newly outgoing commit trees for known credential patterns and prohibited file types, including tracked ignored secrets. Commit locally, fetch personal, fast-forward if possible, and push the explicitly configured branch. Divergence stops rather than discarding work.

Pattern scanning cannot detect arbitrary sensitive prose or every credential format. Keep secrets out of the brain, inspect the first backup, and preserve the user's sharing boundaries.

## Failure reporting

Commands emit structured JSON and nonzero exit codes for errors. Conflict results use exit code 2 in the CLI. A company push that succeeded followed by a failed personal backup is reported as published with backup pending. No helper changes a failed upload into a success claim.
