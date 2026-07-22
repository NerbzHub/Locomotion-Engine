# Performance Budget

## Current supported stress scenario

- 80 active enemies;
- 12 mixed towers;
- 600 fixed simulation frames (10 seconds of game time);
- local test budget: under 3 seconds.

This is intentionally a simulation guardrail, not a claim about a specific
device's frame rate. Browser rendering remains bounded by the authored game
entity limits and should be profiled with the developer overlay enabled.

## Profiling procedure

1. Open Diagnostics and record seed, map, difficulty, entity counts, and step.
2. Reproduce with that seed and map.
3. Compare a build before/after the change using the stress test and browser
   frame tools.
4. Keep fixed-step results identical; do not trade determinism for a shortcut.

When adding a mode that can exceed the current entity budget, update this
document and add a representative deterministic stress test first.
