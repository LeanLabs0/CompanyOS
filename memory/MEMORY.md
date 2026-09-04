# Memory index

Standing preferences for how the AI works with you. Brand writing rules live in `rules/`; current priorities live in `context/`.

Read this index, then open the relevant memory files. Index entries do not automatically load their linked contents.

## Conventions

- One preference per file, with a lowercase hyphenated filename.
- Add its link here in the same update. Links are relative to `memory/`.
- Frontmatter: `name`, `description`, `scope` (`global` or a named context), `confirmed`, and `metadata.type` (`user`, `feedback`, `project`, or `reference`).
- State the actual preference and when it applies. Keep temporary status and duplicated project facts out.
- An explicit "remember this" authorizes saving. Otherwise propose useful updates together before saving.
- Remove withdrawn preferences from active use and update this index. Follow the requested deletion scope; see `AGENTS.md`.

## Saved preferences

None yet. Add an entry when a real preference is confirmed:

`- [Short title](file.md): when to load this preference.`
