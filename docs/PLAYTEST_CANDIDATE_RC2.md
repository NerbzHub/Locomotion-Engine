# Dungeon Defense 0.1.0-rc.2 — Playtest Candidate

**Status:** Accepted on 2026-07-23. RC2 feedback and verification informed the
final `v0.1.0` Gate 1 release.

## Why RC2 exists

Initial playtesting produced FI4 and FI5: setup presented duplicate choices
and gameplay repeated information already conveyed by the selected tower and
board visuals. RC2 contains those fixes. It is a new candidate so its feedback
is not mixed with observations made before the UI change.

RC1 was preparation only and is superseded by this document; it was not a
distributed build record.

## Candidate identity

| Field | Value |
| --- | --- |
| Candidate name | `dungeon-defense-0.1.0-rc.2` |
| Package version | `0.1.0-rc.2` |
| Source revision | Superseded by final release tag `v0.1.0`. |
| Build date | 2026-07-23 |
| Distribution | Controlled tester build; feedback cycle accepted. |
| Tester guide | [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md) |
| Previous candidate | RC1 preparation superseded; do not combine feedback. |

## What this candidate verifies

- Entry is deliberate: title → level → difficulty → game.
- No duplicate custom map controls or selected-scenario text distracts from
  setup.
- Gameplay presents the next tactical decision, not a repeated explanation of
  the selected tower.
- Gold, Lives, Wave, and Menu remain visible in the board safe zones.
- The narrow layout keeps tower selection and Start Wave reachable.

## Automated evidence

The submitted Gate Watch / Standard replay is held as a regression test in
`tests/rc2-playthrough.test.ts`. It verifies the recorded two-wave combat
sequence; it is not a full-victory record and does not replace the manual input
and viewport checks below.

## Distribution blockers

- [x] Complete and record the five updated LE-P03 entry/HUD checks using the
  supported primary paths: desktop mouse and narrow touch. Keyboard board
  placement/cancellation remains available as a secondary path.
- [x] Complete and record the four RC2 FI4/FI5 regression checks in
  [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md).
- [x] Run `pnpm install --frozen-lockfile`.
- [x] Run `pnpm run check` successfully.
- [x] Run `pnpm run build` successfully.
- [x] Smoke-test the exact `dist/` artifact in supported desktop and mobile browsers.
- [x] Record the source revision, build date, browser support, and known
  limitations in this document or the tester invitation.
- [x] Keep `LICENSE.md` and `NOTICE.md` with any source archive.
- [x] Freeze gameplay and content changes while testers use this candidate.

## Known limitations before distribution

- Full keyboard-only setup/menu traversal is intentionally outside Gate 1
  scope; keyboard board placement/cancellation remains available.
- The repository's all-rights-reserved, no-licence policy remains in effect.

## Tester hand-off

Send testers the candidate link or archive together with:

1. [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md);
2. the candidate name and source commit;
3. the supported-browser statement and known limitations; and
4. the reminder that they must not redistribute or reuse the source/build.

Record feedback by `dungeon-defense-0.1.0-rc.2`. Do not mix it with the
earlier FI4/FI5 observations unless the issue is reproduced in RC2.
