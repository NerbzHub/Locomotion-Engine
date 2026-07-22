# Playtester criteria and feedback questions

Use this document for the LE-S29 external playtest release candidate. The goal
is not to gather vague approval. The goal is to learn whether a new player can
start Dungeon Defense, understand the loop, finish a short run, and report any
confusing or broken moments with enough evidence to reproduce them.

## Tester profile

Recruit testers across three groups where possible:

- **New player:** has not seen this project before and receives no coaching.
- **Tower-defense player:** understands build/upgrade/wave strategy from other
  games and can judge pacing, clarity, and challenge.
- **Accessibility/usability tester:** plays with keyboard, touch, reduced
  motion, small screen, or audio muted.

Avoid relying only on people who already know the project. Familiar testers are
useful for defect hunting, but they are poor evidence for first-run clarity.

## Entry criteria

A tester is a good fit if they can:

- run the provided build on a current desktop browser;
- spend 20 to 30 minutes without live guidance;
- answer written questions immediately after playing;
- share browser, operating system, screen size, and input method;
- report whether they used mouse, touch, keyboard, audio, or reduced motion;
- avoid submitting personal information beyond what is needed for reproduction.

## Test build information

Record this before sending a candidate:

- Candidate name:
- Source commit:
- Build date:
- Distribution method:
- Known limitations:
- Browser versions explicitly supported:

Do not change gameplay or content during a candidate test window. If a serious
defect requires a new build, start a new candidate name and keep feedback
separate.

## Test script

Ask testers to complete these tasks in order:

1. Start a fresh game with default settings.
2. Read only what the game itself presents.
3. Place at least two towers before starting the first wave.
4. Complete at least one full wave.
5. Upgrade or inspect a tower when available.
6. Change one setting, such as audio, reduced motion, difficulty, map, or
   targeting policy.
7. Continue until victory, loss, or 20 minutes have passed.
8. Restart or resume once, if the option appears relevant.

If the tester gets stuck, ask them to write down where and why before giving
help. The stuck moment is evidence.

## Entry and HUD verification (LE-P03)

Run these checks before the longer candidate script whenever the game-entry or
tactical HUD changes. They are deliberately short so a first-time player can
complete them without coaching.

1. Open a fresh game. Confirm that the board, towers, Gold, Lives, Wave, and
   Menu are not shown before choosing **Enter the dungeon**.
2. Choose **Enter the dungeon**, change a mission or custom-game option, and
   state what mission/difficulty is selected before pressing **Begin mission**.
3. Begin the mission. Confirm that Gold, Lives, and Wave are visible at the
   board's upper-left and Menu is visible at the upper-right without scrolling.
4. Open Menu, change one setting, close it, and confirm that the board remains
   visible and combat resumes only after the menu closes.
5. Repeat steps 1–4 with keyboard-only input and once on a narrow or touch
   viewport. Use **Back** from mission selection and confirm it returns to the
   title without exposing an interactive board.

Record the viewport size, input method, and any overlap, clipping, focus-loss,
or unclear status wording. A failed check is release-blocking for LE-P03.

## Feedback questions

Ask every tester these questions:

1. What browser, operating system, screen size, and input method did you use?
2. Did the game start without setup problems?
3. What was the first moment where you knew what to do?
4. What was the first moment where you felt unsure or confused?
5. Were tower placement, range, cost, and blocked tiles clear before clicking?
6. Were enemy movement, health, armour, speed bursts, elites, and the boss
   understandable while playing?
7. Did the wave briefing help you make a plan?
8. Did upgrades, specialisations, and targeting controls feel discoverable?
9. Did audio, visual effects, reduced motion, and contrast feel comfortable?
10. Did the game feel too easy, too hard, or about right? Which wave changed
    that feeling?
11. Did you encounter a bug, freeze, broken layout, missing text, or console
    error?
12. If you could change one thing before release, what would it be?
13. Would you play one more map or run? Why or why not?

## Bug report template

Use this format for defects:

```text
Candidate:
Browser and OS:
Screen size:
Input method:
Map:
Difficulty:
Seed, if visible:
Wave:
What happened:
What you expected:
Steps to reproduce:
Screenshot or replay attached:
Severity:
```

## Severity guide

- **Critical:** game cannot start, cannot complete a run, loses save/replay
  data, or crashes repeatedly.
- **High:** a core action is broken or misleading, such as placement, wave
  start, upgrades, targeting, or restart.
- **Medium:** a feature works but is confusing, badly balanced, visually
  unclear, or unreliable on a supported screen/input.
- **Low:** typo, minor polish, small layout imperfection, or nice-to-have
  suggestion.

## Acceptance criteria for LE-S29 feedback

The playtest is useful when:

- at least five testers complete the script without live coaching;
- feedback covers at least two browsers and two input methods;
- every critical/high issue has reproduction notes or is explicitly closed as
  not reproducible;
- balance feedback is linked to wave, map, difficulty, and outcome;
- accepted changes are frozen into bug-fix work only before Gate 1.

## No-new-feature rule

During the LE-S29 candidate window, do not add new gameplay features. Only
accept changes that fix defects, improve release-blocking clarity, or correct
packaging and documentation. Save new ideas for LE-S31 and beyond.
