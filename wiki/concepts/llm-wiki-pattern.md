---
type: concept
created: 2026-08-14
updated: 2026-08-14
tags: [llm-wiki, knowledge-management, second-brain]
status: seed
---

# LLM Wiki pattern

**Current synthesis**: A knowledge base where the LLM writes and maintains a persistent wiki of interlinked markdown pages, compiled from immutable raw sources under the discipline of a schema file. The human's job is sourcing, direction, and questions; the LLM's job is everything else. Knowledge compounds instead of being re-derived per query, which is the core advantage over RAG.

## Evidence

- Defined in full by [the idea file](../sources/llm-wiki-idea.md), the founding source of this wiki.
- The maintenance-cost argument: wikis die when upkeep outgrows value; LLM upkeep is near free, so the wiki stays alive (per [the idea file](../sources/llm-wiki-idea.md)).
- Applies beyond personal notes: research threads, book companions, team wikis, competitive analysis (per [the idea file](../sources/llm-wiki-idea.md)).

## Open questions

- At what page count does this wiki need real search instead of index.md? Source suggests ~100 sources.
- Which query answers deserve filing into `syntheses/` vs staying in chat? Rule of thumb so far: anything that took real synthesis work.
