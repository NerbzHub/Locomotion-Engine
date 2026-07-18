import { describe, expect, it } from "vitest";
import { TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "../apps/game/src/content";
import { createGame, gameSnapshot, isBuildable, placeTower, startWave, updateGame } from "../apps/game/src/simulation";

describe("Dungeon Defense simulation", () => {
  it("rejects towers on the enemy path", () => {
    const state = createGame();

    expect(isBuildable({ column: 0, row: 3 })).toBe(false);
    expect(placeTower(state, { column: 0, row: 3 })).toBe(false);
    expect(state.gold).toBe(50);
  });

  it("instantiates a tower from its selected definition", () => {
    const state = createGame();

    expect(placeTower(state, { column: 1, row: 1 }, "mage")).toBe(true);
    expect(state.gold).toBe(50 - TOWER_DEFINITIONS.mage.cost);
    expect(state.towers[0].kind).toBe("mage");
    expect(placeTower(state, { column: 5, row: 3 }, "archer")).toBe(false);
    expect(state.message).toContain("Not enough gold");
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

  it("ends in victory after the final wave is cleared", () => {
    const state = createGame();
    state.wave = WAVE_DEFINITIONS.length;
    state.waveActive = true;

    updateGame(state, 1 / 60);

    expect(state.gameWon).toBe(true);
    expect(state.message).toContain("dungeon is safe");
    expect(startWave(state)).toBe(false);
  });

  it("ends in defeat when no lives remain", () => {
    const state = createGame();
    state.lives = 0;

    expect(startWave(state)).toBe(false);
    expect(state.gameOver).toBe(true);
    expect(state.message).toContain("dungeon has fallen");
  });
});
