---
name: onboard
description: Use on Day 1 of an install ("set me up", "onboard me", "let's get started"), or to set up a company brain ("set up a brain for <company>"). First asks whether this setup is for a PERSON (7-question intake + Day-1 scaffold) or a COMPANY (scrape the website, draft the brand interview, confirm one question at a time into companies/<slug>/). Idempotent on both paths; re-run any time after editing aios-intake.md or brand-intake-<slug>.md.
---

## What this skill does

Single combined wizard. Reads or writes `aios-intake.md` (the canonical intake), conducts the 7-question interview if the file isn't filled, then scaffolds the Day-1 file set inline at the end of the run. No separate `/scaffold-from-intake` skill, this is one flow.

**The wow moment:** at the end, suggest the closing prompt *"Try this, ask me: what should I focus on this week?"* The user runs it once. That's the wow. There's no `/today` skill to save, the prompt itself plants the Mindset framework (Default Shift) for them to internalize.

## When NOT to run this

- If the user has already onboarded and wants to refresh: still run, but skip questions already answered (idempotent).
- If the user wants to add a new connection: that's not onboarding, point them at `connections.md` to edit directly, or schedule a `/level-up` Phase 2 walk.

## Execution

### Step 0: The fork (always first, never inferred)

Ask exactly this before anything else: "Is this being set up for you personally, or for a company/team brand?"
Do not guess from the user's role. A CEO can want a personal setup; anyone can be setting up a company profile.

- Personal: run Steps 1-4 below. Done.
- Company: BOTH, in order. First the personal wizard (Steps 1-4 below), because the person setting up a company brain still needs their own context, voice, and priorities in the OS. THEN continue into the COMPANY PATH at the end of this file. If aios-intake.md is already filled from a previous run, skip straight to the COMPANY PATH and say so.

### Step 1: Read the intake

Read `aios-intake.md`. Check which Q1-Q7 sections have content vs. `[Your answer here]` placeholders.

- **All filled** → skip Step 2, jump to Step 3 (scaffold).
- **Some filled** → ask the user: "I see Q1, Q3, Q4 are answered. Want to fill the rest now, or scaffold from what's there?" Their call.
- **None filled (fresh clone)** → run Step 2 conversationally.

### Step 2: The interview (7 questions, hard cap)

Ask one at a time. Write each answer into `aios-intake.md` as you go (so the user can resume if interrupted).

**Q1, Who are you, what do you sell, who do you sell it to?**
Identity, offer, ICP. One paragraph each is fine.

**Q2, Paste 1-2 things you've written recently. Don't edit them.**
*This is the only question with a hard rule.* Voice samples MUST be pasted, not typed mid-conversation. If the user starts typing fresh prose, refuse:

> *"Stop, paste it raw. If you type it here while we're talking, the sample is already shaped by our conversation. Open your last email or LinkedIn post in another tab and paste the unedited text. This is the one rule I can't bend."*

Ask for two samples. One email, one post. Or two of either.

**Q3, What are your 2-3 biggest priorities for the next 90 days?**
Quarterly priorities. Push back if they say "grow my business", make them name a number, a deadline, or a deliverable.

**Q4, Where does revenue actually land, and where is it tracked?**
Multiple answers OK. Map to Tier-1 Domain 1 (Revenue/Financials).

**Q5, Where do you talk to customers, your team, and the outside world day-to-day?**
Email (Gmail/Outlook), Slack/Teams/Discord, DMs. Map to Domains 2 + 4.

**Q6, Where do meeting recordings, notes, and important docs live?**
Map to Domains 6 + 7.

**Q7, What's the one task that eats your week, and where do you currently track work?**
Capture top_pain (used by `/level-up` Day-14) + Domain 5 (tasks).

Domain 3 (Calendar) is auto-inferred from Q5: Gmail → Google Cal; Outlook → Outlook Cal. Confirm in Step 3.

### Step 3: Scaffold the Day-1 file set

Once the intake is complete, generate these files (or update if re-running). Back up originals to `archives/intake-{YYYY-MM-DD-HHMM}/` if any exist.

1. **`context/about-me.md`**, from Q1 (identity, role) + Q7 (top_pain). One short paragraph each.
2. **`context/about-business.md`**, from Q1 (offer, ICP) + Q4 (revenue model). One paragraph.
3. **`context/priorities.md`**, from Q3. Numbered list, one line per priority.
4. **`references/voice.md`**, from Q2. Paste samples verbatim with a short header explaining their use ("Match this register when drafting; don't fake voice on external content without showing me first").
5. **`connections.md`**, populate the 7-row table from Q4-Q7 answers. Each row gets `mechanism: not yet connected`, `auth: , `, `last checked: , `. The user wires connections on Day 2.
6. **`CLAUDE.md`**, fill all `{{...}}` placeholders. Substitute the user's name, stated priority, voice register summary, and a brief connections summary.

### Step 3.4: Make the repo THEIRS (do this before anything ever gets pushed)

This clone came from the shared template. Their personal context must NEVER be pushed there. Set it up properly:
1. `git remote rename origin upstream` (the template stays reachable for future kit improvements: `git fetch upstream`).
2. Have them create a PRIVATE repo of their own (github.com, one click); `git remote add origin <their-url>`; push.
3. The sync script refuses to run while origin still points at the template, but do not rely on the guard: repoint FIRST.

### Step 3.45: Install the refresh routine (so their copy stays current without them thinking about it)

The OS should sync itself: commit their changes, pull the latest, push, loudly abort on conflict. `scripts/sync.ps1` (Windows) / `scripts/sync.sh` does exactly this and refuses to push to the template.
- Claude Code: add a SessionStart hook that runs the sync script, so every session starts current.
- Any OS: a scheduled task every 15 minutes (Task Scheduler / cron). Offer to register it now.
- Solo user on one machine with no remote yet: skip, and say so; the OS still works, it just lives on one machine unbacked (recommend the private repo anyway).

### Step 3.5: Wire the user's harness (so the OS loads from anywhere)

Ask which AI tool they run, then wire it to load this repo's AGENTS.md at session start even when the session begins in another folder:
- Claude Code: add `@<absolute path>/AGENTS.md` to the user-level `~/.claude/CLAUDE.md`.
- Codex: add a pointer block to `~/.codex/AGENTS.md` referencing this repo's AGENTS.md by absolute path.
- Gemini: the committed `.gemini/settings.json` covers sessions inside the repo; for sessions started elsewhere, add the read instruction to `~/.gemini/GEMINI.md`.
- Anything else that reads AGENTS.md (Grok, Kimi): sessions inside the repo work with zero setup.
Verify: a fresh session in their normal working folder must answer from this file's content without opening it.

### Step 4: The closing screen

Print one screen. Three lines max:

```
✓ Day 1 done. Your AIOS knows who you are, what you sell, what matters this quarter, and how you sound.

Today: ask me, "what should I focus on this week?"
Tomorrow: pick one tool from connections.md and wire it up (manual MCP install or write a small API script + save references/{tool}-api.md).
Day 7: run /audit to see your score.
```

When the user runs the closing prompt ("what should I focus on this week?"), respond using only the new context files. Hit:
- 3-bullet priority list, in their voice register from Q2
- Each bullet ties back to a stated 90-day priority from Q3
- Final line: *"If I had to pick one thing for Monday, it'd be [X], because [reason from priorities]. Want me to draft the first email? And, where could the Default Shift apply here? To what extent could AI be leveraged on this task?"*

The Default Shift question seeds the Mindset framework before `/level-up` formally introduces it on Day 14.

## Critical implementation rules

1. **The 7-question cap is non-negotiable.** Don't add Q8 in conversation.
2. **Voice paste cannot be skipped.** If the user types samples mid-chat, refuse and tell them to paste from real writing.
3. **One-shot scaffold.** After Step 2 ends, write Step 3 files in a single batch. No multi-turn confirmation. The user iterates by editing `aios-intake.md` and re-running.
4. **Idempotent.** Re-running with an edited intake refreshes context files; backs up originals to `archives/intake-{ts}/`. Skips questions already answered unless the user wants to revise.
5. **Closing screen is three lines.** Not a menu.
6. **No extra skills generated.** Don't scaffold `/today`, `/draft`, `/connect`, etc. The kit ships 3 skills; the user authors more via `/level-up`.
7. **Read-only on `references/operator-framework.md`.** It already ships in the kit. Don't overwrite.
8. **No `.env` writes.** Don't ask for API keys on Day 1. Connections come Day 2.

## COMPANY PATH: the Brand Engine interview

Runs AFTER the personal wizard, never instead of it (skip the personal part only when aios-intake.md is already filled). Populates a brand's facts, forces, frame, and flavor from its website plus the human's confirmations. State lives in `brand-intake-<slug>.md` at the repo root (create from `brand-intake-TEMPLATE.md`); resumable at the first unconfirmed question. One question per message, always.

1. **Ask for the company website URL** and any extra sources (deck, docs). Record them in the state file.
2. **Scrape.** Fetch the homepage plus the obvious key pages (about, pricing, solutions/products, case studies) with whatever web tool is available. Save the scraped text to `wiki/raw/<slug>-site-scrape-<date>.md` (immutable raw layer, per wiki/CLAUDE.md). No web tool available: say so and run a pure interview.
3. **Draft.** Answer every question the scrape supports, each tagged: source URL + confidence (high/medium/low). The question bank is `references/brand-questions/`: facts.md (12), forces.md (17 per persona), frame.md (9), flavor.md (30 archetype questions + enforcement lists). HARD RULE: never invent an answer the scrape cannot support. Stats, customer-result numbers, fears/suspicions/false beliefs, and banned vocabulary are almost never scrapeable: leave them blank for the human.
4. **Confirm, ONE question at a time,** in bank order (facts L1, L2, L3, then forces per persona, then frame, then flavor). Presentation is plain interviewer style, never machine style:
   - Header: "Question N of M, <plain-English label>", numbered within the current section. Never surface field IDs, slugs, "(required)", confidence tags, or state-file internals in chat; those live only in the state file.
   - Ask the question in plain words. If a draft exists: follow with "From the website I have: <draft>." and close with "Right, or something different?" If blank: ask fresh, with the bank's help text and example.
   - Name a source URL in chat only when the user asks where an answer came from.
   - Good: "Question 1 of 12, Brand name. What name does the company go by? From the website I have: Lean Labs. Right, or something different?" Bad: "facts.1, brand_name (required). Draft: Lean Labs. Drafted from <url>, confidence high. Confirm, edit, or replace?"
   - Write the result to the state file IMMEDIATELY (status, answer, provenance including source URL + confidence). Optional questions may be skipped; required ones may not; if the user tries, say in plain words why it's needed.
   - "Pause" any time; re-running /onboard resumes at current_question.
5. **Write out.** Confirmed answers land in `companies/<slug>/` (facts.md, forces.md, frame.md, flavor.md), each answer carrying its provenance line. Add the companies/ row to the session's awareness: customer-facing work for this company now starts by reading its facts + flavor.
5b. **Update root `company.json`.** From confirmed brand answers, write/update at least: `name`, `slug`, `domain` (if known), `short_name`, `founder_or_voice`, `one_liner` (from positioning / facts). Keep other fields if already set. Shape reference: `company.example.json`.
5c. **Offer identity stamp.** After confirmations + company.json write, ask once: "Want me to run `node scripts/apply-company.mjs` to stamp `{{company.*}}` tokens into templates (rules, READMEs)?" On yes: prefer `--dry-run` first, then apply. If Node is missing, replace tokens yourself. Do not require Python for this step (`compose.py` is separate).
6. **Pin the primary brand.** Ask: "Is <company> your primary brand, the one most sessions will work on?" On yes: write the slug into `companies/.pinned` and run `python scripts/compose.py` if Python is available (otherwise write `.pinned` and compose later), which inlines that brand's facts and flavor into the root AGENTS.md between markers. Inlined means physically present in every session, in EVERY harness (Claude, Codex, Gemini, Grok); no import features needed, no reading decision involved. Only ONE brand may be pinned (context budget is real); pinning a new one replaces the old (overwrite .pinned, re-run compose), and the replaced brand stays available through routing and /prime. On no: skip, the routing rule and /prime cover it on demand.
7. **Closing wow:** "ask me: draft a LinkedIn post for <company>." The post must obey the freshly confirmed flavor (archetype, never-words). Violations mean the flavor section is wrong; fix before declaring done.

## Verification (for the implementer)

- Cold-test: clone a fresh kit, run `/onboard`, fill 7 answers, scaffold runs, ask the wow prompt, response cites Q1 + Q3 + Q7 specifically. Generic = fail.
- Idempotency: re-run `/onboard` with one Q3 priority changed. Expected: only `context/priorities.md` and `CLAUDE.md`'s priority section update; backup created in `archives/intake-{ts}/`.
- Voice rejection: type a sample mid-chat. Expected: skill refuses, asks for paste.
- Fork test: the first question is always personal-vs-company; role never decides the path.
- Order test: a fresh user answering "company" gets the 7 personal questions FIRST, then the brand interview; an already-onboarded user answering "company" goes straight to the brand interview with a one-line note.
- Remote test: after install, `git remote -v` shows origin = the user's private repo and upstream = the template; the sync script blocks if origin is the template.
- Interviewer-style test: a full company run shows zero field IDs or confidence tags in chat.
- Pin test: answering yes writes companies/.pinned and compose inlines the brand into AGENTS.md; a fresh session then quotes the brand's positioning WITHOUT opening any file (it is already in context). Pinning a second brand replaces the first pin, never stacks.
- Company cold test on a real site: scrape saved to wiki/raw, all Facts L1 drafted with sources, supporting_data left blank (not invented), one-at-a-time held for the full run.
- Resume test: kill the session mid-interview; re-run; it greets with the first unconfirmed question, nothing re-asked.
- Refusal test: user says "just fill it all in yourself": refuse to mark anything confirmed without per-question human confirmation; offer to keep everything as drafts instead.

> *The Mindset language used in the closing screen comes from `references/operator-framework.md`.*
