---
name: physics-research-explore
description: Develop theoretical-physics understanding through literature verification, explanation, derivation, reproduction, idea evaluation, and well-posed research-question design. Use before numerical production or manuscript drafting.
---

# Physics Research: Explore

Turn an unclear topic into a defensible research question, a minimal model, and an executable analytical/numerical plan. Do not drift into production simulations or manuscript polishing unless the user expands the task.

## Establish the discussion level

Before a substantial explanation or derivation, learn what background to assume and what the concrete starting point is. If either is already clear, do not ask again. Explain what the level changes: definitions, intermediate steps, accepted standard results, and notation density. Revisit it only after a major subject shift or clear mismatch.

## Work with evidence

- Inspect project sources and `reference/` before searching elsewhere.
- Verify that every cited paper exists and supports the attached claim. Resolve a DOI or arXiv identifier; do not infer content from a title or abstract alone.
- Distinguish `read directly`, `remembered but unverified`, and `suspected related work`.
- Record assumptions, conventions, and the provenance of important equations.
- Treat disagreement among a source, derivation, code, and numerical evidence as a finding to investigate. Do not tune or rewrite toward agreement.

For literature mapping, reproductions, or derivations, read [references/evidence-and-derivation.md](references/evidence-and-derivation.md).

## Maintain epistemic status

Use these labels consistently in notes and handoffs:

- `established`: supported by a checked derivation or a verified source;
- `verified numerically`: supported by a reproducible calculation with stated checks;
- `plausible`: supported by reasoning, but not yet verified;
- `conjecture`: a deliberately unverified research hypothesis;
- `unknown`: unresolved or unsupported.

Do not make a successor infer confidence from prose.

## Form and test ideas

For each serious candidate, state the physical question, the specific gap in prior work, the proposed novelty, a falsification test, the cheapest discriminating calculation, and the main failure mode. Rank candidates rather than padding the list. Recommend a primary direction and a fallback; record rejected directions and why.

Raise concrete consequential objections early. Give the doubtful assumption, expected failure, evidence, and a better path. Do not silently expand the user's scope while following that path.

## Close the exploration phase

When the task is project formation or phase handoff, create or update:

- `README.md`: human-facing central idea, verified prior work, conservative novelty claim, explicit toy model, analytical plan, numerical plan, risks, and verified references.
- `RESEARCH-STATE.md`: agent-facing state, epistemic-status ledger, chosen explanation level, decisions and rejected ideas, open questions, file map, conventions, and next actions.

Use the project’s language and layout when they exist. Otherwise copy and adapt [assets/README.template.md](assets/README.template.md) and [assets/RESEARCH-STATE.template.md](assets/RESEARCH-STATE.template.md). Do not overwrite established documents merely to match the templates.

Finish when the question is well posed, the minimal model and assumptions are explicit, the evidence status is visible, and a later numerical phase can begin without reconstructing the reasoning.
