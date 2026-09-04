---
name: level-up
description: Improve one repeated task by simplifying it or building a reusable prompt, template, skill, or automation. Use when the user asks what to improve next or wants to make a recurring task easier.
---

# Make one task easier

Start with the user's actual task and current priorities. No minimum age, prior audit, connection, or measurable revenue target is required. Read relevant context, existing workflows, and `connections.md` only when needed. Use `references/operator-framework.md` as an optional thinking aid, not a script for interrogating the user.

1. If the user supplied a task, work from it. Otherwise ask what they repeated or found frustrating recently. Offer at most a few concrete candidates grounded in their work.
2. Identify what can be removed or simplified. Then clarify only the inputs, desired output, and decisions that affect the solution. Help the user work these out; do not send them away to write a process map.
3. Choose the smallest useful implementation. A saved prompt, checklist, or document template is often enough. Use a script for predictable transformations and AI when interpretation is needed. Do not introduce accounts, tools, schedules, or subagents without a concrete need and appropriate authorization.
4. State what a successful example would look like. Time saved, fewer repeated corrections, or a more useful deliverable can be sufficient evidence.
5. Build the chosen artifact, run it on a representative example within the authorized scope, and review the result. Keep external sending and publishing separate from drafting unless already authorized.
6. Register the artifact where a new session can find it. For a skill, use `.agents/skills/<name>/SKILL.md` with `name` and `description` frontmatter; update the corresponding Claude adapter if this installation uses it. Keep detailed procedures in one canonical place.

Record an agreed durable decision in `decisions/log.md` when the user asks or approves saving it. A request to build a workflow authorizes saving that workflow, not unrelated personal memories.

Close with what changed, where it is saved, how to use it again, and what was actually tested. If stopping the task is the best outcome, say so; no extra artifact is required. Schedule work only when requested, after establishing permissions, failure handling, and a way to stop it.
