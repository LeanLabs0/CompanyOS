# Set up or resume Company OS

Use the context already supplied. The user can create an account, approve a browser login, and paste URLs; the agent handles commands and files. Current instructions override this workflow. A setup request does not authorize sending invitations until the user chooses recipients, or publishing company changes before review.

## Establish the persistent shell

1. Read AGENTS.md, kit.json, .company-os/setup.json, and .company-os/setup.md if present. Resume completed choices. A second-machine request with a personal repository URL follows [recovery](../references/recovery.md), not starter onboarding.
2. Verify the shell writes to a persistent folder on the user's computer. Resolve the user-visible path; do not confuse a temporary container with the host filesystem. Default to Documents/CompanyOS.
3. Check Git, Node 22 or newer, npm/npx, and GitHub CLI. Install missing prerequisites using the platform's supported installer. The agent executes commands; request only unavoidable OS/browser approvals. Git is required to install the starter. Do not offer archive downloads.
4. For a new starter, clone the published source into an empty destination, remove its origin remote immediately, and rename the local branch to main if necessary. Never clone over an existing folder. See [handoff source](../release/brain.md).
5. For an older kit, preserve existing content and follow [migration](../references/migration.md). Do not assume an existing wiki is safe to share.
6. Read and write a uniquely named note inside the chosen folder if persistence has not been demonstrated. Record the actual host path and app mode.

## Interview and repository choices

Ask the next missing question, combining related choices when convenient. Skip known answers and allow the user to pause.

- Name or role, company/client, current priority, and a useful URL or document. A personal brain is valid. Save answers directly in their authoritative personal files rather than duplicating an intake.
- Personal backup: create a new private backup / paste an existing personal backup URL / skip. Explain that it includes the full brain, including company files and unpublished edits. Choosing automatic personal backup authorizes future helper backups until withdrawn.
- Company knowledge: create / join by URL / skip. Explain that all wiki/ and corrections/ content is shareable, and outgoing batches require review. Both repositories may belong to the same individual account. Offer an existing organization only if relevant.
- Global skills: install the Company OS core skills; offer GrillMe and up to three additional skills selected for actual work. Explain app-specific discovery differences.
- First task: use the task already requested, or ask what useful output to finish today.
- Optional routine: offer a daily company review using the chosen app. Ask for time/timezone and the designated machine only if they want it. Scheduling is not required to finish setup.

## GitHub and initialization

If either repository is selected, inspect gh auth status. If needed, use:

~~~text
gh auth login --hostname github.com --git-protocol https --web --clipboard
gh auth setup-git --hostname github.com
~~~

The user signs in and approves the device code. If automatic browser opening is unavailable, provide the actual URL/code produced by the CLI. Never ask them to paste an access token into chat. Verify the logged-in account and repository access before continuing.

For creation, use gh repo create OWNER/NAME --private without --push or --clone. Do not initialize the company repository with a README, license, or template tree. The sync helper creates its first company-only commit.

For existing personal backup content, follow recovery instead of pushing this starter over it. Empty repositories can be attached. For a company join, inspect owner, visibility, default branch, and permissions. A URL is not an access grant; an invitation may need acceptance.

Use a repo-local Git identity, reusing an existing suitable identity. If none exists, derive the user's name/login and GitHub noreply address from their authenticated account, or ask for their preferred author identity. Never replace global identity settings.

Run the helper using its absolute path:

~~~text
node <brain>/.company-os/scripts/company-os.mjs configure --personal <URL-or-skip> --company <URL-or-skip>
~~~

Supply --personal-branch or --company-branch for an existing repository whose branch is not main. Confirm only personal/company remotes remain. The starter URL must not be a destination. The helper verifies private visibility, access, distinct repositories, and push protections. Configure does not upload.

If the user asks to invite coworkers, obtain exact GitHub usernames and verify the destination is the company repository. Use gh api --method PUT repos/OWNER/COMPANY-REPO/collaborators/USERNAME. Report invitation pending until accepted. Never invite to the personal backup. Creating an organization is an optional browser flow, not a prerequisite.

## Save context and install skills

Private answers go under personal/. Shared company facts and rules go into wiki/ with their source and confirmation status. Do not publish scraped claims as human-confirmed facts. For join, import the company's existing knowledge before asking the user to re-enter it.

Run register to save the machine-local brain locator. Follow [global skills](../references/skills.md), using the Vercel CLI global installation flow. Do not equate distribution source files in this repository with installation. Verify the selected app sees the skills. Record version/source and app results.

Finish the first task, register its project, and read the output back. Run sync for the selected repositories. It backs up personal work and prepares company sharing; present the review and publish only after approval.

Create .company-os/setup.md with date, kit version, app/mode, actual folder, completed/skipped choices, first task, backup result, global-skill result, and remaining verification. Never put credentials there.

## Verify outside this folder

Give an exact return prompt:

> Use Company OS from [absolute brain path]. Read its AGENTS.md and .company-os/workflows/prime.md. Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [task].

A same-session readback is not a fresh-conversation test. Ask the user to start a fresh conversation in another project with permitted access to the brain. Mark cross-project recall verified only after that session reads and cites the saved files. Label user-reported results. If discovery fails, retain the explicit path prompt and fix the route without restarting onboarding.

Close with the deliverable, personal backup status, company review status, and the usable return prompt.
