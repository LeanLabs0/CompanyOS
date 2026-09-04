# Connect a tool when a task needs it

Start with the task and the smallest access it requires. No connection is needed merely to complete onboarding.

1. Check whether the selected AI app already offers a supported connection. Prefer that when it handles the task. Use a file export when live data is unnecessary.
2. If a custom integration is needed, consult current official documentation and explain the account/access requirement. Separate accounts can help where supported; they are not a universal prerequisite.
3. Use the provider's sign-in or secret-storage flow. Do not ask the user to paste credentials into chat or knowledge files. If a local secret file is necessary, verify it stays outside shared content and version history.
4. Test a harmless read relevant to the task. Record the actual operation, date, purpose, brand scope, approved access, and result in `connections.md`.
5. Treat write access separately from read access. A connected app does not authorize sending messages, publishing content, or changing records without the user's task authorizing those actions.

Document any custom integration's setup and recovery in a reference file. Date it and link to current official docs; saved API guidance can become stale. Check permissions or recent changes when an operation fails rather than repeating it indefinitely.
