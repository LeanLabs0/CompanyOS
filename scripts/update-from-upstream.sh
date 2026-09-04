#!/usr/bin/env bash
# Download the latest official copy before you work.
# Safe: will not overwrite unsaved local edits.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This folder is not a Git project yet. Stop."
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "This copy is not connected to GitHub yet. Stop."
  exit 1
fi

git fetch origin

DEFAULT_BRANCH="main"
if git show-ref --verify --quiet "refs/remotes/origin/main"; then
  DEFAULT_BRANCH="main"
elif git show-ref --verify --quiet "refs/remotes/origin/master"; then
  DEFAULT_BRANCH="master"
else
  echo "Could not find the official branch on GitHub (main). Stop."
  exit 1
fi

CURRENT="$(git branch --show-current || true)"
BEHIND="$(git rev-list --count "HEAD..origin/${DEFAULT_BRANCH}" 2>/dev/null || echo "?")"
LATEST="$(git log -1 --format='%h %ad %s' --date=short "origin/${DEFAULT_BRANCH}" 2>/dev/null || echo "(none)")"

echo "Official copy: ${LATEST}"

DIRTY="$(git status --porcelain)"
if [[ -n "$DIRTY" ]]; then
  echo
  echo "STOP: you have local edits that are not saved to Git yet."
  echo "This script will not overwrite them. Save, undo, or finish that work first."
  echo "You may be ${BEHIND} change(s) behind the official copy."
  git status --short
  exit 1
fi

if [[ "$CURRENT" == "$DEFAULT_BRANCH" || -z "$CURRENT" ]]; then
  git pull --ff-only "origin" "$DEFAULT_BRANCH"
  echo "You are on the latest official copy."
  exit 0
fi

echo "You are on a proposal branch: ${CURRENT}"
if git merge-base --is-ancestor "origin/${DEFAULT_BRANCH}" HEAD; then
  echo "This branch already includes the latest official copy."
  exit 0
fi

echo "Bringing the latest official files into this branch..."
if git merge --no-edit "origin/${DEFAULT_BRANCH}"; then
  echo "This branch now includes the latest official copy."
  exit 0
fi

echo
echo "STOP: Git could not combine your branch with the official copy."
echo "Do not keep working. Get help before you continue."
exit 1
