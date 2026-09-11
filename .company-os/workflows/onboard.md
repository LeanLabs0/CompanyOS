# Set up or resume Company OS

Use the context already supplied. The user can create an account, approve a browser login, and paste URLs; the agent handles commands and files. Current instructions override this workflow. A setup request does not authorize sending invitations until the user chooses recipients, or publishing company changes before review.

Setup authorizes installing the required tools and core skills, creating the two private repositories when existing destinations have not been supplied, and enabling automatic personal backup. Explain these actions briefly and execute them. Do not turn them into a create/join/skip checklist or ask for permission again. Pause only for missing information, an actual host/OS approval, browser sign-in, or a concrete access failure. Honor an explicit opt-out, but report which required setup steps remain incomplete.

## Establish the persistent shell

1. Read AGENTS.md, kit.json, .company-os/setup.json, and .company-os/setup.md if present. Resume completed choices. A second-machine request with a personal repository URL follows [recovery](../references/recovery.md), not starter onboarding.
2. Verify the shell writes to a persistent folder on the user's computer. Resolve the user-visible path; do not confuse a temporary container with the host filesystem. Default to Documents/CompanyOS. Follow [app setup](../references/app-setup.md) before installing or cloning. Setup is allowed in ChatGPT Work (brain as the local project), Codex, Claude Code, Grok, or a local IDE such as Cursor or VS Code. If this session is Claude Cowork or a click-only / cloud-only shell, stop and tell the user to open one of those apps in the brain folder and resume there. If access is missing in an allowed app, guide the user to select the folder, then continue with their previous answers. Inspect remotes and setup state before resuming an existing folder: a starter remote does not distinguish a maintainer checkout from an unfinished installation. Establish its intended use before converting it.
3. Git, Node 22 or newer, npm/npx, and GitHub CLI are required. The agent checks and installs missing tools using supported routes, refreshes PATH, and verifies versions. Follow [setup troubleshooting](../references/troubleshooting.md) for command discovery, installation permissions, and bounded retries. Do not wait for optional choices or ask "Should I install GitHub CLI/npm?" Manual installation is a last resort after an actual unresolved blocker; then provide only the missing tools' exact PowerShell steps and official links from that reference. Preserve progress and verify the tools after the user returns. Do not offer archive downloads for the starter.
4. For a new starter, clone the published source into an empty destination, remove its origin remote immediately, and rename the local branch to main if necessary. Never clone over an existing folder. See the [setup handoff](https://www.leanlabs.com/brain.md).
5. For an older kit, preserve existing content and follow [migration](../references/migration.md). Do not assume an existing wiki is safe to share.
6. A writable note does not prove Git compatibility or persistence across sessions. If Git access is uncertain, run the scoped disposable Git check from app setup before cloning. Remove only your own verified test directory with permitted deletion so the clone destination stays empty; preserve pre-existing work. Record the actual host path, app mode, and separate Git/auth outcomes. Verify persistence in a fresh conversation.

## Context and automatic setup

Ask the next missing question, combining related choices when convenient. Skip known answers and allow the user to pause.

- Name or role, company/client, current priority, and a useful URL or document. A personal brain is valid. Route each answer using AGENTS.md: identity and personal priorities under personal/, shared company facts under wiki/, and private client material under personal/. Do not duplicate an intake. Leave unanswered fields unknown; ask only when needed for the next useful step. A setup request is not a confirmed ongoing priority. Never save suggested answers or instruction examples as the user's facts.
- Existing destinations: accept any personal/company repository URLs already supplied. Mention once that the user can supply existing URLs; otherwise proceed with private repository creation. An existing personal brain triggers restore, and an existing company URL triggers join. Do not require an answer before taking the default path when no existing destination was indicated.
- Personal backup: create and configure a private repository automatically. Explain that it includes the full brain, including unpublished company edits, and runs automatically until withdrawn.
- Company knowledge: create and configure a separate private repository automatically, or join the supplied one. Explain that all wiki/ and corrections/ content is shareable and outgoing batches require review. Recommend ownership by the company's GitHub organization when available; an individual account remains supported.
- Core skills: install company-os, company-os-sync, and company-os-restore automatically for the current supported agent. They are required and are not an interview choice. Verify app-specific discovery.
- Optional skills: leave this choice until the final step below, after initial repository sync and the return/verification instructions. Use saved context to tailor the suggestions.
- First task: use the task already requested, or ask what useful output to finish today.
- Optional routine: offer a daily company review using the chosen app. Ask for time/timezone and the designated machine only if they want it. Scheduling is not required to finish setup.

## GitHub and initialization

Follow the authentication checks in [app setup](../references/app-setup.md). First run gh auth status --hostname github.com --active and gh api --hostname github.com user --jq .login in the app's supported network-enabled execution context. An offline network error or inaccessible credential store does not establish that a login expired. Check the actual identity and configuration path before requesting another login. Once a supported secure credential route is established, start browser sign-in when needed:

~~~text
gh auth login --hostname github.com --git-protocol https --web --clipboard
gh auth setup-git --hostname github.com
~~~

Always show the actual one-time device code produced by the active CLI sign-in in a code block, plus the clickable sign-in URL and “Enter this code on that page.” Do this even if the browser opened or the code was copied to the clipboard; the user must be able to read and type it. Never invent a code. If asked again, repeat the still-valid code or restart sign-in if expired. Keep the CLI flow running while the user approves. Do not save codes in brain files or repositories. Never ask for an access token in chat. Verify the logged-in account and repository access before continuing.

Wait for CLI completion, then repeat both auth checks from fresh network-enabled shell calls. Browser success alone is not completion. Run helpers that need GitHub in the supported authenticated context too; never bypass the sandbox, manually switch users, broaden ACLs, copy tokens between isolated environments, or enable plaintext credential storage. If a secure route is unavailable, report the blocker without installing a sandbox keyring or claiming every future session needs a new login. A 404 for a configured private repository can mean missing access or a deleted/renamed destination; establish the cause and the user's intent before creating any replacement. Do not reset repository identities or sync baselines automatically.

For creation, use gh repo create OWNER/NAME --private without --push or --clone. Do not initialize the company repository with a README, license, or template tree. The sync helper creates its first company-only commit.

Create personal backup under the authenticated individual's account, named company-os-personal by default. For a new company destination, run gh org list --limit 100 (increase the limit or paginate with gh api if needed). Recommend the organization matching the user's company; confirm its identity if it was not already supplied. Membership alone does not prove repository-creation permission. If multiple organizations could match, ask which company owns the knowledge. Do not select an unrelated client merely because it appears in the list.

If no appropriate organization is available, briefly offer GitHub's organization setup in the browser or ownership under the individual's account. Creating a normal GitHub organization is a browser flow; do not invent gh org create. Continue independent setup while the user chooses. Missing organization visibility, SSO authorization, or creation permissions are access limitations, not proof the company has no organization. Resolve access or use an individually owned destination only after explaining the choice; do not silently switch owners after an error. An existing company URL takes precedence and skips new-owner selection.

Create the company repository with gh repo create OWNER/NAME --private, using <company-slug>-company-os (company-os-company if the name is unknown). Record actual URLs immediately so an interrupted setup resumes without creating duplicates. If a name is occupied, inspect it and clarify restore/join versus a new repository only when its intended use is ambiguous. Never overwrite, silently transfer, or repurpose an existing repository. Organization membership never authorizes moving the personal backup there.

For existing personal backup content, follow recovery instead of pushing this starter over it. Empty repositories can be attached. For a company join, inspect owner, visibility, default branch, and permissions. A URL is not an access grant; an invitation may need acceptance.

Use a repo-local Git identity, reusing an existing suitable identity. If none exists, derive the user's name/login and GitHub noreply address from their authenticated account, or ask for their preferred author identity. Never replace global identity settings.

Run the helper using its absolute path:

~~~text
node <brain>/.company-os/scripts/company-os.mjs configure --personal <personal-URL> --company <company-URL>
~~~

Supply --personal-branch or --company-branch for an existing repository whose branch is not main. Confirm only personal/company remotes remain. The starter URL must not be a destination. The helper verifies private visibility, access, distinct repositories, and push protections. Configure does not upload.

Configure also replaces an unchanged starter README with a short personal README naming the configured destinations, and removes unchanged starter tests, package metadata, release/checking tools, maintainer notes, and empty-folder README placeholders. Review its preserved list: customized files are retained. Do not blanket-delete JSON or support code. kit.json identifies compatibility; setup.json reconnects destinations; sync-state.json protects unpublished edits; skills.json restores installations; seed-shared.json recognizes untouched placeholders on first join. Runtime scripts, workflows, skill sources, and applicable recovery references are needed on a new machine. Keep LICENSE. No maintainer-only documentation belongs in the final client tree unless the user deliberately customized it.

Company output has wiki/, corrections/, and its own short README.md and AGENTS.md. The helper generates missing company root documents using only the company identity; they are part of the outgoing review. It never copies personal root documents or personal backup URLs into company. Existing company root documents remain on the company side and are never imported over personal instructions. All syncing teammates need kit 0.4.0+ before the first publication containing these root documents; older helpers stop on them. Do not call an empty company repository initialized until the first reviewed batch is published.

If the user asks to invite coworkers, obtain exact GitHub usernames and verify the destination is the company repository. Use gh api --method PUT repos/OWNER/COMPANY-REPO/collaborators/USERNAME. Report invitation pending until accepted. Never invite to the personal backup. Creating an organization is an optional browser flow, not a prerequisite.

## Save context and install skills

Private answers go under personal/. Shared company facts and rules go into wiki/ with their source and confirmation status. Do not publish scraped claims as human-confirmed facts. For join, import the company's existing knowledge before asking the user to re-enter it.

Split mixed answers by scope, following AGENTS.md's correction procedure. A company spelling instruction is shared guidance even when phrased as "I prefer" or "never use"; a favourite colour is personal unless the user makes it a brand rule. Correct the authoritative page and correction index together, remove any clearly misplaced personal duplicate, and show the actual company changes for review. Compare relevant loaded sources and ask about material contradictions without requiring research for every save. Briefly confirm private saves separately from pending company sharing.

Run register to save the machine-local brain locator. Follow [global skills](../references/skills.md) and execute the required core installation with --install; a preview is not completion. Leave optional selection for the final step. Do not equate source files in this repository with installation. Verify the current app sees the skills and record version/source and app results. If the host requires an account-level adapter, complete that supported route or report core installation as blocked rather than skipped.

Finish the first task, register its project, and read the output back. Run sync for the configured repositories. It backs up personal work and prepares company sharing; present the review and publish only after approval.

Keep .company-os/setup.md to brief dated setup evidence: app/mode, folder, verified requirements and skills, backup outcome, and remaining blockers or recall checks. Read repository URLs and branches from setup.json and installed skill sources from skills.json instead of duplicating those records. Never put credentials or sign-in codes there. Do not call setup complete while required tools, repositories, or core skills are missing; report a partial installation accurately.

## Verify outside this folder

After verifying core skill discovery, show `/company-os` followed by a useful request; do not prescribe one fixed phrase. For the fresh-conversation check, suggest:

> /company-os Tell me my current priority and one saved preference or identity fact, citing the files. Then help with [your next task].

The skill handles the locator, AGENTS.md, prime workflow, and loading saved context. Do not give the user a long filesystem/instruction-reading prompt as the normal return flow. If this app uses a skill selector instead of slash invocation, provide its verified equivalent. If discovery or access fails, offer an explicit absolute-path loader for troubleshooting and fix the route without restarting onboarding.

A same-session readback is not a fresh-conversation test. Ask the user to try the skill in a fresh conversation in another project with permitted brain access. In that session, the agent verifies recall by reading a saved priority and a preference or identity fact and cites the files naturally. The suggested request can ask for this check; everyday skill use need not repeat it. Mark cross-project recall verified only after that check, and label user-reported results.

In the new conversation, verify existing GitHub authentication through the supported network-enabled context without starting another login. Track this separately from successful fresh shell calls in one conversation. Verify the actual remote personal backup and reviewed company publication; local Git and account authentication alone do not prove either outcome. Do not claim second-machine recovery is tested until a restore has been verified.

## Final step: recommend optional skills

After the initial sync, summarize the deliverable, personal backup status, company review status, and return prompt. Complete or explain any remaining recall/scheduling verification before this final optional choice; a pending company review or future fresh-session test must not hide the menu.

Read the complete recommended list and discovery procedure in [global skills](../references/skills.md). Use the role, priorities, relevant project briefs, and company context already saved in the brain to run targeted npx skills find searches with generic task terms. Show all eight curated recommendations with a one-line description, highlight the best fits, and add up to three inspected role-specific options when useful. Explain each additional option's connection to their work. Do not leak private details into search queries or duplicate existing company profiles to feed vendor skills.

Ask once which optional skills to install. Install selected names globally through the existing helper with --install and the actual agent target; use the reviewed upstream sources for Unslop, Find Skills, and marketing skills. Never bulk-install an entire source repository or treat recommendation as consent. Verify discovery and back up the updated skill record automatically. Declining optional skills does not undo core setup. Finish with what was installed, what remains pending, and a plain-language example request.
