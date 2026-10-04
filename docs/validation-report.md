# Validation report

This file records migration checks without installing the skills.

## Structural validation

Validated on 2026-10-04 with the bundled `skill-creator/scripts/quick_validate.py`, using a runtime that provides PyYAML:

- `skills/physics-research-explore`: passed (`Skill is valid!`)
- `skills/physics-research-numerics`: passed (`Skill is valid!`)
- `skills/physics-paper-writing`: passed (`Skill is valid!`)

The entrypoints are 51, 43, and 45 lines respectively. Conditional detail is in focused references and reusable output skeletons are in assets. No scripts were added because the migration contains no repeated deterministic operation whose reliability would improve through automation.

## Reference and dependency checks

Every relative link in each `SKILL.md` resolves to an existing file within the same skill. Static checks also found:

- zero `SKILL.md` files under `templates/`;
- zero installed-skill references to `templates/`;
- zero installed-skill references to the original DSH source path;
- zero stale DSH persona headings or DSH privilege/plugin instructions in installed skills.

The three skills are therefore self-contained and do not require another skill, the internal template, or the source preset at runtime.

## Trigger tests

### `physics-research-explore`

- Direct: “Use the exploration skill to map the literature and derive the minimal model.” → trigger.
- Indirect: “I have a vague idea about measurement-induced transitions; help turn it into a falsifiable research question.” → trigger.
- Incomplete: “Explain this paper to me.” → trigger, then establish source and assumed background if missing.
- Non-triggering: “Run this existing finite-size-scaling script and plot error bars.” → numerics, not explore.
- Edge: “Reproduce Eq. 12 analytically, then do a large parameter sweep.” → exploration covers reproduction; numerical production should route to numerics or require explicit expanded scope.

### `physics-research-numerics`

- Direct: “Use the numerics skill to run a convergence study and update Results.md.” → trigger.
- Indirect: “Are these spectra stable with timestep and cutoff, and can another person rerun them?” → trigger.
- Incomplete: “Plot my simulation.” → trigger only when the task includes data analysis or reproducible result production; inspect inputs and intended claim.
- Non-triggering: “Survey papers about tensor-network truncation.” → explore, not numerics.
- Edge: “Check one algebraic limit numerically while deriving it.” → may remain exploration unless durable numerical artifacts are requested.

### `physics-paper-writing`

- Direct: “Use the writing skill to edit my PRL manuscript and do a referee pass.” → trigger.
- Indirect: “Make every numerical claim in this draft traceable and standardize the terminology.” → trigger.
- Incomplete: “Improve this section.” → trigger when it is manuscript prose; determine whether drafting, restructuring, or line editing is wanted.
- Non-triggering: “Teach me the Keldysh formalism.” → explore, not writing.
- Edge: “Write a lab note summarizing a derivation.” → normally explore/general document work, unless it is explicitly manuscript content.

## Boundary review

Manual inspection found no conflicting phase boundaries:

- exploration owns understanding, verified literature/derivations, and research-question formation;
- numerics owns durable calculations, validation, data/figures, and result indexing;
- writing owns manuscript prose, venue requirements, terminology/style control, claim traceability, and referee review.

The epistemic-status taxonomy, disagreement rule, traceability rule, and early-objection rule appear in more than one skill intentionally because each installed skill must remain self-contained. Phase-specific procedures are not duplicated. Fixed environment facts and DSH-specific approval or plugin semantics were removed or replaced with runtime checks.

The trigger cases above were reviewed against each frontmatter description and body. They discriminate adjacent tasks while allowing mixed requests to be split by deliverable or explicitly expanded by the user.

## Git limitation during validation

The user initialized a repository after the first sandboxed `git init` attempt was blocked. The current session recognizes the repository, but `.git/` remains mounted read-only: creating the migration branch fails at `.git/HEAD.lock`. Consequently, validation covers the worktree contents but no branch or commit could be created from this session.
