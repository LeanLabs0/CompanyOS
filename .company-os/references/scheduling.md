# Optional scheduled company review

Policy: personal backup is automatic; outgoing company changes require user review. A schedule prepares work and reports results. It never invents approval.

Ask for cadence, timezone, chosen app, and which machine should own the routine. Recommend one designated daily routine, not parallel schedules in every installed app. Keep the recipe in .company-os/schedule.md and the host-specific task ID/machine registration outside the Git backup.

## Routine prompt

> Read Company OS at [absolute persistent path]. Follow its AGENTS.md and .company-os/workflows/sync.md. Run the sync helper to back up personal work and prepare company sharing. Report the personal repository result separately. Show the exact company destination and summarize additions, changes, deletions, and skill-source changes. Leave the company batch pending for my review. Do not publish it without my approval of that batch. If nothing changed, report that briefly. Stop and explain conflicts. Do not touch unrelated project repositories.

A later approval can be handled by an interactive agent using the same pending batch. Recheck exact content and remote revision. If the scheduled session cannot receive a reply, it leaves a pending review; it does not poll indefinitely or auto-approve.

## Validate the chosen host before enabling

1. Create a test run with invented data or a harmless setup marker, using the actual scheduler.
2. Prove that run can read the live CompanyOS folder and invoke the helper. A cloud snapshot or app account attachment does not establish this.
3. Verify the output reaches the user's task inbox, and that no company publication occurs unattended.
4. Verify that a second run does not create duplicate reviews or overlap a live helper operation.
5. Record what was observed, including wake/app requirements. If the host cannot reach local files, keep session-based backup and review working; report scheduling as unavailable for that mode.

Claude Cowork's documentation reviewed 2026-09-09 is internally inconsistent: its overview says remote tasks cannot attach to local folders, while its setup section describes an optional folder and local execution. Do not resolve that contradiction by assumption. Test the installed Cowork version before promising local sync.

Claude Code desktop has a distinct local scheduling route. ChatGPT desktop documents local-project tasks requiring the computer and app to remain running. Choose the existing working directory, not an isolated worktree that misses uncommitted files.

A schedule record restored on a second machine is a recipe, not evidence a task exists there. Recreate it only for the designated scheduler machine and avoid leaving both old and new tasks active.

- [Claude Cowork scheduling](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork)
- [Claude desktop](https://code.claude.com/docs/en/desktop)
- [ChatGPT local scheduled tasks](https://learn.chatgpt.com/docs/automations)
