# Contributing to Locomotion Engine

## Before changing code

1. Read [LOCOMOTION.md](LOCOMOTION.md), the relevant canonical book, and the
   current [implementation strategy](docs/IMPLEMENTATION_STRATEGY.md).
2. Keep game-specific rules in `apps/game/` unless a second concrete consumer
   proves they belong in `packages/engine/`.
3. Keep each change small, runnable, and independently reviewable.

## Required checks

Every implementation change should:

- run without console errors;
- have automated coverage for deterministic logic where practical;
- preserve deterministic results for a fixed seed;
- update a living document when it changes an agreed architectural boundary.

## Documentation roles

- `Books/` holds canonical architectural material and the historical construction
  schedule. Do not rewrite it incidentally while implementing a feature.
- `docs/` holds implementation decisions, status, and evidence learned while
  building.
- When working software invalidates a canonical assumption, record the evidence
  in `docs/` and propose the canonical change explicitly.
