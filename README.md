# Your second brain

A folder that helps your AI remember your business, use your sources, and carry useful context into the next conversation.

You talk to the AI. It organizes the files. You do not need Git, a code editor, or a terminal.

## Get started

Paste this into your AI tool:

> Help me set up my second brain using https://www.leanlabs.com/unbound/brain.md

Use a mode that can read and write a folder you choose. Setup will check access, ask a few questions, and help with one real task. An ordinary chat or temporary file workspace may need a different setup. See [app setup](references/app-setup.md).

Already have this folder open? Say:

> Read AGENTS.md and .agents/skills/onboard/SKILL.md, then help me get started.

You can skip questions, bring existing documents, or stop and resume later. A website and one current priority are enough to begin. The full brand workshop and tool connections can wait.

## Come back tomorrow

Open or attach this same folder in your AI tool and say:

> Read AGENTS.md, load my brain, and tell me my current priority and one saved preference or identity fact. Show which files you used.

Then ask for the work you need. If you switch apps, connect the same folder there. Your files travel with you; an app does not automatically know about a folder it has not been given access to.

During setup, your AI records the exact return instructions in `context/setup.md`. Setup is verified only after a fresh conversation successfully reads saved information. Until then, it is ready to use but recall is unverified.

## Things you can say

- "Remember this for Acme: use 'customers' rather than 'users'."
- "Use these interview notes to draft a campaign brief."
- "What do we know about why customers choose us? Show your sources."
- "That priority is outdated. Replace it with this one."
- "Forget that preference."
- "What changed since last time?"
- "Check whether my brain is working."

Explicit requests to save or update something are enough. For information you have not asked to save, the AI offers a short list of useful updates together. It does not save every conversation automatically.

## What is saved where

| Place | What it holds |
|---|---|
| `context/` | Your role, current priorities, setup progress, and return instructions |
| `companies/` | Facts and source material for each brand |
| `rules/` | Approved writing and design preferences, with a named brand scope |
| `memory/` | Standing preferences for how the AI works with you |
| `wiki/` | Source documents, research, and answers linked to evidence |
| `decisions/` | Decisions and their reasons |
| `projects/` | Briefs, drafts, deliverables, and other ongoing work |
| `connections.md` | Tools you have chosen to connect and what access has been tested |

`AGENTS.md` tells the AI how to use the folder. The five included workflows cover setup, loading context, a usefulness check, a detailed cleanup review, and improving a repeated task. You can ask in ordinary language; command syntax is optional.

## Ownership and backup

The folder is yours. Choose a backup location and check that it includes your deliverables and hidden instruction folders. GitHub is optional. See [backup and recovery](references/backup.md).

Local storage does not mean offline AI processing. Your chosen provider may process files the AI reads. Use material you are allowed to share, keep credentials out of knowledge files, and use the app's sign-in or connection flow for external tools.

For deeper brand work, connections, and reusable workflows, see [optional next steps](EXPANSIONS.md). Maintainers can find release checks in [testing the kit](references/maintainer-testing.md).
