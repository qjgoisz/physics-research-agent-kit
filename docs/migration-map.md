# DSH research preset migration map

## Outcome

The monolithic DSH preset family is rewritten as three self-contained Codex skills plus one non-discoverable internal design template. The template contains no `SKILL.md` and is not referenced at runtime by installed skills.

Status meanings: **retained** preserves the scientific rule; **condensed** keeps the decision-changing substance; **moved** places conditional detail in a reference or reusable output in an asset; **runtime check** replaces a dated environment assertion; **dropped** removes DSH-specific or redundant machinery.

## Shared persona and README

| DSH section | Disposition | Codex destination and rationale |
|---|---|---|
| Four-preset bundle, registry, generator, install/uninstall, restart, config tree | dropped | DSH packaging is unrelated to Codex skill discovery. |
| One large shared persona with injected phase section | replaced | Three focused skills have distinct triggers and completion criteria; common invariants are repeated only where self-containment requires them. |
| Always reply in Simplified Chinese and preserve literals | dropped | A stable user preference may be placed in a project `AGENTS.md`; it is not universal scientific guidance. |
| Hard-coded privilege, sandbox, approval, and handoff rules | dropped | Codex runtime and repository instructions govern permissions; copying DSH semantics would conflict or become stale. |
| Standing duty to object, propose, and plan | condensed | Every skill requires early, evidence-based consequential objections and forbids silent scope expansion. Generic planning reminders were omitted. |
| Four project documents | materially changed | `Readme.md` → conventional `README.md`; agent handoff `Agents.md` → `RESEARCH-STATE.md`; stable Codex instructions stay in `AGENTS.md`; `Results.md` and `Writing-Guide.md` remain. Legacy names are read when present. |
| Claim-status taxonomy | retained | Present in every skill and research-state assets: established, verified numerically, plausible, conjecture, unknown. |
| Git branch/push discipline | moved | Stable repository guidance appears in `templates/.../AGENTS.template.md`; installed skills defer to project/runtime rules rather than imposing a personal workflow globally. |
| Fixed Python/conda inventory and paths | runtime check | Numerics tells Codex to inspect interpreters, packages, formats, and hardware when relevant. |
| Numerical habits: seeds, raw arrays, uncertainty, known limits | retained and generalized | `physics-research-numerics` and its validation reference; fixed `.npz`/Numba assumptions were removed. |
| Wolfram MCP availability/version and unsandboxed behavior | runtime check / dropped | Exploration recommends symbolic checks but verifies available tools at runtime; DSH-specific MCP and sandbox assertions are absent. |
| TeX Live paths, versions, package inventory, install commands | runtime check / dropped | Writing uses the project's build system and verifies tools/templates. Installation and permission rules stay with Codex/runtime policy. |
| Arch-Wiki command handoff format | dropped | Generic interaction formatting does not improve the scientific workflow and may conflict with the host runtime. |
| Measured sandbox, GPU, host hardware, workspace paths | runtime check | No dated machine facts are embedded. |
| Pre-flight safety checklist | dropped | Already enforced by higher-priority Codex policies; scientific pre-flight checks live in the relevant skills. |
| DSH `dsh-defend` policy section and counters | dropped | Plugin-specific behavior, refusal semantics, and bypass warnings do not describe Codex. |
| MATLAB capability fragment | runtime check / condensed | Cross-tool risks such as array order and index conventions may be handled case-by-case; installation paths, license assumptions, and fixed package claims are omitted. |

## Exploration phase

| DSH section | Disposition | Destination |
|---|---|---|
| Ask the user's knowledge level before explaining | retained with less friction | Explore `SKILL.md`; skip asking when already clear and revisit only on a major mismatch. |
| Literature honesty and verified citations | retained and moved | Explore `SKILL.md` plus `references/evidence-and-derivation.md`. |
| Dependency-ordered explanation and understanding check | condensed | Evidence/derivation reference. |
| Derivation verification and provenance labels | retained and generalized | Evidence/derivation reference; no fixed Wolfram dependency. |
| Reproduction with source equation/conventions; preserve disagreement | retained | Evidence/derivation reference. |
| Idea novelty, falsification, minimal test, risk, ranking | retained | Explore `SKILL.md`. |
| Produce `Readme.md` and `Agents.md` | materially changed and moved | Explore assets produce `README.md` and `RESEARCH-STATE.md`. |
| Automatically hand off to numerics | condensed | Completion criterion states readiness; no runtime phase-switch mechanism is assumed. |

## Numerics phase

| DSH section | Disposition | Destination |
|---|---|---|
| Read project intent before code | retained | Numerics pre-flight reads current and legacy project documents. |
| Referee-style audit before computation | retained and condensed | Blocking / should-fix / cosmetic audit in numerics `SKILL.md`. |
| Check `Results.md` before recomputation | retained | Numerics pre-flight. |
| Result index fields, relative links, physical-question organization | retained and moved | Numerics `SKILL.md` and `assets/Results.template.md`. |
| Exclude debug and meaningless intermediates | retained | Numerics reference. |
| Verify result links | retained | Numerics `SKILL.md`. |
| Exact command, parameters, seeds, environment | retained | Numerics skill/reference/template. |
| Fixed `.npz`/`.npy`, matplotlib, numba, background facility | generalized / runtime check | Format and execution choices follow project/runtime availability. |
| Validation, convergence, error bars, disagreement handling | retained and expanded | `references/reproducibility-and-validation.md`. |
| Update handoff and propose writing phase | materially changed | Update `RESEARCH-STATE.md`; readiness is reported without assuming a preset switch. |

## Writing phase

| DSH section | Disposition | Destination |
|---|---|---|
| Read project state/results before drafting | retained | Writing `SKILL.md`, including legacy document compatibility. |
| Ask target venue, article type, and editing role | retained | Writing `SKILL.md`. |
| Venue-agnostic preset; official current source with URL/date | retained and moved | Writing guide asset and venue/claim reference. |
| Third-party venue-pack configuration instructions | dropped | No DSH config mutation; current official sources remain authoritative. |
| Volatile submission facts marked for recheck | retained | Venue reference and writing guide asset. |
| Terminology ledger: internal, define-first-use, canonical | retained and moved | Writing guide asset and terminology/style reference. |
| Mechanical jargon inventory shown to user | retained | Terminology/style reference. |
| Style ledger and consistency pass | retained and moved | Writing guide asset and terminology/style reference. |
| Quantitative-claim traceability | retained | Writing `SKILL.md` and venue/claim reference. |
| Citation existence and claim-support verification | retained | Writing skill/reference. |
| No source sentence copying; AI disclosure | retained | Venue/claim reference. |
| Abstract, caption, notation, compile, units checks | retained and condensed | Writing `SKILL.md` and terminology/style reference. |
| Skeptical referee pass with visible objections | retained and moved | `references/terminology-style-review.md`. |
| Update `Agents.md` | materially changed | Update `RESEARCH-STATE.md`. |

## Internal general-preset replacement

The former general `research` preset is not installable. Its useful design principles live under `templates/theoretical-physics-research/`: skill scoping, scientific invariants, runtime-check discipline, and templates for the five-document convention. It deliberately has no entrypoint and no dependency from the three skills.

## Intentionally omitted source material

- DSH/Cordis bundle YAML, plugin rows, generators, installation and registry mechanics.
- `dsh-defend` refusals, counters, and approval semantics.
- Fixed host paths, package lists, versions, hardware, workspace inventory, and dated measurements.
- Claims that Wolfram, MATLAB, GPU, network, mounts, or a particular sandbox exists.
- Permission and safety instructions already supplied by Codex.
- Personal identity and repository examples that do not belong in reusable skills.
