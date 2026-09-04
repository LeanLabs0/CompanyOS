# Compatibility stop for older hooks and scheduled tasks. No Git commands run.
Write-Error 'Automatic Git sync is retired. No files were committed, pulled, or pushed. See references/backup.md for backup and migration instructions. Remove the old task or hook after reviewing its registration.'
exit 1
