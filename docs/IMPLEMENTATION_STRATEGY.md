# Recommended Implementation Strategy

## Decision

Build the first game and its minimum reusable runtime together. Treat the
existing Construction Schedule as authoritative architectural reference, but do
not execute every chapter in sequence before producing a playable game.

The first game is the evidence source that determines which parts deserve to
become engine systems. The engine remains the product, but it should be grown
from demonstrated requirements rather than from an exhaustive speculative
framework.

## Why this is a better execution model

The current schedule is thorough and valuable, but it contains more than one
hundred chapters and intentionally records historical identifier inconsistencies.
Following it linearly would delay the project's stated immediate milestone: a
playable whimsical procedural pixel-art game.

The repository already contains a working browser/Canvas tower-defence prototype.
That makes the browser the least risky first target, and Canvas 2D the least
risky rendering foundation. Migrating the prototype in small slices provides
visible progress, validates the conceptual architecture, and creates a direct
feedback loop for the books.

This approach follows the governing principle in `LOCOMOTION.md`: build the
engine, learn from it, and document what implementation demonstrates.

## Technical direction

Use TypeScript, ES modules, a browser development server, Canvas 2D, unit tests
for simulation logic, and a browser smoke test. The specific tools should be
selected in the first implementation change, but the following boundaries are
fixed from the outset:

```text
apps/game/          Game rules and user-facing content
packages/engine/    Runtime capabilities with at least two proven consumers
packages/content/   Validated authored definitions and generation inputs
tests/              Behavioural evidence and deterministic regression tests
tools/builder/      Separate developer workflow tool; not a runtime dependency
```

Do not move a game feature into the engine solely because it may be reusable.
Extract it only when its contract is clear and it serves more than one concrete
game concern.

## Delivery sequence

### Gate 0 — Repository foundation

Complete the project layout, repository hygiene, status documentation, and
contribution guidance. Preserve the existing prototype files unchanged as a
behavioural reference. Select a licence separately; this is a project-owner
decision and is intentionally not guessed here.

**Done when:** a new contributor can identify the goal, source-of-truth
documents, directory ownership, and next implementation target in minutes.

### Gate 1 — Deterministic playable vertical slice

Implement a small game with one map path, one enemy type, one tower, one
projectile, damage, gold, and win/loss states.

Implement only the minimum runtime support:

- engine lifecycle and structured diagnostics;
- fixed-step simulation with independently scheduled rendering;
- a `World` with stable entity identifiers;
- Canvas ownership and a basic camera/coordinate transform;
- input abstraction;
- a seeded random service passed into systems that need it.

**Done when:** the slice is playable in a browser, starts without console
errors, and produces identical simulation outcomes from the same seed and input
sequence.

### Gate 2 — Prove the extraction boundary

Keep waves, towers, enemies, projectiles, combat balance, and victory rules in
the game. Extract only lifecycle, time, input, identity, events, rendering
helpers, and seeded randomness into the engine package.

**Done when:** game code depends on a small engine API without exposing game
concepts through that API.

### Gate 3 — Data-driven content

Move enemy, tower, wave, palette, and map settings into validated definitions.
Add stable identifiers and helpful validation failures. Continue to keep runtime
state separate from authored definitions.

**Done when:** a new tower or wave can be added through content data without
editing engine code, and malformed content fails clearly before play begins.

### Gate 4 — Grow the proven game

Add one coherent capability per vertical slice: additional tower behaviours,
enemy types and bosses, procedural maps, procedural pixel assets, save/load,
settings, and developer diagnostics. Add the matching engine abstraction only
after the slice demonstrates its need.

### Gate 5 — Locomotion Builder

Build the Python/Rich Builder as a separate developer tool after the engine has
completed at least two delivery gates. Its initial role is to discover the
schedule, report project state, and track work; it must not control or generate
engine code automatically.

## Non-negotiable engineering rules

- No direct `Math.random()` calls in deterministic simulation or generation.
- No game-specific type, rule, or balance value in `packages/engine/`.
- No generic subsystem without a tested use in the first game.
- Every change must leave a runnable demonstration or executable test.
- Optimisation work follows measured evidence, not anticipated scale.
- The prototype is reference material; do not copy its single-file structure
  into the new implementation.

## Relationship to Book 03

Use Book 03 to check ownership, dependency direction, and acceptance thinking.
Map its relevant chapters to the delivery gates above as required. In particular,
bootstrap, diagnostics, timing, Canvas, deterministic randomness, content
definitions, and validation should be implemented early because the first game
needs them.

Defer ECS breadth, physics, navigation, inventory, economy, quests, mod support,
replays, localisation, broad optimisation programmes, and Builder automation
until a playable game demonstrates a concrete requirement. Deferral is not
rejection; it is a commitment to implement systems with evidence.

## Revisit trigger

Revisit this strategy after Gate 2, after each major gameplay vertical slice, or
when a proven second game consumer appears. Record the evidence for any change
in `docs/` before altering canonical architecture.
