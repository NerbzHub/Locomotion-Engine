import { describe, expect, it } from "vitest";
import { normaliseAudioSettings } from "../apps/game/src/audio";

describe("audio settings", () => {
  it("clamps audio volume and defaults to safe enabled settings", () => {
    expect(normaliseAudioSettings(undefined)).toEqual({ muted: false, volume: 0.35 });
    expect(normaliseAudioSettings({ muted: true, volume: 4 })).toEqual({ muted: true, volume: 1 });
  });
});
