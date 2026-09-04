---
name: prime
description: Prime a session before starting work. Loads memory, context, the relevant company profile, wiki state, and recent decisions, then reports readiness in one screen. Start every session with this. Use when someone says "prime", "/prime", "get up to speed", or at the start of any work session.
---

# Prime this session

Load the OS deliberately, then prove it. Read in this order, skip nothing:

1. **Freshness.** If this repo has a remote: git pull, note the result. Offline or no remote: say "working from local state" and continue.
2. **Memory:** memory/MEMORY.md (the index IS the rule layer; anything not indexed is invisible).
3. **Context:** context/ files (who the user is, priorities).
4. **Company scope:** if this session is about a company, its companies/<slug>/facts.md and flavor.md, always; forces.md and frame.md too if output is customer-facing.
5. **Recent state:** last 3 entries of wiki/log.md and the newest decisions/log.md entry.
6. **Connections:** skim connections.md only if the session will touch external tools.

## The readiness report (one screen, then stop and wait for the task)

```
Primed: <local | pulled, up to date | pulled, N new commits>.
Memory: <count> standing rules loaded; <the 1-2 most relevant to this session>.
Context: <one line: who + this quarter's priority>.
Company scope: <slug + one-line positioning + voice markers | none>.
Recently changed: <1-2 lines from wiki/decisions logs>.
Watch-outs: <anything stale, frozen, or contradictory that touches this session>.
```

Do not start any task inside this skill. Prime, report, wait.

## Verification (for the implementer)

- Cold test: fresh session, /prime, the report cites the real memory count and the actual newest log entries. Generic output = fail.
- Scope test: "/prime for <company> work" loads that companies/ folder and says so.
- No-remote test: repo without a remote still primes and says "local state".
