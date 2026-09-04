---
name: audit
description: Check whether this second brain can retrieve saved context, support useful work, and recover its files. Use for a quick usefulness check or when the user asks whether their brain is working.
---

# Check whether the brain works

Assess the user's actual needs. A brain with local documents, no Git, and no connected services can work well. Do not reward counts of files, skills, connections, or autonomous jobs.

Read `AGENTS.md`, `context/setup.md` if present, current priorities, the memory index and relevant files, and the active brand's facts and rules. Inspect project/source indexes when checking the work they support. Paths are relative to the kit root.

## Checks

| Check | Evidence |
|---|---|
| Recall | Retrieve a priority and confirmed preference or identity fact from files. Note whether this is a fresh-session test or same-session readback. |
| Useful work | Find or produce a small answer grounded in the user's actual task and sources. Label a draft or missing information honestly. |
| Source quality | Check a material claim's source/date and whether conflicting evidence is represented. |
| Correct brand | Confirm the active client and load only applicable approved brand rules. |
| Recovery | Check recorded backup method, included deliverables and hidden files, last verified restore, and known exclusions. |
| Needed connections | If a task needs an external system, distinguish configured from successfully tested access. Otherwise mark not needed. |

Use `verified`, `needs attention`, `not tested`, or `not needed` for each check. Do not call backup verified from a configured service alone, or scheduled work working from a skill name. Do not run external writes or change files just to improve a score.

Report the most consequential finding first, then a compact evidence table and up to three concrete next steps. Cite paths. No numerical maturity score or required automation level.

This review is read-only unless the user also requested fixes. Existing authorization to fix applies; do not demand another approval for ordinary corrections. Offer a dated report in `audits/` if keeping a comparison would help. For a detailed routing and freshness review, use the os-audit workflow.
