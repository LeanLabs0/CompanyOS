---
name: prime
description: Load saved context when starting work in this second brain, returning in a new conversation, or asking to get up to speed. Verify saved recall when requested.
---

# Load the brain

Read from the connected folder, not recollections from another chat. Paths below are relative to the kit root.

1. Read `AGENTS.md` and `context/setup.md` if present. Missing setup state is normal for an older brain. If the folder cannot be read, explain how to reconnect it using `references/app-setup.md`. Do not invent saved context.
2. Read `memory/MEMORY.md`, then the actual files for global standing preferences and preferences relevant to this task. The index is a set of pointers, not the full rules. Respect each memory's scope.
3. Read relevant `context/` files, especially current priorities. Load personal voice samples only for personal writing.
4. Determine the active brand from the user's task. Otherwise read `companies/.pinned` if present. Read that brand's facts and flavor; for writing, load `rules/READ-THIS-FIRST.md` and approved rules matching that brand. Never apply another client's rules merely because they were loaded earlier.
5. Read the newest relevant entries in `decisions/log.md` and `wiki/log.md`. Use `projects/README.md` to locate work. Read the wiki index when the task needs its knowledge.
6. Read `connections.md` only if external tools matter. Check access before claiming a connection works. Do not run Git pulls, sync scripts, or background maintenance at session start.

Continue with the user's task after loading. Do not stop for readiness approval. If they only asked to get up to speed, summarize the priority, active brand, recent relevant change, and missing context affecting work.

## Fresh-conversation recall check

When the return prompt requests a recall check, retrieve the saved priority and a confirmed preference (or identity fact if none exists), citing each file. Compare with the setup record, not invented expectations.

Only mark setup `verified` if this is a fresh conversation relative to initial setup and both items were retrieved from disk. Record the date, app/mode, folder, and file paths in `context/setup.md`. If that session boundary cannot be established, report successful readback and leave fresh-session verification pending. A user-reported pass in another app must be labeled as such.

If files exist but were not discovered automatically, reading `AGENTS.md` explicitly is valid recovery. Save the working return instructions. Claim automatic loading only when observed.
