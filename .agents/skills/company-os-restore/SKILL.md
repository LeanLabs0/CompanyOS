---
name: company-os-restore
description: Restore Company OS from a private personal GitHub backup on a new or replacement computer, reconnect the company brain, and recover global skills.
---

# Restore Company OS

Ask for the personal backup repository URL if it was not supplied. Check persistent local shell access and the user's intended destination, normally Documents/CompanyOS. Never overwrite an existing brain.

The agent handles prerequisite installation. If tools or permissions fail, use the current brain's .company-os/references/troubleshooting.md, or the troubleshooting section at https://www.leanlabs.com/brain.md before the backup is accessible. Manual steps are a last resort for a concrete unresolved blocker; preserve the destination and resume recovery afterward.

Check/install Git, GitHub CLI, and Node/npm as needed. Start GitHub's HTTPS browser authentication through gh auth login --web when necessary. Show the actual active one-time code in a code block and the clickable sign-in URL, even when the browser opened or the code is in the clipboard. The user can type it and approve. Repeat a valid code on request or restart an expired flow; never save codes in brain files. Configure Git authentication through gh auth setup-git. Do not ask for tokens in chat.

Inspect the private repository and access, then clone it into the empty destination with the remote named personal. Restore from the personal backup directly; do not clone the starter first or merge two unrelated repositories.

Read the restored kit.json and AGENTS.md, then follow .company-os/references/recovery.md. For an older kit, preserve files and follow its reviewed migration route.

Rebuild machine-local Git configuration, push guards, and the brain locator. Automatically reinstall all three required Company OS core skills, plus previously selected optional skills from their recorded sources, using Vercel's global npx skills add flow. Do not treat core installation as an optional choice or stop at a preview. Credentials and installed machine configuration are not recovered by cloning.

Reconcile the saved company baseline, restored wiki edits, and current company repository. Never overwrite current team knowledge with a restored snapshot. Preserve conflicts for a user decision.

Verify a priority, preference or identity fact, and a real deliverable. Report recovery and company sync independently. Verify a fresh conversation outside the brain folder before claiming cross-project recall.
