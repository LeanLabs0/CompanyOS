# Wiki schema - your second brain

This folder is an LLM-maintained wiki (the "LLM Wiki" pattern). The AIOS writes and maintains every page. You curate sources, ask questions, and read results (Obsidian works great as the viewer, but any markdown reader does). This file is the schema: structure, conventions, and workflows. It is scoped to `wiki/`. The root `CLAUDE.md` stays canonical for everything else in the AIOS.

## The three layers

1. **Raw sources** (`raw/`): immutable. The AIOS reads them, never edits them. You drop files here (web clippings, PDFs, transcripts, pasted notes). Images live in `raw/assets/`.
2. **The wiki** (`sources/`, `entities/`, `concepts/`, `syntheses/`): AIOS-owned. You read, rarely write. If you hand-edit a page, the AIOS treats your text as ground truth and preserves it on future updates.
3. **The schema** (this file): co-evolved. When a workflow convention changes, update this file in the same session and log it.

## Folder conventions

| Folder | Contains | One page per |
|---|---|---|
| `raw/` | Immutable source documents | source file (any format) |
| `raw/assets/` | Images/attachments for sources | - |
| `sources/` | Summary page for each ingested source | raw source |
| `entities/` | People, companies, tools, products | entity |
| `concepts/` | Ideas, frameworks, themes, recurring patterns | concept |
| `syntheses/` | Filed answers: comparisons, analyses, evolving theses | question worth keeping |

Rules:
- **Filenames**: kebab-case, descriptive, no date prefixes (chronology lives in log.md and frontmatter). Example: `entities/vannevar-bush.md`.
- **Links**: standard markdown relative links (`[Vannevar Bush](../entities/vannevar-bush.md)`), NOT wikilinks. Readable on GitHub and in any editor. (If you use Obsidian, set "Use [[Wikilinks]]" off so its own links match.)
- **No new top-level folders** without updating this table first.
- Flat within each folder. If a folder exceeds ~75 pages, revisit.
- **Segment when a domain grows.** When one domain develops its own feed cadence and keeps growing (say, meeting notes vs research reading), spin it out into its own wiki folder with its own index.md, register it in the root `CLAUDE.md` router, and note it in this table. A narrower search surface beats one mega-wiki: the agent reads fewer pages, answers faster, and bleeds less irrelevant context into answers.

## Page format

Every wiki page starts with YAML frontmatter:

```yaml
---
type: source | entity | concept | synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [kebab-case, tags]
status: seed | developing | mature        # concepts & syntheses only
source_url: https://…                     # sources only, if applicable
raw: ../raw/filename.md                   # sources only
---
```

- **Source pages**: TL;DR (2-3 sentences), key claims as bullets (each attributable to the raw source), connections section linking to entity/concept pages touched.
- **Entity pages**: who/what it is in one line, then accumulated facts with source attributions (`- per [source page](../sources/x.md)`).
- **Concept pages**: current synthesis at top, then evidence for/against with citations. Contradictions get a `⚠️ Tension:` line, never silently resolved.
- **Synthesis pages**: the question as the H1, the answer, cited to wiki pages.

## Operations

### Ingest (trigger: a file lands in `raw/` and you say "ingest", or you paste content to file)

1. Read the raw source fully.
2. Briefly discuss key takeaways (2-4 bullets, ask what to emphasize). Skip only on "batch mode".
3. Write the source page in `sources/`.
4. Create/update every entity and concept page the source touches. New data contradicting existing claims gets a `⚠️ Tension:` line on the affected page, citing both sources.
5. Update `index.md` (add/update the page lines).
6. Append to `log.md`.

A single ingest may touch 5-15 pages. That's normal.

### Query (trigger: you ask a question about wiki content)

1. Read `index.md` first, then drill into relevant pages. Never answer from memory of past sessions.
2. Answer with citations to wiki pages.
3. If the answer took real synthesis work, offer to file it in `syntheses/`. On yes: write the page, update index, log it.

### Lint (trigger: you say "lint the wiki", or monthly)

Check for: contradictions between pages, claims superseded by newer sources, orphan pages (no inbound links), concepts mentioned 3+ times without their own page, broken links, index/log drift from reality. Report findings, fix with approval, log the pass.

## index.md and log.md

- **index.md**: content catalog, organized by folder. One line per page: `- [Title](folder/file.md) - one-line summary`. Updated on every ingest/synthesis/lint. This is the retrieval layer; keep summaries sharp enough that relevance is judgeable from the line alone.
- **log.md**: append-only chronology. Entry format: `## [YYYY-MM-DD] ingest|query|lint|schema | Title`, then 1-3 lines of what happened and which pages were touched. Never edit old entries. `grep "^## \[" log.md | tail -5` shows recent activity.

## Defaults (edit these to fit you)

- Ingest one at a time with discussion, unless you say "batch".
- Domains you'll feed this: {{filled as you go: work topics, research threads, personal}}. Tag accordingly.
- Commit after each wiki session so history accumulates (`wiki:` prefix on the commit message).
- When wiki content becomes operationally load-bearing (an SOP, an API guide), it graduates to `../references/`. Leave a stub page behind that links there.
- At scale (100+ sources), consider a local search tool over the wiki (e.g. qmd). Until then the index is enough.
