import { describe, expect, it } from "vitest";
import { createGame, gameSnapshot, isBuildable, placeTower, startWave, updateGame } from "../apps/game/src/simulation";

describe("Dungeon Defense simulation", () => {
  it("rejects towers on the enemy path", () => {
    const state = createGame();

    expect(isBuildable({ column: 0, row: 3 })).toBe(false);
    expect(placeTower(state, { column: 0, row: 3 })).toBe(false);
    expect(state.gold).toBe(50);
  });

  it("produces the same state for the same seed and inputs", () => {
    const first = createGame(77);
    const second = createGame(77);
    const inputs = [
      { column: 1, row: 1 },
      { column: 5, row: 3 }
    ];

    for (const input of inputs) {
      expect(placeTower(first, input)).toBe(true);
      expect(placeTower(second, input)).toBe(true);
    }
    startWave(first);
    startWave(second);

    for (let frame = 0; frame < 1_800; frame += 1) {
      updateGame(first, 1 / 60);
      updateGame(second, 1 / 60);
    }

    expect(gameSnapshot(first)).toEqual(gameSnapshot(second));
  });
});
