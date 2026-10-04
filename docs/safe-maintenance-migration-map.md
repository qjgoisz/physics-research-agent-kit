# Safe-maintenance preset migration map

Status meanings: **retained** preserves a durable maintenance invariant; **condensed** keeps decision-changing substance; **moved** places conditional guidance in a reference or reusable output in an asset; **runtime check** replaces a host snapshot; **dropped** removes DSH-specific or redundant material.

| DSH source section | Disposition | Codex destination and rationale |
|---|---|---|
| Preset registry, Cordis rows, bundle generator, install/update/restart mechanics | dropped | DSH packaging is not part of a Codex maintenance workflow. |
| “standard plus persona” architecture | replaced | One focused, self-contained Codex skill with progressive disclosure. |
| Chinese replies and literal-preservation rules | moved | May remain a project/user preference; not universal maintenance logic. |
| R1–R4: no sudo/root, system files, accounts, system-wide installs | retained and condensed | `SKILL.md` and decision-boundaries reference preserve the user's conservative policy without claiming platform enforcement. |
| R5: do not bypass sandbox/approval | retained and generalized | Security refusals and denied approvals are boundaries; actual Codex runtime semantics remain authoritative. |
| Fixed one-retry DSH approval procedure and permission-tier names | dropped | DSH-specific and unsafe to project onto Codex. |
| Standing duty to object, propose, plan, and ask before extra work | condensed | Concrete objections and no silent scope expansion appear in `SKILL.md`; generic planning reminders omitted. |
| `dsh-defend` gate, layers, counters, wording, and action values | dropped | Plugin-specific behavior does not describe Codex. Durable deletion and secret-handling lessons were retained independently. |
| Recursive-delete discipline | retained and moved | Decision-boundaries reference: resolve targets, prefer explicit files/`rmdir`, avoid globs and `rm -rf`/`rm -fr`, hand over uncertainty. |
| Measured bubblewrap invocation, mounts, private `/tmp`, namespaces, devices, D-Bus, network | runtime check / dropped | Diagnose the current environment only when relevant. |
| Fixed lists of what the agent may do in the DSH workspace | generalized | `SKILL.md` separates diagnosis, authorized in-scope action, and user handover under current runtime rules. |
| Arch Wiki-style handover and fixed labels | retained and moved | Handover reference and asset preserve reviewable steps, validation, risk, and rollback without DSH permission language. |
| No prompt markers and no `sudo` in copyable commands | retained | `SKILL.md` and handover reference. |
| Known toolchain traps and workspace cache workarounds | runtime check / dropped | They are historical host observations, not portable policy; inspect current tools when relevant. |
| Host hardware inventory | moved to non-installed template | `templates/safe-system-maintenance/environment-inventory.template.md`, with dates and verification requirements. |
| Host software, paths, versions, installed/missing packages | moved to non-installed template / runtime check | Never loaded as enduring skill truth. |
| Large fixed pre-flight checklist | condensed | High-risk boundaries remain; simple questions are not burdened with a universal checklist. |
| Read-only diagnosis first | retained and expanded | Diagnostic-workflow reference distinguishes evidence and accounts for observation effects. |
| Configuration ownership and generated/managed content | retained and expanded | Decision-boundaries reference requires identifying lifecycle and supported override mechanisms. |
| Reversible changes, backup, verification, rollback | retained | Skill, handover reference, and asset. |
| Secrets never placed in commands | retained and generalized | Decision-boundaries reference uses placeholders or interactive steps. |

## Material changes

The migration changes the preset from a machine-specific prohibition document into a goal-scoped maintenance workflow. It distinguishes diagnosis from implementation, requires evidence-backed competing hypotheses, and makes configuration ownership a first-class decision. The skill no longer predicts exact sandbox behavior or assumes particular tools, hardware, paths, or packages.

## Intentionally omitted

- DSH preset and bundle lifecycle.
- `dsh-defend` implementation and refusal taxonomy.
- Literal DSH sandbox errors and permission tier names.
- Hostname, user id, hardware models, partitions, drivers, distro codename, package versions, interpreter paths, and installed-software lists.
- Instructions already controlled by higher-priority Codex safety and approval policies.
