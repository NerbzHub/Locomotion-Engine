import { describe, expect, it } from "vitest";
import { exportReplay, importReplay, playReplay } from "../apps/game/src/replay";
import { createGame, gameSnapshot, placeTower, startWave, updateGame } from "../apps/game/src/simulation";

describe("replays", () => {
  it("exports, imports, and reproduces the same deterministic run", () => {
    const original = createGame(77);
    placeTower(original, { column: 1, row: 1 }, "archer");
    startWave(original);
    for (let frame = 0; frame < 120; frame += 1) updateGame(original, 1 / 60);
    const replay = importReplay(exportReplay(createGame(77), [{ step: 0, type: "place", cell: { column: 1, row: 1 }, kind: "archer" }, { step: 0, type: "start-wave" }]));

    expect(replay).toBeDefined();
    expect(gameSnapshot(playReplay(replay!, 120))).toEqual(gameSnapshot(original));
  });
});
