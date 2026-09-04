---
name: os-audit
description: Review this brain for stale facts, conflicting rules, missing sources, broken routing, and duplicate knowledge. Use when asked to clean up, find drift, or investigate why saved information is missed.
---

# Check the brain's information

Read the root `AGENTS.md` and any scoped instructions before inspecting content. Start with a recent report if one exists, rechecking findings that could have changed. Paths below are relative to the kit root.

Review first; apply fixes if the user has already asked for them. Otherwise propose a small batch of fixes. Do not delete source material or merge contested claims without resolving their meaning.

## Review

1. **Routing:** Check links in the manual, memory index, wiki index, and project registry against disk. Open actual memory files rather than treating the index as their contents. Distinguish expected onboarding-created files from broken references in an installed brain.
2. **Freshness:** Check source dates, confirmation dates, and any promised refresh cadence. A dated export is a snapshot, not live data. On-demand material is not stale merely because it is old. Report dates per source; do not invent one cutoff date for the whole brain.
3. **Conflicts:** Find duplicate current facts and contradictory instructions. Use the manual's authority table. Distinguish a draft, a source's claim, and a user-confirmed rule. Trace a brand preference from its intake evidence to its approved rule file.
4. **Scope:** Verify brand rule files name their scope, project outputs identify the client, and the default brand does not silently override an explicitly named one. Global instructions should not contain private details from one client.
5. **Retrieval:** Pick a few actual user questions and follow the indexes to relevant sources. Look for missing links, obsolete summaries, or inaccessible files. Do not penalize the folder merely for having fewer files or a different valid organization.
6. **Recovery:** Inspect backup evidence and exclusions, including `projects/`, hidden instruction folders, and any separate repositories. No Git is not a defect if another recovery method works. Do not print secret values. Read a file's role and references before proposing moves.
7. **Routines, if any:** Verify jobs the user actually expects to run. Do not recommend background jobs for work the user prefers to request manually. Check obsolete sync registrations if migrating an older kit.

## Report and fixes

Lead with what could cause a wrong answer or lost work. Give each finding a path, evidence, impact, and smallest practical fix. Mark unchecked areas as untested. Compare with a prior report when useful.

Update indexes alongside approved moves or corrections. Archive obsolete material by default; honor explicit deletion requests and explain separate backup/history copies where relevant. Preserve raw sources and append corrections to the decisions log rather than rewriting history.

Save a report in `audits/os-audit-<date>.md` only when requested or already authorized. Never present a written report, an enabled job, or a configured backup as proof the underlying operation succeeded.
