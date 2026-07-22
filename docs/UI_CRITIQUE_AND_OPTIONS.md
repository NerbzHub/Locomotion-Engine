# Dungeon Defense UI critique and decision options

**Purpose:** identify the most likely usability and presentation failures in
the current Dungeon Defense interface before further UI work is implemented.
This is intentionally critical. It is a design-analysis document, not an
implementation plan or a claim that every issue has been observed in a formal
playtest.

**Review basis:** source and a manual browser pass on 2026-07-21, including a
390 px-wide mobile viewport, initial setup, and an active wave. The current UI
already has phase-based hiding for setup controls, a compact mobile build row,
and an overflow menu. Those changes improve the immediate problem, but they do
not yet establish a complete information architecture.

## Executive assessment

The game is functional, but it still reads more like a well-equipped prototype
than a deliberately authored game interface. It exposes several systems before
the player has a reason to care about them, relies on text where spatial or
visual communication would be stronger, and gives no firm visual hierarchy
between a life-or-death action and a utility action.

The most urgent risk is not that a player cannot find a button. It is that a
new player cannot form a reliable mental model of the loop:

```text
Choose mission → choose tower → place tower → assess threat → start wave
→ react / inspect → prepare for the next wave → outcome
```

The UI should make that loop self-evident. Anything that does not serve the
player's current step should be absent, secondary, or available on request.

## Harsh findings

| Priority | Issue | Why it is harmful | Evidence / risk |
| --- | --- | --- | --- |
| P0 | The initial screen still asks for too many decisions before a player has played even one second. | Choice before understanding produces anxiety, random selection, or abandonment. | Map, difficulty, campaign, three towers, a briefing, tutorial prompt, resource HUD, and a Start button all appear before the board can teach the core action. |
| P0 | The primary action is visually separated from the last required action. | A player may select a tower, scroll to the board, then need to relocate the Start button after placement. This is especially costly on touch devices. | The mobile header is sticky, which helps, but the desired sequence still spans multiple vertical regions. |
| P0 | Build selection gives mechanical descriptions, not a decision. | “Fast shots”, “long range”, and “slows enemies” are not enough for an unfamiliar player to know which tower is safe or useful first. | The player has no visible recommendation, range preview before choosing, or explanation of how a tower counters the coming wave. |
| P1 | The game has competing sources of instruction. | Tutorial, wave briefing, selected-tower inspector, context message, hover message, HUD, and menu can all communicate at once. Players cannot know which message should override the others. | Text is spread above and below the board; announcements do not appear to be prioritised as a single feed. |
| P1 | The overflow Menu is a storage cupboard rather than a grouped game menu. | Save/load, accessibility settings, help, replay tools, diagnostics, and “new defense” have radically different audiences and risk levels. A flat grid makes each feel equally normal and equally important. | Diagnostics and replay import/export are developer/power-user tools but sit beside everyday actions. |
| P1 | “New defense” is available alongside an ongoing game without a confirmation or a clear danger treatment. | Accidental reset is a high-frustration failure, particularly on touch. The label is softer than its consequence. | The current restart action resets the run immediately. |
| P1 | The HUD reports state but does not support decisions. | Gold, lives, and wave are necessary, but they do not answer “can I afford the selected tower?”, “what is the current threat?”, or “what should I do next?” | Cost is in tower buttons; the wave threat is in a separate briefing; status is in a third location. |
| P1 | The board is visually clean but not yet an active command surface. | Tower-defense games live or die by board readability: path, valid build cells, tower ranges, target priority, enemy intent, and imminent danger must be legible at a glance. | Current canvas cues may exist, but the surrounding UI does not reinforce their meaning or surface a focused legend when first needed. |
| P2 | The initial tutorial prompt is more compact now, but it is still disconnected from the exact action it explains. | General instructions are easy to ignore and hard to retain. Contextual coaching at the moment of placement or first wave is more effective. | It explains several systems at once before the player has encountered any of them. |
| P2 | Campaign, map, and difficulty overlap conceptually. | Players may not understand whether a campaign node is a preset, a separate mode, or something they should choose in addition to map and difficulty. | Campaign selection changes map/difficulty, while map and difficulty remain independently selectable. |
| P2 | Locked campaign content is shown beside active content with limited explanation. | A disabled button communicates that something is unavailable but not how to unlock it or whether it matters. | “Crossroads Stand” is disabled at first run without an adjacent unlock explanation. |
| P2 | The layout has no deliberately designed desktop/tablet/mobile information density. | CSS wrapping prevents overflow, but wrapping is not the same as responsive design. Important controls can change order or prominence simply because the viewport narrowed. | Three tower cards become compact at mobile widths; this protects height but risks unreadably small labels and touch targets. |
| P2 | The screen has no explicit pause, speed, or combat-attention model. | If the simulation continues while a player opens help, settings, a tower inspector, or a mobile menu, the UI asks them to read while losing. If it does not continue, the UI should say so. | No player-facing statement or affordance establishes this contract. |
| P3 | Persistent branding takes valuable top-of-screen space on a small device. | “Locomotion Engine · Gate 1” helps development context but has little player value during a run. | The sticky mobile header keeps it visible even while the player needs board area. |
| P3 | Developer features are present in the consumer UI. | Diagnostics, seed, replay transfer, and raw import are valuable for testing but make the product feel unfinished and can distract normal players. | They are accessible from the same menu as audio and help. |

## Design rules that should govern the next iteration

1. **One primary question per state.**
   - Setup: “What mission am I playing?”
   - Build/intermission: “What should I build before the next wave?”
   - Active wave: “What needs attention right now?”
   - Tower selected: “What is the best upgrade or targeting decision?”
   - End screen: “What happened, and what do I do next?”

2. **Progressive disclosure over permanent explanation.** Show a mechanic when
   it becomes relevant, not as an encyclopedia before play.

3. **Keep the action, consequence, and feedback together.** Selecting a tower
   should immediately show its cost, range, placement validity, and a concise
   recommended use near the board—not require the player to connect three
   distant UI regions.

4. **Reserve visual emphasis for irreversible or time-critical actions.**
   Start wave, spend gold, and abandon/restart must not look equivalent to
   export replay or audio volume.

5. **Mobile is not desktop stacked vertically.** At narrow widths, preserve a
   short action loop and a readable board. Secondary systems should use sheets,
   drawers, or deliberate screens rather than simply wrapping into more rows.

6. **A disabled control must explain its unlock condition or disappear.** A
   player should never have to infer why a seemingly relevant choice is inert.

7. **Do not confuse a debugging capability with a player feature.** Developer
   diagnostics should be hidden behind a developer flag or a dedicated testing
   build, not part of the release-facing navigation.

## Concrete problem areas and alternatives

### 1. Mission setup is over-specified

**Current model:** campaign, map, and difficulty are three adjacent choice
groups. A campaign node also sets map and difficulty.

**Problems:** this creates duplicate controls and unclear authority. A player
can reasonably ask: “If I selected Gate Watch, why can I then select
Crossroads?” The game is exposing content-authoring structure rather than a
player-friendly decision.

**Alternatives:**

| Option | Description | Strength | Cost / risk |
| --- | --- | --- | --- |
| A. Campaign-first (recommended) | Show scenario cards as the main choice. Each card names map, objective, recommended difficulty, and unlock state. Put difficulty inside the chosen scenario. | Clear mental model; good for a progression game. | Requires scenario cards and a stronger campaign data presentation. |
| B. Skirmish-first | Offer “Campaign” and “Custom game” as two explicit modes. Custom game alone exposes map and difficulty. | Preserves all current flexibility without ambiguity. | One additional mode-selection step. |
| C. Defaults with “Change mission” | Start with Gate Watch / Standard selected. Show one primary “Play” route and place alternate scenario/difficulty choices behind a disclosure. | Fastest first-run path and lowest cognitive load. | Advanced players need one extra tap. |

### 2. The pre-wave loop is too spatially fragmented

**Current model:** select a tower in a toolbar, place it on the board, read a
briefing, then use a header-level Start button.

**Problems:** the player must scan and often scroll between controls. The game
does not visually prove that the player is “ready.”

**Alternatives:**

| Option | Description | Strength | Cost / risk |
| --- | --- | --- | --- |
| A. Bottom command dock (recommended for mobile) | Put tower selection and the primary action into one sticky bottom dock. The board remains between status/header and dock. | One-thumb operation; the board stays central; no search for Start. | Needs careful safe-area and inspector handling. |
| B. Board-edge action rail | Keep a compact vertical/horizontal rail attached to the board: selected tower, cost, undo/cancel, and Start Wave. | Strong desktop composition; action stays visually attached to playfield. | Less natural on very narrow screens. |
| C. Readiness panel | At intermission, show a single compact panel below the board with tower choice, briefing, and “Start wave”. Hide it during action. | Simple and low-risk with current DOM. | Still requires scrolling if the board is taller than the viewport. |

### 3. Tower selection has weak decision support

**Current model:** three text cards describe a tower’s cost and one trait.

**Problems:** beginners cannot predict range, damage role, placement strategy,
or whether their current gold is enough. A support tower is especially easy to
misuse without a threat-specific recommendation.

**Alternatives:**

- Add a short role label: **Archer — reliable starter**, **Mage — crowd range**,
  **Sentinel — slows fast enemies**.
- On tower selection, show a translucent range preview immediately on the board
  before a placement attempt.
- During the first two waves, recommend one tower based on the upcoming enemy
  composition; do not force the choice.
- Grey out unaffordable choices with an explicit “Need 10 more gold,” while
  retaining a readable preview.
- Use a selected-tower summary near the board: icon/name, cost, range, and a
  single instruction such as “Tap grass to place.”

### 4. Status and messaging need a hierarchy

**Current model:** persistent HUD values plus separate briefing, action message,
and placement message.

**Problems:** messages can compete, overwrite each other, or remain visible
after their usefulness. The game lacks an explicit precedence model.

**Recommended message hierarchy:**

1. **Critical:** defeat, victory, cannot afford, path blocked, boss phase.
2. **Decision:** next-wave threat and reward, tower upgrade choice.
3. **Immediate feedback:** tower placed, gold spent, target policy changed.
4. **Ambient:** selected tower prompt, keyboard hint.

Only the highest-priority current message should occupy the main status area.
Ambient instructions should appear only on first encounter, hover/focus, or in
Help. A short, fading combat-event feed can exist separately if it proves
valuable in playtests.

### 5. The Menu mixes audiences and risk levels

**Current model:** a single Menu contains player settings, save/load, Help,
replay transfer, diagnostics, and New defense.

**Problems:** this is compact, but it has no conceptual grouping. It will become
unmanageable as more options arrive.

**Alternative menu structure:**

```text
Menu
├── Continue / Resume              (only when relevant)
├── Save game
├── Load game
├── How to play
├── Settings
│   ├── Audio and volume
│   └── Reduced motion
├── Restart run…                   (confirmation required)
└── Developer tools                (testing builds only)
    ├── Diagnostics
    ├── Export replay
    └── Import replay
```

The menu should either pause the game or clearly state that combat continues.
For a first public test, pausing while a full-screen menu/sheet is open is the
less surprising rule.

### 6. End-of-run needs to become a dedicated outcome screen

**Current model:** setup controls return and the generic state message changes.

**Problems:** victory/loss does not receive the emotional punctuation or clear
next action it deserves. Returning every setup control immediately can make the
result feel like a reset rather than a conclusion.

**Suggested outcome-screen contents:**

- clear result: **Dungeon defended** or **Dungeon fallen**;
- one useful summary: waves reached, lives remaining, towers built, and a
  campaign unlock if one occurred;
- one primary action: **Play next mission** after victory or **Try again** after
  defeat;
- one secondary action: **Change mission**;
- optional recap/details, not a full dashboard.

### 7. Accessibility requires a clearer interaction contract

**Potential issues:**

- Keyboard focus can travel through hidden/collapsed regions if visibility and
  focus management are not verified explicitly.
- Canvas interactions are inherently hard to narrate to screen-reader users;
  the toolbar and selected-tower state need excellent accessible names and live
  updates.
- Three compact mobile tower controls risk falling below comfortable target and
  text sizes.
- Colour alone cannot distinguish selected tower, valid/invalid placement,
  enemy health state, armour, slowing, elite status, and boss phase.
- A sticky header and future bottom dock may overlap content at high zoom,
  landscape orientation, or device safe areas.

**Validation needed before implementation decisions:** keyboard-only run,
screen-reader smoke test, 200% browser zoom, 320 px width, iPhone safe area,
Android Chrome, reduced-motion mode, muted mode, and colour-vision simulation.

## Coherent UI directions

Do not combine fragments of every option. Choose one direction and hold it to
completion.

### Direction A: Board-first command dock — recommended

```text
Top bar: mission name · compact gold/lives/wave · Menu
Board:   primary visual focus
Dock:    selected tower + cost + placement cue | Start wave / Pause
Panel:   appears only for a selected tower, setup, or outcome
```

This is the strongest fit for a browser tower-defense game and the best answer
to the mobile-scroll complaint. It treats the board as the product and every
other surface as contextual support.

### Direction B: Intermission as an explicit planning screen

```text
Planning screen: next threat → recommended tower → build choices → Start wave
Combat screen:   board + compact HUD + pause/menu only
Outcome screen:  result → primary next action → mission options
```

This maximises clarity for first-time players and makes phase transitions very
obvious. It may feel less seamless to experienced players if it becomes too
modal.

### Direction C: Desktop strategy panel plus mobile sheet

```text
Desktop: board left; persistent strategy panel right
Mobile:  board full width; the same strategy panel opens as a bottom sheet
```

This supports rich inspection, upgrades, targeting, and future content. It is
more scalable than a single flowing page, but it is a larger layout investment.

## Recommended order for the next design decision

1. Decide whether the game is **campaign-first** or **skirmish-first**. Do not
   expose campaign, map, and difficulty as peers until that decision exists.
2. Choose Direction A, B, or C above. Direction A is the recommended default.
3. Prototype one complete loop only: fresh game → place a tower → start wave →
   inspect/upgrade → next wave → outcome. Do not redesign every menu first.
4. Define the message-priority rules before adding any further text.
5. Test the prototype with three new players at desktop and mobile widths.
   Measure first-action time, first-confusion point, and whether each player can
   start a wave without coaching.
6. Keep replay, diagnostics, and raw developer tooling outside the player
   navigation for the release-facing build.

## Questions that require owner decisions

- Is the first release meant to lead players through authored campaign missions,
  or is it primarily a replayable custom/skirmish sandbox?
- Should opening Help, Settings, or a tower inspector pause combat?
- Is touch/mobile a first-class target for the next playtest, or merely a
  supported fallback?
- Should “restart” preserve the selected mission and difficulty, or return to
  mission selection?
- Are developer replay and diagnostics controls intended for public testers or
  only the development team?
- Is visual game identity (icons, tower portraits, threat symbols) in scope
  before external testing, or should the next iteration remain text-first?

## Definition of success for a UI redesign

The redesign should not be judged by whether it looks cleaner in a screenshot.
It succeeds when an uncoached new player can, on a 390 px-wide phone and a
desktop browser:

- identify the current objective within five seconds;
- place a first useful tower without asking what a button means;
- know when and how to start a wave;
- understand why a placement, purchase, or upgrade failed;
- find Help and audio/reduced-motion settings without seeing them constantly;
- complete a wave without losing access to an important control; and
- understand the result and the next action at victory or defeat.
