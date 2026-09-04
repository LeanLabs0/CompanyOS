# Registers the autosync scheduled task for THIS OS folder (Windows). Run once, as the user.
# Convention: every scheduled job has a committed setup script, so a machine rebuild is one command.
$repo = Split-Path $PSScriptRoot -Parent
$name = "BrainKit-Sync-" + (Split-Path $repo -Leaf)
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -WindowStyle Hidden -File `"$repo\scripts\sync.ps1`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 15)
Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger -Force | Out-Null
Write-Host "Registered task '$name': runs scripts/sync.ps1 every 15 minutes for $repo"
Write-Host "Verify: Get-ScheduledTask -TaskName '$name' | Get-ScheduledTaskInfo"
