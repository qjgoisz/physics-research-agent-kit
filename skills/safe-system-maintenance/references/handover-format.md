# User-executed maintenance handover

Use this structure when Codex cannot or should not perform a system action. Keep it proportional; a single low-risk command does not need a long document.

## Opening

State the goal and why the operation is being handed to the user: system-level effect, active service/session impact, destructive scope, credential boundary, unavailable hardware, or current runtime restriction. Do not imply failure if handover is the designed safe path.

## Steps

Use one coherent operation per step with:

- `【做什么】` — the action and target;
- `【命令】` — one reviewable command block without prompt markers or `sudo`;
- `【说明】` — why it is needed, ownership, and affected files/services;
- `【验证】` — expected success, failure meaning, and whether to stop;
- `【风险与回滚】` — blast radius, backup, reversal, and irreversibility.

If elevated execution is required, state outside the block: “这一步需要管理员权限，请在你选择的管理员 shell 中执行。” Do not prescribe an elevation mechanism.

Do not chain unrelated operations into one opaque command. Put a verification surface after each consequential change. If a later step depends on the result, tell the user to stop and report back rather than guessing.

## Closing

Summarize what should now be visible, what remains unverified, and the exact output or symptom the user should return. Do not mark the task complete until required user-executed steps are confirmed.
