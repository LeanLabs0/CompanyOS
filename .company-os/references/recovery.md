# Restore on another computer

The user can provide their personal repository URL and approve GitHub sign-in. The agent handles the filesystem and Git. An organization is not required.

1. Verify local persistent shell access. Check/install Git, GitHub CLI, Node 22+, and npm/npx. Authenticate through gh auth login --web using HTTPS, then gh auth setup-git. Always show the active CLI's actual one-time code in a code block and its clickable sign-in URL so the user can type it; clipboard copying is only a convenience. Never save the code in files. Repeat a valid code on request or restart an expired flow. Do not export credentials from the old machine.
2. Inspect the supplied private personal repository and permissions. Clone it into an empty Documents/CompanyOS with --origin personal. Do not clone the starter first for a restore. Do not overwrite an existing brain.
3. Read kit.json, AGENTS.md, .company-os/setup.json, sync-state.json, skills.json, and setup.md. If the clone has an older layout, migrate locally before enabling sharing.
4. Check that the supplied personal repository matches the stored identity. A repository transfer or changed URL needs a reviewed reconfiguration, not a silent redirect.
5. Run configure without changing stored choices. It recreates personal/company remotes, explicit-push settings, and executable push guards, and refreshes an unchanged generated personal README. Git local configuration and installed hooks are not restored automatically by cloning. Company root README.md and AGENTS.md stay in company and never replace personal files. All syncing clients need kit 0.4.0+ when company root documents are present.
6. Establish a repo-local author identity if needed. Run register to rebuild the local brain pointer. Automatically reinstall all three required Company OS core skills and previously selected optional skills through the global npx skills add flow. Do not stop at a preview or make core installation optional. Do not copy old absolute machine paths or authentication tokens.
7. Run sync. The recorded company revision is the common ancestor. Compare it with the restored local wiki and current company branch. Preserve unpublished local edits, import nonconflicting team changes, and stop on conflicts. Never immediately push the restored wiki over the company.
8. Verify a saved priority, preference/identity, and a real deliverable. Back up the reconciled state. Verify a fresh conversation from another project.
9. Restore a scheduled routine only if this is the chosen scheduler machine. An existing device's active schedule does not automatically transfer through Git.

If only a company repository exists, install the starter and join it. Explain that personal notes, drafts, and preferences cannot be recovered from company knowledge alone. If company access is temporarily unavailable, personal recovery can still finish; report company synchronization as pending.

## Switching between two active machines

Use one machine at a time for the MVP. Complete its personal backup before switching. On the next machine, sync personal first, then company.

The helper permits fast-forward personal reconciliation. If both machines have independent unpublished commits, it stops with both histories preserved. Resolve those histories deliberately, including the company baseline, before resuming company sync. Do not use an automatic "ours"/"theirs" rule.

## What recovery covers

Personal backup includes all intended files in CompanyOS, including wiki, corrections, deliverables, support code, skill sources, and the skill manifest. It excludes credentials, dependencies, caches, and .company-sync machinery. Unpublished shared edits are backed up in their actual wiki/corrections files.

Global third-party skills are reinstalled from the manifest. Keep locally authored personal skill sources in personal/skills/ and install them globally through the same CLI; otherwise their only copy may be outside the backup. Edited vendor skills must be saved as owned source before treating them as recoverable.

Git rejects large files beyond the helper's 95 MiB threshold. The agent must report uncovered external assets or separate project repositories, not claim a complete backup when those assets were never included.
