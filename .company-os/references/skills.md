# Global skills

A skill source file in the repository is not a global installation. Install the required core skills automatically through the Vercel Agent Skills CLI, with explicit global scope and the current supported host target. GitHub CLI and Node/npm/npx are setup requirements, not optional skill dependencies to defer.

## Core and optional skills

The distribution sources are under .agents/skills/:

- company-os: required setup/loading from any permitted project.
- company-os-sync: required automatic personal backup and reviewed company publication.
- company-os-restore: required second-machine recovery.
- grill-me: the only optional skill offered in this release, a self-contained GrillMe interview.

The manifest reserves space for future optional skills; do not offer additional packages during current onboarding. Existing same-name global skills need comparison before replacement.

Setup already authorizes the core installation. Inspect the bundled sources, then run the installer with --install:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --skill company-os,company-os-sync,company-os-restore --install
~~~

Use the current app's supported target (codex, claude-code, or another documented target). Do not ask the user to choose whether core skills should be installed. The helper executes the equivalent of npx --yes skills@1.5.25 add <brain> --global --agent <target> --skill company-os company-os-sync company-os-restore --yes; it never copies files directly into global skill directories. Omitting --install is a preview for maintainers, not completed onboarding.

If the user selects optional GrillMe, also run:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --skill grill-me --install
~~~

That uses the same npx skills add global installation flow. A refusal of GrillMe affects only GrillMe; core installation continues. Install for other apps only when requested or part of the user's established setup.

Inspect existing same-name packages yourself. Reuse a matching installed Company OS version after verifying discovery, or update a verified Company OS package with --update-reviewed as part of authorized setup; do not ask again whether core installation should happen. If the existing package is unrelated or its ownership is ambiguous, preserve it and resolve that collision explicitly. Do not replace the user's unrelated GrillMe implementation automatically.

The source defaults to the inspected local kit. Published GitHub sources or direct reviewed skill subdirectories can be supplied with --source. For shared company sources use a reviewed company repository tree URL pointing at wiki/skills/<name>. Prefer an immutable reviewed commit in the URL for third-party/company packages. Use --cli-version only when deliberately updating the CLI.

Verify the CLI's global list for the selected agent, then verify actual app discovery. The manifest records the source, revision when known, CLI version, target, and pending/verified discovery. Do not report CLI success as cross-project recall.

## Brain locator and global guidance

Run the brain helper's register command. It writes only the resolved brain path to ~/.company-os/brain.json. This is machine-local and reconstructed after recovery.

The skills read that pointer and then read the live brain. Do not copy company facts into global instructions. Company-specific skills must name their company and load its current facts/rules only for matching tasks.

If needed, use the bounded app-specific global pointer described in [app setup](app-setup.md), preserving existing instructions. Do not create a blanket global rule that loads all clients into unrelated projects.

## Company and personal skill sources

Store shareable company packages under wiki/skills/<company>-<task>/SKILL.md. Publishing that source follows the normal company review. Recipients then install or update selected skills globally through the Vercel CLI. Sync never executes or installs incoming skill code automatically.

Store owned personal skill sources under personal/skills/. Their source and install manifest survive a personal restore. Avoid relying on an edited vendor skill whose only copy is outside CompanyOS.

For owned sources inside this brain, --source brain:personal/skills/<name> or --source brain:wiki/skills/<name> resolves against the current brain folder. The manifest retains this relative form so a second machine can reinstall from its restored files.

Cowork's documented account-level skill system is distinct from machine-global Claude Code discovery. Provide a version-matched account-level adapter through the supported app UI, or retain an explicit pointer fallback. Generic Company OS skills contain no private company facts. Verify the actual app mode and permissions.

## Restore

Reinstall the required core skills even if an incomplete older manifest omitted them, plus the previously selected optional sources. Re-register the brain's new path and verify each host again. Do not copy old authentication or machine absolute paths from another computer. A global skill source removed upstream needs recovery from its owned backed-up source or a deliberate replacement.

Sources reviewed 2026-09-09:

- [Vercel skills installation](https://vercel.com/docs/agent-resources/skills)
- [Skills CLI global scope and host targets](https://github.com/vercel-labs/skills)
- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills)
- [Claude skill loading](https://code.claude.com/docs/en/skills)
