#!/usr/bin/env bash
# Personal OS autosync: commit local changes, pull with rebase, push. Conflicts abort loudly.
cd "$(dirname "$0")/.." || exit 1
remote=$(git remote get-url origin 2>/dev/null) || { echo "SYNC SKIPPED: no origin remote."; exit 0; }
case "$remote" in *second-brain-kit-base*) echo "SYNC BLOCKED: origin still points at the shared template. Repoint to YOUR private repo."; exit 1;; esac
git add -A
git diff --cached --quiet || git commit -qm "autosync: $(date +'%Y-%m-%d %H:%M')"
git pull --rebase --quiet || { git rebase --abort 2>/dev/null; echo "SYNC CONFLICT: needs a human. Local work is safe and committed."; exit 1; }
git push --quiet
echo "synced: $(git log -1 --format='%h %s')"
