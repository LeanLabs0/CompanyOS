---
type: source
created: 2026-08-14
updated: 2026-08-14
tags: [llm-wiki, knowledge-management, second-brain, meta]
raw: ../raw/llm-wiki-idea.md
---

# LLM Wiki (idea file)

**TL;DR**: A pattern for personal knowledge bases where the LLM incrementally builds and maintains a persistent, interlinked markdown wiki instead of re-retrieving from raw documents on every question (RAG). The human curates sources and asks questions; the LLM does all summarizing, cross-referencing, and bookkeeping. This wiki is itself an instance of the pattern.

## Key claims

- RAG re-derives knowledge from scratch on every query; nothing accumulates. The wiki compiles knowledge once and keeps it current.
- Three layers: immutable raw sources, an LLM-owned wiki, and a schema file (CLAUDE.md) that makes the LLM a disciplined maintainer rather than a generic chatbot.
- Three operations: ingest (integrate a new source across many pages), query (answer from the wiki with citations, file good answers back in), lint (periodic health check for contradictions, staleness, orphans).
- Two navigation files: index.md (content catalog, the retrieval layer) and log.md (append-only chronology with a grep-able prefix).
- The index-first approach works to roughly 100 sources / hundreds of pages before proper search (e.g. qmd) is needed.
- Why it works: humans abandon wikis because maintenance burden outgrows value; for an LLM the maintenance cost is near zero.
- Intellectual lineage: Vannevar Bush's Memex (1945). Bush could not solve who does the maintenance; the LLM does.

## Connections

- [LLM Wiki pattern](../concepts/llm-wiki-pattern.md): the concept this source defines.
- [Memex](../entities/memex.md): the 1945 precursor the source cites as lineage.
