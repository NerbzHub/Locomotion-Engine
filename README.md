# Locomotion Engine

Locomotion Engine is a browser-first, deterministic 2D game-engine project.
Its first proving ground is a whimsical procedural pixel-art tower-defence game.

The project is intentionally at the **pre-build foundation** stage. The existing
Dungeon Defense HTML files are playable design prototypes; they are not yet the
engine implementation.

## Start here

- [Project collaboration rules](LOCOMOTION.md)
- [Recommended implementation strategy](docs/IMPLEMENTATION_STRATEGY.md)
- [Project status and delivery gates](docs/PROJECT_STATUS.md)
- [Next ten planned sprints](docs/NEXT_TEN_SPRINTS.md)
- [Canonical architecture books](Books/)

## Repository layout

```text
apps/game/          First game: Dungeon Defense
packages/engine/    Reusable engine runtime, extracted from proven needs
packages/content/   Game definitions, balancing data, palettes, and maps
tests/              Automated unit, integration, and browser tests
tools/builder/      Future Locomotion Builder developer tool
examples/prototype/ Future home for preserved executable prototypes
docs/               Living engineering documentation
Books/              Canonical vision, architecture, standards, and schedule
Working/            Existing prototype working files (preserved for reference)
Final Products/     Existing playable prototype releases (preserved for reference)
```

The empty implementation directories deliberately establish ownership boundaries
without pre-committing to classes, frameworks, or systems that have not yet been
validated by the first game.

## Current implementation direction

The recommended first runtime target is TypeScript in the browser, using Canvas
2D. The first implementation goal is a small, deterministic, playable vertical
slice—not a generic engine feature set. See the implementation strategy for the
rationale, boundaries, and acceptance criteria.

## Running the first slice

Install Node.js 22 or later, then run:

```sh
corepack enable
pnpm install
pnpm run dev
```

Use `pnpm run check` to type-check and run the deterministic simulation tests,
and `pnpm run build` to create a production build.

## Status

The first engine and game source exists: a fixed-step browser runtime, seeded
simulation, and playable tower-defence vertical slice. See
[PROJECT_STATUS.md](docs/PROJECT_STATUS.md) for its precise verification state
and the next delivery gate.

## Licensing

No licence has been selected yet. Do not assume permission to reuse or
redistribute the project until a licence is added by the project owner.
