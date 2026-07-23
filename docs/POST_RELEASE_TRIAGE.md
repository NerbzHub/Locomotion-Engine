# Post-release triage and patch policy

**Applies to:** Dungeon Defense `v0.1.x` maintenance  
**Maintenance window:** 2026-07-23 to 2026-07-30  
**Owner:** project maintainer

## Purpose

Keep post-release work focused on confirmed defects and supported-player
experience. New modes, maps, enemies, and design experiments belong in the
next planned feature tranche, not in a patch release.

## Intake and decision flow

1. Record the report using the bug template in
   [PLAYTESTER_CRITERIA.md](PLAYTESTER_CRITERIA.md), including device, browser,
   viewport, input method, and evidence.
2. Check whether it is reproducible on the current release build. Link a
   replay, screenshot, console error, or concise reproduction steps.
3. Assign a severity and one decision: **fix**, **defer**, **not reproducible**,
   or **by design**.
4. Every accepted fix must add or update regression coverage before merge. Use
   an automated test when the behaviour is deterministic; otherwise add a
   named manual check to the playtester criteria.
5. Release a `v0.1.x` patch only after its fixes, verification evidence, known
   limitations, and release note are recorded.

## Severity and response target

| Severity | Meaning | Response during this window |
| --- | --- | --- |
| Critical | Cannot start/finish, repeated crash, or data loss | Stop distribution; reproduce and fix or withdraw the build. |
| High | A core action—placement, waves, upgrades, targeting, save/load, or restart—is broken or materially misleading | Assign an owner and reproduction record before the next work session; fix or document a decision. |
| Medium | Supported play works, but clarity, balance, layout, or reliability is materially harmed | Triage during the window; accept only when evidence shows a repeatable player impact. |
| Low | Minor polish, copy, or non-blocking layout issue | Log for a later feature/planning sprint unless it is part of an already accepted patch. |

## Current defect register

| Report | Severity | Evidence | Decision | Regression coverage | Status |
| --- | --- | --- | --- | --- | --- |
| FI4: duplicate mission setup information | Medium | FI4 desktop and mobile annotations | Fixed in `v0.1.0` | `tests/ui-regression.test.ts` and RC2 checks 1–2 | Closed |
| FI5: repeated tactical information | Medium | FI5 desktop annotation | Fixed in `v0.1.0` | `tests/ui-regression.test.ts` and RC2 checks 3–4 | Closed |

There are no open critical or high-severity reports at the start of this
window. A new report must not be marked closed without reproduction evidence
or a written reason for the decision.

## Patch release note format

Create `docs/RELEASE_NOTES_X.Y.Z.md` from this format for every patch:

```md
# Dungeon Defense vX.Y.Z — YYYY-MM-DD

## Fixed

- [Report ID] Player-visible result and affected supported path.

## Changed

- Optional compatible operational or documentation change.

## Known limitations

- Remaining relevant limitation, or “No changes from v0.1.0.”

## Verification

- `pnpm install --frozen-lockfile`
- `pnpm run check`
- `pnpm run build`
- Manual check: exact browser/device/input flow exercised.

## Traceability

- Source revision: commit/tag
- Report IDs: FI#/issue IDs
- Regression test or manual-check reference
```

## Close-out checklist

- [x] A severity-based policy and fixed maintenance window are recorded.
- [x] Accepted FI4/FI5 fixes have automated and manual regression references.
- [x] No critical/high report lacks an owner, reproduction record, or decision.
- [x] A patch-release note format is ready before the first `v0.1.x` patch.
