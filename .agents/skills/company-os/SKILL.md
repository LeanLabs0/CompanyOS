---
name: company-os
description: Set up, load, or use Company OS personal context and company knowledge from any permitted project. Use when the user asks for Company OS, their saved brain, or an explicitly connected company's context.
---

# Company OS

This is a globally installed entry point. Its installation directory is not the user's brain.

Users return through `/company-os` followed by their request (or the app's verified skill-selector equivalent), not one required phrase. Handle the locator and instruction reads yourself; do not ask the user to paste a filesystem-heavy loading prompt. A useful verification example is `/company-os Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [your next task].` For a general "help me," load the saved context, briefly name the current priority, and offer a useful next action based on it. Ask only for information still needed. Verify requested facts from the files and cite them naturally. Explicit paths are a troubleshooting fallback when discovery or access is missing.

Resolve the brain from an explicit task path or the machine's user-home pointer at .company-os/brain.json. Read the pointer with available filesystem tools; never infer a previous session's path. If it is missing, inspect the user's Documents/CompanyOS for kit.json. Ask for the brain path or personal backup URL if it cannot be found. Do not search unrelated client folders broadly.

Read the resolved brain's AGENTS.md and .company-os/workflows/prime.md, then continue the task. For setup, read .company-os/workflows/onboard.md instead. For an existing personal backup URL on a new computer, follow the restore skill or the brain's recovery reference.

For a fresh install with no brain files, read https://www.leanlabs.com/brain.md. Verify the live handoff's setup schema matches the intended kit; do not invent a missing starter or overwrite existing work.

Before setup, establish the app's access to the actual brain folder. Setup and restore are allowed in ChatGPT Work (brain as the local project), Codex, or Claude Code. If the session is Claude Cowork or a click-only / cloud-only Claude shell, stop and tell the user to open Claude Code in the brain folder. Guide the user through missing folder selection in an allowed app before installing or cloning, preserving answered questions. Inspect remotes and setup state before treating an existing starter checkout as a personal brain. Follow .company-os/references/app-setup.md for separate Git and secure-authentication checks; shell access alone is not compatibility. Check GitHub auth in a supported network-enabled context before requesting sign-in, and do not infer an invalid credential from offline failures.

During setup, automatically install missing Git, GitHub CLI, Node/npm/npx, and all three required core skills through the global npx skills add flow. Create private personal/company repositories unless existing URLs were supplied. Do not offer these requirements as optional or stop at an installation preview. The user handles unavoidable OS/app approvals and GitHub sign-in. After initial repository sync and the return/verification steps, show every optional recommendation and its short summary from .company-os/references/skills.md as the final onboarding choice. Install only the optional skills selected, through the same global CLI flow. Report actual blockers and incomplete setup honestly. Company publication still requires its exact content review.

If prerequisites fail, follow .company-os/references/troubleshooting.md (or the live handoff's troubleshooting section before cloning). Check existing installations and PATH, use supported installation/approval routes, and retry only after a relevant correction. Manual installation is the last resort for an unresolved blocker; give only missing tools' exact steps and official links, then verify and resume. Do not bypass policy rejection through another tool, invent a file-bridge clone, or send users to install tools when a broken mount or credential boundary is the actual problem.

Apply only context relevant to the task's named company. Keep the current project's own instructions, working directory, and deliverable location. Brain Git commands must use the absolute helper path; never push the current project by accident.

For saves and corrections, follow AGENTS.md's routing rules: classify each statement by its scope and split mixed messages. Company-wide naming, brand, and factual corrections go to the authoritative wiki page plus a dated correction and index update; user-only preferences stay personal, and private client material stays private. Move a clearly misfiled shared rule out of personal preferences without copying private details or overwriting unrelated work. Preserve real URLs and identifiers when correcting prose. Ask only about material scope ambiguity or a contradiction in relevant loaded knowledge. Keep missing intake unknown rather than inventing confirmed answers. Examples in instructions are never user facts.

Briefly confirm private saves separately from the actual shared changes ready for review. Saving a correction is not publishing it: prepare and show the company review, then use the user's approval for that unchanged content. Do not turn every simple save into a web research task.

Do not claim a pointer, skill listing, or remembered conversation proves recall. Read the saved files and cite them. For cross-project verification, retrieve one priority and a preference or identity fact in a fresh conversation.

Selected personal backup is automatic. Shared changes are prepared for review; company publication requires approval of the exact current batch. Read-only instructions take precedence over routine sync.

For optional skill recommendations, use the saved role, priorities, active projects, and relevant company context. Follow .company-os/references/skills.md to search with generic task terms, inspect candidates, and explain their fit. Do not send private brain content to a skill directory, duplicate company profiles, or install recommendations without the user's selection.
