import { describe, expect, it } from "vitest";
import { GLOSSARY_ENTRIES } from "../apps/game/src/tutorial";

describe("tutorial content", () => {
  it("covers the authored enemy and intermission mechanics", () => {
    expect(GLOSSARY_ENTRIES.map(([term]) => term)).toEqual(expect.arrayContaining(["Beetle", "Wisp", "Elite", "Warden", "Intermission"]));
  });
});
