# Project Status

**Status:** Gate 1 complete and verified

**Updated:** 2026-07-18

## What exists

- Canonical vision, constitution, conceptual architecture, engineering
  standards, implementation roadmap, and construction schedule in `Books/`.
- A playable 20-wave Dungeon Defense browser prototype in `Final Products/`.
- Earlier working versions of that prototype in `Working/`.
- A written concept for a future Python/Rich Locomotion Builder.
- A TypeScript/Vite project with a browser Canvas entry point.
- A fixed-step engine lifecycle, diagnostics, pointer input, seeded random
  service, and entity lifetime registry.
- A playable first slice: place archer towers, start a seeded slime wave, and
  observe projectiles, damage, gold, and lives.
- Deterministic simulation tests ready to run through Vitest.

## What does not exist yet

- Continuous integration.
- A selected project licence.
- A functional Locomotion Builder.

## Current source-of-truth policy

| Area | Source of truth |
| --- | --- |
| Vision and architecture | `Books/Book 00` through `Books/Book 02` |
| Engineering practice | `LOCOMOTION.md` and `Books/Engineering Standards.md` |
| Historical construction detail | `Books/Book 03 - Construction Schedule.md` |
| Implementation sequence | `docs/IMPLEMENTATION_STRATEGY.md` |
| Existing game behaviour reference | `Final Products/v1 20 Rounds/` |

## Verification evidence

The first slice was verified on 2026-07-18 with the bundled Node.js 24 runtime:

```sh
pnpm run check  # TypeScript plus 3 deterministic tests
pnpm run build  # Vite production build
```

The browser smoke test also confirmed that a tower can be placed on grass, a
wave starts, towers target slimes, kills award gold, and no browser console
errors occur.

## Next delivery gate

Begin Gate 2: keep game-specific combat in `apps/game/` while refining the
small, proven engine API in `packages/engine/`.

Select the licence before publishing or distributing the project. The browser
toolchain is now documented in `package.json` and `README.md`.
