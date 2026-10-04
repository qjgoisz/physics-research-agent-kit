# Theoretical-physics research skill design source

This directory is an internal, non-installed template for creating or maintaining future research skills. It is not a runtime dependency of the three skills and deliberately contains no `SKILL.md`.

## Scope the skill by user goal

Prefer separate skills when triggers, inputs, or completion criteria differ. Exploration ends with understanding and a research decision; numerics ends with reproducible validated results; writing ends with traceable, venue-aware manuscript text. Do not recreate a single catch-all persona.

## Scientific invariants

- Classify claims as `established`, `verified numerically`, `plausible`, `conjecture`, or `unknown`.
- Verify both the existence of a citation and its support for the attached claim. Mark read material separately from memory or unverified background.
- Treat disagreement among derivation, implementation, results, and literature as a finding.
- Trace quantitative claims to a result record, derivation, or verified external source.
- Require reproducible numerics: code, raw data, parameters, commands, seeds, uncertainty, and validation.
- Organize `Results.md` by physical question, with relative links.
- For writing, preserve a terminology ledger, style ledger, current official venue sources, jargon review, and skeptical referee pass.
- Raise consequential objections early with evidence and an alternative. Do not silently broaden scope.

## Runtime boundaries

Do not encode fixed package inventories, hardware, paths, versions, permission tiers, or tool availability. Tell the skill to inspect the current project and verify environment-dependent capabilities at runtime. Do not duplicate policies already enforced by Codex.

## Project documents

- `AGENTS.md`: concise, stable repository instructions for Codex.
- `RESEARCH-STATE.md`: frequently updated research handoff and epistemic-status ledger.
- `README.md`: human-facing research overview, prior work, novelty, toy model, and plans.
- `Results.md`: durable numerical-result index.
- `Writing-Guide.md`: paper-specific venue, terminology, notation, and style contract.

Keep installed skills self-contained. Supporting templates intended for user output belong under each skill's `assets/`; conditional instructions belong under `references/`.
