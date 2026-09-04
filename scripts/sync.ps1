# Personal OS autosync: commit local changes, pull with rebase, push. Safe to run on a schedule.
# This is YOUR repo (your private origin), so committing is correct here. Conflicts abort loudly.
$repo = Split-Path $PSScriptRoot -Parent
Set-Location $repo
$remote = git remote get-url origin 2>$null
if (-not $remote) { Write-Host "SYNC SKIPPED: no origin remote. Set up your private repo first (see /onboard)."; exit 0 }
if ($remote -match "second-brain-kit-base") { Write-Host "SYNC BLOCKED: origin still points at the shared template. Never push personal data there. Repoint origin to YOUR private repo (see /onboard install step)."; exit 1 }
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -qm "autosync: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
git pull --rebase --quiet 2>$null
if ($LASTEXITCODE -ne 0) { git rebase --abort 2>$null; Write-Host "SYNC CONFLICT: pull needs a human. Local work is safe and committed."; exit 1 }
git push --quiet 2>$null
Write-Host "synced: $(git log -1 --format='%h %s')"
