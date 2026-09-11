# App access and compatibility

The MVP targets ChatGPT and Claude. Any other agent with a suitable local shell can follow the same file workflows. Verify behavior instead of inferring it from an app name.

## Separate checks

1. Folder access: the actual brain folder is attached and commands can read and write it.
2. Local Git: initialization and two commits work without leftover locks; a writable note is insufficient.
3. Secure GitHub authentication: account checks pass from fresh network-enabled shell calls without exposing or storing plaintext credentials. Verify actual repository access separately.
4. Global discovery: the selected app discovers the globally installed Company OS skills, or has a verified explicit-pointer fallback.
5. Fresh-conversation access: another conversation reads a saved priority and preference/identity from the brain, citing actual paths, and verifies authentication without another login.
6. Remote results: actual personal backup and approved company sync succeed at the intended repositories. Recovery remains a separate end-to-end check.

Shell access inside an isolated runtime does not prove access to machine-global skill folders or the user's persistent filesystem. Resolve host/mount paths.

For missing tools, stale PATH, installation rejections, or a shell that cannot mount the brain, follow [setup troubleshooting](troubleshooting.md). The agent resolves supported installation steps first; manual instructions are the last resort for a concrete blocker, not the default flow.

## App-specific routes

- ChatGPT desktop / Work Local / Codex: allowed for setup and restore. Before setup, use Choose project to select a local project with the brain folder attached and primary. A project name or uploaded files alone do not establish local access. Guide the user to create/select Documents/CompanyOS if needed, then continue previous answers. Use supported user-level skills, then check the skill selector and a fresh task. Later, attach CompanyOS as an accessible secondary folder where needed. Secondary folder access alone does not auto-load its project instructions; explicitly load its entry point.
- Codex CLI: use the skills CLI's codex target. The global loader resolves the brain independently of the current working directory.
- Claude Code: the required Claude app for setup and restore. Use the claude-code global target. Verify access to CompanyOS from another project and skill invocation.
- Claude Desktop / Cowork: not a setup or restore app. If the user starts there, stop and send them to Claude Code in the brain folder. Do not install tools, clone, or work around click-only terminals. After a host-shell install exists, Cowork may connect the brain folder for later reading and writing. Machine-global Claude Code skills are not sufficient for Cowork discovery: enable the equivalent account-level adapter and verify it. Do not promise first-time backup or GitHub authentication from Cowork.
- Cursor and other local shell agents: install to their supported global target and verify discovery and access. An unknown agent can follow an explicit absolute-path prompt if it can read the brain.
- Cloud-only conversations: do not promise live laptop access. Connect a supported local session or label a cloud copy as a separate snapshot.

Do not upload private company skill contents to an account-level service without the relevant setup choice. The generic Company OS loader contains no company facts.

## Git and authentication preflight

When local Git compatibility is uncertain, create a uniquely named disposable test subfolder inside the connected brain root. Initialize Git with a repository-local test identity, commit a harmless file, edit it, and commit again. Check the log, clean status, and absence of locks. Clean up only this test directory after verifying its resolved path and permitted deletion, before cloning into the empty destination. Preserve any pre-existing files or failed clone; do not delete or rename another process's lock without establishing it is stale. Never include compatibility-test files in a backup.

Resolve GitHub CLI before installing it again. On Windows, check C:\Program Files\GitHub CLI\gh.exe and refresh the current process PATH so helpers invoking gh can find it. Absolute invocation fixes command discovery, not authentication.

Use the app's supported network-enabled execution and approval flow to run:

~~~text
gh auth status --hostname github.com --active
gh api --hostname github.com user --jq .login
~~~

Compare the actual execution identity and resolved GitHub CLI config directory if these fail. An offline sandbox can report an invalid token or a socket access error even when the host's secure login works. A denied hosts.yml write is a configuration access failure, not proof that every secure credential route is impossible. Do not read tokens into output, broaden ACLs, manually switch Windows users, bypass sandbox controls, or copy credentials between isolated environments. Use the supported authenticated context for GitHub operations and helpers, not only the initial login.

Check existing auth before starting one browser login process. Keep it running through CLI completion, display the actual device code and URL, and repeat the checks from fresh network-enabled calls. Verify again in a new conversation. Do not automatically enable plaintext storage or install keyring infrastructure in a temporary sandbox. If a supported secure route is unavailable, report the limitation; do not assume a session-named home proves repeated login is required. A token supplied in a separate cloud workspace does not establish authorized credential delivery to the local shell.

Once account auth works, check the configured repositories. A private-repository 404 can mean missing access, deletion, or renaming. Establish the cause and intended destination rather than silently recreating repositories or resetting sync state.

## Observed compatibility, 2026-09-10

User-reported tests, not a universal app guarantee:

| Check | ChatGPT Work in Windows Sandbox | Claude Cowork |
|---|---|---|
| Local Git | Passed in selected folder under restricted offline identity | Passed after exact root connection and scoped deletion approval |
| Secure auth in fresh calls | Passed with existing keyring login under normal guest-user identity through supported network-enabled calls | Blocked in tested Linux execution environment with no configured secure store; no login attempted |
| Auth across conversations | Unverified | Unverified |
| Full backup, company sync, restore | Unverified in this app test | Blocked pending secure auth |

Selecting a folder did not by itself prove the authentication fix. The successful ChatGPT calls used a different supported execution context. Neither test establishes that users must open every future chat inside the brain. Closing and relaunching Windows Sandbox discards its local state; that is a fresh machine test, not authentication persistence on the same machine.

A subsequent real-Windows test with prerequisites already installed completed personal backup and reviewed company publication; their remote revisions were independently checked. Automatic prerequisite installation in a clean Windows Sandbox remains blocked by a reported execution-policy rejection. Second-machine recovery remains unverified in these app tests. Do not conflate the successful configured-machine workflow with successful fresh installation.

## Optional global pointer

If native skill discovery is unreliable, add a small, bounded pointer to the app's user instructions through its supported interface. Preserve existing instructions. Suggested text:

> When I ask to use Company OS, locate the registered brain from ~/.company-os/brain.json and read its AGENTS.md and prime workflow. Apply only context relevant to the named company/task. Keep this project's own instructions and working directory.

No blanket instruction to load company data into every unrelated task. Installing the locator does not grant filesystem access.

## Documentation baseline

Reviewed 2026-09-10; documentation review is not an app acceptance test.

- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI project folders](https://learn.chatgpt.com/docs/projects)
- [OpenAI global instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)
- [Claude skills and Cowork delivery](https://code.claude.com/docs/en/skills)
- [Cowork deletion permissions](https://support.claude.com/en/articles/13364135-use-claude-cowork-safely)
- [Cowork architecture](https://support.claude.com/en/articles/14479288-claude-cowork-architecture-overview)
- [Claude plugin installation](https://support.claude.com/en/articles/13837440-use-plugins-in-claude)
- [GitHub CLI authentication](https://cli.github.com/manual/gh_auth_login)
- [Cursor skills](https://cursor.com/docs/skills)

Record exact app/version/mode and observed results in .company-os/setup.md. Do not claim automatic loading when only an explicit path worked.
