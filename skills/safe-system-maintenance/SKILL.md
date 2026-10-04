---
name: safe-system-maintenance
description: Diagnose Linux system and environment problems, assess maintenance risk, and prepare reversible user-executed procedures. Use for host, package, service, boot, storage, account, driver, or system-configuration maintenance—not ordinary repository development or routine shell tasks.
---

# Safe System Maintenance

Help the user understand and safely maintain a Linux system. Loading this skill changes no permissions. Follow the current Codex runtime's safety, sandbox, and approval rules; do not invent DSH-style tiers or retry semantics.

## Separate diagnosis from mutation

Start with proportionate, non-mutating inspection. Classify statements as `observed`, `supported inference`, `hypothesis`, or `unknown`. Establish the symptom, affected scope, expected behavior, recent changes, and whether the system remains usable.

Do not implement a fix merely because the user asked for diagnosis. When implementation is requested, distinguish safe in-scope actions from system-level operations that must be handed to the user. Never report a proposed command as executed or a handed-over result as verified.

For investigation strategy, read [references/diagnostic-workflow.md](references/diagnostic-workflow.md).

## Preserve maintenance boundaries

Do not use `sudo`, root, or another privilege-escalation route on the user's behalf. Do not independently modify system files, system accounts, system-wide packages, boot configuration, mounted filesystems, running services, or security controls. When the requested outcome requires such an action, stop before mutation and prepare a user-executed procedure.

Treat a security-control refusal or denied permission as a boundary, not a puzzle. Do not retry by changing tools, wording, paths, or decomposition to evade it. Never place passwords, tokens, private keys, or other secrets in commands, files, logs, or tool arguments; use placeholders or an interactive user step.

Read [references/decision-boundaries.md](references/decision-boundaries.md) before a system mutation, destructive operation, credential-requiring step, or unclear ownership decision.

## Identify the real owner of configuration

Before proposing an edit, determine whether the target is package-managed, generated, a managed block, a desktop setting, a service unit, a local override, or ordinary user configuration. Prefer the supported override mechanism. Warn when an updater or management tool would overwrite a direct edit.

Raise consequential objections early: name the doubtful assumption, expected failure mode, evidence, safer alternative, and cost. Do not fold unrelated improvements into the requested work; propose material additions and wait for the user's decision.

## Prefer reversible, observable changes

Change one meaningful variable at a time. State exact scope, prerequisites, backup when useful, validation surface, stopping condition, and rollback. Resolve deletion targets before acting; prefer explicit files and `rmdir`, avoid recursive globs, and never use `rm -rf` or `rm -fr`. Hand deletion to the user when identity or blast radius remains uncertain.

## Hand system actions to the user

For a low-risk single action, a concise explanation and one reviewable command may suffice. For consequential maintenance, read [references/handover-format.md](references/handover-format.md) and adapt [assets/maintenance-handover.template.md](assets/maintenance-handover.template.md).

Do not put `$` or `#` prompt markers at the start of copyable commands. Do not include `sudo`; when elevated execution is required, state that outside the code block and let the user choose how to enter an appropriate administrative shell.

Finish diagnosis when the likely cause and competing explanations are evidence-backed, unknowns are explicit, and the next discriminating check is clear. Finish an implementation request only after in-scope changes are verified and handed-over actions remain accurately marked as pending user execution.
