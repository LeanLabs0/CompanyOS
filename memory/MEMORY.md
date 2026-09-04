# Memory index

One line per memory file. This index is imported into every session via the root `CLAUDE.md`, so it is the layer that actually shapes behaviour. A memory file without a line here is invisible.

Format: `- [Title](file.md), one-line hook that says when it applies`

## Rules for this folder

- One durable fact or standing rule per file, kebab-case filename.
- Every new file gets its index line in the same session it is written, or it does not exist.
- No status snapshots (counters, "in progress", "pending"). If one must be kept, mark it frozen with a date and a pointer to the live source.
- Frontmatter per file: `name`, `description`, `metadata.type` (user | feedback | project | reference).
- What the repo already records (code structure, git history, decisions/log.md) does not belong here.

## Index

(empty, first memory lands here)
