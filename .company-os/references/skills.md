# Global skills

A skill source file in the repository is not a global installation. Install selected skills through the Vercel Agent Skills CLI, with explicit global scope and the selected host target.

## Core and optional skills

The distribution sources are under .agents/skills/:

- company-os: setup/loading from any permitted project.
- company-os-sync: automatic personal backup and reviewed company publication.
- company-os-restore: second-machine recovery.
- grill-me: the offered, self-contained GrillMe interview.

Offer up to three more capabilities based on the user's work. Do not install a large catalog by default or fabricate packages. Review each source and its dependencies. Existing same-name global skills need comparison before replacement.

Use the bundled installer to preview the exact action:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --skill company-os,company-os-sync,company-os-restore
~~~

After the user selects these skills, add --install. Repeat for another selected supported target, such as claude-code or cursor. The helper delegates to a pinned Vercel skills CLI; it never copies files directly into the machine-global skill directories.

For a reviewed same-name update, use --update-reviewed only after confirming that source is the intended replacement. Do not replace the user's unrelated GrillMe implementation automatically.

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

Use the manifest to reinstall the selected sources, re-register the brain's new path, and verify each host again. Do not copy old authentication or machine absolute paths from another computer. A global skill source removed upstream needs recovery from its owned backed-up source or a deliberate replacement.

Sources reviewed 2026-09-09:

- [Vercel skills installation](https://vercel.com/docs/agent-resources/skills)
- [Skills CLI global scope and host targets](https://github.com/vercel-labs/skills)
- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills)
- [Claude skill loading](https://code.claude.com/docs/en/skills)
