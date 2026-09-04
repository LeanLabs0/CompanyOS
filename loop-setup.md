# Loop setup — first install

Use with `brain.md`. That file is the full playbook; this is the short checklist.

## Goal

Zero → working Company OS on disk in one sitting, with Ralph layout + identity stamp.

## Prereqs

Disk-capable tool: ChatGPT Desktop **Work**, Claude Desktop **Cowork**, Claude Code, Codex, Cursor, Grok Bot, or similar. Web-only chat = stop.

## Steps

1. **Create/open** `CompanyOS` (or company short name). Work inside it.
2. **Get the pack** — `git clone` (HTTPS / `gh auth login`) or zip + flatten. Repo URL from `company.json` `repo_url` or install page.
3. **Confirm Ralph structure** — `.agents/skills/`, `companies/`, `context/`, `memory/`, `wiki/`, `rules/`, `scripts/`, `AGENTS.md`, `brain.md`, `company.json`.
4. **Identity**
   - Prefer: `/onboard` → COMPANY path (writes `companies/<slug>/` 4Fs, updates `company.json`, offers apply).
   - Or fill `company.json` then `node scripts/apply-company.mjs` (`--dry-run` ok). No Node → agent replaces `{{company.*}}` tokens.
5. **Skills** — project mirrors already ship; optionally copy to global paths (Windows `%USERPROFILE%\.agents\skills\` / `.claude\skills\`; Unix `~/.agents/skills/` / `~/.claude/skills/`).
6. **Smoke test** — invoke `/prime` or open a skill from `.agents/skills/` or `.claude/skills/`; show real paths.

## Done when

Ralph layout present, identity stamped or onboarded, smoke test passed on disk.