# Dungeon Defense v0.1.0 — 2026-07-23

## Highlights

- First complete deterministic Dungeon Defense vertical slice.
- Campaign entry now follows level → difficulty → begin.
- Tactical HUD keeps Gold, Lives, Wave, and Menu at the board edge.
- Tower placement has a clear in-world confirmation control and selected range
  feedback.

## Changed

- Setup and gameplay remove repeated scenario and tower-detail copy so the
  next player decision stays prominent.
- Desktop mouse and narrow touch are Gate 1's supported primary paths.

## Fixed

- Board interaction is unavailable until a mission has deliberately begun.
- The narrow command dock keeps Start Wave reachable without horizontal
  scrolling.

## Known limitations

- Full keyboard-only traversal of every setup and menu control is outside Gate
  1 scope. Keyboard board placement and cancellation remain available.
- The game is released as a browser build; a desktop wrapper is deferred.

## Verification

- `pnpm install --frozen-lockfile`
- `pnpm run check`
- `pnpm run build`
- Desktop mouse and narrow touch smoke checks, plus structured RC2 feedback.

## Attribution and licence

- Copyright and no-reuse terms: [LICENSE.md](../LICENSE.md)
- Third-party notices: [NOTICE.md](../NOTICE.md)
