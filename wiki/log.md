# Wiki log

Append-only chronology. Entry format: `## [YYYY-MM-DD] ingest|query|lint|schema | Title`. Never edit old entries. `grep "^## \[" log.md | tail -5` shows recent activity.

## [2026-08-14] schema | Wiki initialized

Created wiki/CLAUDE.md (schema), index.md, log.md, and folder structure (raw/, raw/assets/, sources/, entities/, concepts/, syntheses/).

## [2026-08-14] ingest | LLM Wiki (idea file)

First ingest, using the founding idea file itself. Filed raw/llm-wiki-idea.md, wrote sources/llm-wiki-idea.md, created concepts/llm-wiki-pattern.md and entities/memex.md, updated index.

## [2026-08-14] schema | Segmentation rule added

Added folder-convention rule: a growing domain with its own feed cadence gets spun into its own wiki folder with its own index, registered in the root router.

## [2026-09-04] schema | Portable starter workflows

Updated wiki conventions for explicit saves, brand scope, source provenance, and operation without Git. Moved the historical LLM Wiki demonstration files to references/examples/llm-wiki/ and cleared their entries from the active knowledge index. Original source content was preserved.
