import { describe, expect, it } from "vitest";
import { SeededRandom } from "../packages/engine/src";

describe("SeededRandom", () => {
  it("repeats a sequence for the same seed", () => {
    const first = new SeededRandom(12345);
    const second = new SeededRandom(12345);

    const firstSequence = Array.from({ length: 8 }, () => first.next());
    const secondSequence = Array.from({ length: 8 }, () => second.next());

    expect(firstSequence).toEqual(secondSequence);
    expect(firstSequence.every((value) => value >= 0 && value < 1)).toBe(true);
  });
});
