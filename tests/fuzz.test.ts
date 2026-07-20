import { describe, expect, it } from "vitest";
import { SeededRandom } from "../packages/engine/src";
import { BOARD, TOTAL_WAVES, createGame, placeTower, startWave, updateGame } from "../apps/game/src/simulation";

describe("seeded simulation fuzzing", () => {
  it("preserves core invariants across generated player inputs", () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const actions = new SeededRandom(seed * 91);
      const state = createGame(seed);
      for (let frame = 0; frame < 600; frame += 1) {
        if (frame % 45 === 0) {
          const cell = { column: Math.floor(actions.between(0, BOARD.columns)), row: Math.floor(actions.between(0, BOARD.rows)) };
          placeTower(state, cell, actions.next() > 0.7 ? "mage" : actions.next() > 0.4 ? "sentinel" : "archer");
        }
        if (frame % 120 === 0) startWave(state);
        updateGame(state, 1 / 60);

        const context = `seed ${seed}, frame ${frame}`;
        expect(state.gold, context).toBeGreaterThanOrEqual(0);
        expect(state.lives, context).toBeGreaterThanOrEqual(0);
        expect(state.wave, context).toBeGreaterThanOrEqual(0);
        expect(state.wave, context).toBeLessThanOrEqual(TOTAL_WAVES);
        expect(state.towers.every((tower) => Number.isFinite(tower.cooldownSeconds) && tower.level >= 0), context).toBe(true);
        expect(state.enemies.every((enemy) => Number.isFinite(enemy.health) && Number.isFinite(enemy.distance) && enemy.maximumHealth > 0), context).toBe(true);
      }
    }
  }, 15_000);
});
