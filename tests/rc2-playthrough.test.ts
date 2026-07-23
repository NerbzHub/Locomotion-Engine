import { describe, expect, it } from "vitest";
import { importReplay, playReplay } from "../apps/game/src/replay";

const submittedGateWatchReplay = {
  version: 1,
  seed: 4_242,
  mapId: "gate",
  difficultyId: "standard",
  actions: [
    { step: 143, type: "place", cell: { column: 2, row: 2 }, kind: "archer" },
    { step: 265, type: "place", cell: { column: 4, row: 3 }, kind: "archer" },
    { step: 361, type: "start-wave" },
    { step: 1_066, type: "start-wave" },
    { step: 1_872, type: "start-wave" },
    { step: 1_973, type: "place", cell: { column: 1, row: 2 }, kind: "archer" }
  ]
};

describe("RC2 submitted playthrough", () => {
  it("replays the recorded Gate Watch / Standard actions to the wave-two intermission", () => {
    const replay = importReplay(JSON.stringify(submittedGateWatchReplay));

    expect(replay).toBeDefined();

    // The action export records inputs, not the final idle frames. The final
    // Start Wave input occurs before wave two resolves, so it is not accepted
    // by the simulation; the recorded run therefore ends after wave two.
    const finalState = playReplay(replay!, 12_000);

    expect(finalState.gameWon).toBe(false);
    expect(finalState.gameOver).toBe(false);
    expect(finalState.phase).toBe("intermission");
    expect(finalState.wave).toBe(2);
    expect(finalState.lives).toBe(10);
    expect(finalState.towers).toHaveLength(3);
  });
});
