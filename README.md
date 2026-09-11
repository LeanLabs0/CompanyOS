# Company OS

Your personal second brain, with a shared company wiki. Talk to your agent, answer a few questions, and paste useful URLs. The agent manages the files and Git.

## Start

In ChatGPT Work, Claude Code, Grok, Cursor, VS Code, or another local IDE / coding agent, say:

> Set up Company OS using https://www.leanlabs.com/brain.md

The agent installs any missing requirements: Git, GitHub CLI, Node, and npm/npx. You handle account sign-in, browser approval, and folder permissions. It clones the starter into Documents/CompanyOS and removes the starter remote before saving your information.

Already have this kit open? Say:

> Read AGENTS.md and help me set up Company OS.

Setup asks about your current work, then automatically creates private personal and company repositories and installs the core Company OS skills. Supply existing repository URLs if you already have them: the agent restores your personal brain or joins your company. A review schedule is optional. After repository sync, setup ends with a short skill menu: GrillMe, Unslop, Find Skills, and marketing tools for copy, content planning, SEO, email, and social. Your saved role and priorities guide additional suggestions; the agent installs only your selections globally.

## One folder, two destinations

| Place | What belongs there | Who receives it |
|---|---|---|
| personal/ | Your priorities, preferences, private research, drafts, and deliverables | Your private personal backup |
| wiki/ | Company facts, brand guidance, shareable sources, and reusable company skill sources | Your personal backup and the company repository |
| corrections/ | Corrections to shared company knowledge | Your personal backup and the company repository |

Everything in wiki/ and corrections/ is company-shareable. Private interviews and client research belong in personal/ until deliberately prepared for sharing.

Your private backup contains the working brain, including unpublished company edits. The company repository contains wiki and correction content plus its own short README and agent instructions, with separate history. Setup recommends the company's GitHub organization for shared knowledge and keeps personal backup under your individual account. Individually owned company repositories are supported too.

This is the starter repository. During configuration, an installed copy gets a short personal README naming its own destinations. Unchanged tests, package metadata, release/checking tools, maintainer notes, and empty-folder READMEs are removed. Runtime tools and essential recovery state remain; client edits are preserved.

Personal backup is enabled during setup and runs automatically. Company changes are prepared automatically and shown for review before publication. Conflicts stop for a plain-language decision.

## Work from another project

Setup installs the global company-os, company-os-sync, and company-os-restore skills through the Vercel Agent Skills CLI. Say:

> Use Company OS for this task.

The global loader finds your registered brain and reads the relevant context without changing your project's own instructions. Company skills apply to their named company, not every conversation.

To return, use `/company-os` followed by your request, or select Company OS through your app's skill menu. For example: `/company-os Help me plan next week's campaign.` The skill finds your brain and loads the relevant context. Setup verifies discovery and a fresh conversation outside CompanyOS. An explicit folder-based prompt is reserved for troubleshooting missing discovery or access. See [app setup](.company-os/references/app-setup.md).

## A new computer

Say:

> Restore Company OS from [my personal repository URL].

After you sign in, the agent restores the folder, reconnects the company repository, reinstalls skills and push protections, and reconciles newer company knowledge with your saved edits. See [recovery](.company-os/references/recovery.md).

## Agent and maintainer references

- [Onboarding](.company-os/workflows/onboard.md)
- [Loading context](.company-os/workflows/prime.md)
- [Sync and review](.company-os/workflows/sync.md)
- [Global skills](.company-os/references/skills.md)
- [Optional scheduled review](.company-os/references/scheduling.md)
- [Maintainer checks and release](.company-os/references/maintainer-testing.md)

The agent should never claim backup, installation, or cross-app recall worked without checking it. Credentials stay outside the brain. Pending or failed uploads are reported.
