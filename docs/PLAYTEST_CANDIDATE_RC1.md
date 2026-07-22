# Dungeon Defense 0.1.0-rc.1 — Playtest Candidate

**Status:** Preparation only. Do not distribute this candidate until every
distribution blocker below is checked.

## Purpose

This candidate is the controlled build used for LE-S29 external playtesting.
It tests whether a new player can enter a mission, understand the tactical HUD,
place towers, complete a wave, and report issues with enough context to
reproduce them.

## Candidate identity

| Field | Value |
| --- | --- |
| Candidate name | `dungeon-defense-0.1.0-rc.1` |
| Version | `0.1.0-rc.1` |
| Source commit | Record the final commit hash immediately before building. |
| Build date | Record when the exact candidate artifact is produced. |
| Distribution | Private hosted link or private archive only. |
| Tester guide | [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md) |

## Distribution blockers

- [ ] Complete and record the five LE-P03 entry/HUD checks on keyboard-only
  input and a narrow or touch viewport.
- [ ] Run `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm run check` successfully.
- [ ] Run `pnpm run build` successfully.
- [ ] Smoke-test the exact `dist/` artifact in a supported browser.
- [ ] Record the source commit, build date, browser support, and known
  limitations in this document or the tester invitation.
- [ ] Keep `LICENSE.md` and `NOTICE.md` with any source archive.
- [ ] Freeze gameplay and content changes while testers use this candidate.

## Known limitations before distribution

- The LE-P03 first-time-player, keyboard, and narrow/touch viewport checks are
  prepared but still need to be run and recorded on real devices/browsers.
- This candidate is for private tester evaluation only. The repository's
  all-rights-reserved, no-licence policy remains in effect.

## Tester hand-off

Send testers the candidate link or archive together with:

1. [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md);
2. the candidate name and source commit;
3. the supported-browser statement and any known limitations; and
4. the reminder that they must not redistribute or reuse the source/build.

Record feedback by candidate name. Do not mix feedback from a later build with
`dungeon-defense-0.1.0-rc.1` unless the issue is reproduced in both.
