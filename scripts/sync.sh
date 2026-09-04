#!/usr/bin/env bash
# Compatibility stop for older hooks and schedules. No Git commands run.
printf '%s\n' 'Automatic Git sync is retired. No files were committed, pulled, or pushed. See references/backup.md. Remove the old task or hook after reviewing its registration.' >&2
exit 1
