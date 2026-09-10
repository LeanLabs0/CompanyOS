# Set up Company OS

Company OS is a personal second brain with a shared company wiki. You answer questions, paste useful URLs, and approve sign-ins. Your agent manages files, Git, and skills.

Paste this page's URL into ChatGPT Work, Claude, or another agent with local shell access:

> Help me set up Company OS using this page.

## Instructions for the agent

This is an installation handoff. Current user instructions take precedence. A request to review the design is not permission to install or configure it.

A request to set up Company OS authorizes installing required tools and core skills, creating private personal/company repositories unless existing destinations are supplied, and enabling personal backup. Explain what you are doing and carry it out. Do not ask the user to choose whether to install requirements or send back a technical setup checklist. Only pause for genuinely missing information, required OS/app permissions, GitHub sign-in, or an actual failure. Company publication still requires review of the outgoing content.

### 1. Check local access and existing work

Verify shell access to a persistent folder the user controls. Default to Documents/CompanyOS, but resolve the actual user-visible path. A cloud shell or temporary tool folder is not proof of local installation.

Check for an existing brain before cloning anything. If present, read its AGENTS.md and setup state and resume. Preserve user files. For an older kit, use a reviewed migration; do not replace personalized files wholesale.

For an older 0.3.x installation, follow the current starter's migration reference. Update its runtime, instructions, skill sources, and version metadata from an inspected current starter before resuming. Preserve personal/, wiki/, corrections/, repository settings, the sync baseline, and the installed-skill record. The configure step personalizes its README and removes only recognized unchanged starter material. Do not create a second brain or repeat answered questions. Update all syncing teammates to 0.4.0+ before publishing company root instructions; older helpers reject those files.

If the user is restoring an existing private personal backup, clone that repository directly into an empty destination with its remote named personal, then follow the restored recovery instructions. Do not install a starter over their backup.

### 2. Check prerequisites and clone

Git, Node 22+, npm/npx, and GitHub CLI are requirements. Check and install missing tools now through supported OS installers, then verify their version commands. Refresh the shell PATH when needed. Do not postpone GitHub CLI or npm installation until the user selects repositories or optional skills, and do not ask "Should I install them?" The user handles unavoidable OS/app approvals and sign-in; the agent runs the installers. Report concrete blockers rather than treating requirements as optional.

Install the starter using Git:

~~~text
git clone https://github.com/LeanLabs0/CompanyOS.git <empty-destination>
git -C <destination> remote remove origin
~~~

Remove the starter remote immediately, before saving personal information. Do not offer an archive download path. If this session cannot run Git against persistent storage, explain the required local mode and continue there.

Verify kit.json, AGENTS.md, .company-os/workflows/onboard.md, and .company-os/scripts/company-os.mjs. This handoff requires setup_schema 3 and kit 0.4.0 or newer. If the published source is older, stop installation and report the version mismatch instead of substituting an incompatible workflow.

For a fresh starter, use main as the personal branch. Never rename an existing personal backup's branch blindly.

### 3. Follow local onboarding

Read AGENTS.md and .company-os/workflows/onboard.md and carry out the workflow.

Ask about the user's name/role, company/client, priority, and a useful source. Reuse any answers already supplied. Then automatically create and configure two private repositories, or use the existing personal/company URLs the user supplied:

- personal: a private complete-brain backup, including unpublished company edits, excluding secrets and disposable machinery.
- company: a separate private repository containing wiki/, corrections/, and its own short README.md and AGENTS.md, with company-only history. These root documents never include personal backup references or replace personal instructions.

Use GitHub CLI for repository creation. Start browser authentication through gh auth login --web when needed. Always show the actual active one-time code in a code block, the clickable sign-in URL, and “Enter this code on that page.” Show it even if the browser opened or it is in the clipboard. Repeat a valid code on request or restart an expired flow; never invent or save codes in files. The user signs in and approves; the agent verifies access and configures Git authentication.

Keep personal backup under the authenticated individual's account. For company ownership, list accessible organizations with gh org list and recommend the matching company organization; confirm ambiguous or unsupplied ownership and check access. If none is available, offer creating an organization through GitHub's browser setup or using their individual account. Do not invent a CLI organization-creation command, assume membership permits repository creation, or silently change owners after an access failure. Existing company URLs take precedence. Follow local naming and resume rules; the agent creates the repositories and configures remotes. Respect explicit opt-outs and report incomplete setup honestly.

Completed setup uses only the personal and company remotes. A destination may be absent during partial setup or after an explicit user opt-out. Never leave a remote pointing to the starter. Never use a bare push or push the full brain to company. Only the company helper publishes shared content.

Client repositories should contain only operationally useful material. Configure replaces an unchanged starter README with a brief personal guide referencing the actual destinations and removes unchanged tests, package metadata, release/checking tools, maintainer notes, and folder-placeholder READMEs. Preserve client edits. Keep the runtime, skill sources, recovery instructions, license, and essential version/setup/sync/skill state; do not delete JSON indiscriminately. Company root documents are generated separately and included in the company review.

If the user wants to invite coworkers, use the exact GitHub usernames and invite only to the company repository. Report access as pending until invitations are accepted.

### 4. Install required core skills

The company-os, company-os-sync, and company-os-restore skills are required. Install them automatically through npx skills add with --global and the current supported agent target; the kit's installer handles this flow. Execute installation, not just a preview. Do not present core Company OS installation as optional or offer to skip it.

Leave optional skill selection until the final step, after repository sync and the return/verification instructions. Core installation must not depend on optional choices.

Source files bundled with the kit are not an installation method by themselves. Register the brain locator and verify the app actually discovers the global skills. Cowork may need the equivalent account-level adapter; do not claim machine-global Claude Code installation proves Cowork support.

### 5. Finish work, back up, and review company sharing

Save a useful first deliverable and read it back. Personal backup is enabled during setup and runs automatically. Incoming company changes are reconciled; outgoing wiki/correction changes are prepared for the user's review.

Show the company destination and meaningful before/after changes. Publish only the exact batch the user approves. Conflicts stop for a decision. Do not require a separate company-owner approval process.

Offer an optional scheduled review in the user's chosen app. Prove that its scheduled session can reach the local brain before enabling it. A routine can back up personal work and prepare a company batch; it cannot approve that batch for the user.

### 6. Verify return from another project

Provide this prompt with the actual resolved path:

> Use Company OS from [absolute brain path]. Read its AGENTS.md and .company-os/workflows/prime.md. Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [task].

Verify a fresh conversation from another project can retrieve the saved files. Do not require every chat to start inside CompanyOS. If global discovery fails, keep the explicit path fallback and record the limitation honestly.

Keep .company-os/setup.md to brief dated evidence: app/mode, folder, verified requirements and skills, backup outcome, and outstanding blockers or recall checks. Read URLs/branches from setup.json and skill sources from skills.json rather than duplicating those records. A cloned folder alone is partial installation. Finish required tooling, repositories, and core skills or name the concrete blocker; company initialization remains pending until its first reviewed batch is published.

### 7. Finish with recommended skills

As the last onboarding choice, read .company-os/references/skills.md and show its complete recommended list with a brief description of each: GrillMe, Unslop, Find Skills, Copywriting, Content Strategy, SEO Audit, Email Sequences, and Social Content. The three required Company OS skills are already installed; these are optional additions.

Use the user's saved role, priorities, active project briefs, and synced company knowledge to find relevant skills with npx skills find <query>. Search using generic task terms, never private company details or copied brain content. Highlight the best fits from the curated list and add up to three inspected, nonduplicative suggestions with a short reason tied to their work. If search is unavailable, still offer the curated list. Do not ask for context already saved in the repos.

Ask which they want, then install only selected names through the helper's global npx skills add flow using the actual supported agent target and reviewed sources. Find Skills remains useful for later discovery. Email Sequences installs as emails and Social Content as social; older directory names are stale. Verify app discovery, save installation sources for recovery, and back up that record to personal. Optional selection does not authorize company publication, sending emails, or posting content.
