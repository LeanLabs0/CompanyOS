# Load Company OS from any permitted project

Resolve the brain from the current task's explicit path or the machine pointer at ~/.company-os/brain.json. If both exist and disagree, ask which brain is intended. A missing pointer can fall back to Documents/CompanyOS only after checking kit.json and asking about material ambiguity. Never assume the current project folder is the brain.

The normal entry point is `/company-os` followed by the user's request, or the app's verified skill-selector equivalent. Perform the file reads below yourself. For a general help request, briefly acknowledge the saved priority and propose a useful next action. A return example can ask for the recall check below, but do not require it for everyday use or make the user specify internal file paths.

1. Read the brain's AGENTS.md, .company-os/setup.json, and .company-os/setup.md if present.
2. If the setup schema is old, use migration guidance; do not reinterpret private wiki content as company-shareable.
3. Unless the user requested read-only/no-sync work, run the absolute helper's sync command when repositories are configured. This first backs up or fast-forwards personal state, then prepares company changes and backs up the imported result. It does not publish company changes. A failed sync is visible; keep helping from known local context when appropriate and label freshness.
4. Read personal/about.md, priorities.md, preferences.md, and linked preferences relevant to this task. Read the actual files; indexes and global pointers are not loaded knowledge.
5. Establish the task's company. Read wiki/index.md and the relevant shared facts, brand, rules, and corrections only for that company. Other client work uses private project-scoped context, not this company's default facts.
6. Keep the current project's instructions and deliverable location. Apply brain preferences within their scope; run backup only against the brain root. Files outside CompanyOS are not covered by its backup.
7. Continue useful work. Surface a pending company review once, with destination and actual changes; do not treat silence as approval. Follow sync workflow if the user approves.

For a fresh-conversation recall check, retrieve a saved priority and confirmed preference, or use an identity fact if no preference exists. If no priority was supplied, say it is unknown rather than inventing one. Cite the file paths. Record app/mode/date and whether discovery was automatic, explicit-path, or user-reported in .company-os/setup.md. Do not claim another app passed without evidence.

At the end of completed work, back up intended brain changes to personal if enabled. If shared files changed, prepare the company review as well. An explicit request to avoid mutations takes precedence over automatic routines.
