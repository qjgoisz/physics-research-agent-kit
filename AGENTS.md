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
