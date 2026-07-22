# Dungeon Defense Implementation Roadmap

**Status:** Active implementation plan

**Current position (2026-07-22):** LE-S01 through LE-S28 are implemented and
merged into `main`. LE-S29 is prepared but not complete: it requires the owner
to select a licence before a public candidate is published, followed by the
external playtest defined in `docs/PLAYTESTER_CRITERIA.md`. LE-S30 and every
later sprint remain planned. The next active delivery work is therefore LE-S29,
not LE-S56.

The roadmap runs through LE-S108. LE-S06 through LE-S55 turn the proof into a
clear, replayable, and maintainable game. LE-S56 through LE-S100 then build
toward the full Game Vision: evolving fantasy eras, memorable run progression,
procedural variation, and an endless defence that remains readable. LE-S101
through LE-S108 complete the visual-first asset workflow and provide the final
quality gates for the complete experience.

**Revision basis:** Books 05 and 06 refine this roadmap in three important
ways. Procedural visuals are modular, deterministic, and driven by an explicit
Entity DNA model rather than by unconstrained code generation. Their authoring
workflow proceeds from a debug workbench to sprite-sheet import and visual
assignment. Charm systems are introduced progressively with explicit caps,
visual-priority rules, and player-readable consequences; they are not treated
as late decorative polish.

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

## Delivery sections and feature-branch plan

Each row is a cohesive merge unit. The suggested branch contains the complete
range, passes its tests and browser checks, then merges into `main` before the
next branch begins. Do not keep several long-lived feature branches open: later
work should begin from the latest `main` so balance, saves, and visual rules do
not drift apart. Release-candidate rows are release branches rather than normal
feature branches.

| Section | Sprint range | Suggested branch | Merge outcome |
| --- | --- | --- | --- |
| Completed vertical slice | LE-S01–LE-S05 | Already merged | Deterministic core loop and first content proof. |
| Completed core depth | LE-S06–LE-S10 | Already merged | Intermissions, maps, diagnostics, saves, accessibility. |
| Completed combat depth | LE-S11–LE-S17 | Already merged | Difficulty, targeting, Sentinel, specialisations, elites, boss. |
| Completed campaign polish | LE-S18–LE-S23 | Already merged | Campaign, progression, economy, audio, presentation, tutorial. |
| Completed release foundations | LE-S24–LE-S28 | Already merged | Replays, fuzzing, performance, mobile, packaging. |
| Gate 1 release | LE-S29–LE-S30 | `release/gate-1` | Licensed playtest candidate, triage, and Gate 1 release. |
| Post-release learning | LE-S31–LE-S33 | `feature/post-release-foundations` | Stabilised feedback and safer content authoring. |
| Endless challenge | LE-S34–LE-S36 | `feature/endless-challenges` | Mutators, endless mode, and optional mastery goals. |
| Campaign expansion | LE-S37–LE-S41 | `feature/campaign-expansion` | Splitter/Bombard play, hazards, maps, and chapter two. |
| Player-facing tools | LE-S42–LE-S46 | `feature/player-tools-and-accessibility` | Custom challenges, replay gallery, localisation, accessibility, mobile. |
| Asset and engine boundary | LE-S47–LE-S50 | `feature/visual-asset-foundation` | Asset catalogue, proven extraction, quality gates, resilience. |
| Gate 2 operations | LE-S51–LE-S55 | `release/gate-2` | Playtest kit, balance/migration hardening, and Gate 2 release. |
| Identity and relics | LE-S56–LE-S60 | `feature/entity-dna-and-relics` | Entity DNA, tags, relic loop, Cleric, evolution framework. |
| Combat identities | LE-S61–LE-S63 | `feature/elemental-counterplay` | Archer/Mage paths and readable resistance rules. |
| Frontier and Wilderness | LE-S64–LE-S67 | `feature/early-eras` | First eras, transitions, and Druid Grove. |
| Elite bosses | LE-S68–LE-S70 | `feature/elite-bosses` | Modifier rules, elite direction, procedural boss framework. |
| Dark Ages | LE-S71–LE-S73 | `feature/dark-ages` | Undead era, Paladin, and Necromancer play. |
| Run characters and events | LE-S74–LE-S78 | `feature/heroes-merchants-events` | Heroes, merchants, event framework, and first events. |
| Infernal conditions | LE-S79–LE-S83 | `feature/infernal-conditions` | Biomes, weather, Infernal War, Alchemist, Warlock. |
| Dragon Age | LE-S84–LE-S87 | `feature/dragon-age` | Flying/large combat, Ballista, Dragon Egg, advanced bosses. |
| Procedural identity | LE-S88–LE-S91 | `feature/procedural-identity` | Sprite resolver/workbench and enemy/character variation. |
| Charm and readability | LE-S92–LE-S95 | `feature/charm-systems` | Feedback, battlefield memory, emergent behaviour, visual priorities. |
| Cosmic endless play | LE-S96–LE-S100 | `feature/cosmic-endless` | Cosmic era, Portal Tower, End of Reality, pacing, story journal. |
| Visual authoring | LE-S101–LE-S104 | `feature/visual-authoring` | Sprite-sheet import, assignment builder, editor, vision balance. |
| Vision release | LE-S105–LE-S108 | `release/vision` | Accessibility/performance hardening, candidate, and Vision release. |

### Branch acceptance rules

- Keep a feature branch to one delivery section; if a section becomes larger
  than five sprints in practice, split it at its first independently playable
  outcome and merge that outcome first.
- Rebase or merge the current `main` before opening a pull request, then run
  type checks, deterministic tests, production build, and the relevant browser
  smoke scenario.
- Do not merge a branch that changes authored content, saves, replay formats,
  or visual rules without its migration/validation tests.
- Treat every `release/*` branch as a feature freeze: accept only release
  blockers, documentation, packaging, and verified balance fixes.

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
| LE-S47 | Visual asset catalogue | Validated modular visual assets can be registered safely. |
| LE-S48 | Proven engine extraction | Only validated reusable primitives move into the engine package. |
| LE-S49 | Quality automation | CI gates protect deterministic, visual, and packaging quality. |
| LE-S50 | Privacy and resilience | Local data, imports, and failures have clear, safe boundaries. |
| LE-S51 | Community playtest kit | Testers can report reproducible feedback with minimal friction. |
| LE-S52 | Live-balance workflow | Content adjustments are traceable, comparable, and reversible. |
| LE-S53 | Save migration hardening | Long-lived profiles and replays migrate safely across releases. |
| LE-S54 | Gate 2 release candidate | The expanded game is frozen for focused validation. |
| LE-S55 | Gate 2 release | The post-release expansion ships with maintainable foundations. |
| LE-S56 | Entity DNA and content tags | Stable entity identity connects gameplay, visuals, and content rules. |
| LE-S57 | Relic choice loop | Boss rewards create compact, meaningful build-defining choices. |
| LE-S58 | Relic library one | The first elemental and tower-family relics make builds diverge. |
| LE-S59 | First fantasy tower | A Cleric Shrine introduces a clear support role. |
| LE-S60 | Tower evolution framework | Towers can take data-defined, mutually exclusive specialisation paths. |
| LE-S61 | Archer evolution | Archer paths create precision, speed, and ranger identities. |
| LE-S62 | Mage evolution | Mage paths create elemental identities and visible status effects. |
| LE-S63 | Enemy resistance framework | Readable resistances and vulnerabilities support later tactical counters. |
| LE-S64 | The Frontier era | Endless defence gains its first named era and local-threat content. |
| LE-S65 | Era transitions | World and encounter rules change cleanly between eras. |
| LE-S66 | The Wilderness era | Organised, durable enemies and nature pressure expand the mid-game. |
| LE-S67 | Druid Grove | Roots and summoned allies add area control and a Summon build path. |
| LE-S68 | Elite modifier framework | Controlled modifiers create variant enemies without unreadable stacking. |
| LE-S69 | Elite encounter direction | Elite rules, rewards, and UI make escalation understandable. |
| LE-S70 | Procedural boss framework | Bosses are assembled from validated archetypes, abilities, and modifiers. |
| LE-S71 | The Dark Ages era | Undead mechanics and holy counterplay establish a new strategic era. |
| LE-S72 | Paladin Watchtower | Holy damage and anti-undead utility create a specialised counter tower. |
| LE-S73 | Necromancer Tower | Defeated enemies can become bounded allied skeletons. |
| LE-S74 | Hero foundation | Named heroes enter runs with classes, traits, and survivable state. |
| LE-S75 | Hero combat and recovery | Heroes become readable battlefield participants without replacing towers. |
| LE-S76 | Merchant encounters | Temporary shops create controlled, legible economic decisions. |
| LE-S77 | Event framework | A bounded event scheduler introduces temporary opportunities and threats. |
| LE-S78 | Frontier events | Treasure Goblin, Fairy Blessing, and Sheep Parade prove event clarity. |
| LE-S79 | Biome and condition framework | Visual world changes can carry validated gameplay modifiers. |
| LE-S80 | Weather conditions | Rain, fog, snow, and Blood Moon create readable environmental variation. |
| LE-S81 | The Infernal War era | Demons, portals, and hostile battlefield rules escalate the game. |
| LE-S82 | Alchemist | Status-effect mixtures and controlled randomness add a versatile tower. |
| LE-S83 | Warlock Circle | Risk/reward summons establish dangerous late-game magic. |
| LE-S84 | The Dragon Age | Flying and large-enemy rules shift placement and targeting priorities. |
| LE-S85 | Ballista and anti-large combat | Extreme-range precision answers dragons without invalidating other towers. |
| LE-S86 | Dragon Egg | A protected long-term investment grows through visible run stages. |
| LE-S87 | Advanced procedural bosses | Named boss combinations create replayable capstones for late eras. |
| LE-S88 | Modular sprite resolver | Entity DNA resolves deterministic, layered sprite parts. |
| LE-S89 | Sprite debug workbench | Developers can inspect seeds, parts, palettes, and generated sprites. |
| LE-S90 | Procedural enemy variation | Enemies gain coherent generated silhouettes and accessory variation. |
| LE-S91 | Procedural character variation | Heroes and merchants receive generated appearance and identity. |
| LE-S92 | Charm feedback foundation | Damage, impacts, and statuses make combat consequences visible. |
| LE-S93 | Battlefield memory | Corpses, marks, and wear add history within strict readability budgets. |
| LE-S94 | Emergent behaviour | Bounded variation makes waves feel alive without becoming random. |
| LE-S95 | Conditions and visual priority | World effects combine safely under a clear render hierarchy. |
| LE-S96 | The Celestial and Cosmic Age | Titans and strange threats introduce late-game rule twists. |
| LE-S97 | Portal Tower | A late-game summon tower makes controlled absurdity tactically useful. |
| LE-S98 | End-of-Reality content | Reality-breaking encounters remain constrained by readable rules. |
| LE-S99 | Endless pacing and combinations | Long-run scaling uses eras, composition, and events—not health alone. |
| LE-S100 | Emergent-story journal | A run records the people, relics, bosses, and moments worth remembering. |
| LE-S101 | Sprite-sheet importer | Creators can import constrained modular sprite sheets visually. |
| LE-S102 | Visual assignment builder | Imported parts are assigned to Entity DNA categories with live preview. |
| LE-S103 | Visual asset editor | A focused inspector makes modular visual content safe to author. |
| LE-S104 | Vision balance laboratory | Reference scenarios protect build diversity and late-game fairness. |
| LE-S105 | Vision accessibility and clarity | Complex content receives a final readability and accessibility pass. |
| LE-S106 | Endless performance hardening | The complete vision meets memory and frame-time budgets. |
| LE-S107 | Vision release candidate | The complete endless experience is frozen for focused external validation. |
| LE-S108 | Vision release | Dungeon Defense ships as the full Game Vision milestone. |

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

## LE-S47 — Visual asset catalogue

**Goal:** Register modular visual assets through validated data rather than
ad-hoc file naming or executable mod code.

**Deliverables:** a versioned visual-asset manifest; part categories for head,
torso, legs, weapon, accessory, and effect; dimension/transparency checks;
namespacing; quotas; and invalid-manifest tests.

**Done when:** authored sprite parts can be added as safe content, while a
missing, oversized, or incompatible asset is rejected before rendering.

**Not in scope:** a player-facing sprite-sheet import tool; that follows after
the modular renderer is proven.

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

## LE-S56 — Entity DNA and content tags

**Goal:** Give every procedurally variable unit a stable, data-driven identity
that joins gameplay semantics to visual generation.

**Deliverables:** Entity DNA v1 containing species, role, biome, tier, traits,
and a seed; tags for damage, tower role, creature family, summon, and status
effects; validation; inspection UI; and deterministic resolver tests.

**Done when:** a rule can target a tag such as Fire, Holy, Dragon, or Support,
and the same Entity DNA always resolves to the same permitted visual identity
without making visuals a simulation dependency.

**Depends on:** LE-S33, LE-S47, LE-S48, and LE-S52.

## LE-S57 — Relic choice loop

**Goal:** Make boss victories produce a compact, consequential choice.

**Deliverables:** a post-boss choice flow, three validated relic options, run
state persistence, clear effect descriptions, and deterministic choice tests.

**Done when:** selecting one relic changes a later decision without hiding its
rule or invalidating a replay.

**Depends on:** LE-S17, LE-S24, LE-S53, and LE-S56.

## LE-S58 — Relic library one

**Goal:** Prove build variety with a deliberately small relic set.

**Deliverables:** Archer, Fire, Ice, Nature, and economy relics; stacking
rules; balance scenarios; and clear active-relic presentation.

**Done when:** two successful runs can use visibly different strategies rather
than merely different numerical bonuses.

**Depends on:** LE-S57.

## LE-S59 — First fantasy tower

**Goal:** Add Cleric Shrine as the first support-oriented tower family.

**Deliverables:** blessing/healing rules, range and target feedback, upgrade
data, content tags, balance tests, and tutorial copy.

**Done when:** Cleric Shrine provides a useful role that cannot be replaced by
simply building another damage tower.

**Depends on:** LE-S56 and LE-S58.

## LE-S60 — Tower evolution framework

**Goal:** Support mutually exclusive tower identities rather than linear stats.

**Deliverables:** data-defined branch prerequisites, selection UI, compatibility
with saves/replays, inspection comparison, and validation tests.

**Done when:** an individual tower can permanently choose one clear tactical
path without modifying its authored base definition.

**Depends on:** LE-S15, LE-S53, and LE-S56.

## LE-S61 — Archer evolution

**Goal:** Create three readable Archer identities.

**Deliverables:** precision/longbow, rapid-fire, and ranger-support branches;
visual differentiation; scenarios; and branch balance tests.

**Done when:** each branch has a distinct target, placement, or relic synergy.

**Depends on:** LE-S58 through LE-S60.

## LE-S62 — Mage evolution

**Goal:** Give Mage elemental identities with understandable status effects.

**Deliverables:** Fire, Frost, and Arcane branches; status application rules;
effect icons; and stacking/expiry tests.

**Done when:** elemental effects are legible during combat and countered
appropriately by enemy rules.

**Depends on:** LE-S60 and LE-S61.

## LE-S63 — Enemy resistance framework

**Goal:** Make tactical counters explicit before they become numerous.

**Deliverables:** validated resistance/vulnerability definitions, inspection
copy, combat calculation tests, and no-surprise default rules.

**Done when:** a player can learn why a damage type performed differently
without consulting hidden data.

**Depends on:** LE-S56 and LE-S62.

## LE-S64 — The Frontier era

**Goal:** Turn early endless waves into a named, authored fantasy era.

**Deliverables:** era definition, Frontier palette, rats/goblins/kobolds/bandits,
encounter tables, and era-entry presentation.

**Done when:** an endless run begins with coherent local-threat progression
rather than an anonymous sequence of wave numbers.

**Depends on:** LE-S35, LE-S56, and LE-S63.

## LE-S65 — Era transitions

**Goal:** Change a run's world without disrupting its simulation or clarity.

**Deliverables:** deterministic transition rules, preview of the next era,
palette/ambient swap, encounter handoff, save/replay coverage, and tests.

**Done when:** an era change feels momentous while all existing towers, relics,
and controls remain understandable.

**Depends on:** LE-S64.

## LE-S66 — The Wilderness era

**Goal:** Introduce organised and durable mid-game threats.

**Deliverables:** wolves, orcs, ogres, shamans, a Wilderness encounter table,
support-enemy rules, and balance scenarios.

**Done when:** the era demands a new tactical response beyond more raw damage.

**Depends on:** LE-S63 through LE-S65.

## LE-S67 — Druid Grove

**Goal:** Add roots and bounded allied creatures as a nature-control tower.

**Deliverables:** root status, summon limits/lifetime, clear ownership visuals,
upgrade data, and deterministic lifecycle tests.

**Done when:** Druid Grove is effective at control without allowing summoned
units to obscure the board or escape simulation limits.

**Depends on:** LE-S59, LE-S63, and LE-S66.

## LE-S68 — Elite modifier framework

**Goal:** Create safe, composable variation for familiar enemies.

**Deliverables:** modifier schema, compatibility rules, visual markers, strict
combination caps, and deterministic generation tests.

**Done when:** a Giant, Swift, Armoured, or Regenerating enemy is immediately
recognisable and no illegal modifier combination can spawn.

**Depends on:** LE-S56, LE-S63, and LE-S66.

## LE-S69 — Elite encounter direction

**Goal:** Teach the player why an elite is present and what defeating it offers.

**Deliverables:** encounter warnings, elite health/ability feedback, reward
rules, defeat summary, and accessible explanations.

**Done when:** elites create an intentional spike rather than a confusing
statistical surprise.

**Depends on:** LE-S68.

## LE-S70 — Procedural boss framework

**Goal:** Assemble replayable bosses from authored, testable parts.

**Deliverables:** base archetypes, ability slots, modifier allow-lists,
procedural naming, preview card, and seed reproducibility tests.

**Done when:** bosses feel specific to a run while every ability and weakness
can be understood before and during the encounter.

**Depends on:** LE-S57, LE-S63, and LE-S69.

## LE-S71 — The Dark Ages era

**Goal:** Establish undead threats and supernatural counterplay.

**Deliverables:** skeleton, zombie, ghoul, wraith, and necromancer content;
resurrection/summon constraints; era palette; and encounter scenarios.

**Done when:** moving into the Dark Ages changes build priorities in a
communicated, fair way.

**Depends on:** LE-S65, LE-S67, and LE-S70.

## LE-S72 — Paladin Watchtower

**Goal:** Introduce a specialised holy counter-tower.

**Deliverables:** Holy damage, anti-undead/demon rules, support identity,
branch data, presentation, and counterplay tests.

**Done when:** Paladin Watchtower is compelling in relevant eras but not the
universal best tower.

**Depends on:** LE-S63 and LE-S71.

## LE-S73 — Necromancer Tower

**Goal:** Convert enemy defeats into a bounded allied-skeleton strategy.

**Deliverables:** corpse/defeat conversion rules, skeleton cap and expiry,
ownership/readability cues, upgrades, and replay tests.

**Done when:** the tower creates a distinct summoner build without turning
defeats into unbounded entities.

**Depends on:** LE-S67, LE-S71, and LE-S72.

## LE-S74 — Hero foundation

**Goal:** Add persistent run characters without adding scripted narrative.

**Deliverables:** generated name/class/traits, hero arrival, run persistence,
read-only hero panel, and deterministic generation tests.

**Done when:** a hero is recognisably an individual in the current run before
they have complex combat behaviour.

**Depends on:** LE-S53, LE-S57, and LE-S71.

## LE-S75 — Hero combat and recovery

**Goal:** Make heroes useful, vulnerable, and readable on the board.

**Deliverables:** one simple class ability, movement/target rules, downed and
recovery states, clear status feedback, and lifecycle tests.

**Done when:** a hero complements tower choices without creating micromanaged
real-time-unit gameplay.

**Depends on:** LE-S74.

## LE-S76 — Merchant encounters

**Goal:** Add temporary shops as controlled run-economy decisions.

**Deliverables:** generated merchant identity, constrained inventory, purchase
flow, cost validation, expiry, and replay/save coverage.

**Done when:** a merchant offers an interesting optional choice and never
forces the player to manage an opaque inventory system.

**Depends on:** LE-S57, LE-S74, and LE-S75.

## LE-S77 — Event framework

**Goal:** Introduce temporary run changes through a bounded, testable system.

**Deliverables:** event definitions, eligibility/cooldown rules, event briefing,
safe resolution paths, and deterministic schedule tests.

**Done when:** events can surprise a player without silently changing core
rules or overlapping into unreadable chaos.

**Depends on:** LE-S65, LE-S69, and LE-S76.

## LE-S78 — Frontier events

**Goal:** Validate events with three low-complexity, highly readable examples.

**Deliverables:** Treasure Goblin/Gold Carrier, Fairy Blessing, and Sheep
Parade; clear rewards/rules; scenario tests; and playtest notes.

**Done when:** each event changes a decision or moment in the run without
requiring a separate tutorial.

**Depends on:** LE-S77.

## LE-S79 — Biome and condition framework

**Goal:** Let world presentation and gameplay conditions evolve together.

**Deliverables:** biome definitions, condition modifiers, compatibility rules,
palette/decor hooks, preview UI, and seed tests.

**Done when:** a biome affects content probabilities or rules through authored
data rather than renderer-specific conditional code.

**Depends on:** LE-S65, LE-S77, and LE-S78.

## LE-S80 — Weather conditions

**Goal:** Add the first visible and tactically meaningful conditions.

**Deliverables:** rain, fog, snow, and Blood Moon; concise effect descriptions,
reduced-motion treatment, balance tests, and accessibility review.

**Done when:** players can identify the condition, understand its consequence,
and keep playing effectively with motion reduced.

**Depends on:** LE-S79.

## LE-S81 — The Infernal War era

**Goal:** Escalate into demons, portals, and hostile battlefield pressure.

**Deliverables:** imps, hellhounds, demons, infernal encounter tables, one
portal rule, visual palette, and counterplay scenarios.

**Done when:** Infernal War feels more dangerous through new behaviour, not
only larger enemy health pools.

**Depends on:** LE-S70, LE-S72, and LE-S80.

## LE-S82 — Alchemist

**Goal:** Add a flexible status-effect tower with controlled uncertainty.

**Deliverables:** poison, burn, slow, and one constrained unusual outcome;
effect priority rules; visual feedback; upgrade data; and tests.

**Done when:** every potion result is visible and tactically useful without
requiring the player to memorise hidden random tables.

**Depends on:** LE-S62, LE-S63, and LE-S81.

## LE-S83 — Warlock Circle

**Goal:** Establish dangerous magic and limited imp summoning.

**Deliverables:** a drawback/benefit contract, imp lifecycle cap, Demon tags,
upgrade choices, UI explanation, and deterministic scenarios.

**Done when:** the tower enables powerful high-risk builds while its downside
is explicit and controllable.

**Depends on:** LE-S67, LE-S73, LE-S81, and LE-S82.

## LE-S84 — The Dragon Age

**Goal:** Make flying and large enemies create a new late-game defence problem.

**Deliverables:** wyvern/dragon movement categories, targeting eligibility,
Dragon tags, era encounters, and visible priority guidance.

**Done when:** a player can tell which defences can answer a dragon and why.

**Depends on:** LE-S63, LE-S70, and LE-S81.

## LE-S85 — Ballista and anti-large combat

**Goal:** Add extreme-range physical precision as an answer to dragons.

**Deliverables:** Ballista, anti-large rules, target feedback, upgrade paths,
balance comparisons, and touch/keyboard inspection support.

**Done when:** Ballista is strong against large threats yet weak enough against
ordinary crowds to preserve varied tower compositions.

**Depends on:** LE-S61, LE-S84.

## LE-S86 — Dragon Egg

**Goal:** Create a long-term tower investment with emotional, visible growth.

**Deliverables:** egg through ancient-dragon stages, deterministic growth
conditions, protection/defeat rules, clear progress UI, and save tests.

**Done when:** preserving an Egg creates a memorable strategic commitment
without making a failed investment irrecoverably ruin a run.

**Depends on:** LE-S53, LE-S75, LE-S84, and LE-S85.

## LE-S87 — Advanced procedural bosses

**Goal:** Add late-era boss personalities without sacrificing rule clarity.

**Deliverables:** additional archetypes/abilities, safe modifier compositions,
generated title cards, counterplay preview, and long-run test scenarios.

**Done when:** a boss such as a crystal dragon or void lich has a distinct,
reproducible identity and a legible response.

**Depends on:** LE-S70, LE-S84, and LE-S86.

## LE-S88 — Modular sprite resolver

**Goal:** Resolve Entity DNA into a deterministic layered sprite on Canvas.

**Deliverables:** part-selection rules; shared origins for head, torso, legs,
weapon, accessory, and effect layers; palette constraints; fallback parts; and
resolver snapshots.

**Done when:** the same valid Entity DNA assembles the same readable sprite,
and a missing optional part degrades safely.

**Depends on:** LE-S47, LE-S56, and LE-S87.

## LE-S89 — Sprite debug workbench

**Goal:** Give developers a visual-first way to validate generated identity.

**Deliverables:** unit selector, seed input, generate action, Canvas preview,
resolved-part inspector, and copyable Entity DNA.

**Done when:** a designer can reproduce and diagnose a generated sprite without
editing files or reading renderer internals.

**Depends on:** LE-S88.

## LE-S90 — Procedural enemy variation

**Goal:** Give enemy instances personality while preserving recognition.

**Deliverables:** body/head/accessory/palette variation, trait-driven visual
rules, rarity weighting, silhouette safeguards, elite/boss integration, and
visual snapshots.

**Done when:** two goblins can look individual but are still identified at a
glance as the same tactical enemy kind.

**Depends on:** LE-S68, LE-S70, LE-S88, and LE-S89.

## LE-S91 — Procedural character variation

**Goal:** Apply constrained generated identity to heroes and merchants.

**Deliverables:** appearance-part sets, name-to-appearance seed rules, hero and
merchant portraits, fallback rendering, and reproducibility tests.

**Done when:** a named character’s visual identity remains stable throughout a
run, replay, and supported save migration.

**Depends on:** LE-S74, LE-S76, LE-S88, and LE-S89.

## LE-S92 — Charm feedback foundation

**Goal:** Make combat consequences satisfying and visible before adding more
systems.

**Deliverables:** capped, aggregated damage numbers; critical-hit emphasis; a
distinct kill burst; visual-first poison/burn/stun feedback; impact direction;
and reduced-motion alternatives.

**Done when:** players can distinguish damage, a defeat, and an active status
at a glance without the board becoming text-heavy.

**Depends on:** LE-S62, LE-S80, and LE-S90.

## LE-S93 — Battlefield memory

**Goal:** Let recent combat leave a small, readable history on the board.

**Deliverables:** fresh-to-decay-to-bones corpse lifecycle, configurable corpse
cap with oldest-first eviction, short-lived arrows/scorch marks, optional tower
wear, biome-based decay, and budget tests.

**Done when:** combat leaves charming traces that never hide enemies, paths, or
placement decisions.

**Depends on:** LE-S79, LE-S80, and LE-S92.

## LE-S94 — Emergent behaviour

**Goal:** Make units feel alive through constrained, observable variation.

**Deliverables:** authored micro-behaviours (hesitation, clustering, occasional
rush), rare panic state, broken-formation encounter rule, bounded elite
mutation, rare returning-survivor evolution with optional hover names, and
deterministic scenario tests.

**Done when:** variation feels intentional and tactically meaningful, with
every enabled behaviour disclosed through visible cues or inspection.

**Depends on:** LE-S68, LE-S77, LE-S90, and LE-S93.

## LE-S95 — Conditions and visual priority

**Goal:** Safely combine charm systems under explicit board-readability rules.

**Deliverables:** effect-interaction rules (such as fire accelerating decay),
renderer priority of enemies over effects over corpses over background, per-type
caps, background motion, and dense-board accessibility tests.

**Done when:** a late-game board remains understandable despite layered weather,
effects, history, and procedural variation.

**Depends on:** LE-S80, LE-S92 through LE-S94.

## LE-S96 — The Celestial and Cosmic Age

**Goal:** Introduce titans and strange threats through comprehensible twists.

**Deliverables:** celestial palette, titan/void enemy roles, one unusual but
explained movement or defence rule, encounter tables, and balance scenarios.

**Done when:** the game feels dramatically stranger while its board state is
still readable without a glossary during combat.

**Depends on:** LE-S87, LE-S90, and LE-S95.

## LE-S97 — Portal Tower

**Goal:** Make late-game summoning a strategic source of controlled absurdity.

**Deliverables:** Portal Tower, selected summon pool, limits and expiry,
target/ownership feedback, branch data, and performance tests.

**Done when:** its summoned creatures create a distinct build path without
overwhelming the board or invalidating other late-game towers.

**Depends on:** LE-S73, LE-S83, LE-S91, and LE-S96.

## LE-S98 — End-of-Reality content

**Goal:** Deliver deliberate excess while preserving bounded game rules.

**Deliverables:** reality-eater or sentient-moon encounter, constrained visual
effects, clear rules card, capstone boss scenario, and accessibility review.

**Done when:** the encounter is surprising and memorable but a player can
still identify threats, targets, ranges, and their next useful action.

**Depends on:** LE-S87, LE-S95 through LE-S97.

## LE-S99 — Endless pacing and combinations

**Goal:** Make long-run escalation depend on eras, composition, events, and
visible controlled chaos rather than health alone.

**Deliverables:** authored era loop, combination budgets, anti-repetition
rules, progressive charm-system activation, checkpoint summaries, seed
scenarios, and economy/difficulty review.

**Done when:** survival remains strategically varied deep into a run, with
complexity increasing gradually rather than appearing all at once.

**Depends on:** LE-S64 through LE-S98.

## LE-S100 — Emergent-story journal

**Goal:** Preserve the individual history that makes a run worth recalling.

**Deliverables:** compact run chronicle for heroes, relics, bosses, events,
eras, returning survivors, and notable defeats; local export; privacy-safe
copy; and tests.

**Done when:** a completed run produces a concise, accurate story record
without turning gameplay into a narrative-management screen.

**Depends on:** LE-S24, LE-S74 through LE-S78, LE-S94, LE-S98, and LE-S99.

## LE-S101 — Sprite-sheet importer

**Goal:** Let creators import constrained modular sprite sheets visually.

**Deliverables:** 1024×1024 limit, transparent-background validation, tile-grid
overlay, selectable 30×30 regions with optional padding, import diagnostics,
and invalid-sheet tests.

**Done when:** a creator can upload one compliant sheet and see its usable
regions without manually arranging asset folders.

**Depends on:** LE-S47, LE-S88, and LE-S89.

## LE-S102 — Visual assignment builder

**Goal:** Turn imported regions into usable modular parts through visual work.

**Deliverables:** category assignment for head, torso, legs, weapon,
accessory, and effect; live assembled preview; alignment controls; manifest
generation; undo/reset; and validation tests.

**Done when:** a creator can select, assign, preview, and save a new unit's
parts without hand-authoring a JSON manifest.

**Depends on:** LE-S56, LE-S89, and LE-S101.

## LE-S103 — Visual asset editor

**Goal:** Provide a compact, inspector-led authoring surface for mature assets.

**Deliverables:** asset/unit list, preview canvas, Entity DNA and metadata
inspector, validation feedback, export/import using an LLM-compatible data
contract, and documented support limits.

**Done when:** the visual workflow supports safe iteration while remaining a
focused content tool rather than an unbounded general-purpose game editor.

**Depends on:** LE-S90 through LE-S92, and LE-S102.

## LE-S104 — Vision balance laboratory

**Goal:** Protect build diversity and fair late-game challenge with evidence.

**Deliverables:** reference seeds across every era, automated outcome reports,
synergy/outlier review, difficulty targets, and versioned balance decisions.

**Done when:** a dominant relic, tower branch, enemy combination, or charm
effect is found through repeatable scenarios before release.

**Depends on:** LE-S52, LE-S99 through LE-S101, and LE-S103.

## LE-S105 — Vision accessibility and clarity

**Goal:** Ensure complete-game complexity remains usable and understandable.

**Deliverables:** external accessibility sessions, compact glossary/inspect
flows, zoom-based detail and optional deeper-stat discovery, information-density
audit, remediations, and regression coverage.

**Done when:** the full era and content set retains readable controls, status,
contrast, motion alternatives, and touch support.

**Depends on:** LE-S45, LE-S95, LE-S98, and LE-S104.

## LE-S106 — Endless performance hardening

**Goal:** Meet explicit frame-time and memory budgets for late-run content.

**Deliverables:** stress seeds, entity/effect/corpse budgets, leak detection,
procedural-art cache policy, low-power fallback, and performance CI checks.

**Done when:** supported devices sustain the agreed experience through the
defined long-run test scenarios without a progressively degraded board.

**Depends on:** LE-S26, LE-S95 through LE-S99, and LE-S105.

## LE-S107 — Vision release candidate

**Goal:** Freeze the complete Game Vision for focused validation.

**Deliverables:** feature freeze, verified balance manifest, external endless
playtest, accessibility/performance sign-off, release notes, and blocker triage.

**Done when:** only accepted release-blocking fixes can change the candidate,
and every declared Game Vision system has test or playtest evidence.

**Depends on:** LE-S100 through LE-S106.

## LE-S108 — Vision release

**Goal:** Ship Dungeon Defense as the complete Game Vision milestone.

**Deliverables:** tagged release, reproducible browser artifact, final credits,
known-limitations record, archived balance evidence, and roadmap retrospective.

**Done when:** a player can begin with a small frontier defence and reach a
replayable, performant, accessible End-of-Reality endless run.

**Depends on:** LE-S107.

## Replanning checkpoints

Review the plan after LE-S10, LE-S15, LE-S20, LE-S25, LE-S30, LE-S40, LE-S48,
LE-S55, LE-S60, LE-S70, LE-S80, LE-S90, LE-S100, LE-S104, and LE-S108. At each
checkpoint, decide which capabilities have proven reusable enough to graduate
into `packages/engine/`. Until then, favour a compact working game over generic
systems such as ECS breadth, physics, inventory, or mod support.
