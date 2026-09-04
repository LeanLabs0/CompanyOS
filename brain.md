# Company OS — instructions for your agent

You are installing and operating a **Company OS** (local second brain / AIOS) on this computer.

This document is for **you**, the agent. Read it fully before acting. Follow the steps in order. Prefer doing the work yourself over asking the user to run commands, unless a step requires their login, password, or approval in a browser.

Provisional public pack URL (update `company.json` `repo_url` when publishing): `https://github.com/example/company-os`

---

## 0. Hard requirements

### You must be able to write files on disk

If you cannot create, edit, and delete files on the user's computer, **stop**.

Tell the user clearly:

> I need a tool that can write to disk. Switch to one of these, then paste this page again:
> - ChatGPT Desktop → **Work** mode (grant a local folder)
> - Claude Desktop → **Cowork** mode (Work in a folder)
> - Claude Code, Codex CLI, Cursor, Grok Bot, or another local agent/CLI

Do **not** continue in a web-only chat that can only accept uploads. Do **not** pretend you wrote files if you did not.

### Confirm the mode before you start

Ask (once) which environment they are in, if it is not obvious:

- ChatGPT Desktop (Work)
- Claude Desktop (Cowork)
- Claude Code
- Codex CLI
- Cursor
- Grok Bot
- Other local CLI / agent (name it)

If they say ChatGPT or Claude **in the browser**, stop and redirect them to Desktop Work / Cowork.

---

## 1. What you are building

Company OS is a folder on disk with **Ralph's AIOS layout** as the base:

| Path | Purpose |
| --- | --- |
| `.agents/skills/` (+ `.claude/skills/` mirrors) | Kit skills: `/onboard`, `/prime`, `/audit`, `/os-audit`, `/level-up` |
| `companies/` | One folder per brand (4Fs), filled by `/onboard` company path |
| `context/`, `memory/`, `decisions/`, `wiki/`, `projects/`, `references/`, `archives/` | Personal OS surfaces |
| `rules/` | Writing law (voice, words, quality, structure, visual, linking, community). Hard line: writing rules live **only** here |
| `company.json` | Compact identity stamp (name, slug, domain, short_name, founder_or_voice, …) |
| `scripts/` | Ralph sync + compose; Node `apply-company.mjs` for identity tokens |

**Ralph layout wins.** Do not invent a second wiki root. Prefer `wiki/` + `companies/` over a parallel `facts-wiki/`.

**Recommended:** work **inside** this folder as the project / workspace root.

---

## 2. Goal of first install (Day 1)

When setup is done, all of these are true:

1. Company OS exists on the user's machine (not only an ephemeral container).
2. Ralph structure is present (skills, companies, context, memory, wiki, scripts, …).
3. `company.json` is filled **or** `/onboard` company path completed (prefer `/onboard` for full company brains).
4. Optional: `node scripts/apply-company.mjs` stamped tokens into README/rules templates.
5. Smoke test: invoke `/prime` or open a skill `SKILL.md` from `.agents/skills/` or `.claude/skills/` (not just `ls`).

---

## 3. Get the starter pack onto disk

### 3.1 Choose a location

Default: `Documents/CompanyOS` (or the company short name). Create/open it. Grant it as the working directory.

### 3.2 Fetch the files

Use `company.json` → `repo_url` when set; otherwise the URL from the Unbound / install page.

**Option A — Git clone (best for updates)**

1. Check `git`. Help install if missing (or use Option B).
2. Prefer HTTPS. Auth: install `gh`, run `gh auth login` (GitHub.com, HTTPS, authenticate Git = yes).
3. Clone into the chosen folder; flatten so pack roots sit at Company OS root.

Do **not** set up SSH for a first Unbound install unless the user already prefers SSH.

**Option B — Zip download**

1. Download the repo zip.
2. Unzip and flatten nested `*-main/` layers.

### 3.3 Identity: prefer `/onboard`, keep `company.json` as stamp

**Preferred for company brains:** run `/onboard` and choose the **COMPANY** path. That writes `companies/<slug>/` (4Fs) **and** should update root `company.json` summary fields, then offer `node scripts/apply-company.mjs`.

**Compact stamp path** (when they only need tokens / README branding):

1. Fill `company.json` (required: `name`, `slug`, `short_name`). Shape: `company.example.json`.
2. Apply tokens:
   - Preferred: `node scripts/apply-company.mjs` (`--dry-run` first is fine).
   - If Node is missing: agent replaces `{{company.name}}`, `{{company.slug}}`, `{{company.domain}}`, `{{company.short_name}}`, `{{company.founder_or_voice}}`, `{{repo_url}}` across text files; set `bootstrapped_at`.
3. `compose.py` is Ralph's memory/brand inliner and needs **Python**. Day-one Unbound company stamp does **not** require Python — use the Node path (or manual replacements).

---

## 4. Point the agent at the folder

### ChatGPT Desktop — Work / Claude Desktop — Cowork

Grant the Company OS folder, paste this `brain.md`, say: "Follow this and finish setup."

### Claude Code / Codex CLI / Cursor / Grok Bot

`cd` / open Company OS as the project. "Read `brain.md` and finish setup."

---

## 5. Skills discovery (Windows + Unix)

Kit skills ship under:

- Project: `.agents/skills/<name>/` and `.claude/skills/<name>/`
- Optional global mirrors:

| Tool | macOS / Linux | Windows |
| --- | --- | --- |
| Claude Code | `~/.claude/skills/<name>/` | `%USERPROFILE%\.claude\skills\<name>\` |
| Codex / shared agents | `~/.agents/skills/<name>/` | `%USERPROFILE%\.agents\skills\<name>\` |
| Cursor | `~/.cursor/skills/<name>/` | `%USERPROFILE%\.cursor\skills\<name>\` |

Show `SKILL.md` before global install. Ask before overwriting.

---

## 6. Root map (`AGENTS.md`)

`AGENTS.md` is the operating manual (Ralph). It should mention:

- Kit skills (`/onboard`, `/prime`, …)
- `company.json` + `scripts/apply-company.mjs`
- `rules/` as writing law (not wiki)
- `/onboard` company path → `companies/<slug>/` + company.json summary

---

## 7. Smoke test (required)

1. Confirm real local paths on the user machine.
2. List `.agents/skills/`, `rules/`, `companies/`, `wiki/`.
3. **Invoke** `/prime` or open a mirrored skill `SKILL.md` and summarize it — not just directory listing.
4. Confirm `company.json` values (or that bootstrap is deferred).

---

## 8. Recurring operation

Follow `loop-routine.md`: pull/sync (Ralph `sync.ps1` / `sync.sh`), re-check skills, morning/capture loops against `rules/` + `companies/` + `wiki/`, weekly hygiene.

---

## 9. Tone with the user

Be direct and short. Do the work. Prefer `/onboard` for company brains. Prefer Node apply for stamps. Do not push MCP setup in this Unbound handoff (Ralph course README may mention MCP in lessons — leave course files alone).

---

## 10. Failure modes

| Problem | Fix |
| --- | --- |
| Web-only chat | Stop. Desktop Work / Cowork / CLI. |
| Clone auth fails | `gh auth login` HTTPS, or zip. |
| Node missing for apply | Agent does `{{company.*}}` replacements. |
| Skills not visible | Check `.agents/skills` / `.claude/skills`; optional global copy; reopen folder. |
| Python missing | Fine for day-one stamp. compose.py waits until Python is available. |

---

## 11. Done checklist

- [ ] Disk-capable tool confirmed
- [ ] Company OS on user disk with Ralph layout + `rules/` + `company.json`
- [ ] `/onboard` company path and/or company.json + apply done (or deferred)
- [ ] Smoke test: skill invoke with real paths

Then: "Company OS is installed. Day-to-day: open this folder, start with `/prime`, follow `loop-routine.md`."