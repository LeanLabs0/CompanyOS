# Loop routine — recurring use

After install (`loop-setup.md` / `brain.md`).

## Daily / as needed

1. **Open** Company OS (or rely on global skills if synced).
2. **Start with `/prime`** when beginning a session.
3. **Morning** — skim `rules/` for writing jobs; load relevant `companies/<slug>/` + `wiki/` / `memory/`.
4. **Capture** — durable "always/never" → draft under `rules/` (writing) or `memory/` / `companies/` / `wiki/` (facts). Ask before saving. Writing rules live **only** in `rules/`.
5. **Skill loop** — prefer kit skills (`/onboard`, `/prime`, `/audit`, `/os-audit`, `/level-up`) over reinventing steps.

## After pack updates

1. Ralph sync: `scripts/sync.ps1` (Windows) or `scripts/sync.sh`. Optional: `scripts/update-from-upstream.sh` if configured.
2. Re-check `.agents/skills/` and `.claude/skills/` mirrors.
3. If `company.json` tokens changed, re-run `node scripts/apply-company.mjs --dry-run` then apply.
4. `python scripts/compose.py` when Python is available and memory/pinned brand changed.

## Weekly hygiene

Prune stale wiki drafts, merge overlapping rules, keep `companies/` current, commit if using git.

## Out of scope for V1 Unbound handoff

- Requiring MCP for day one
- Requiring Python for identity stamp (use Node `apply-company.mjs`)
- Dual wiki roots (`facts-wiki/` competing with `wiki/`)