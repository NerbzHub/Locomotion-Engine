import { describe, expect, it } from "vitest";
import { beginDefense, canInteractWithBoard, openMissionSelection, returnToLanding } from "../apps/game/src/entry-flow";

describe("game entry flow", () => {
  it("keeps the board unavailable until a mission begins", () => {
    const landing = returnToLanding();
    const missionSelection = openMissionSelection();
    const defense = beginDefense();

    expect(canInteractWithBoard(landing)).toBe(false);
    expect(canInteractWithBoard(missionSelection)).toBe(false);
    expect(canInteractWithBoard(defense)).toBe(true);
  });
});
