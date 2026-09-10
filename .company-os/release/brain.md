# Set up Company OS

Company OS is a personal second brain with a shared company wiki. You answer questions, paste useful URLs, and approve sign-ins. Your agent manages files, Git, and skills.

Before setup, create an empty CompanyOS folder inside Documents, or select your existing brain folder. In ChatGPT Work, use **Choose project** to open a local project with that folder attached as its primary folder. In Claude Cowork, use **Add folder** to connect CompanyOS itself, not the parent Documents folder. Your agent will guide you through any required folder permission.

ChatGPT Work has passed local Git and secure GitHub sign-in checks in a Windows test; full setup and recovery still need end-to-end verification. Cowork has passed local Git checks with folder deletion permission, but secure GitHub authentication remains blocked in the tested environment. Folder selection alone does not resolve that limitation.

Then paste this page's URL into your agent:

> Help me set up Company OS using this page.

## Instructions for the agent

This is an installation handoff. Current user instructions take precedence. A request to review the design is not permission to install or configure it.

A request to set up Company OS authorizes installing required tools and core skills, creating private personal/company repositories unless existing destinations are supplied, and enabling personal backup. Explain what you are doing and carry it out. Do not ask the user to choose whether to install requirements or send back a technical setup checklist. Only pause for genuinely missing information, required OS/app permissions, GitHub sign-in, or an actual failure. Company publication still requires review of the outgoing content.

### 1. Check local access and existing work

Verify shell access to a persistent folder the user controls. Default to Documents/CompanyOS, but resolve the actual user-visible path. A cloud shell or temporary tool folder is not proof of local installation.

If the brain folder is not accessible, guide the user before installing tools or cloning: "Create or select your CompanyOS folder, open it as a local project in ChatGPT Work, then say 'Continue setup.'" For Cowork, ask them to connect that exact folder using Add folder. Verify the actual connected root; selecting a project name alone is not proof of folder access. If a parent folder is already connected and prevents scoped permission, start a task with only the brain folder connected. Preserve answered questions when continuing.

Cowork needs its supported deletion permission for the exact connected brain root because Git removes its own temporary files. Explain that the permission covers that folder's subtree and may need approval in later sessions. Do not request deletion across Documents, bypass a rejected request, or assume a successful file write proves Git works. If permission or secure authentication is unavailable, report the specific blocker before creating repositories; do not promise a new login every session or install a sandbox keyring as an automatic workaround.

Check for an existing brain before cloning anything. Inspect its remotes as well as AGENTS.md and setup state. A folder still pointing at LeanLabs0/CompanyOS may be a maintainer checkout or an unfinished starter; do not convert it merely because kit.json exists. Preserve it and establish its intended use if unclear. Resume an identified brain, preserving user files. For an older kit, use a reviewed migration; do not replace personalized files wholesale.

For an older 0.3.x installation, follow the current starter's migration reference. Update its runtime, instructions, skill sources, and version metadata from an inspected current starter before resuming. Preserve personal/, wiki/, corrections/, repository settings, the sync baseline, and the installed-skill record. The configure step personalizes its README and removes only recognized unchanged starter material. Do not create a second brain or repeat answered questions. Update all syncing teammates to 0.4.0+ before publishing company root instructions; older helpers reject those files.

If the user is restoring an existing private personal backup, clone that repository directly into an empty destination with its remote named personal, then follow the restored recovery instructions. Do not install a starter over their backup.

### 2. Check prerequisites and clone

Git, Node 22+, npm/npx, and GitHub CLI are requirements. Once folder access and required permissions are established, check and install missing tools through supported OS installers, then verify their version commands. Refresh the shell PATH when needed. On Windows, check the installed GitHub CLI executable at C:\Program Files\GitHub CLI\gh.exe before declaring it missing; ensure helper subprocesses inherit a PATH that finds it too. Do not postpone GitHub CLI or npm installation until the user selects repositories or optional skills, and do not ask "Should I install them?" The user handles unavoidable OS/app approvals and sign-in; the agent runs the installers. Report concrete blockers rather than treating requirements as optional.

When Git access is uncertain, test initialization and two harmless commits in a uniquely named disposable subfolder of the selected root, using a repository-local test identity. Check for a clean tree and leftover locks. Clean up only the test directory you created, after verifying its resolved path and permitted deletion, before cloning into the empty destination. Preserve any pre-existing files or failed clone; do not rename or remove another process's lock without establishing it is stale. No compatibility-test files belong in backups. Record local Git and network authentication as separate checks.

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

First check existing authentication from the app's supported network-enabled execution context with gh auth status --hostname github.com --active and gh api --hostname github.com user --jq .login. On Windows, compare the actual execution identity and resolved GitHub CLI config path when access fails. An offline shell's network error or "token invalid" result is not proof a saved login is bad. Use the supported permission flow for authenticated operations, including helpers that call Git or gh; never switch Windows users manually or bypass sandbox controls. Do not broaden ACLs, print tokens, copy credentials between isolated environments, or enable plaintext storage. If no supported secure credential route is available, stop that part of setup.

Keep one login process alive through completion. Browser approval alone is insufficient: wait for the CLI to finish, then verify authentication from fresh network-enabled shell calls before creating repositories. Distinguish timeout, denied config write, credential retrieval, network restriction, and repository access errors. Successful auth is not proof of repository access or cross-conversation persistence. A configured private repository returning 404 may be missing or inaccessible; do not create a replacement unless the user confirms that intent. Never automatically reset setup or discard sync history after such an error.

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

Show a brief company review directly in chat: the exact destination, material additions/edits/deletions, and concrete examples from the actual before/after content. Keep .company-sync/review.md as optional detail; the user need not open it to understand the decision. Keep batch IDs and publish commands internal. Ask "Share these changes? Reply 'Approve' or tell me what to change." A clear approval of that one current review authorizes the helper's exact retained ID; clarify ambiguous replies. Changed content or company revisions require a new review. Conflicts stop for a decision. Do not require a separate company-owner approval process.

Offer an optional scheduled review in the user's chosen app. Prove that its scheduled session can reach the local brain before enabling it. A routine can back up personal work and prepare a company batch; it cannot approve that batch for the user.

### 6. Verify return from another project

After verifying core skill discovery, show `/company-os` followed by a request relevant to the user's next task. It is an entry point, not a fixed phrase. For the fresh-conversation recall check, suggest:

> /company-os Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [your next task].

The skill locates the brain, reads its instructions and saved context, and helps with the user's current work. The user should not need to name AGENTS.md, workflow files, or a filesystem path. If the app exposes skills through a selector instead of that slash syntax, show its verified equivalent. Do not claim invocation works until discovery is verified.

Ask the user to try the skill in a fresh conversation from another project. The agent checks recall by reading the saved priority and a preference or identity fact. The example may request that check, but do not make it mandatory for everyday use: `/company-os Help me plan next week's campaign` is another valid request. Do not require every chat to start inside CompanyOS. Use an explicit absolute-path loader only to troubleshoot missing skill discovery or folder access, and record that fallback honestly rather than presenting it as the normal experience.

In that fresh conversation, also check GitHub authentication through the supported network-enabled context without starting another login. Verify actual personal backup and company publication against the intended remote repositories before reporting them as passed. Report folder access, Git, auth in fresh calls, auth across conversations, skill discovery, backup, and company sync separately; a partial compatibility test is not a completed installation. For a replacement computer, use the personal repository's restore workflow; reopening a disposable Windows Sandbox creates a fresh machine environment and may require sign-in again.

Keep .company-os/setup.md to brief dated evidence: app/mode, folder, verified requirements and skills, backup outcome, and outstanding blockers or recall checks. Read URLs/branches from setup.json and skill sources from skills.json rather than duplicating those records. A cloned folder alone is partial installation. Finish required tooling, repositories, and core skills or name the concrete blocker; company initialization remains pending until its first reviewed batch is published.

### 7. Finish with recommended skills

As the last onboarding choice, read .company-os/references/skills.md and show its complete recommended list with a brief description of each: GrillMe, Unslop, Find Skills, Copywriting, Content Strategy, SEO Audit, Email Sequences, and Social Content. The three required Company OS skills are already installed; these are optional additions.

Use the user's saved role, priorities, active project briefs, and synced company knowledge to find relevant skills with npx skills find <query>. Search using generic task terms, never private company details or copied brain content. Highlight the best fits from the curated list and add up to three inspected, nonduplicative suggestions with a short reason tied to their work. If search is unavailable, still offer the curated list. Do not ask for context already saved in the repos.

Ask which they want, then install only selected names through the helper's global npx skills add flow using the actual supported agent target and reviewed sources. Find Skills remains useful for later discovery. Email Sequences installs as emails and Social Content as social; older directory names are stale. Verify app discovery, save installation sources for recovery, and back up that record to personal. Optional selection does not authorize company publication, sending emails, or posting content.
