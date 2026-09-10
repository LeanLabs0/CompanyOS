# Setup troubleshooting

The agent owns setup. Manual installation is a last resort after a concrete blocker remains unresolved through supported routes, not an onboarding choice. Give the user only the next relevant step and only the tools still missing. Keep completed answers, files, repository choices, and skill records; resume rather than restarting.

## Diagnose and resolve before handing work to the user

1. Establish the actual host, execution identity, connected brain root, network access, and supported permissions. Follow [app setup](app-setup.md). File-bridge access does not prove a shell can access the folder. For a mount failure, correct the folder connection or reconnect through the app, then test once. If the same failure remains without a relevant change, stop retrying; do not construct a file-bridge clone, Git bundle, or terminal-control workaround.
2. Check Git, GitHub CLI, Node, npm, and npx individually. Reuse working installations. On Windows, inspect command discovery and known locations such as C:\Program Files\Git\cmd\git.exe, C:\Program Files\GitHub CLI\gh.exe, and C:\Program Files\nodejs\node.exe, plus any existing user-managed installation. Do not mistake a stale PATH for a missing tool. Refresh the current process PATH from the user's existing installation configuration so helper subprocesses inherit it. Use npm.cmd and npx.cmd if PowerShell selects blocked .ps1 shims; do not change execution policy to run those shims. Node must be version 22 or newer. Do not replace an adequate Node installation or disrupt an existing version manager.
3. Install genuinely missing tools yourself through a supported host installation route. On Windows, prefer an available WinGet and the exact package IDs below, one tool at a time. Request any required permission through the app's actual approval mechanism; do not invent unavailable approval tools or infer that a chat reply changes policy. Wait for each installer, handle its supported prompts, and verify its exit code and version before continuing. If WinGet is absent or its package source is unavailable, an official signed installer is an alternative only when that installation is permitted. Resolve the correct OS/architecture and current installer from its official site rather than guessing versioned URLs. Do not install another package manager just to avoid a simple official installer.
4. Diagnose the actual failure. Command-not-found calls for path/tool discovery; an ordinary failed download may justify one retry after a concrete correction; a running installer needs monitoring, not a duplicate launch. A tool rejecting process creation means the installer never ran. Preserve the exact error and distinguish execution policy, OS elevation, network, package source, and installer exit status. If the only explanation is "blocked by policy," say that; do not invent an administrator restriction. Do not retry an unchanged rejected action, switch tools or use computer control to bypass it, or disable protections.
5. Only when supported agent-side routes are unavailable or exhausted, explain the specific remaining blocker and offer the minimal manual step below. User-installed tools still need verification from the agent's execution environment. A broken Cowork mount or isolated credential store is not repaired merely by installing tools on Windows; do not send users through installation when that cannot address the blocker.

## Last resort: user-assisted Windows installation

Show this only when needed, tailored to the missing tools. Explain what each tool is for: Git saves versions, GitHub CLI connects the repositories, and Node.js runs the Company OS helper and includes npm/npx for skills. Use the name GitHub CLI, not Hub CLI or GitHub Desktop.

Suggested introduction: "I couldn't install [missing tools] because [observed failure]. Your setup is saved. Please complete this one-time installation, then I'll verify it and continue."

### PowerShell steps

1. On the same Windows desktop where you are setting up Company OS, click **Start**, type **PowerShell**, and open **Windows PowerShell**. A normal window is sufficient to begin; an installer may request Windows approval. If testing inside Windows Sandbox, do this inside that Sandbox window.
2. For each command the agent provides, use **Copy** on its code block, click inside PowerShell, paste with **Ctrl+V** (or right-click), and press **Enter**. Run one command at a time and wait for completion before the next. If asked about a multiline paste, review the displayed commands before accepting. Follow license prompts and approve the expected Windows installer prompt if permitted. If administrator credentials are required and unavailable, stop and report that message.
3. The agent includes only the lines for missing tools:

Git:

~~~powershell
winget install --id Git.Git --exact --source winget
~~~

GitHub CLI:

~~~powershell
winget install --id GitHub.cli --exact --source winget
~~~

Node.js LTS, including npm and npx:

~~~powershell
winget install --id OpenJS.NodeJS.LTS --exact --source winget
~~~

4. If PowerShell says **winget is not recognized**, use the official installers below; do not add a WinGet installation detour. If another error appears, copy its text back to the agent instead of repeatedly running the command. "Already installed" is not a reason to uninstall anything; let the agent check its version.
5. When installation finishes, close PowerShell and open a **new window** from Start. A new tab in an existing terminal may retain the old PATH. Paste these checks, or only the checks relevant to your installation:

~~~powershell
git --version
gh --version
node --version
npm.cmd --version
npx.cmd --version
~~~

6. Return to the existing agent conversation and say **"Tools installed. Continue setup."** The agent verifies the tools itself and resumes. If the new PowerShell window finds them but the agent still cannot, refresh its process PATH or fully quit and reopen the agent app, then resume the saved conversation/project. Do not reinstall working tools or start a new brain.

### Official downloads when WinGet is unavailable

- **[Git for Windows](https://git-scm.com/install/windows):** choose the Windows installer for your system, open the downloaded .exe from Downloads, and follow the installer. Keep Git available from the command line and third-party software; the default selection normally does this. The agent should identify x64 versus ARM64 for the user.
- **[GitHub CLI](https://cli.github.com/):** choose Download for Windows. If it opens the [official releases page](https://github.com/cli/cli/releases/latest), select the Windows .msi matching your system (amd64 for x64, arm64 for ARM64), open it from Downloads, and finish the installer. GitHub Desktop is a different application.
- **[Node.js LTS](https://nodejs.org/en/download):** choose an LTS release, Windows, and your architecture, then **Windows Installer (.msi)**. Open it from Downloads and keep npm and Add to PATH enabled. The optional extra tools for compiling native modules are not required by Company OS.

Present the matching official asset link too when the agent can verify it, so the user need not interpret a list of release files. Never invent a download URL or ask users to disable Windows protections. Installing prerequisites does not replace the Git-only starter install and does not authorize publication.

## After tools work

- Verify all required versions in the execution environment that will run Company OS. Recheck secure GitHub authentication through [app setup](app-setup.md). Tool installation and GitHub sign-in are separate; do not ask for tokens in chat or enable plaintext storage.
- Check the saved setup before creating repositories. A private-repository 404 needs an access/destination decision, not another tool installation or an automatic replacement repository.
- Run helper operations sequentially. If sync has an active lock, say "Still syncing" and monitor the existing operation. Follow [sync](../workflows/sync.md); never delete a live lock or launch another publish alongside it.
- Record the observed blocker and resolution briefly in .company-os/setup.md when a brain exists. Label manual prerequisite installation as assisted setup. It does not prove automatic installation worked. Record successful backup, company publication, skill discovery, and fresh-conversation access independently.

For other operating systems, use the official OS-specific installation instructions and provide equally concrete steps only if an agent-side installation is blocked. Do not send Windows commands to a Linux VM or macOS terminal.

## Sources

- [Microsoft WinGet install command](https://learn.microsoft.com/en-us/windows/package-manager/winget/install)
- [Official GitHub CLI Windows installation and PATH guidance](https://github.com/cli/cli/blob/trunk/docs/install_windows.md)
- [Microsoft's Node.js LTS package manifest](https://github.com/microsoft/winget-pkgs/tree/master/manifests/o/OpenJS/NodeJS/LTS)
