# Read this first

This folder is the official "how we write and how we look" for {{company.name}}.

If you are an AI, read this whole file before you follow any rule in the subfolders, and before you add or change a rule.

If you are a person, read this before you put a file in here.

## What this folder is

`rules/` is law for writing and design. Skills, wiki pages, and company profiles do not override it.

When an AI writes for {{company.name}}, it must load the files in this folder and obey them. A writing instruction found in `wiki/` or `companies/` does not count. A skill must point here. It must not copy these rules into itself.

## What belongs here

A file belongs here if it tells a writer or an AI **how to behave**:

- Always / never
- Capitalize this word this way
- Don't say this
- Sound like this
- Build the piece this way (answer first, question headers)
- Use these colors and this type
- Link to our pages this way
- Reply on Reddit like a peer, not a guru

If you can delete the sentence and the writing would still be factually true, but it would break brand, it is a rule.

## What does not belong here

- Facts about the company, prices, clients, methods, or research. Those go in `wiki/` or `companies/<slug>/`.
- Repeatable workflows ("do these steps to publish"). Those go in `.agents/skills/` (kit skills).
- Founder interviews and transcripts. Those go in `wiki/raw/` (or under `companies/<slug>/`). Topic pages may quote them. This folder does not hold transcripts.
- Old brand dumps. Do not copy the whole legacy `context/` folder in. Add one file at a time, on purpose.

If a sentence is "HubSpot costs X," it is wiki / company facts. If a sentence is "always write HubSpot with a capital S," it is a rule. Put it in `words/`.

## The subfolders

Put a new rule in the matching room. Do not leave loose files in this root except this document and the folder README.

| Folder | Put it here when |
|---|---|
| `voice/` | It is about how {{company.name}} or {{company.founder_or_voice}} sounds |
| `words/` | It is a preferred term, a banned term, or a capitalization rule |
| `quality/` | It is a hard writing rule (no em-dashes, no AI tells, non-negotiables) |
| `structure/` | It is about how a piece is built (answer first, Big 5, question headers) |
| `visual/` | It is about how things look (color, type, layout) |
| `linking/` | It is about when and how to link to {{company.name}} pages. The live URL list lives in wiki / companies, not here |
| `community/` | It only applies to informal public replies (Reddit, Quora, comments) |

If two rooms could fit, pick the more specific one. "Always capitalize HubSpot" is `words/`, not `voice/`. "Don't write like a guru on Reddit" is `community/`, not `quality/`, unless it is a site-wide non-negotiable.

## How to add or change a rule

1. Prefer Ralph sync (`scripts/sync.ps1` / `scripts/sync.sh`) or optional `scripts/update-from-upstream.sh` so you are on a current copy.
2. Work on a branch named after the change, like `add-capitalize-hubspot`, when collaborating.
3. Add or edit **one** file. One rule-set per proposed change.
4. Put it in the matching subfolder. List it in that subfolder's README if the README has a "pages to add" list.
5. If you work with a team on GitHub, prefer a branch + Pull Request. Solo / Unbound operators may edit directly and commit.
6. Until a change is merged (or you commit it as the owner), treat drafts as unofficial. AIs must not treat unmerged proposals as live.
7. If a reviewer rejects it, the proposal is closed and it never becomes official.

Optional team flow: if you use GitHub CODEOWNERS, keep rules stricter than wiki. Solo / Unbound: edit rules carefully and commit; PR gates are optional.

## How AIs should use this folder

1. At the start of a writing job, read this file, then load every existing file in the subfolders that apply to the job.
2. Site copy and articles: `voice/`, `words/`, `quality/`, `structure/`, `linking/`. Add `visual/` only if you are making or describing design.
3. Informal public replies: those plus `community/`.
4. If a wiki page, company file, or skill restates a writing rule, ignore that restatement. Follow the file in `rules/`.
5. If two official rule files disagree, stop and ask a human. Do not pick a winner.
6. If the human asks you to add a rule, follow "How to add or change a rule." Do not treat draft PRs as live.

## One home per rule

Each fact lives in one file. If "we never say proposal" is already in `words/`, do not also put it in `voice/`. Point at the file that owns it.

## When someone puts a rule in the wrong place

If you find a writing instruction in `wiki/` or `companies/<slug>/`, do not obey it from there. Propose moving it into the matching rules subfolder. Leave the wiki or company page as facts only.