import { describe, expect, it } from "vitest";
import { placeTower, startWave, updateGame, upgradeTower } from "../apps/game/src/simulation";
import { restoreIntermission, serialiseIntermission } from "../apps/game/src/save";
import { createGame } from "../apps/game/src/simulation";

describe("intermission saves", () => {
  it("round-trips an intermission with its seed, map, tower state, and random state", () => {
    const original = createGame(88, "crossroads", "standard", "crossroads-stand");
    placeTower(original, { column: 1, row: 1 }, "archer");
    original.gold = 50;
    upgradeTower(original, original.towers[0].id);
    const serialised = serialiseIntermission(original);

    expect(serialised).toBeDefined();
    const restored = restoreIntermission(serialised ?? "");
    expect(restored.ok).toBe(true);
    if (!restored.ok) return;
    expect(restored.state.mapId).toBe("crossroads");
    expect(restored.state.missionId).toBe("crossroads-stand");
    expect(restored.state.seed).toBe(88);
    expect(restored.state.random.state()).toBe(original.random.state());
    expect(restored.state.towers).toMatchObject([{ kind: "archer", level: 1, cell: { column: 1, row: 1 } }]);
  });

  it("rejects mid-wave and malformed saves", () => {
    const state = createGame();
    startWave(state);
    updateGame(state, 1 / 60);

    expect(serialiseIntermission(state)).toBeUndefined();
    expect(restoreIntermission("not json")).toMatchObject({ ok: false });
  });
});
