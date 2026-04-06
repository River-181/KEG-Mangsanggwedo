---
description: Close a working session cleanly. Update progress, memory, evidence, and Evidence Gate status before ending the session.
argument-hint: [what changed]
disable-model-invocation: true
---

Close this session using `$ARGUMENTS` as the summary of what changed.

## Canonical files

1. `.agent/system/ops/PROGRESS.md`
2. `.agent/system/memory/daily-memory.md`
3. `04_증빙/01_핵심로그/session-log.md`
4. `04_증빙/01_핵심로그/ai-usage-log.md`
5. `04_증빙/01_핵심로그/decision-log.md`
6. `.agent/system/logs/evidence-gate-log.md`
7. `.agent/skills/workspace-sync/SKILL.md`

## Task

Perform an end-of-session closure checklist.

1. Determine what changed in this session.
2. Update `PROGRESS.md` if the state or next handoff changed.
3. Update `daily-memory.md` if today's working memory changed.
4. Check whether any report-worthy facts must be promoted into `04_증빙/`.
5. Verify whether `session-log`, `ai-usage-log`, and `evidence-gate-log` need updates.
6. If a human decision was made, point to `decision-log.md`.
7. Report whether the session is `Passed` or `Pending Evidence`.

## Output format

```
[Session summary]
[Files requiring update]
[Evidence promotions]
[Gate status]
[Next handoff]
```
