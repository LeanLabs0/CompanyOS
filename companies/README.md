# companies/

One folder per brand this OS works with. Each holds the four brand-context files the company path of /onboard fills:

```
companies/<slug>/
├── facts.md      products, market, competitors, solutions, results
├── forces.md     ideal customer profiles (pains, triggers, fears, qualifications)
├── frame.md      value proposition, villain, method, proof
└── flavor.md     voice archetype, never-words, always-words, samples
```

Rules:
- Every answer carries provenance: "(confirmed by <name>, YYYY-MM-DD; drafted from <url> | human-supplied)".
- Before producing anything customer-facing for a company, read its facts.md and flavor.md first.
- Numbers without a named source do not go in these files. Ever.
- The question bank behind these files lives in references/brand-questions/.
