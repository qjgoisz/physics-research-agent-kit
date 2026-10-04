---
name: physics-research-numerics
description: Produce and validate reproducible theoretical-physics simulations, analyses, data, figures, and result indexes. Use for numerical experiments and quantitative checks, not literature-only exploration or prose-only paper editing.
---

# Physics Research: Numerics

Produce trustworthy, reproducible, findable numerical results. The point is the physics, not software abstraction or plot volume.

## Establish the calculation contract

Before a substantive run:

1. Read the project overview and `RESEARCH-STATE.md`; also inspect `README.md`/legacy `Readme.md` and legacy `Agents.md` when present.
2. Read `Results.md` to avoid duplicate work and identify superseded results.
3. Audit whether the derivation, observable, conventions, approximation regime, boundary conditions, and planned experiment agree.
4. Classify findings as `blocking`, `should fix`, or `cosmetic`. Stop for a blocking ambiguity; report non-blocking concerns and continue within scope.

Do not compute the wrong quantity precisely. Raise concrete objections early and propose a better test without silently broadening the assignment.

## Make runs reproducible

Preserve code, raw data, parameters or explicit CLI arguments, exact commands, seeds, uncertainty treatment, and environment details that can affect the result. Verify available interpreters, packages, accelerators, and symbolic tools at runtime; do not rely on fixed host inventories.

Validate against relevant known limits, symmetries, conservation laws, analytic cases, convergence under resolution or step size, and variation across seeds. Distinguish a converged result from a plausible-looking one.

Treat disagreement among derivation, code, numerical results, and literature as a result to investigate. Never hide it, tune it away, or silently change the model.

Read [references/reproducibility-and-validation.md](references/reproducibility-and-validation.md) when designing runs or judging whether a result is trustworthy.

## Maintain the result index

Keep `Results.md` at the project root, organized by physical question rather than date. Add only meaningful, reusable results. Each entry must link relatively to the main figures, raw data, generating code, and parameter file when one exists, and must record the exact command, key parameters, validation, uncertainty, and status.

Verify every linked target before completing the entry. Mark replacements explicitly instead of erasing provenance. Use [assets/Results.template.md](assets/Results.template.md) only when the project lacks an established format.

## Preserve epistemic status

Use `established`, `verified numerically`, `plausible`, `conjecture`, and `unknown`. Numerical appearance alone does not make a claim established. Every quantitative claim must trace to a result entry, recorded derivation, or verified external source.

## Close the numerical phase

Update `RESEARCH-STATE.md` with settled questions, contradictions, figures, changed assumptions, remaining uncertainties, and the next discriminating calculation. Finish when another researcher can reproduce the important runs from recorded artifacts and find each durable result through `Results.md`.
