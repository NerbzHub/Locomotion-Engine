# Locomotion Engine

Locomotion Engine is a browser-first, deterministic 2D game-engine project.
Its first proving ground is a whimsical procedural pixel-art tower-defence game.

The first implementation is now a playable, deterministic Dungeon Defense
vertical slice. The existing HTML files remain useful design references, while
the TypeScript source is the active engine and game implementation.

## Start here

- [Project collaboration rules](LOCOMOTION.md)
- [Recommended implementation strategy](docs/IMPLEMENTATION_STRATEGY.md)
- [Project status and delivery gates](docs/PROJECT_STATUS.md)
- [Game roadmap and sprint plan](docs/GAME_ROADMAP.md)
- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Playtester criteria and feedback questions](docs/PLAYTESTER_CRITERIA.md)
- [Packaging plan](docs/PACKAGING_PLAN.md)
- [Changelog](CHANGELOG.md)
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

## Packaging

The recommended tester package is a hosted static build created from `dist/`.
See [PACKAGING_PLAN.md](docs/PACKAGING_PLAN.md) for the current one-button
launch recommendation and fallback archive approach.

## Status

The first engine and game source exists: a fixed-step browser runtime, seeded
simulation, and playable tower-defence vertical slice. See
[PROJECT_STATUS.md](docs/PROJECT_STATUS.md) for its precise verification state
and the next delivery gate.

## Licensing

**All rights reserved — no licence is granted.** This repository is public for
viewing and evaluation only. You may not use, copy, modify, redistribute,
sublicense, sell, or create derivative works from its code or other material
without prior written permission from Nathan Nette.

See the [copyright and permissions notice](LICENSE.md) and
[third-party notices](NOTICE.md) before preparing a public release.
