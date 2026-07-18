# Project Status

**Status:** Gate 1 extended through LE-S06 and verified

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
- A complete first slice: place archer towers, survive three seeded slime waves,
  and observe projectiles, damage, gold, lives, victory, loss, and restart.
- Game-owned tower definitions for an Archer and Mage, proving that authored
  content can configure runtime instances without leaking game rules into the engine.
- Game-owned enemy definitions for Slimes, Beetles, and Wisps, plus authored
  wave composition that introduces them progressively.
- Startup content validation with contextual diagnostics for authored tower,
  enemy, and wave definitions.
- Placement previews that distinguish buildable, blocked, occupied, and
  unaffordable tiles without changing simulation state while hovering.
- An explicit nearest-to-exit targeting policy with target rings, projectile
  trails, impact flashes, and defeat effects owned by the game simulation.
- Data-defined two-tier upgrades for Archer and Mage towers, including tower
  inspection and per-instance runtime statistics.
- Data-defined enemy traits: Beetle armour reduces every hit, while Wisps use
  a deterministic periodic speed burst with clear combat-board cues.
- Explicit intermissions with next-wave composition/reward briefings and clear
  wave-completion reward summaries.
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
| Implementation sequence | `docs/IMPLEMENTATION_STRATEGY.md` and `docs/NEXT_TEN_SPRINTS.md` |
| Existing game behaviour reference | `Final Products/v1 20 Rounds/` |

## Verification evidence

The first slice was verified on 2026-07-18 with the bundled Node.js 24 runtime:

```sh
pnpm run check  # TypeScript plus deterministic simulation tests
pnpm run build  # Vite production build
```

The browser smoke test also confirmed that a tower can be placed on grass, a
wave starts, towers target slimes, kills award gold, and no browser console
errors occur.

## Next delivery gate

Begin LE-S07 from `docs/NEXT_TEN_SPRINTS.md`: decouple the board path into
validated map content and add a second deterministic map.

Select the licence before publishing or distributing the project. The browser
toolchain is now documented in `package.json` and `README.md`.
