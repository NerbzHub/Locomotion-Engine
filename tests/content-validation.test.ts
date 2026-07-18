import { describe, expect, it } from "vitest";
import { GAME_CONTENT } from "../apps/game/src/content";
import type { GameContent } from "../apps/game/src/content";
import { assertValidGameContent, InvalidGameContentError, validateGameContent } from "../apps/game/src/content-validation";

describe("game content validation", () => {
  it("accepts the authored game content", () => {
    const report = assertValidGameContent(GAME_CONTENT);

    expect(report.issues).toEqual([]);
    expect(report.towerCount).toBe(2);
    expect(report.enemyCount).toBe(3);
    expect(report.waveCount).toBe(3);
  });

  it("reports contextual validation failures before simulation starts", () => {
    const invalidContent: GameContent = {
      towers: {
        invalidTower: {
          ...GAME_CONTENT.towers.archer,
          cost: 0,
          projectileColor: "blue",
          upgrades: [{ ...GAME_CONTENT.towers.archer.upgrades[0], cooldownMultiplier: 1.2 }]
        }
      },
      enemies: {
        invalidEnemy: {
          ...GAME_CONTENT.enemies.slime,
          speedRange: [80, 10],
          radius: 0,
          trait: { kind: "speed-burst", intervalSeconds: 1, durationSeconds: 1, speedMultiplier: 1 }
        }
      },
      maps: GAME_CONTENT.maps,
      difficulties: GAME_CONTENT.difficulties,
      waves: [
        { enemyKinds: [], clearBonus: -1 },
        { enemyKinds: ["missing-enemy"], clearBonus: 0 }
      ]
    };

    const report = validateGameContent(invalidContent);

    expect(report.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: "towers.invalidTower.cost" }),
      expect.objectContaining({ path: "towers.invalidTower.projectileColor" }),
      expect.objectContaining({ path: "towers.invalidTower.upgrades[0].cooldownMultiplier" }),
      expect.objectContaining({ path: "enemies.invalidEnemy.speedRange" }),
      expect.objectContaining({ path: "enemies.invalidEnemy.trait.durationSeconds" }),
      expect.objectContaining({ path: "enemies.invalidEnemy.trait.speedMultiplier" }),
      expect.objectContaining({ path: "waves[0].enemyKinds" }),
      expect.objectContaining({ path: "waves[1].enemyKinds[0]" })
    ]));
    expect(() => assertValidGameContent(invalidContent)).toThrow(InvalidGameContentError);
  });
});
