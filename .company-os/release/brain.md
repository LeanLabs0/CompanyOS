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

If an incomplete installation has kit 0.3.0, update its setup/support instructions and version metadata from an inspected current starter before resuming. Preserve personal/, wiki/, corrections/, repository settings, the sync baseline, and the installed-skill record. Follow the current automatic setup policy instead of repeating the old optional-tool/core-skill questionnaire. Do not create a second brain just to resume setup.

If the user is restoring an existing private personal backup, clone that repository directly into an empty destination with its remote named personal, then follow the restored recovery instructions. Do not install a starter over their backup.

### 2. Check prerequisites and clone

Git, Node 22+, npm/npx, and GitHub CLI are requirements. Check and install missing tools now through supported OS installers, then verify their version commands. Refresh the shell PATH when needed. Do not postpone GitHub CLI or npm installation until the user selects repositories or optional skills, and do not ask "Should I install them?" The user handles unavoidable OS/app approvals and sign-in; the agent runs the installers. Report concrete blockers rather than treating requirements as optional.

Install the starter using Git:

~~~text
git clone https://github.com/LeanLabs0/CompanyOS.git <empty-destination>
git -C <destination> remote remove origin
~~~

Remove the starter remote immediately, before saving personal information. Do not offer an archive download path. If this session cannot run Git against persistent storage, explain the required local mode and continue there.

Verify kit.json, AGENTS.md, .company-os/workflows/onboard.md, and .company-os/scripts/company-os.mjs. This handoff requires setup_schema 3 and kit 0.3.1 or newer. If the published source is older, stop installation and report the version mismatch instead of substituting an incompatible workflow.

For a fresh starter, use main as the personal branch. Never rename an existing personal backup's branch blindly.

### 3. Follow local onboarding

Read AGENTS.md and .company-os/workflows/onboard.md and carry out the workflow.

Ask about the user's name/role, company/client, priority, and a useful source. Reuse any answers already supplied. Then automatically create and configure two private repositories, or use the existing personal/company URLs the user supplied:

- personal: a private complete-brain backup, including unpublished company edits, excluding secrets and disposable machinery.
- company: a separate private repository containing only wiki/ and corrections/, with company-only history.

Both repositories can belong to an individual GitHub account; an organization is optional. Use GitHub CLI for repository creation. Start browser authentication through gh auth login --web when needed. The user signs in and approves; the agent verifies access and configures Git authentication.

Use the authenticated individual's account by default. Follow the local workflow's naming and resume rules. Do not require the user to create repositories, configure remotes, or choose create/join/skip from a menu. Respect explicit opt-outs and preserve existing repositories; report any incomplete required setup honestly.

Completed setup uses only the personal and company remotes. A destination may be absent during partial setup or after an explicit user opt-out. Never leave a remote pointing to the starter. Never use a bare push or push the full brain to company. Only the company helper publishes shared content.

If the user wants to invite coworkers, use the exact GitHub usernames and invite only to the company repository. Report access as pending until invitations are accepted.

### 4. Install required core skills and offer GrillMe

The company-os, company-os-sync, and company-os-restore skills are required. Install them automatically through npx skills add with --global and the current supported agent target; the kit's installer handles this flow. Execute installation, not just a preview. Do not present core Company OS installation as optional or offer to skip it.

Ask only whether the user wants the optional GrillMe skill. If yes, install grill-me through the same global npx skills add flow. GrillMe is the only optional skill offered in this release.

Source files bundled with the kit are not an installation method by themselves. Register the brain locator and verify the app actually discovers the global skills. Cowork may need the equivalent account-level adapter; do not claim machine-global Claude Code installation proves Cowork support.

### 5. Finish work, back up, and review company sharing

Save a useful first deliverable and read it back. Personal backup is enabled during setup and runs automatically. Incoming company changes are reconciled; outgoing wiki/correction changes are prepared for the user's review.

Show the company destination and meaningful before/after changes. Publish only the exact batch the user approves. Conflicts stop for a decision. Do not require a separate company-owner approval process.

Offer an optional scheduled review in the user's chosen app. Prove that its scheduled session can reach the local brain before enabling it. A routine can back up personal work and prepare a company batch; it cannot approve that batch for the user.

### 6. Verify return from another project

Provide this prompt with the actual resolved path:

> Use Company OS from [absolute brain path]. Read its AGENTS.md and .company-os/workflows/prime.md. Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [task].

Verify a fresh conversation from another project can retrieve the saved files. Do not require every chat to start inside CompanyOS. If global discovery fails, keep the explicit path fallback and record the limitation honestly.

Record the actual kit version, required-tool versions, folder, app, repository URLs, core-skill installation, deliverable, backup status, and verification evidence in .company-os/setup.md. A cloned folder alone is only partial installation. Finish required tooling, repositories, and core skills before reporting setup complete, or name the concrete blocker and next recovery action.
