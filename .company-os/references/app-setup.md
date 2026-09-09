# App access and compatibility

The MVP targets ChatGPT and Claude. Any other agent with a suitable local shell can follow the same file workflows. Verify behavior instead of inferring it from an app name.

## Three separate checks

1. Persistent shell: commands can read/write the actual CompanyOS folder and use Git, Node, and network authentication.
2. Global discovery: the selected app discovers the globally installed Company OS skills, or has a verified explicit-pointer fallback.
3. Cross-project recall: a fresh conversation in another project reads a saved priority and preference/identity from the brain, citing actual paths.

Shell access inside an isolated runtime does not prove access to machine-global skill folders or the user's persistent filesystem. Resolve host/mount paths.

## App-specific routes

- ChatGPT desktop / Work Local / Codex: use supported user-level skills, then check the skill selector and a fresh task. Attach CompanyOS as an accessible secondary folder where needed. Secondary folder access alone does not auto-load its project instructions.
- Codex CLI: use the skills CLI's codex target. The global loader resolves the brain independently of the current working directory.
- Claude Code: use the claude-code global target. Verify access to CompanyOS from another project and skill invocation.
- Claude Desktop / Cowork: machine-global Claude Code skills are not sufficient according to Claude's skill documentation. Enable the equivalent account-level skill/plugin through Cowork's supported interface, or use an explicit folder pointer. Keep one versioned source, and record this as an app adapter rather than claiming the Vercel installation alone worked.
- Cursor and other local shell agents: install to their supported global target and verify discovery and access. An unknown agent can follow an explicit absolute-path prompt if it can read the brain.
- Cloud-only conversations: do not promise live laptop access. Connect a supported local session or label a cloud copy as a separate snapshot.

Do not upload private company skill contents to an account-level service without the relevant setup choice. The generic Company OS loader contains no company facts.

## Optional global pointer

If native skill discovery is unreliable, add a small, bounded pointer to the app's user instructions through its supported interface. Preserve existing instructions. Suggested text:

> When I ask to use Company OS, locate the registered brain from ~/.company-os/brain.json and read its AGENTS.md and prime workflow. Apply only context relevant to the named company/task. Keep this project's own instructions and working directory.

No blanket instruction to load company data into every unrelated task. Installing the locator does not grant filesystem access.

## Documentation baseline

Reviewed 2026-09-09; documentation review is not an app acceptance test.

- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI project folders](https://learn.chatgpt.com/docs/projects)
- [OpenAI global instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Claude skills and Cowork delivery](https://code.claude.com/docs/en/skills)
- [Cursor skills](https://cursor.com/docs/skills)

Record exact app/version/mode and observed results in .company-os/setup.md. Do not claim automatic loading when only an explicit path worked.
