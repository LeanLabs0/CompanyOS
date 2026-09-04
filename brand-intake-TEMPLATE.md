# Brand intake: {company}

State file for the company path of /onboard. One instance per company: `brand-intake-<slug>.md` at the repo root, next to aios-intake.md. This file, not the conversation, is the source of truth: every answer saves here the moment it is confirmed, so any session can resume at the first unconfirmed question. Edit by hand and re-run /onboard any time; only the derived companies/<slug>/ files refresh.

## Session state

```yaml
company:
website:
extra_sources: []          # decks, docs, other URLs supplied by the user
scrape_saved_to:           # wiki/raw/ path of the scrape
started:
last_updated:
current_question:          # first unconfirmed question, e.g. facts.5
personas: []               # ICP names, one forces pass each
```

## Answer log

One block per question, appended in interview order. Status flow: pending -> drafted -> confirmed | skipped.

```yaml
- q: facts.1               # bank file + question number (references/brand-questions/)
  field: brand_name
  status: confirmed
  answer: >
    ...
  provenance: drafted from <url>, confidence high, confirmed by <name> YYYY-MM-DD
  # or: human-supplied by <name> YYYY-MM-DD (scrape had nothing)
```

## Rules (enforced by /onboard)

- One question per message, always. Never batch.
- Drafted answers always show their source URL and confidence before asking for confirmation.
- The agent never invents an answer the scrape cannot support; those go to the human blank.
- Required questions cannot be skipped; optional ones can.
- Confirmed answers write to companies/<slug>/ (facts, forces, frame, flavor), provenance per answer.
