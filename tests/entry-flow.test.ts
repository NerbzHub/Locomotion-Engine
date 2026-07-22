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

  it("returns to a non-interactive title state after mission selection is cancelled", () => {
    const missionSelection = openMissionSelection();

    expect(canInteractWithBoard(missionSelection)).toBe(false);
    expect(returnToLanding()).toBe("landing");
    expect(canInteractWithBoard(returnToLanding())).toBe(false);
  });
});
