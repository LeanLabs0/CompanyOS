# Use the right writing rules

This folder holds approved instructions for writing and design. Brand profiles contain evidence and links to these rules. Personal samples in `references/voice.md` are evidence too, not universal instructions for every client.

## Scope and approval

Every new rule file names its scope, approval status, and confirmation date in frontmatter:

```yaml
---
scope: acme
status: approved
confirmed: YYYY-MM-DD
---
```

Use a brand slug for a brand, `personal` for the operator's own writing, or `global` only when the user explicitly wants a rule applied everywhere. Drafts use `status: draft` and do not govern output.

An explicit instruction such as "For Acme, always say customers" is enough to approve that rule. No Git commit, merge, or additional approval is required. When proposing a new preference, show it for approval before making it authoritative. Git is optional version history, not an approval system.

## Where rules belong

| Folder | Content |
|---|---|
| `voice/` | Voice and tone |
| `words/` | Preferred words, banned terms, capitalization |
| `quality/` | Quality requirements |
| `structure/` | How a piece is organized |
| `visual/` | Color, typography, and other design requirements |
| `linking/` | Linking behavior; actual destination facts stay with the brand |
| `community/` | Rules limited to community replies |

Name files by scope, for example `words/acme.md`. State each instruction in one place and link to it from `companies/acme/flavor.md`. Raw samples stay with their sources.

## Apply and update

1. Establish the active brand from the task or the confirmed default. If ambiguous, clarify before mixing client information.
2. Load approved global rules and approved rules for that scope and output type. Do not load another client's rules.
3. Follow the user's current explicit instruction. For saved rules, the more specific scope wins; within the same scope, an explicitly superseding confirmed revision wins. If a material conflict remains unresolved, surface it rather than guessing.
4. For existing unscoped files, establish scope from their provenance and context. Do not assume global scope or silently discard previously confirmed preferences. Move an operational rule from an older flavor file into the appropriate rule file, preserving confirmation and leaving a link.
5. When updating a rule, preserve unrelated instructions. A correction to a known rule authorizes updating that rule. Keep a prior version in `archives/` unless the user requested deletion instead.

The user does not need to edit these files. The AI handles the update and reports the practical change. Do not ask whether to commit after each saved preference.
