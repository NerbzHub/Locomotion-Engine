import { describe, expect, it } from "vitest";
import { createGame, updateGame } from "../apps/game/src/simulation";

describe("simulation performance budget", () => {
  it("advances a crowded deterministic board within the local CI budget", () => {
    const state = createGame(123);
    for (let index = 0; index < 80; index += 1) {
      state.enemies.push({ id: state.world.create("enemy").id, kind: "slime", isElite: false, mapId: "gate", health: 24, maximumHealth: 24, speed: 20, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 1, slowRemainingSeconds: 0, distance: index % 20, reward: 1 });
    }
    for (let index = 0; index < 12; index += 1) {
      state.towers.push({ id: state.world.create("tower").id, kind: index % 3 === 0 ? "sentinel" : index % 2 === 0 ? "mage" : "archer", cell: { column: index % 6, row: index < 6 ? 0 : 7 }, level: 0, targetPolicy: "nearest-exit", cooldownSeconds: 0 });
    }

    const started = performance.now();
    for (let frame = 0; frame < 600; frame += 1) updateGame(state, 1 / 60);
    const elapsed = performance.now() - started;

    expect(elapsed).toBeLessThan(3_000);
  });
});
