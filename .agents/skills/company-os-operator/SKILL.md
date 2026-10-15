---
name: company-os-operator
description: Set up, change, or turn off the Company OS operator, an optional scheduled routine that syncs the brain, pulls recent meetings and chat into it, and leaves shared changes waiting for review. Use when the user asks to set up the operator, schedule their brain, keep it up to date automatically, or change or stop that routine.
---

# Company OS operator

The operator has two parts. This skill sets it up once. The scheduled routine it creates then runs on its own and follows the brain's .company-os/workflows/operator.md each time. Turning the operator on authorizes the private saves and local wiki drafts that workflow describes. Company publication still waits for the user's review of each batch, and the operator sends no messages unless the user turns on a notice to themselves.

## Discover first

Resolve the brain from an explicit path or ~/.company-os/brain.json. Read its AGENTS.md, .company-os/setup.json, .company-os/references/scheduling.md, .company-os/workflows/operator.md, personal/about.md, and wiki/index.md. Read .company-os/schedule.md if it exists: an existing recipe means change or replace, never a second routine. Do not ask for anything these files already answer.

Setup must be complete first, with configured repositories and a working sync. If it is not, say what is missing and stop.

## Check connections instead of asking

Look at the tools available in this session and run one read-only call per candidate connector, in one parallel batch:

| Kind | Examples | Read-only check |
|---|---|---|
| Meeting notes and transcripts | Granola, Fireflies, Otter, Read.ai, Fathom | list the most recent item |
| Team chat | Slack, Teams | list channels or read the user's own profile |

Report each one as working, connected but failing (with the exact error), or not connected. Never send, post, or write during the check. A missing connector is not a question: the user can connect it later and run this skill again. With no connectors the operator still syncs, runs its checks, and reports.

## Ask only the gaps

Ask one at a time, with the default first:

1. How often: daily at a set time (default), every 4 hours, or a custom schedule. Confirm the timezone.
2. Where it runs: the app and machine that keep this brain folder. Follow scheduling.md: one designated routine, on a host that can reach the live folder.
3. Which recurring meetings are team meetings: the series names, such as a weekly team sync. Only these can feed the shared wiki, and only when the user organizes them. Default: none, so everything stays private.
4. Limits per run: default (10 meetings, 30 chat threads, 30 file writes, 10 fixes), light (half of each), or custom.
5. A notice when something waits for review: off (default), or one short message to the user only, never to anyone else or to a channel.

## Save, schedule, and test

1. Write the recipe to .company-os/schedule.md: cadence and timezone, host app and machine name, connectors in use, team meeting series, limits, and the notice setting. Keep the host's task ID and other machine-only details outside the brain, as scheduling.md requires.
2. Show the recipe in a few lines and ask "Turn it on?" before creating the schedule.
3. Create the schedule with the host's own scheduler, using the routine prompt in scheduling.md. If the host has no scheduler this skill can drive, give the exact prompt and schedule to paste, and do not claim the routine is running.
4. Validate the host with a test run, following scheduling.md. Confirm the run read the live folder, wrote today's report, and published nothing.
5. Back up the recipe through the normal helper.

Then tell the user in two or three lines when it runs, what it pulls, where the report appears (personal/operator/), that their next Company OS session shows anything waiting, and that shared changes wait for their "Approve".

## Change or turn off

To change it, update the recipe and the existing schedule; never leave two schedules running. To turn it off, remove the schedule from the host, mark the recipe as off with the date, and back it up. Keep past reports and the state file.
