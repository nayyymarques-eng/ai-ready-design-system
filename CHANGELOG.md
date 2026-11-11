# Changelog

Each version has a git tag (`v1.0.0`, `v1.1.0`). A change to how the framework works gets a new minor version, and its own eval when it can change what the AI builds.

## 1.1.0, 2026-11-11

- The decision map has three columns: Job | Use | Instead. "Instead" names the component for a nearby job, taken from the contracts' "never" lines that say what to use. The full "never" lines stay only in the contracts, so the AI no longer reads them twice. The map goes from 5.7 KB to 3.4 KB, and a screen reads about 3 KB less.
- New `check-coverage.md`, built by `build-map.py`: every "never" line and the check that catches it, for the people who keep the system. The AI doesn't read it.
- Refinement eval (`eval/map-never/`, `eval/map-instead/`): the v1.0 map against the v1.1 map, three runs each on the same feature. Same results, one check apart. See "Refinement eval" in the README.
- CI checks that both built files are up to date.

## 1.0.0, 2026-11-10

The first public version: tokens, React components, templates, contracts, rules, the decision map, the harness, triage on GitHub Issues, and the eval of components only against the framework.
