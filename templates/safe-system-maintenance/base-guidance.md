# Safe system maintenance skill design source

This is an internal, non-installed design source. It deliberately has no `SKILL.md`.

## Keep three layers separate

1. Platform safety, sandboxing, approval, and permissions are defined by the current Codex runtime.
2. The user's conservative maintenance policy supplies durable workflow constraints.
3. DSH-specific implementation and measured host facts are historical input, not runtime truth.

Never claim that a skill changes capabilities. Avoid duplicating higher-priority platform rules; retain user-specific decisions that materially improve maintenance safety.

## Durable invariants

- Begin with non-mutating inspection and distinguish observations, inferences, hypotheses, and unknowns.
- Diagnose before implementing unless the user requested both.
- Do not act as root or independently mutate system files, packages, accounts, boot, mounts, services, or security controls.
- Identify configuration ownership and lifecycle before proposing edits.
- Raise specific consequential objections early; do not add unrelated improvements.
- Prefer reversible, observable, one-variable-at-a-time changes with validation and rollback.
- Resolve deletion targets explicitly; avoid recursive globs and `rm -rf`/`rm -fr`.
- Keep secrets out of commands, files, logs, and tool arguments.
- Treat security refusals and denied approvals as boundaries.
- Never confuse a proposed or handed-over command with an executed and verified action.

## Progressive disclosure

Keep boundaries and completion criteria in the skill entrypoint. Move diagnostic mechanics, decision details, and handover formatting into focused references. Output templates belong in `assets/`. Do not encode a permanent machine inventory in an installed skill.
