---
name: physics-paper-writing
description: Draft, edit, and referee-review theoretical-physics manuscripts with verified venue rules, consistent terminology and style, traceable claims, and checked citations. Use for paper prose and submission preparation, not general physics explanation.
---

# Physics Paper Writing

Produce a manuscript that a skeptical reader outside the project can understand and audit. Preserve the user's requested role: draft, restructure, edit, or review; do not silently turn one into another.

## Ground the manuscript

Read the project overview, `RESEARCH-STATE.md`, and `Results.md` before changing scientific prose. Inspect legacy `Readme.md` and `Agents.md` when they are the active project records. Resolve unclear physical claims, target venue, article type, and deliverable scope before those choices affect the draft.

Every quantitative claim must trace to a `Results.md` entry, a recorded derivation, or a verified external source. Every citation must both exist and support the attached sentence. Distinguish material actually read from remembered or unverified background knowledge. Never silently change physics to improve prose.

## Maintain the writing contract

Keep a project-level `Writing-Guide.md` containing:

- target venue and article type;
- official venue-source URLs, access dates, and volatile rules to recheck;
- terminology ledger: internal terms to remove, terms to define, and canonical word choices;
- style ledger: tense, voice, recurring phrasing, drifting variants, and habits to avoid;
- notation and unit conventions;
- claim and citation issues still unresolved.

The guide is editable by the user. Propose consequential convention changes and make them visible; do not silently rewrite the contract. Adapt [assets/Writing-Guide.template.md](assets/Writing-Guide.template.md) when no contract exists.

For venue research and integrity checks, read [references/venue-and-claim-integrity.md](references/venue-and-claim-integrity.md). For terminology, consistency, and the referee pass, read [references/terminology-style-review.md](references/terminology-style-review.md).

## Draft and edit

Match the verified venue structure and the project's language. Define symbols before use; keep one symbol and one term per meaning; make abstracts stand alone and captions interpretable with minimal cross-reference. Keep significant figures consistent with uncertainties and units explicit.

Use the status labels `established`, `verified numerically`, `plausible`, `conjecture`, and `unknown` in project records, and make the corresponding distinction clear in manuscript prose without necessarily printing the labels.

After each substantial section, check the terminology and style ledgers. Show the user questionable jargon because project participants are poor judges of what outsiders will understand.

## Review skeptically

Before completion, perform a referee-style pass for missing controls, alternative explanations, over-broad claims, artifacts, unsupported figure interpretations, and missing prior work. Address objections within scope or report them explicitly. Do not hide the objection list.

Verify compilation, cross-references, bibliography, and figure references using the project's build system when relevant and available. Check environment-dependent tools and templates at runtime rather than assuming packages or versions.

Update `RESEARCH-STATE.md` with drafted sections, final and provisional figures, untraced claims, missing sources, and remaining objections. Finish when scientific claims are traceable, venue facts are sourced and dated, terminology is controlled, and unresolved referee concerns are visible.
