# Next Ten Sprints

**Status:** Proposed implementation plan

**Starting point:** Dungeon Defense has a deterministic three-wave loop,
selectable Archer and Mage towers, and data-defined Slime, Beetle, and Wisp
waves. The purpose of these sprints is to turn that proof into a clear,
replayable, and maintainable small game without prematurely building a generic
engine.

## Planning rules

- Each sprint produces a playable browser result and an automated regression
  test where its logic is deterministic.
- Game rules and balance remain in `apps/game/`; only broadly proven capability
  may move to `packages/engine/`.
- Every sprint must preserve fixed-step simulation and seeded repeatability.
- A sprint may change its follow-up scope when playtesting produces evidence;
  it must not quietly expand into unrelated engine work.

The identifiers below are local planning identifiers. They do not replace the
legacy identifiers in Book 03.

## Sequence at a glance

| ID | Sprint | Outcome |
| --- | --- | --- |
| LE-S01 | Content validation | Invalid game definitions fail clearly before a game starts. |
| LE-S02 | Placement feedback | Players can see where and what they are about to build. |
| LE-S03 | Targeting and combat feedback | Attacks, targets, hits, and defeats are easy to understand. |
| LE-S04 | Tower upgrades | Towers gain a data-defined upgrade path and meaningful choices. |
| LE-S05 | Enemy traits | Enemy types differ through explicit, testable mechanics. |
| LE-S06 | Wave direction | Intermissions communicate upcoming threats and pacing. |
| LE-S07 | Map definitions | A deterministic map can be selected from authored content. |
| LE-S08 | Developer diagnostics | A toggleable overlay exposes seed, timing, and simulation state. |
| LE-S09 | Save and resume | A versioned local save restores a safe intermission state. |
| LE-S10 | Accessibility and input | The slice is keyboard-operable and respects reduced motion. |

## LE-S01 — Content validation

**Goal:** Validate tower, enemy, wave, and map definitions before they enter the
simulation.

**Deliverables:**

- validation functions with clear, contextual failure messages;
- checks for duplicate identifiers, invalid costs, invalid ranges, unknown enemy
  kinds, and empty waves;
- a startup validation report visible in diagnostics.

**Done when:** invalid content is rejected before play starts, valid content
passes deterministically, and the test suite covers both paths.

**Not in scope:** external file loading or a generic schema framework.

## LE-S02 — Placement feedback

**Goal:** Make build decisions legible before the player spends gold.

**Deliverables:**

- hover tile highlight with valid, invalid, and occupied states;
- range preview for the selected tower;
- clear selected-tower details and cost feedback;
- no simulation changes caused by hovering.

**Done when:** a player can distinguish a valid placement from an invalid one
without clicking, and clicking still produces the same deterministic result.

**Depends on:** LE-S01.

## LE-S03 — Targeting and combat feedback

**Goal:** Make combat outcomes understandable and establish an explicit
target-selection rule.

**Deliverables:**

- a named targeting policy (initially nearest-to-exit);
- target highlight, projectile trail, impact flash, and defeat feedback;
- a small transient-effects layer owned by the game;
- tests that prove the targeting policy chooses the intended enemy.

**Done when:** two enemies in range result in the documented target being fired
upon, and every projectile visibly explains its outcome.

**Depends on:** LE-S02.

## LE-S04 — Tower upgrades

**Goal:** Add one repeatable progression decision without hard-coding tower
rules in the runtime.

**Deliverables:**

- data-defined upgrade tiers for Archer and Mage;
- an inspect/select interaction for existing towers;
- upgrade cost, applied tier, and changed statistics;
- tests for cost validation and each applied upgrade.

**Done when:** upgrading one tower affects only that runtime instance, while
the authored base definition remains unchanged.

**Depends on:** LE-S01 and LE-S03.

## LE-S05 — Enemy traits

**Goal:** Give existing enemy types distinct, explicit tactical behaviour.

**Deliverables:**

- Beetle armour that reduces incoming damage;
- Wisp evasion or speed burst with an understandable visual cue;
- data-defined trait configuration and combat tests;
- revised wave balance based on actual play sessions.

**Done when:** the player has a reason to vary tower placement and upgrades in
response to a wave composition.

**Depends on:** LE-S03 and LE-S04.

## LE-S06 — Wave direction and intermissions

**Goal:** Turn the sequence of waves into a readable encounter flow.

**Deliverables:**

- a wave briefing that names incoming enemy types and rewards;
- an explicit intermission state with a start prompt;
- completion summary and reward feedback;
- deterministic timing tests for spawning and intermission transitions.

**Done when:** the player knows what the next wave contains and has a deliberate
moment to build before it begins.

**Depends on:** LE-S05.

## LE-S07 — Map definitions and deterministic selection

**Goal:** Decouple the board path from code and prove a second playable map.

**Deliverables:**

- data-defined tile dimensions, path nodes, buildable space, and visual palette;
- two hand-authored maps selected by seed or explicit choice;
- map validation and coordinate/path tests;
- preserved deterministic simulation for a chosen map and seed.

**Done when:** a map can be added as content without changing simulation or
renderer control flow.

**Depends on:** LE-S01 and LE-S06.

## LE-S08 — Developer diagnostics overlay

**Goal:** Provide enough evidence to debug balancing and deterministic runs.

**Deliverables:**

- a toggleable overlay for seed, simulation step, frame time, active entities,
  selected map, and wave state;
- a compact event history for placement, spawn, defeat, and escape;
- a disabled-by-default production mode.

**Done when:** a balancing issue can be reported with a seed and reproducible
state instead of a subjective description alone.

**Depends on:** LE-S06 and LE-S07.

## LE-S09 — Save and resume

**Goal:** Persist a safe, versioned game session without serialising the engine
itself.

**Deliverables:**

- a versioned save format for map, seed, gold, lives, tower instances, and
  completed-wave state;
- save only at intermission boundaries in this first version;
- validation, migration guardrails, and a clear load-failure message;
- local browser storage behind a small game-owned adapter.

**Done when:** refreshing after a save restores an equivalent intermission state
and an incompatible save fails safely.

**Depends on:** LE-S07 and LE-S08.

## LE-S10 — Accessibility and input completion

**Goal:** Make the vertical slice operable without relying solely on pointer
precision or motion.

**Deliverables:**

- keyboard navigation and focus states for tower selection and wave controls;
- a keyboard board cursor for placement;
- reduced-motion setting for combat effects;
- high-contrast feedback review and accessible status messages.

**Done when:** a player can choose a tower, place it, start a wave, and restart
using the keyboard, with clear visible focus and understandable feedback.

**Depends on:** LE-S02 through LE-S09.

## Replanning checkpoints

Review the plan after LE-S04, LE-S07, and LE-S10. At each checkpoint, decide
which capabilities have proven reusable enough to graduate into
`packages/engine/`. Until then, favor a compact working game over generic
systems such as ECS breadth, physics, inventory, or mod support.
