# DSH Research Preset Migration

This workspace is for migrating the theoretical-physics research preset family from DSH into maintainable Codex skills and non-installed templates.

## Source of truth

Read the source preset before implementing the migration:

- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/README.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/base.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/phases/explore.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/phases/numerics.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/phases/writing.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/capabilities/`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona/sections/`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-research/persona-audit.txt`

Treat the Chinese requirements in `persona-audit.txt` as the authoritative statement of the user's original intent when they differ from the English DSH persona. Do not modify the source preset during this migration.

## Agreed outcome

Produce three focused, installable Codex skills in this workspace:

1. `physics-research-explore` for literature work, explanation, derivation, idea formation, and research-question design.
2. `physics-research-numerics` for simulation, data analysis, plotting, validation, reproducibility, and result indexing.
3. `physics-paper-writing` for manuscript drafting and editing, venue requirements, terminology and style consistency, claim traceability, and referee-style review.

Also maintain the former fourth, general research preset as an internal design source under `templates/theoretical-physics-research/`. It is a template for creating and maintaining future research skills, not an installable Codex skill. Do not put a `SKILL.md` in that template directory, do not expose it through skill discovery, and do not install or copy it into `$CODEX_HOME`.

Create `docs/migration-map.md` to record how each meaningful DSH section was handled: retained, condensed, moved to a reference or asset, replaced by a runtime check, or dropped.

## Target layout

Use this as the intended shape, adjusting optional files only when their concrete value is clear:

```text
skills/
├── physics-research-explore/
├── physics-research-numerics/
└── physics-paper-writing/
templates/
└── theoretical-physics-research/
    ├── base-guidance.md
    ├── AGENTS.template.md
    ├── RESEARCH-STATE.template.md
    ├── Results.template.md
    └── Writing-Guide.template.md
docs/
└── migration-map.md
```

Each installed skill must be self-contained. It must not depend at runtime on files under `templates/`, on another skill being loaded first, or on the original DSH directory remaining available.

## Design rules

- Use the built-in `skill-creator` guidance when creating or substantially revising the skills.
- Keep each skill focused on its recognizable user goal. The three phases have different triggers, inputs, and completion criteria and must remain separate skills.
- Keep `SKILL.md` concise. Put conditional detail in `references/`, reusable output templates in `assets/`, and deterministic repeated operations in `scripts/` only when a script provides real reliability.
- Make each skill description short and discriminating. Test both requests that should trigger it and nearby requests that should not.
- Preserve explicit user choices and project conventions. Skill guidance must not silently broaden a task or authorize unrelated changes.
- Assume Codex is capable. Migrate non-obvious scientific discipline and workflow invariants, not generic reminders to think, plan, communicate, inspect files, or run ordinary checks.
- Do not mechanically translate or concatenate the DSH persona. Rewrite it for Codex and progressive disclosure.
- Do not add placeholder directories, README files, changelogs, duplicated quick references, or scripts without a demonstrated use.

## Research invariants to preserve

Retain the substance of these rules across the appropriate skills and templates:

- Separate claims into `established`, `verified numerically`, `plausible`, `conjecture`, and `unknown`; never make a successor infer confidence from prose.
- Verify that cited papers exist and that they support the attached claim. Distinguish material actually read from remembered or unverified background knowledge.
- Treat disagreement among derivation, code, numerical results, and literature as a finding to investigate, never something to conceal or tune away.
- Require quantitative claims to be traceable to a result entry, recorded derivation, or verified external source.
- Make numerical work reproducible through code, data, parameters, commands, seeds, uncertainties, and validation against known limits or convergence checks.
- Organize `Results.md` by physical question rather than date, using relative links to figures, data, code, and parameters.
- Preserve the writing workflow's terminology ledger, style ledger, venue-source verification, jargon review, and skeptical referee pass.
- Preserve the expectation that the agent raises concrete, consequential objections early and proposes a better path without silently expanding scope.

## Project document convention

Do not reuse `Agents.md` as both a research handoff and Codex instructions. Use:

- `AGENTS.md` for concise, stable Codex repository instructions.
- `RESEARCH-STATE.md` for the frequently updated agent-facing research handoff.
- `README.md` for the human-facing research overview, prior work, novelty, toy model, and plans.
- `Results.md` for the numerical result index.
- `Writing-Guide.md` for the per-paper venue, terminology, and style contract.

The migration should provide templates and skill instructions for this convention, but it must not modify existing research repositories as part of building the skills.

## DSH-specific material not to migrate verbatim

Drop or rewrite the following rather than carrying it into Codex skills:

- DSH preset registry, plugin rows, Cordis bundle YAML, generator and installation mechanics.
- `dsh-defend` behavior, refusal messages, counters, and DSH-specific approval semantics.
- Claims that the DSH sandbox, Wolfram MCP, MATLAB, GPU, filesystem mounts, or permission tiers exist in a Codex session.
- Fixed package inventories, paths, versions, hardware details, and dated environment measurements when they can be checked at runtime.
- Instructions already enforced by the Codex runtime or higher-priority safety and permission policies.

Stable user preferences may be retained in the internal template or project `AGENTS.md` template when they materially affect research work. Environment-dependent facts must be framed as preferences or hypotheses and verified before use.

## Validation and completion

Before considering the migration complete:

1. Validate every skill with the `skill-creator` validator.
2. Check that all referenced files exist and are reachable from the corresponding `SKILL.md`.
3. Inspect the skills for duplicated instructions, conflicting boundaries, stale DSH assumptions, and accidental runtime dependencies on the internal template.
4. Test each skill with representative direct, indirect, incomplete, non-triggering, and edge-case requests.
5. Confirm that `templates/theoretical-physics-research/` contains no discoverable `SKILL.md`.
6. Report what was retained, materially changed, and intentionally omitted.

Keep all implementation and validation artifacts inside this workspace. Do not install the skills globally, change Codex configuration, publish a plugin, or modify the original DSH preset unless the user explicitly requests that separate action.

# DSH Safe-Maintenance Preset Migration

This workspace is also intended to migrate the DSH safe-maintenance preset into a focused Codex skill and a non-installed maintenance template. Treat this as a separate migration track from the theoretical-physics skills; do not mix its system-maintenance rules into the research skills.

## Safe-maintenance source of truth

Inspect these files before implementing this migration:

- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-safe-maintenance/README.md`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-safe-maintenance/preset.yml`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-safe-maintenance/agent.cordis.yml`
- `/home/debian/Documents/Sourcefiles/dsh-test/dsh-preset-safe-maintenance/regenerate.mjs`

The Chinese requirements preserved in the audit trail near the start of `agent.cordis.yml` are the authoritative statement of the user's original intent when they differ from the English persona. Do not modify the DSH source preset during the Codex migration.

## Safe-maintenance outcome

Produce one focused, installable Codex skill named `safe-system-maintenance`. It should support Linux system diagnosis, maintenance planning, environment troubleshooting, risk review, and preparation of user-executed procedures. It must not activate for ordinary repository development, routine shell usage, or code changes that do not concern system maintenance.

Maintain a separate internal design source under `templates/safe-system-maintenance/`. The template is for reviewing and evolving the maintenance policy; it is not an installable skill. Do not put a `SKILL.md` in that directory, expose it through skill discovery, or install it into `$CODEX_HOME`.

Create `docs/safe-maintenance-migration-map.md` to record how each meaningful section of the DSH persona was handled: retained, condensed, moved to a reference or asset, replaced by a runtime check, or dropped.

## Safe-maintenance target layout

Use this intended shape, omitting optional files that do not provide concrete value:

```text
skills/
└── safe-system-maintenance/
    ├── SKILL.md
    ├── references/
    │   ├── decision-boundaries.md
    │   ├── diagnostic-workflow.md
    │   └── handover-format.md
    └── assets/
        └── maintenance-handover.template.md
templates/
└── safe-system-maintenance/
    ├── base-guidance.md
    └── environment-inventory.template.md
docs/
└── safe-maintenance-migration-map.md
```

The installed skill must be self-contained. It must not depend at runtime on the internal template or on the original DSH directory remaining available.

## Safe-maintenance design boundary

Keep three layers distinct:

1. Codex platform safety, sandboxing, approval, and permission rules. These are enforced by the current runtime and must not be restated with invented or obsolete semantics.
2. The user's additional conservative maintenance policy. This is the durable material to migrate into the skill.
3. DSH-specific implementation details and measured host snapshots. These must be removed or converted into runtime checks.

The skill provides guidance; it does not enforce permissions and must never claim that loading it grants, removes, or changes any capability. Higher-priority Codex safety and permission rules always remain authoritative.

## Maintenance invariants to preserve

Retain the substance of these rules where they materially affect a maintenance task:

- Begin with non-mutating inspection and evidence collection. Distinguish observed facts, supported inferences, hypotheses, and unknowns.
- Do not use `sudo`, root, or another privilege-escalation route on the user's behalf. Do not independently modify system files, system accounts, system-wide packages, boot configuration, mounted filesystems, or running services.
- When completing the requested outcome would require such a system-level action, stop before the mutation and prepare a user-executed procedure instead of searching for an alternate route.
- Identify the actual owner and lifecycle of a configuration before proposing edits: package-managed file, generated block, desktop setting, service unit, local override, or user configuration. Warn when an update or management tool would overwrite a direct edit.
- Raise concrete, consequential objections early. State the doubtful assumption, expected failure mode, evidence, alternative, and cost. Do not silently deviate and do not silently carry out a known-bad request.
- Do not fold unrequested system improvements into the requested work. Propose material additions and wait for the user's decision.
- Prefer reversible and observable changes. Specify backups when useful, exact scope, validation, stopping conditions, and rollback.
- Apply strict deletion discipline: inspect and resolve exact targets first; prefer explicit files and `rmdir`; avoid recursive globs; do not use `rm -rf` or `rm -fr`; and hand the deletion over when target identity or blast radius remains uncertain.
- Never place passwords, tokens, private keys, or other secrets into commands, files, logs, or tool arguments. Provide a safe placeholder or interactive user step when credentials are required.
- Treat refusal by a security control or denial of requested permission as a boundary, not a puzzle to evade. Follow the current Codex runtime's actual approval mechanism and stop when approval is denied or unavailable.

These are skill-level user preferences and workflow constraints. Do not rewrite them as claims about the exact sandbox implementation, available approval tiers, or guaranteed tool behavior.

## Diagnostic workflow

The migrated skill should guide proportionate investigation rather than prescribe a large fixed checklist for every task:

- Establish the symptom, affected scope, expected behavior, recent changes, and whether the system is currently usable.
- Inspect relevant configuration, versions, package ownership, logs, and service state with read-only commands available in the current environment.
- Prefer authoritative documentation for distribution, package, driver, service, and application behavior that may have changed.
- Identify the likely cause and competing explanations before proposing mutation.
- Separate safe in-scope actions Codex can perform from system-level operations that must be handed to the user.
- Avoid changing several variables at once. Each proposed step should have a verification surface and a clear reason to continue or stop.
- Never report a handed-over command as executed or a proposed result as verified.

Do not force the full workflow onto a simple read-only question. Scale the procedure to the risk and ambiguity of the task.

## User handover format

When an operation must be executed by the user, preserve the useful Arch Wiki-style presentation without copying DSH-specific permission language. Explain why Codex is not performing the operation and present reviewable steps containing:

- `【做什么】`
- `【命令】`
- `【说明】`
- `【验证】`
- `【风险与回滚】`

Use one coherent operation per step. Do not place shell prompt markers such as `$` or `#` at the start of copyable command lines, do not include `sudo`, and do not chain unrelated operations into one opaque command. If elevated execution is required, state that outside the command block and let the user choose how to enter an appropriate administrative shell.

For every step, specify what success should look like, what failure means, and whether the user should stop and report back before continuing. Keep the ceremony proportional: a low-risk single user action does not need a long document, while system configuration, package changes, boot changes, account changes, storage operations, and destructive actions require explicit risk and rollback guidance.

## DSH-specific material not to migrate verbatim

Drop or rewrite the following:

- DSH preset registry, plugin rows, Cordis bundle files, generator, installation, upgrade, and GUI restart mechanics.
- `dsh-defend` layers, counters, refusal wording, configuration fields, and assumptions about which tools it intercepts.
- DSH-specific permission tiers such as `工作区内修改` and `danger-full-access`, the fixed one-retry sequence, and literal DSH sandbox error markers.
- The measured bubblewrap command, fixed mount layout, private `/tmp` behavior, PID namespace, device visibility, and claims that these are present in Codex.
- Assumptions that Wolfram, MATLAB, Miniconda, GPU access, block devices, a specific MCP server, or particular package managers are available.
- Hostname, user id, hardware model, partition layout, driver release, kernel, distribution codename, desktop session, package versions, interpreter paths, and installed/not-installed software lists as enduring facts.
- Rules already imposed by higher-priority Codex runtime safety and permission policies.

Environment facts that may still help future diagnosis belong in the non-installed `environment-inventory.template.md`. Treat every populated value as a dated observation and verify it with a read-only check before relying on it. Do not load a full machine inventory for unrelated maintenance requests.

## Safe-maintenance validation and completion

Before considering this migration complete:

1. Validate `safe-system-maintenance` with the `skill-creator` validator.
2. Check that every referenced file exists and is reachable from its `SKILL.md`.
3. Confirm that `templates/safe-system-maintenance/` contains no discoverable `SKILL.md`.
4. Audit the skill for obsolete DSH terminology, static host assumptions, invented Codex permission semantics, and duplicated platform safety instructions.
5. Test direct and indirect maintenance requests, incomplete diagnostic inputs, read-only questions, system-level mutation requests, destructive operations, denied approvals, credential-requiring tasks, and nearby requests that should not activate the skill.
6. Verify that the skill distinguishes diagnosis from implementation, proposed commands from executed commands, and user handover from successful completion.
7. Report what was retained, materially changed, converted into runtime discovery, and intentionally omitted.

Keep all safe-maintenance migration and validation artifacts inside this workspace. Do not install the skill globally, change Codex configuration, execute system-maintenance commands against the host, publish a plugin, or modify the original DSH preset unless the user explicitly requests that separate action.
