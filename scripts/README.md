# Optional maintenance scripts

None of these scripts is required to set up or use the brain.

- `compose.py` refreshes the small pointers at the bottom of `AGENTS.md`. It does not embed memory or brand contents. The AI must still read the live files. Python is optional.
- `apply-company.mjs` is a retired entry point. It exits without changing files. Identity is maintained in context and brand profiles, not stamped across source documents.
- `sync.ps1`, `sync.sh`, `setup-sync-task.ps1`, and `update-from-upstream.sh` are retired entry points. They exit with an explanation and do not commit, pull, push, or register jobs. This also prevents older task registrations from silently uploading personal files after an update.

See [backup and recovery](../references/backup.md) for supported backups and selective upgrades. An existing old hook or scheduled task should be removed deliberately during migration; the retired script does not unregister it automatically.

Maintainers using Python 3.11 or newer can run `python scripts/check-kit.py` for structural checks and `python -m unittest discover -s tests -v` for script behavior tests. These are development checks, not requirements for clients.
