import { describe, expect, it } from "vitest";
import { completeCampaignNode, createProfile, isCampaignNodeUnlocked } from "../apps/game/src/progression";

describe("campaign progression", () => {
  it("unlocks the next authored campaign node only after its predecessor completes", () => {
    const profile = createProfile();
    expect(isCampaignNodeUnlocked(profile, "gate-watch")).toBe(true);
    expect(isCampaignNodeUnlocked(profile, "crossroads-stand")).toBe(false);
    const completed = completeCampaignNode(profile, "gate-watch");
    expect(isCampaignNodeUnlocked(completed, "crossroads-stand")).toBe(true);
  });
});
