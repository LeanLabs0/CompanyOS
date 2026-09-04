# Optional brand workshop

Use this when the user asks to deepen a brand profile. The quick setup remains useful without it. Read existing `companies/<slug>/` files and approved rules first; do not repeat confirmed questions.

Ask what needs improvement: company facts, customer understanding, positioning, or voice. Load only the relevant question bank under `references/brand-questions/`: `facts.md`, `forces.md`, `frame.md`, or `flavor.md`. These are prompts to draw from, not mandatory questionnaires. Offer one question at a time by default; follow the user's preference for reviewing several together. Skipping is allowed.

Use supplied sources or relevant public pages to draft answers. Save raw sources under `wiki/raw/` according to `wiki/CLAUDE.md`. Mark the source/date and distinguish sourced claims, hypotheses, and human confirmations. Do not invent customer fears, results, quotes, or preferences a source does not support.

Save progress in `companies/<slug>/intake.md`, using `brand-intake-TEMPLATE.md` as an optional shape. If an older `brand-intake-<slug>.md` exists at the root, resume it before proposing a move. Intake records are evidence; current confirmed profiles and rules are authoritative.

Write factual answers into facts, forces, and frame as relevant. Keep writing samples and voice evidence in flavor. Put approved writing instructions only in `rules/<category>/<slug>.md`, with scope, status, and confirmation date, and link to them from flavor. A user request to change an established rule is approval for that update.

Preserve unknowns, disagreements, source provenance, and unrelated existing content. Apply approved local changes without asking about stamping tokens, running scripts, or committing files. Update `company.json` only if this is the default brand; it is a compact summary, not the canonical profile.

Finish the selected section with a practical task, such as revising a brief using the confirmed positioning. Do not make completing every bank a condition of using the brand.
