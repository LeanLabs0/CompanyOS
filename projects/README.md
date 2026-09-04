# projects/

Working copies of real code repos, client work, and deliverable outputs. Everything in here is git-ignored by the AIOS repo, this folder is a workbench, not tracked content.

## Conventions

- **Real repos** (own `.git`, own remote): clone them here so the AIOS can read, build, and deploy them. Work inside a repo follows that repo's own conventions (its `CLAUDE.md`, its remote). The AIOS root `CLAUDE.md` still loads as ancestor context, so voice and priorities ride along. Commit/push each repo to its own remote, never to the AIOS repo.
- **Working folders** (plain, no git): outputs and scratch that are safe to regenerate, generated deliverables, build specs, exports. One subfolder per project or client.
- **Client segmentation**: internal knowledge about an engagement (contract dates, scope, discovery notes) lives in the AIOS proper, `context/`, `wiki/`, or `decisions/`, where every session can route to it. The client-facing deliverable repo lives here, segmented, so pushing or sharing it never leaks your internal layer.

## Registering a project

When a project becomes ongoing, give it one line in the root `CLAUDE.md` (Where things live → `projects/`): name, what it is, where it deploys. Unregistered folders are invisible to a fresh session, `/os-audit` will flag them.
