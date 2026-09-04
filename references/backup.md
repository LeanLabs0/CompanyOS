# Back up and recover your brain

The simplest backup is a dated copy of the whole folder in a location you control. An existing backup service can work too. A second copy on the same disk helps with accidental edits but not disk failure. GitHub is optional.

## What to include

Include context, memory, brand profiles, rules, source documents, project deliverables, indexes, archives, and the hidden `.agents`, `.claude`, and `.gemini` folders. An archive tool that omits hidden files can lose the app adapters. Check the actual contents.

Exclude caches, dependencies, and temporary files. Keep credentials in a separate protected secret store. If a backup excludes secrets, record that external connections will need to be reauthorized after recovery. Do not silently omit deliverables because they were AI-generated.

Before choosing a shared or cloud destination, establish that it is appropriate for the client's information. Keep one active folder when using multiple apps. Conflicting simultaneous edits need review; copies do not merge themselves reliably.

## Agent-assisted backup

When asked to back up:

1. Establish the destination and any exclusions. Use available file tools; no particular runtime is required.
2. Create a uniquely named dated copy or archive outside the active brain folder. Do not overwrite a previous backup or copy the backup into itself.
3. Check the archive/file listing, including hidden instructions and at least one real deliverable. Compare representative files or hashes with the source. Report failures instead of claiming success.
4. For a restore check, extract or copy into a new empty folder. Read a saved preference, priority, and deliverable from that copy. Do not replace the active folder as part of a test.
5. Record the destination, date, exclusions, and verification performed in `context/setup.md`. Distinguish "backup created" from "restore checked".

To recover, use a new folder, verify its contents, connect it to the AI, and run the return prompt. Reauthorize external tools as needed. Change the active folder only after verification.

## Optional Git

Use Git only when the user wants it. Explain what will be uploaded and verify the destination is a private repository they control before the first push. The shared `LeanLabs0/CompanyOS` repository is the template, never a destination for client context.

Check ignored and tracked files before committing, including credentials and nested repositories. `.gitignore` is not proof that a secret has never been tracked. Push only with authorization, and report success only after the push succeeds. Ordinary files under `projects/` are included by default; separate code repositories need their own backup arrangements.

Do not install automatic commits, pushes, session hooks, or scheduled sync as part of setup. Older kit sync entry points now stop without changing files. If an older installation already has a sync task or hook, help remove that exact registration when the user requests migration. Review the registration before changing it.

## Updating the kit

Record the installed version from `kit.json`. For an existing brain, download a new kit into a separate temporary folder, compare its instructions and adapters, and preserve the user's context, sources, rules, deliverables, and setup record. Back up first. Apply useful changes selectively and repeat the recall check. Do not replace the entire brain with a fresh template or blindly pull template changes into personal data.

"Forget this preference" removes it from active use. Permanent erasure may also require removing copies from archives, backups, provider chats, and Git history. Explain the actual scope; do not promise erasure from systems you have not changed.
