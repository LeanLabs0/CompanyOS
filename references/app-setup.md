# Connect this folder to your AI

Use the client's chosen app. Check capabilities in the current session instead of promising support from a product name alone. Setup needs persistent file reading and writing, plus a way to fetch the kit or accept a manually downloaded ZIP. It does not need permission to delete arbitrary files.

## Setup paths

| Environment | What to establish |
|---|---|
| ChatGPT desktop with Work Local available | Select local work and grant the intended folder. Check the actual mode and access; a cloud task in the desktop app is not automatically local. |
| Claude Desktop with Cowork and local folder access available | Connect the intended folder. Keep the app connected while local files are needed. Use folder instructions or the explicit return prompt; do not assume Claude Code skill discovery. |
| Codex, Claude Code, Cursor, Gemini CLI, or another folder-capable agent | Open the folder as the workspace. Verify the tool reads the root instructions and can write there. Use an explicit skill file path if commands are unavailable. |
| Another bot or agent | Establish its persistent storage location, scope of access, and method for loading instructions. Treat support as untested until a real read/write and fresh-session check pass. |
| Chat without persistent folder access | Explain the missing capability and help the user connect a supported mode or download the ZIP manually. You may draft useful context in chat, but label it unsaved and do not claim installation. |

App availability, permissions, and menus change. Use official documentation for the user's app and operating system when the observed interface differs. Never invent menu labels or claim a test has passed on a device you have not tested.

## Read/write check

Within the granted folder, create a uniquely named setup note and read it back. Show the location the user can access, including the host folder mapping if the tool uses a mounted path. Explain when a path belongs only to a temporary tool environment. Keep the note as setup evidence or remove that exact temporary file after checking, when permitted.

The user may need to choose the folder or approve access in the app. Ask for that specific action only when it cannot be done with existing access.

## Return prompt

> Read AGENTS.md in [the connected folder]. Load my saved context, then tell me my current priority and one saved preference or identity fact. Cite the files you read.

Use the same persistent folder for each app. A copied or uploaded file may be a snapshot. Record the app-specific return steps in `context/setup.md`; do not add global machine instructions that expose this brain to unrelated work.

If instructions do not load automatically, explicitly read `AGENTS.md` and `.agents/skills/prime/SKILL.md` from the folder. This is a supported fallback. Only claim automatic loading after observing it.

If the AI cannot find information, verify the folder, actual file, and index link in that order. Reconnect or repair routing before repeating onboarding.

## Documentation and verification

Documentation reviewed 2026-09-04; this is not a claim that every app was tested:

- [ChatGPT Work local access](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-local-security)
- [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Skill discovery and packaging](https://learn.chatgpt.com/docs/build-skills)
- [Claude Cowork setup](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)

For an individual installation, record observed capabilities and fresh-session results in `context/setup.md`. Kit release testing belongs in `references/maintainer-testing.md`.
