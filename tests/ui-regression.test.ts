import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8");

describe("post-release UI regression guards", () => {
  it("keeps mission setup to level, difficulty, then begin", () => {
    expect(indexHtml).toContain("1. Select level");
    expect(indexHtml).toContain("2. Select difficulty");
    expect(indexHtml).toContain('id="begin-mission"');

    expect(indexHtml).not.toContain('id="mission-context"');
    expect(indexHtml).not.toContain("Custom game options");
    expect(indexHtml).not.toContain('id="select-gate"');
    expect(indexHtml).not.toContain('id="select-crossroads"');
    expect(indexHtml).not.toContain('id="mission-selection-summary"');
  });

  it("does not restore redundant tactical placement copy", () => {
    expect(indexHtml).not.toContain('id="selected-tower-summary"');
    expect(indexHtml).not.toContain('class="context-message"');
    expect(indexHtml).toContain('id="message" class="sr-only" aria-live="polite"');
  });
});
