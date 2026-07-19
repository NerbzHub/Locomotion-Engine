# Simulation Fuzzing

The test suite runs seeded, generated player actions across 20 game seeds and
12,000 fixed simulation frames. Each
iteration attempts placements, starts waves, and advances fixed simulation time.

The invariant failure message includes the game seed and frame. Reproduce a
failure by creating `createGame(seed)` and replaying the same seeded input
generator from `tests/fuzz.test.ts`.

Current invariants:

- gold and lives never become negative;
- wave index remains within authored bounds;
- tower cooldown/level values remain finite and valid;
- enemies retain finite health/distance and positive maximum health.
