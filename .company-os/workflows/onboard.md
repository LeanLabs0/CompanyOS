# Set up or resume Company OS

Use the context already supplied. The user can create an account, approve a browser login, and paste URLs; the agent handles commands and files. Current instructions override this workflow. A setup request does not authorize sending invitations until the user chooses recipients, or publishing company changes before review.

Setup authorizes installing the required tools and core skills, creating the two private repositories when existing destinations have not been supplied, and enabling automatic personal backup. Explain these actions briefly and execute them. Do not turn them into a create/join/skip checklist or ask for permission again. Pause only for missing information, an actual host/OS approval, browser sign-in, or a concrete access failure. Honor an explicit opt-out, but report which required setup steps remain incomplete.

## Establish the persistent shell

1. Read AGENTS.md, kit.json, .company-os/setup.json, and .company-os/setup.md if present. Resume completed choices. A second-machine request with a personal repository URL follows [recovery](../references/recovery.md), not starter onboarding.
2. Verify the shell writes to a persistent folder on the user's computer. Resolve the user-visible path; do not confuse a temporary container with the host filesystem. Default to Documents/CompanyOS.
3. Git, Node 22 or newer, npm/npx, and GitHub CLI are required. Check all four, install missing tools using the platform's supported installer, refresh the shell PATH when needed, and verify their version commands. Do not wait for repository or skill choices before installing them. Do not ask "Should I install GitHub CLI/npm?" or leave that installation as a task for the user. Report an actual failure and recovery step if installation cannot finish. Do not offer archive downloads.
4. For a new starter, clone the published source into an empty destination, remove its origin remote immediately, and rename the local branch to main if necessary. Never clone over an existing folder. See [handoff source](../release/brain.md).
5. For an older kit, preserve existing content and follow [migration](../references/migration.md). Do not assume an existing wiki is safe to share.
6. Read and write a uniquely named note inside the chosen folder if persistence has not been demonstrated. Record the actual host path and app mode.

## Context and automatic setup

Ask the next missing question, combining related choices when convenient. Skip known answers and allow the user to pause.

- Name or role, company/client, current priority, and a useful URL or document. A personal brain is valid. Save answers directly in their authoritative personal files rather than duplicating an intake.
- Existing destinations: accept any personal/company repository URLs already supplied. Mention once that the user can supply existing URLs; otherwise proceed with private repository creation. An existing personal brain triggers restore, and an existing company URL triggers join. Do not require an answer before taking the default path when no existing destination was indicated.
- Personal backup: create and configure a private repository automatically. Explain that it includes the full brain, including unpublished company edits, and runs automatically until withdrawn.
- Company knowledge: create and configure a separate private repository automatically, or join the supplied one. Explain that all wiki/ and corrections/ content is shareable and outgoing batches require review. Both repositories can belong to the authenticated individual; an organization is not required.
- Core skills: install company-os, company-os-sync, and company-os-restore automatically for the current supported agent. They are required and are not an interview choice. Verify app-specific discovery.
- Optional skills: ask only whether the user wants GrillMe. If selected, install it through the same global npx skills add flow. GrillMe is the only optional skill offered in this release; leave the reserved slots for future releases.
- First task: use the task already requested, or ask what useful output to finish today.
- Optional routine: offer a daily company review using the chosen app. Ask for time/timezone and the designated machine only if they want it. Scheduling is not required to finish setup.

## GitHub and initialization

Inspect gh auth status and start browser sign-in immediately when needed:

~~~text
gh auth login --hostname github.com --git-protocol https --web --clipboard
gh auth setup-git --hostname github.com
~~~

The user signs in and approves the device code. If automatic browser opening is unavailable, provide the actual URL/code produced by the CLI. Never ask them to paste an access token into chat. Verify the logged-in account and repository access before continuing.

For creation, use gh repo create OWNER/NAME --private without --push or --clone. Do not initialize the company repository with a README, license, or template tree. The sync helper creates its first company-only commit.

Default to the authenticated individual's account, with company-os-personal for personal backup and <company-slug>-company-os for company knowledge (company-os-company if the company name is not yet known). Record actual URLs immediately so an interrupted setup resumes without creating duplicates. If a name is occupied, inspect it and clarify restore/join versus a new repository only when its intended use is ambiguous. Never overwrite or silently repurpose an existing repository.

For existing personal backup content, follow recovery instead of pushing this starter over it. Empty repositories can be attached. For a company join, inspect owner, visibility, default branch, and permissions. A URL is not an access grant; an invitation may need acceptance.

Use a repo-local Git identity, reusing an existing suitable identity. If none exists, derive the user's name/login and GitHub noreply address from their authenticated account, or ask for their preferred author identity. Never replace global identity settings.

Run the helper using its absolute path:

~~~text
node <brain>/.company-os/scripts/company-os.mjs configure --personal <personal-URL> --company <company-URL>
~~~

Supply --personal-branch or --company-branch for an existing repository whose branch is not main. Confirm only personal/company remotes remain. The starter URL must not be a destination. The helper verifies private visibility, access, distinct repositories, and push protections. Configure does not upload.

If the user asks to invite coworkers, obtain exact GitHub usernames and verify the destination is the company repository. Use gh api --method PUT repos/OWNER/COMPANY-REPO/collaborators/USERNAME. Report invitation pending until accepted. Never invite to the personal backup. Creating an organization is an optional browser flow, not a prerequisite.

## Save context and install skills

Private answers go under personal/. Shared company facts and rules go into wiki/ with their source and confirmation status. Do not publish scraped claims as human-confirmed facts. For join, import the company's existing knowledge before asking the user to re-enter it.

Run register to save the machine-local brain locator. Follow [global skills](../references/skills.md) and execute the required core installation with --install; a preview is not completion. Install GrillMe only if selected. Do not equate source files in this repository with installation. Verify the current app sees the skills and record version/source and app results. If the host requires an account-level adapter, complete that supported route or report core installation as blocked rather than skipped.

Finish the first task, register its project, and read the output back. Run sync for the configured repositories. It backs up personal work and prepares company sharing; present the review and publish only after approval.

Create .company-os/setup.md with date, kit version, app/mode, actual folder, required-tool versions, repository URLs, completed or blocked steps, first task, backup result, core-skill result, optional GrillMe choice, and remaining verification. Never put credentials there. Do not call setup complete while required tools, repositories, or core skills are missing; report a partial installation accurately.

## Verify outside this folder

Give an exact return prompt:

> Use Company OS from [absolute brain path]. Read its AGENTS.md and .company-os/workflows/prime.md. Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [task].

A same-session readback is not a fresh-conversation test. Ask the user to start a fresh conversation in another project with permitted access to the brain. Mark cross-project recall verified only after that session reads and cites the saved files. Label user-reported results. If discovery fails, retain the explicit path prompt and fix the route without restarting onboarding.

Close with the deliverable, personal backup status, company review status, and the usable return prompt.
