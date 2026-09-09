# Set up Company OS

Company OS is a personal second brain with a shared company wiki. You answer questions, paste useful URLs, and approve sign-ins. Your agent manages files, Git, and skills.

Paste this page's URL into ChatGPT Work, Claude, or another agent with local shell access:

> Help me set up Company OS using this page.

## Instructions for the agent

This is an installation handoff. Current user instructions take precedence. A request to review the design is not permission to install or configure it.

### 1. Check local access and existing work

Verify shell access to a persistent folder the user controls. Default to Documents/CompanyOS, but resolve the actual user-visible path. A cloud shell or temporary tool folder is not proof of local installation.

Check for an existing brain before cloning anything. If present, read its AGENTS.md and setup state and resume. Preserve user files. For an older kit, use a reviewed migration; do not replace personalized files wholesale.

If the user is restoring an existing private personal backup, clone that repository directly into an empty destination with its remote named personal, then follow the restored recovery instructions. Do not install a starter over their backup.

### 2. Check prerequisites and clone

Check Git, Node 22+, npm/npx, and GitHub CLI. Install missing prerequisites through supported OS installers when authorized. Ask the user only for unavoidable OS permissions or sign-in steps.

Install the starter using Git:

~~~text
git clone https://github.com/LeanLabs0/CompanyOS.git <empty-destination>
git -C <destination> remote remove origin
~~~

Remove the starter remote immediately, before saving personal information. Do not offer an archive download path. If this session cannot run Git against persistent storage, explain the required local mode and continue there.

Verify kit.json, AGENTS.md, .company-os/workflows/onboard.md, and .company-os/scripts/company-os.mjs. This handoff requires setup_schema 3 and kit 0.3.0 or newer. If the published source is older, stop installation and report the version mismatch instead of substituting an incompatible workflow.

For a fresh starter, use main as the personal branch. Never rename an existing personal backup's branch blindly.

### 3. Follow local onboarding

Read AGENTS.md and .company-os/workflows/onboard.md and carry out the workflow.

It asks about the user's work and offers create / existing URL / skip for each destination:

- personal: a private complete-brain backup, including unpublished company edits, excluding secrets and disposable machinery.
- company: a separate private repository containing only wiki/ and corrections/, with company-only history.

Both repositories can belong to an individual GitHub account; an organization is optional. Use GitHub CLI for repository creation. Start browser authentication through gh auth login --web when needed. The user signs in and approves; the agent verifies access and configures Git authentication.

The only remote names after setup are personal and company, with either absent if skipped. Never leave a remote pointing to the starter. Never use a bare push or push the full brain to company. Only the company helper publishes shared content.

If the user wants to invite coworkers, use the exact GitHub usernames and invite only to the company repository. Report access as pending until invitations are accepted.

### 4. Install selected global skills

Offer Company OS core skills, GrillMe, and up to three relevant optional skills. Install selected packages to machine-global locations through the Vercel Agent Skills CLI with --global and explicit agent targets.

Source files bundled with the kit are not an installation method by themselves. Register the brain locator and verify the app actually discovers the global skills. Cowork may need the equivalent account-level adapter; do not claim machine-global Claude Code installation proves Cowork support.

### 5. Finish work, back up, and review company sharing

Save a useful first deliverable and read it back. Personal backup runs automatically after the user enables it. Incoming company changes are reconciled; outgoing wiki/correction changes are prepared for the user's review.

Show the company destination and meaningful before/after changes. Publish only the exact batch the user approves. Conflicts stop for a decision. Do not require a separate company-owner approval process.

Offer an optional scheduled review in the user's chosen app. Prove that its scheduled session can reach the local brain before enabling it. A routine can back up personal work and prepare a company batch; it cannot approve that batch for the user.

### 6. Verify return from another project

Provide this prompt with the actual resolved path:

> Use Company OS from [absolute brain path]. Read its AGENTS.md and .company-os/workflows/prime.md. Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [task].

Verify a fresh conversation from another project can retrieve the saved files. Do not require every chat to start inside CompanyOS. If global discovery fails, keep the explicit path fallback and record the limitation honestly.

Record the actual kit version, folder, app, deliverable, backup status, and verification evidence in .company-os/setup.md.

Handoff revision: 0.3.0. Canonical URL: https://www.leanlabs.com/unbound/brain.md
Publishing source: LeanLabs0/leanlabs-worker, content/unbound/brain.md.
