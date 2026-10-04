# Reproducibility and validation

## Minimum run record

Retain:

- exact code revision or file links;
- raw data rather than only rendered figures;
- explicit parameters, units, conventions, and random seeds;
- the exact command and working-directory assumptions;
- relevant interpreter, package, compiler, and hardware details;
- uncertainty method and convergence criteria.

Choose formats already supported by the project and runtime. Do not prescribe a fixed container such as HDF5 without checking availability.

## Validation ladder

Use the checks relevant to the model:

1. dimensional and unit consistency;
2. analytically solvable or known special cases;
3. symmetries, conservation laws, bounds, positivity, and normalization;
4. resolution, system-size, timestep, cutoff, and tolerance convergence;
5. independent formulation or implementation where risk warrants it;
6. seed-to-seed spread, estimator variance, systematic errors, or confidence intervals;
7. comparison with verified literature under matching conventions.

A final value without the checks that make it believable is preliminary.

## Diagnosing disagreement

Freeze the conflicting artifacts. Compare model definitions, sign and Fourier conventions, units, boundary and initial conditions, approximation regimes, index order, discretization, and data-processing steps. Create the smallest discriminating test. Record the outcome even if it invalidates the hoped-for claim.

## Result curation

Index durable results, not every run. Debug output, failed exploratory attempts, and meaningless intermediates remain outside `Results.md`. A later corrected result should name what it supersedes and why.
