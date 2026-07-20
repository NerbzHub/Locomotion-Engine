# Project Status

**Status:** Gate 1 extended through LE-S28 and verified, pending owner licence selection for public release

**Updated:** 2026-07-20

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
- Two selectable, validated authored maps with independent paths, build spaces,
  palettes, and deterministic enemy path ownership.
- A disabled-by-default developer overlay for seed, step, map, entity counts,
  phase, and a bounded deterministic event history.
- Versioned local save/load at intermission only, with map/seed/RNG/tower state
  restoration and malformed-save safeguards.
- Keyboard board cursor/placement controls, visible focus styles, and a
  user-selectable reduced-motion mode for combat effects.
- Deterministic completed-wave telemetry with resource, lives, tower, kill,
  escape, duration, seed, and map evidence in the developer overlay.
- Authored Casual, Standard, and Veteran difficulty modes with transparent
  starting resources/lives and deterministic enemy-health scaling.
- Per-tower targeting policies for nearest exit, closest, strongest, and
  weakest targets, with saved state and deterministic tie-breaking.
- A data-defined Sentinel support tower with upgrades, visible slowing, and
  deterministic slow-expiry behaviour.
- Costed, irreversible final specialisation branches for each tower, persisted
  per instance and shown through the tower inspector.
- Authored elite wave entries with stronger health, doubled rewards, and clear
  on-board presentation for high-priority targets.
- A final-wave Gate Warden boss with authored health/reward values, phase-based
  speed escalation, event feedback, and distinct presentation.
- A compact authored campaign flow that maps named scenarios to map/difficulty
  choices and supports deterministic revisits.
- Versioned local campaign progression that unlocks subsequent scenarios after
  completion, with a clear reset action and validation safeguards.
- A documented economy guide plus content-derived wave income summaries and
  regression tests for standard-mode reward pacing.
- Optional local Web Audio cues for placement and wave start, with persisted
  mute/volume controls and a safe no-audio path.
- A visual polish pass with clearer tower progression, enemy statuses, combat
  effects, health-state colours, and higher-contrast board/HUD presentation.
- A local first-run tutorial, reusable Help panel, and glossary covering build,
  targeting, enemies, elites, boss phases, and intermissions.
- Versioned replay JSON export/import for deterministic setup and player actions,
  including validation and replay-equivalence coverage.
- A seeded simulation fuzz suite covering 12,000 generated frames with
  reproducible seed/frame invariant failure reporting.
- A documented simulation performance budget and crowded-board stress test for
  80 enemies, 12 towers, and 600 fixed frames.
- Responsive narrow-screen layout, safe-area handling, touch-safe control
  sizing, and preserved pointer/keyboard board interaction.
- A GitHub Actions workflow that installs with the lockfile, type-checks, runs
  deterministic tests, and creates a production build on pushes and pull requests.
- Release checklist, changelog, release-notes template, and third-party notice
  structure for repeatable packaging.
- Deterministic simulation tests ready to run through Vitest.

## What does not exist yet

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

Begin LE-S29 from `docs/NEXT_TEN_SPRINTS.md`: prepare an external-playtest
release candidate and collect structured feedback.

Select the licence before publishing or distributing the project. The release
workflow is ready, but a public release must not proceed until that owner
decision is reflected in a root `LICENSE` file.
