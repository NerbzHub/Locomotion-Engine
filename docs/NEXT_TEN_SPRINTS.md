# Next Fifty Sprints

**Status:** Proposed implementation plan

**Starting point:** LE-S01 through LE-S05 are complete: Dungeon Defense has a
deterministic three-wave loop, selectable and upgradeable Archer/Mage towers,
and distinct data-defined Slime, Beetle, and Wisp behaviour. The 50 upcoming
sprints below run from LE-S06 through LE-S55. Their purpose is to turn that
proof into a clear, replayable, and maintainable small game without prematurely
building a generic engine.

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
| LE-S11 | Balance telemetry | Playtest outcomes become structured balancing evidence. |
| LE-S12 | Difficulty modes | A small set of authored challenge levels changes rules transparently. |
| LE-S13 | Tower targeting controls | Players can choose a tower's targeting priority. |
| LE-S14 | Third tower | A support-oriented tower creates a new strategic role. |
| LE-S15 | Tower specialisation | Upgrade branches create distinct build paths. |
| LE-S16 | Elite enemies | Occasional stronger enemies test focus fire and positioning. |
| LE-S17 | Boss encounter | A readable capstone encounter completes a run. |
| LE-S18 | Campaign structure | Multiple maps form a short, replayable campaign. |
| LE-S19 | Progression unlocks | Campaign achievements unlock content without destabilising a run. |
| LE-S20 | Economy pass | Costs, rewards, and pacing are balanced from recorded evidence. |
| LE-S21 | Audio settings and cues | Optional audio reinforces important game events. |
| LE-S22 | Visual polish pass | The board, effects, and UI reach a coherent final presentation. |
| LE-S23 | Tutorial and glossary | First-time players learn the loop and mechanics in context. |
| LE-S24 | Replay import/export | A deterministic run can be shared and verified. |
| LE-S25 | Simulation fuzzing | Generated inputs protect core simulation invariants. |
| LE-S26 | Performance budget | The game stays responsive under an explicit entity budget. |
| LE-S27 | Responsive layout | The game remains usable on narrow and touch-first screens. |
| LE-S28 | Release packaging | Builds, versioning, credits, and licence are release-ready. |
| LE-S29 | Playtest release candidate | External feedback is collected against a stable candidate. |
| LE-S30 | Gate 1 release | The polished vertical slice is shipped with reproducible evidence. |
| LE-S31 | Post-release stabilisation | Release feedback is triaged and high-confidence defects are resolved. |
| LE-S32 | Usability study | Observed player behaviour directs the next feature choices. |
| LE-S33 | Content authoring workflow | New maps and encounters are quicker and safer to author. |
| LE-S34 | Challenge mutators | Optional run modifiers create replay variety. |
| LE-S35 | Endless defense | A bounded post-campaign mode tests long-run strategy. |
| LE-S36 | Challenge milestones | Optional goals reward mastery without mandatory grind. |
| LE-S37 | Splitter enemy family | New enemies alter combat space when defeated. |
| LE-S38 | Area-control tower | A fourth tower counters crowds with a distinct trade-off. |
| LE-S39 | Map hazards | Authored terrain rules make maps tactically different. |
| LE-S40 | Map pack one | A curated set of additional maps expands the campaign. |
| LE-S41 | Campaign chapter two | The game gains a second authored campaign arc. |
| LE-S42 | Custom challenge setup | Players can create reproducible local challenge rules. |
| LE-S43 | Replay gallery | Local replay browsing makes past and shared runs easier to revisit. |
| LE-S44 | Localisation foundation | Player-facing copy is ready for translation without changing game rules. |
| LE-S45 | Accessibility second pass | External accessibility feedback improves the complete feature set. |
| LE-S46 | Mobile completion | Touch play reaches release quality on supported devices. |
| LE-S47 | Content pack import | Validated authored content packs can extend the game safely. |
| LE-S48 | Proven engine extraction | Only validated reusable primitives move into the engine package. |
| LE-S49 | Quality automation | CI gates protect deterministic, visual, and packaging quality. |
| LE-S50 | Privacy and resilience | Local data, imports, and failures have clear, safe boundaries. |
| LE-S51 | Community playtest kit | Testers can report reproducible feedback with minimal friction. |
| LE-S52 | Live-balance workflow | Content adjustments are traceable, comparable, and reversible. |
| LE-S53 | Save migration hardening | Long-lived profiles and replays migrate safely across releases. |
| LE-S54 | Gate 2 release candidate | The expanded game is frozen for focused validation. |
| LE-S55 | Gate 2 release | The post-release expansion ships with maintainable foundations. |

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

## LE-S11 — Balance telemetry

**Goal:** Turn play sessions into compact evidence for balance decisions.

**Deliverables:** per-wave summaries for towers placed/upgraded, gold earned and
spent, leaks, completion time, and seed; an exportable developer report; tests
for deterministic summaries.

**Done when:** a tuning decision can cite a repeatable run rather than a
subjective impression.

**Depends on:** LE-S08 and LE-S10.

## LE-S12 — Difficulty modes

**Goal:** Offer a small authored choice of challenge without hidden rules.

**Deliverables:** Casual, Standard, and Veteran definitions controlling lives,
starting gold, and wave modifiers; an upfront selection UI; validation and
deterministic mode tests.

**Done when:** a selected mode is visible throughout a run and produces the
same result for the same inputs and seed.

**Depends on:** LE-S06 and LE-S11.

## LE-S13 — Tower targeting controls

**Goal:** Let players make intentional focus-fire decisions.

**Deliverables:** per-tower choices for nearest-to-exit, closest, strongest,
and weakest; an inspector control and visible policy label; deterministic
tie-breaker tests.

**Done when:** changing policy selects the documented enemy without changing
unrelated towers.

**Depends on:** LE-S04 and LE-S10.

## LE-S14 — Third tower

**Goal:** Add one clearly different tactical role.

**Deliverables:** a data-defined Sentinel tower that slows enemies; placement,
upgrade, renderer, and inspector integration; stack/expiry combat tests.

**Done when:** a player has a strategic reason to combine Sentinel support with
damage towers.

**Depends on:** LE-S05 and LE-S13.

## LE-S15 — Tower specialisation

**Goal:** Make later upgrades create real build paths rather than only larger
numbers.

**Deliverables:** a mutually exclusive final upgrade branch per tower; clear
UI for irreversible choices; content validation and isolated-instance tests.

**Done when:** two towers of the same type can serve visibly different roles in
one run.

**Depends on:** LE-S04 and LE-S14.

## LE-S16 — Elite enemies

**Goal:** Introduce occasional high-priority threats that test targeting and
positioning.

**Deliverables:** data-defined elite modifiers for health, reward, and a
single named trait; spawn composition support; distinct rendering and tests.

**Done when:** an elite is legible before it reaches the exit and can be
countered through deliberate tower choices.

**Depends on:** LE-S13 through LE-S15.

## LE-S17 — Boss encounter

**Goal:** Finish a run with a readable, authored capstone battle.

**Deliverables:** one boss definition with phased health thresholds and
telegraphed actions; a boss wave; a defeat/victory presentation; phase tests.

**Done when:** a boss can be completed, lost to, and replayed deterministically
with understandable state changes.

**Depends on:** LE-S06, LE-S15, and LE-S16.

## LE-S18 — Campaign structure

**Goal:** Turn individual maps into a short sequence of meaningful choices.

**Deliverables:** authored campaign nodes, map/difficulty selection, completion
state, and a campaign overview; validation for node references; flow tests.

**Done when:** a player can start, complete, and revisit a compact campaign
without losing deterministic single-map runs.

**Depends on:** LE-S07, LE-S12, and LE-S17.

## LE-S19 — Progression unlocks

**Goal:** Reward campaign completion without making an active defense run
unreliable.

**Deliverables:** versioned profile unlock state for maps/towers/upgrades,
clear locked-state UI, reset option, and migration/validation tests.

**Done when:** unlocks persist safely and only alter explicitly authored
pre-run choices.

**Depends on:** LE-S09 and LE-S18.

## LE-S20 — Economy and pacing pass

**Goal:** Tune rewards, costs, and encounter timing from actual telemetry.

**Deliverables:** a documented balance sheet, revised content values, target
economy bands per wave, and regression scenarios for viable build choices.

**Done when:** Standard difficulty supports more than one viable opening and
neither gold starvation nor runaway surplus dominates a normal run.

**Depends on:** LE-S11, LE-S14 through LE-S19.

## LE-S21 — Audio settings and cues

**Goal:** Reinforce important events with optional, accessible sound.

**Deliverables:** local game-owned audio adapter, sounds for placement, hit,
escape, wave, boss, and victory; mute/volume controls; graceful no-audio path.

**Done when:** audio never blocks play and every important cue remains clear
when sound is disabled.

**Depends on:** LE-S10 and LE-S17.

## LE-S22 — Visual polish pass

**Goal:** Give the final feature set a coherent, readable visual language.

**Deliverables:** unified palettes and iconography, improved unit silhouettes,
animation timing review, contrast audit, and reduced-motion verification.

**Done when:** units, targets, status effects, and controls are distinguishable
at normal play size without relying on colour alone.

**Depends on:** LE-S10, LE-S14 through LE-S17, and LE-S21.

## LE-S23 — Tutorial and glossary

**Goal:** Teach the game inside the game rather than through external docs.

**Deliverables:** dismissible first-run prompts, contextual mechanic callouts,
a concise glossary, and tests for progress/dismissal state.

**Done when:** a new player can complete the first map and explain the three
core enemy/tower interactions without outside guidance.

**Depends on:** LE-S18, LE-S20, and LE-S22.

## LE-S24 — Replay import and export

**Goal:** Make deterministic runs shareable and independently verifiable.

**Deliverables:** a versioned replay format containing content version, map,
difficulty, seed, and player inputs; import/export UI; mismatch handling and
replay-equivalence tests.

**Done when:** exporting then importing a run reproduces its final snapshot or
reports a precise compatibility failure.

**Depends on:** LE-S08, LE-S12, and LE-S18.

## LE-S25 — Simulation fuzzing

**Goal:** Find edge-case state bugs before players do.

**Deliverables:** seeded generated action sequences, invariants for entity
lifetime, non-negative economy/lives, and serialisation safety; a reproducible
failure seed report.

**Done when:** thousands of generated runs complete in CI without invariant
violations, and a failing seed is easy to replay locally.

**Depends on:** LE-S24.

## LE-S26 — Performance budget

**Goal:** Keep the game consistently responsive on its supported hardware.

**Deliverables:** explicit entity/frame-time budgets, a stress scenario, cheap
rendering updates where needed, and a documented profiling procedure.

**Done when:** the stress scenario meets the budget without changing simulation
results.

**Depends on:** LE-S17, LE-S22, and LE-S25.

## LE-S27 — Responsive and touch layout

**Goal:** Make the finished slice comfortable on narrow and touch-first screens.

**Deliverables:** responsive HUD/palette layouts, touch-safe hit targets,
canvas scaling checks, orientation guidance, and manual device-size evidence.

**Done when:** the full build/start/upgrade loop is usable at the agreed
minimum viewport without horizontal scrolling.

**Depends on:** LE-S10 and LE-S22.

## LE-S28 — Release packaging

**Goal:** Produce a repeatable, legally clear release artifact.

**Deliverables:** chosen licence, credits and third-party notices, semantic
versioning, release notes template, clean production build, and CI checks.

**Done when:** a fresh checkout can run the documented checks and produce a
named release build without manual repair.

**Depends on:** LE-S25 through LE-S27.

## LE-S29 — Playtest release candidate

**Goal:** Collect focused external feedback against a stable, observable build.

**Deliverables:** a release-candidate build, a structured feedback form,
playtest scenarios, issue triage rules, and a no-new-feature policy.

**Done when:** feedback is categorised by severity and every accepted change is
linked to evidence from the candidate.

**Depends on:** LE-S23, LE-S26 through LE-S28.

## LE-S30 — Gate 1 release

**Goal:** Ship the polished Dungeon Defense vertical slice with reproducible
evidence of quality.

**Deliverables:** final bug fixes only, a tagged release, verified release
notes, final test/build evidence, and a retrospective that records what may
graduate into the reusable engine.

**Done when:** the release artifact, source revision, verification commands,
and known limitations are all documented and independently repeatable.

**Depends on:** LE-S29.

## LE-S31 — Post-release stabilisation

**Goal:** Resolve confirmed release defects without diluting the product
direction.

**Deliverables:** a severity-based issue triage policy, a fixed maintenance
window, regression tests for accepted fixes, and a patch release note format.

**Done when:** high-severity reports have an owner, reproduction evidence, and
either a verified fix or documented decision.

**Depends on:** LE-S30.

## LE-S32 — Usability study

**Goal:** Choose post-release work from observed player behaviour.

**Deliverables:** consentful playtest scripts, observation notes for first-run,
build, upgrade, and loss moments, a findings summary, and prioritised changes.

**Done when:** the next feature tranche is justified by repeated player evidence
rather than assumed needs.

**Depends on:** LE-S31.

## LE-S33 — Content authoring workflow

**Goal:** Make maps, encounters, and campaign nodes safer to create.

**Deliverables:** authoring templates, content validation commands, example
content, concise contributor guidance, and failure messages aimed at authors.

**Done when:** a new authored map and wave set can be added, validated, and
previewed without touching simulation control flow.

**Depends on:** LE-S07, LE-S18, and LE-S32.

## LE-S34 — Challenge mutators

**Goal:** Add opt-in replay variety with rules that stay legible.

**Deliverables:** a small data-defined mutator set, pre-run selection,
compatibility rules, in-run badges, and deterministic interaction tests.

**Done when:** a selected mutator is visible, replayable, and does not silently
alter a standard campaign run.

**Depends on:** LE-S12, LE-S24, and LE-S33.

## LE-S35 — Endless defense

**Goal:** Provide a bounded post-campaign test of long-run strategy.

**Deliverables:** an authored endless pacing curve, a clear survival score,
periodic checkpoints, safe stop/restart behaviour, and stress tests.

**Done when:** a player can end an endless run with a reproducible summary and
the mode remains within the performance budget.

**Depends on:** LE-S20, LE-S26, and LE-S34.

## LE-S36 — Challenge milestones

**Goal:** Reward mastery through optional, understandable goals.

**Deliverables:** data-defined milestone conditions, non-essential rewards,
progress display, reset behaviour, and deterministic condition tests.

**Done when:** milestones encourage varied play without blocking campaign
completion or creating mandatory grind.

**Depends on:** LE-S19, LE-S34, and LE-S35.

## LE-S37 — Splitter enemy family

**Goal:** Add a new enemy family that changes the combat board when defeated.

**Deliverables:** an authored Splitter that creates smaller units on defeat,
clear visuals, spawn limits, balance scenarios, and lifecycle tests.

**Done when:** the split event is readable and cannot create uncontrolled
entities or break deterministic replay.

**Depends on:** LE-S16, LE-S25, and LE-S33.

## LE-S38 — Area-control tower

**Goal:** Add a fourth tower with a deliberate crowd-control trade-off.

**Deliverables:** a data-defined Bombard tower, an area-impact rule, upgrades,
target feedback, and tests for radius/overlap behaviour.

**Done when:** Bombard is strong against grouped Splitters but has a clearly
understood weakness against isolated priority threats.

**Depends on:** LE-S15, LE-S37, and LE-S33.

## LE-S39 — Map hazards

**Goal:** Give maps tactical identity through authored terrain interactions.

**Deliverables:** one beneficial and one hazardous path zone, visual language,
map validation, deterministic movement/combat integration, and tests.

**Done when:** a map can use a hazard without adding map-specific conditional
logic to the shared simulation flow.

**Depends on:** LE-S07, LE-S33, and LE-S37.

## LE-S40 — Map pack one

**Goal:** Expand the game with a small curated set of tactically different maps.

**Deliverables:** three validated maps using different path geometry/hazards,
campaign placement, playtest balance notes, and map regression snapshots.

**Done when:** each map changes useful placement decisions while meeting the
same accessibility and performance standards.

**Depends on:** LE-S39.

## LE-S41 — Campaign chapter two

**Goal:** Turn the new map pack and enemies into a coherent second arc.

**Deliverables:** authored chapter progression, encounter goals, a new boss or
boss variation, chapter briefing/completion copy, and flow tests.

**Done when:** chapter two introduces its mechanics progressively and ends with
a reproducible, satisfying capstone encounter.

**Depends on:** LE-S17, LE-S37 through LE-S40.

## LE-S42 — Custom challenge setup

**Goal:** Let players create local, reproducible variations without unsafe
arbitrary scripting.

**Deliverables:** a constrained challenge configuration UI, validation,
shareable configuration codes, reset defaults, and compatibility tests.

**Done when:** a challenge can be created, described, replayed, and rejected
cleanly when its rules are invalid or unavailable.

**Depends on:** LE-S24, LE-S34, and LE-S41.

## LE-S43 — Replay gallery

**Goal:** Make saved and imported runs easier to revisit locally.

**Deliverables:** searchable local replay metadata, run summaries, replay
launch/delete controls, storage limits, and migration-safe index tests.

**Done when:** a player can find a prior replay by map, outcome, or date without
the gallery becoming a source of unbounded local storage.

**Depends on:** LE-S24, LE-S35, and LE-S42.

## LE-S44 — Localisation foundation

**Goal:** Prepare player-facing text for translation while retaining clear
authoring ownership.

**Deliverables:** message keys, a default locale catalogue, interpolation and
plural rules, missing-key diagnostics, and locale-independent logic tests.

**Done when:** changing the active locale changes presentation copy only and
does not change a deterministic simulation snapshot.

**Depends on:** LE-S23 and LE-S41.

## LE-S45 — Accessibility second pass

**Goal:** Improve the complete game using external accessibility feedback.

**Deliverables:** assisted playtesting, remappable controls where warranted,
screen-reader review, motion/audio alternatives, and tracked remediation work.

**Done when:** the supported play loop remains operable with the agreed input,
contrast, motion, and audio accommodations across all maps.

**Depends on:** LE-S21, LE-S27, LE-S41, and LE-S44.

## LE-S46 — Mobile completion

**Goal:** Bring the touch experience to the same standard as desktop play.

**Deliverables:** tested touch gestures, safe-area handling, portrait/landscape
layouts, device performance checks, and clear support boundaries.

**Done when:** campaign, upgrades, challenges, and replays work on the agreed
mobile device matrix without hidden desktop-only dependencies.

**Depends on:** LE-S27, LE-S35, LE-S42, and LE-S45.

## LE-S47 — Content pack import

**Goal:** Permit safe extension through authored data packs, not executable
mod code.

**Deliverables:** a versioned pack manifest, strict content validation,
namespacing, import/export UX, quotas, and invalid-pack test cases.

**Done when:** a valid pack can add isolated content and an unsafe or
incompatible pack fails before it reaches gameplay.

**Depends on:** LE-S33 and LE-S44.

## LE-S48 — Proven engine extraction

**Goal:** Graduate only repeatedly demonstrated shared primitives into the
engine package.

**Deliverables:** a capability audit, extraction proposal, narrow package API,
migration tests, and a no-regression benchmark.

**Done when:** the game becomes simpler to maintain and no game-specific rules
or balance data move into `packages/engine/`.

**Depends on:** LE-S25, LE-S33, LE-S39, and LE-S47.

## LE-S49 — Quality automation

**Goal:** Make the release bar executable rather than manual.

**Deliverables:** CI checks for type safety, tests, deterministic replay,
content validation, production build, and a small browser smoke path;
documented failure triage.

**Done when:** protected changes cannot merge with a failed quality gate and
each failure points to an actionable artifact.

**Depends on:** LE-S28, LE-S43, and LE-S48.

## LE-S50 — Privacy and resilience

**Goal:** Make local data and failure behaviour explicit, safe, and recoverable.

**Deliverables:** data inventory, storage/export/delete guidance, corrupted-data
recovery, import size limits, failure UX, and resilience tests.

**Done when:** the game remains usable after a malformed save/import and never
silently transmits player data.

**Depends on:** LE-S43 and LE-S47.

## LE-S51 — Community playtest kit

**Goal:** Help testers create useful, reproducible feedback with minimal effort.

**Deliverables:** a diagnostic bundle containing version, map, seed, replay,
and optional notes; a privacy review; clear sharing instructions; tests.

**Done when:** a tester can report a balance or defect issue that a developer
can reproduce without asking for screenshots alone.

**Depends on:** LE-S43, LE-S49, and LE-S50.

## LE-S52 — Live-balance workflow

**Goal:** Make balance adjustments traceable, comparable, and reversible.

**Deliverables:** versioned balance manifests, scenario comparison reports,
change rationale templates, and backwards-compatible replay handling.

**Done when:** a balance change can be evaluated against reference scenarios
and rolled back without corrupting saves or historical replays.

**Depends on:** LE-S11, LE-S24, LE-S49, and LE-S51.

## LE-S53 — Save migration hardening

**Goal:** Support long-lived profiles and replays across multiple releases.

**Deliverables:** explicit migration chains, fixture archives for old formats,
backup/restore behaviour, clear retirement policy, and compatibility tests.

**Done when:** every supported historic save/replay either loads equivalently or
fails with a specific, recoverable explanation.

**Depends on:** LE-S19, LE-S24, LE-S47, and LE-S52.

## LE-S54 — Gate 2 release candidate

**Goal:** Freeze the expanded game for evidence-driven final validation.

**Deliverables:** a feature freeze, final balance candidate, complete automated
evidence, accessibility/mobile sign-off, and a focused external playtest plan.

**Done when:** only accepted release-blocking fixes may change the candidate.

**Depends on:** LE-S45 through LE-S53.

## LE-S55 — Gate 2 release

**Goal:** Ship the expanded game with maintainable content and quality
foundations.

**Deliverables:** a tagged release, final notes and credits, verified artefacts,
known-limitations record, and a retrospective on the Gate 2 architecture.

**Done when:** the published source, content, verification commands, and
release artifact are independently reproducible.

**Depends on:** LE-S54.

## Replanning checkpoints

Review the plan after LE-S10, LE-S15, LE-S20, LE-S25, LE-S30, LE-S40, LE-S48,
and LE-S55. At each checkpoint, decide which capabilities have proven reusable
enough to graduate into `packages/engine/`. Until then, favour a compact
working game over generic systems such as ECS breadth, physics, inventory, or
mod support.
