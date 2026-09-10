---
name: company-os
description: Set up, load, or use Company OS personal context and company knowledge from any permitted project. Use when the user asks for Company OS, their saved brain, or an explicitly connected company's context.
---

# Company OS

This is a globally installed entry point. Its installation directory is not the user's brain.

Resolve the brain from an explicit task path or the machine's user-home pointer at .company-os/brain.json. Read the pointer with available filesystem tools; never infer a previous session's path. If it is missing, inspect the user's Documents/CompanyOS for kit.json. Ask for the brain path or personal backup URL if it cannot be found. Do not search unrelated client folders broadly.

Read the resolved brain's AGENTS.md and .company-os/workflows/prime.md, then continue the task. For setup, read .company-os/workflows/onboard.md instead. For an existing personal backup URL on a new computer, follow the restore skill or the brain's recovery reference.

For a fresh install with no brain files, read https://www.leanlabs.com/brain.md. Verify the live handoff's setup schema matches the intended kit; do not invent a missing starter or overwrite existing work.

Before setup, establish the app's access to the actual brain folder. ChatGPT Work should use it as the local project's primary folder during installation. Cowork must connect the brain itself as a folder root and grant its supported scoped deletion permission for Git. Guide the user through missing folder selection before installing or cloning, preserving answered questions. Inspect remotes and setup state before treating an existing starter checkout as a personal brain. Follow .company-os/references/app-setup.md for separate Git and secure-authentication checks; shell access alone is not compatibility. Check GitHub auth in a supported network-enabled context before requesting sign-in, and do not infer an invalid credential from offline failures. Cowork's secure GitHub authentication remains unverified beyond the reported blocker; do not promise automatic backup there until it passes.

During setup, automatically install missing Git, GitHub CLI, Node/npm/npx, and all three required core skills through the global npx skills add flow. Create private personal/company repositories unless existing URLs were supplied. Do not offer these requirements as optional or stop at an installation preview. The user handles unavoidable OS/app approvals and GitHub sign-in. After initial repository sync and the return/verification steps, show every optional recommendation and its short summary from .company-os/references/skills.md as the final onboarding choice. Install only the optional skills selected, through the same global CLI flow. Report actual blockers and incomplete setup honestly. Company publication still requires its exact content review.

Apply only context relevant to the task's named company. Keep the current project's own instructions, working directory, and deliverable location. Brain Git commands must use the absolute helper path; never push the current project by accident.

Do not claim a pointer, skill listing, or remembered conversation proves recall. Read the saved files and cite them. For cross-project verification, retrieve one priority and a preference or identity fact in a fresh conversation.

Selected personal backup is automatic. Shared changes are prepared for review; company publication requires approval of the exact current batch. Read-only instructions take precedence over routine sync.

For optional skill recommendations, use the saved role, priorities, active projects, and relevant company context. Follow .company-os/references/skills.md to search with generic task terms, inspect candidates, and explain their fit. Do not send private brain content to a skill directory, duplicate company profiles, or install recommendations without the user's selection.
