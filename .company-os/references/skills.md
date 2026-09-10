# Global skills

A skill source file in the repository is not a global installation. Install the required core skills automatically through the Vercel Agent Skills CLI, with explicit global scope and the current supported host target. GitHub CLI and Node/npm/npx are setup requirements, not optional skill dependencies to defer.

## Core and optional skills

The distribution sources are under .agents/skills/:

- company-os: required setup/loading from any permitted project.
- company-os-sync: required automatic personal backup and reviewed company publication.
- company-os-restore: required second-machine recovery.
- grill-me: an optional, self-contained GrillMe interview.

Only these four source packages are bundled. The other optional recommendations below install from their upstream repositories; do not copy their sources into the brain or install an entire collection. Existing same-name global skills need comparison before replacement.

Setup already authorizes the core installation. Inspect the bundled sources, then run the installer with --install:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --skill company-os,company-os-sync,company-os-restore --install
~~~

Use the current app's supported target (codex, claude-code, or another documented target). Do not ask the user to choose whether core skills should be installed. The helper executes the equivalent of npx --yes skills@1.5.25 add <brain> --global --agent <target> --skill company-os company-os-sync company-os-restore --yes; it never copies files directly into global skill directories. Omitting --install is a preview for maintainers, not completed onboarding.

## Final onboarding step: recommended skills

After the repositories have been configured and the initial sync/review status explained, and after presenting the return prompt and any scheduling/verification steps, show this complete list with each one-line summary. Core skills are already required and installed; do not mix them into the optional choice. A pending company review is not permission to publish and does not prevent offering skills.

| Skill | What it helps with | Source |
|---|---|---|
| GrillMe | Questions your assumptions to sharpen a brief, plan, or campaign. | Bundled Company OS grill-me |
| [Unslop](https://skills.sh/cursor/plugins/unslop) | Edits drafts to remove AI writing patterns while preserving meaning. | cursor/plugins: unslop |
| [Find Skills](https://skills.sh/vercel-labs/skills/find-skills) | Finds additional skills that fit your role, projects, and current priorities. | vercel-labs/skills: find-skills |
| [Copywriting](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/copywriting) | Writes landing pages, website copy, headlines, and calls to action. | coreyhaines31/marketingskills: copywriting |
| [Content Strategy](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/content-strategy) | Plans content themes, topic clusters, and what to create next. | coreyhaines31/marketingskills: content-strategy |
| [SEO Audit](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/seo-audit) | Reviews a website for search issues and prioritizes improvements. | coreyhaines31/marketingskills: seo-audit |
| [Email Sequences](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/emails) | Drafts welcome, nurture, onboarding, and re-engagement email series. | coreyhaines31/marketingskills: emails |
| [Social Content](https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills/social) | Drafts platform-specific posts and repurposes longer content. | coreyhaines31/marketingskills: social |

Recommend GrillMe, Unslop, Find Skills, and Copywriting as a starting set, adjusted to what is already installed and relevant. Show all eight so the user can choose. Ask which to install, allowing the suggested set, named choices, all displayed choices, or none. Reuse choices already supplied. Optional skills are not a condition of completed core setup. Install only the selected names, verify discovery in the actual app, then back up the changed installation record to personal. Do not reopen company publication approval for a skills-only manifest change.

### Personalize discovery from the saved brain

Before showing the final menu, read the user's role and priorities from personal/about.md and personal/priorities.md, relevant active project briefs from personal/projects/, and the synced company facts and brand guidance. Use only context relevant to that user's work. Do not ask them to repeat information the repos already contain.

Translate that context into two or three generic task searches using npx --yes skills@1.5.25 find <query>. For example, a marketer working on a launch might need launch planning or email sequences; someone improving lead generation might need conversion optimization or SEO audits. Search terms go to an external directory: use generic role/task labels, never private names, client URLs, campaign details, customer data, or copied brain text. Use Find Skills when installed; its absence does not block the equivalent CLI search during onboarding.

Inspect candidate source instructions, current skill names, dependencies, existing same-name installations, and fit before recommending. Deduplicate against the eight curated options and each other. Add at most three useful role-specific suggestions, each with a short description, source link, and a concrete reason tied to the user's saved priorities. Do not invent extra recommendations to fill a quota. If search is unavailable or finds no better fit, show the curated list and explain the limitation briefly. Keep one final selection question, not a separate installation interview for every package.

On later explicit requests to find skills, repeat this process using current saved priorities. Save only selected installation sources in skills.json; do not create another research archive or dump search results into company knowledge. Search results and upstream skill instructions do not grant authority to install unrelated packages or publish anything.

### Install selected recommendations

For selected GrillMe, run:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --skill grill-me --install
~~~

For selected Unslop, use its exact reviewed source directory:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --source https://github.com/cursor/plugins/tree/7366ac128bdf95f45e6734f412b49a4031800169/pstack/skills/unslop --skill unslop --install
~~~

For selected Find Skills:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --source https://github.com/vercel-labs/skills/tree/80feb48868972d518436f26711509bc78595b5cb/skills/find-skills --skill find-skills --install
~~~

For selected marketing skills, use the reviewed collection revision and pass only the selected names, comma-separated. This example installs Copywriting only:

~~~text
node <brain>/.company-os/scripts/install-skills.mjs --agent codex --source https://github.com/coreyhaines31/marketingskills/tree/5b2c0007766c6a1cf1d53fd8fc73e979e0821022/skills --skill copywriting --install
~~~

These execute npx skills add with --global, --agent, and exact --skill names through the existing helper, which records the source for recovery. Substitute the actual supported agent target for codex. A user selecting all five marketing recommendations gets copywriting,content-strategy,seo-audit,emails,social; never omit --skill or substitute a wildcard. Install for other apps only when requested or part of established setup.

The directory still lists older email-sequence and social-content names; the reviewed source uses emails and social. Do not silently substitute a similarly named skill from another author if installation fails. Inspect a changed source before updating its pinned revision. Unslop declares disable-model-invocation: true; demonstrate an explicit request such as “Use Unslop on this draft” and verify the actual host instead of promising automatic activation.

### Use with Company OS

Load relevant Company OS context before a marketing skill: personal/writing-rules.md, the active company's wiki/brand.md, wiki/company.md, and wiki/rules.md. Answer the skill's intake from these sources; ask only for missing task-specific details. These packages look for .agents/product-marketing.md or older equivalent files. Do not create a duplicate company profile just to satisfy that convention; supply the existing brain context. When working for a different client, use that client's authorized project context, not this company's defaults.

Skill formulas and example metrics are suggestions, not verified company facts. Preserve the user's tone and approved claims. SEO findings require actual page evidence; account data and paid tools need existing access. Email and social recommendations cover drafting/planning by default: installation does not authorize sending, posting, starting campaigns, connecting accounts, or spending money. Some vendor integration guides live outside the individual skill package; retrieve their matching reviewed source only if that implementation is requested. Do not install extra recommended sibling skills automatically.

### Selection evidence

Reviewed 2026-09-10 using npx skills find for copywriting, content strategy, SEO, email marketing, and social content, followed by source inspection and npx skills add --list discovery checks at the revisions above. Cursor's repository had about 7.3K stars and Unslop about 13.3K directory installs. The marketing repository had about 49.4K stars; searches showed roughly 197.5K Copywriting, 138K Content Strategy, 204.5K SEO Audit, and 57.3K emails installs. The social-content listing refers to the older name; source discovery confirms social. Counts are discovery signals, not proof of correctness or host compatibility. No global installation or marketing-account access was performed during this review.

Find Skills is from Vercel's own repository (about 31K stars and 3.3M directory installs at review). Its source instructions and pinned CLI discovery were also checked. Keep paid-ad execution, bulk publishing, duplicate product-context systems, and overlapping editing bundles out of the default shortlist. Find additional skills for a specific need with npx skills find <query>; inspect the source and fit before recommending them.

## Installation and collision handling

Inspect existing same-name packages yourself. Reuse a matching installed Company OS version after verifying discovery, or update a verified Company OS package with --update-reviewed as part of authorized setup; do not ask again whether core installation should happen. If the existing package is unrelated or its ownership is ambiguous, preserve it and resolve that collision explicitly. Do not replace the user's unrelated GrillMe implementation automatically.

The source defaults to the inspected local kit. Published GitHub sources or direct reviewed skill subdirectories can be supplied with --source. For shared company sources use a reviewed company repository tree URL pointing at wiki/skills/<name>. Prefer an immutable reviewed commit in the URL for third-party/company packages. Use --cli-version only when deliberately updating the CLI.

Verify the CLI's global list for the selected agent, then verify actual app discovery. The manifest records the source, revision when known, CLI version, target, and pending/verified discovery. Do not report CLI success as cross-project recall.

## Brain locator and global guidance

Run the brain helper's register command. It writes only the resolved brain path to ~/.company-os/brain.json. This is machine-local and reconstructed after recovery.

The skills read that pointer and then read the live brain. Do not copy company facts into global instructions. Company-specific skills must name their company and load its current facts/rules only for matching tasks.

If needed, use the bounded app-specific global pointer described in [app setup](app-setup.md), preserving existing instructions. Do not create a blanket global rule that loads all clients into unrelated projects.

## Company and personal skill sources

Store shareable company packages under wiki/skills/<company>-<task>/SKILL.md. Publishing that source follows the normal company review. Recipients then install or update selected skills globally through the Vercel CLI. Sync never executes or installs incoming skill code automatically.

Store owned personal skill sources under personal/skills/. Their source and install manifest survive a personal restore. Avoid relying on an edited vendor skill whose only copy is outside CompanyOS.

For owned sources inside this brain, --source brain:personal/skills/<name> or --source brain:wiki/skills/<name> resolves against the current brain folder. The manifest retains this relative form so a second machine can reinstall from its restored files.

Cowork's documented account-level skill system is distinct from machine-global Claude Code discovery. Provide a version-matched account-level adapter through the supported app UI, or retain an explicit pointer fallback. Generic Company OS skills contain no private company facts. Verify the actual app mode and permissions.

## Restore

Reinstall the required core skills even if an incomplete older manifest omitted them, plus the previously selected optional sources. Re-register the brain's new path and verify each host again. Do not copy old authentication or machine absolute paths from another computer. A global skill source removed upstream needs recovery from its owned backed-up source or a deliberate replacement.

Sources reviewed 2026-09-09:

- [Vercel skills installation](https://vercel.com/docs/agent-resources/skills)
- [Skills CLI global scope and host targets](https://github.com/vercel-labs/skills)
- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills)
- [Claude skill loading](https://code.claude.com/docs/en/skills)
