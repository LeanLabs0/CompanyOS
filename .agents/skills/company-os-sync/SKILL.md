---
name: company-os-sync
description: Back up a Company OS brain, reconcile company knowledge, or review and publish a company sharing batch. Also handles a configured scheduled sync review.
---

# Company OS sync

Resolve the brain from an explicit path or the user-home .company-os/brain.json pointer. If unavailable, ask for the actual folder; do not use the current project as a substitute.

Read that brain's AGENTS.md and .company-os/workflows/sync.md. Run the absolute .company-os/scripts/company-os.mjs helper.

Run sync to back up personal work and prepare company changes. Read the returned review and summarize the exact company repository, additions, edits, deletions, and any skill-source changes. The personal repository gets the intended working brain; company gets wiki/, corrections/, and separately generated company-only root README.md and AGENTS.md through the isolated helper. Those root documents never overwrite personal instructions or include personal backup destinations.

When the request includes information to save or correct, first apply the brain's AGENTS.md routing rules. Split personal preferences from company guidance and private client material; an explicit company correction updates its authoritative wiki page and dated correction/index together. Confirm private saves separately and keep private details out of the company review. A routine sync does not authorize guessing the scope of old personal material or silently moving it into shared files.

Show a brief review in chat with concrete examples from the actual changes, covering all material edits and deletions. The full review file is optional detail. Keep its ID internal; never ask the user to copy a hash or approval command. A plain "Approve," "Yes, share those changes," or "yes, sync" in clear response to that one publication review is enough; clarify if ambiguous. Publish with that review's exact retained ID. A standalone "sync" request or scheduled run is not approval of unseen content. If local files or company state changed, prepare and present a fresh review. Never bypass the helper using a direct company push.

Stop on conflicts and explain the competing content in ordinary language. Report personal backup and company publication separately, including partial success. Do not reset or force-push away work.
