# Changelog

All notable project changes are recorded here. Version numbers follow
[Semantic Versioning](https://semver.org/): breaking changes increment the
major version, backwards-compatible features increment the minor version, and
compatible fixes increment the patch version.

## Unreleased

- Added post-release defect-triage policy, patch-release traceability, and UI
  regression guards for the accepted FI4/FI5 feedback fixes.

## 0.1.0 - 2026-07-23

- First deterministic Dungeon Defense vertical slice and its supporting browser
  engine foundations.
- Authored campaign, progression, accessibility, audio, replay, performance,
  and responsive touch support.
- Deterministic simulation verification, fuzz coverage, and a CI workflow.
- Simplified mission setup to level → difficulty → begin, removing duplicate
  custom-map controls and campaign context after focused playtest feedback.
- Reduced gameplay UI duplication while retaining board range visuals and
  screen-reader live status feedback.
