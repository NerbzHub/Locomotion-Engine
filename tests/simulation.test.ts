import { describe, expect, it } from "vitest";
import { ENEMY_DEFINITIONS, TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "../apps/game/src/content";
import { createGame, gameSnapshot, isBuildable, placementStatus, placeTower, selectNearestToExitTarget, startWave, towerStats, updateGame, upgradeTower } from "../apps/game/src/simulation";

describe("Dungeon Defense simulation", () => {
  it("rejects towers on the enemy path", () => {
    const state = createGame();

    expect(isBuildable({ column: 0, row: 3 })).toBe(false);
    expect(placeTower(state, { column: 0, row: 3 })).toBe(false);
    expect(state.gold).toBe(50);
  });

  it("instantiates a tower from its selected definition", () => {
    const state = createGame();

    expect(placeTower(state, { column: 1, row: 1 }, "mage")).toBe(true);
    expect(state.gold).toBe(50 - TOWER_DEFINITIONS.mage.cost);
    expect(state.towers[0].kind).toBe("mage");
    expect(placeTower(state, { column: 5, row: 3 }, "archer")).toBe(false);
    expect(state.message).toContain("Not enough gold");
  });

  it("reports placement feedback without changing the game state", () => {
    const state = createGame();
    const before = gameSnapshot(state);

    expect(placementStatus(state, { column: 0, row: 3 }, "archer")).toBe("path");
    expect(placementStatus(state, { column: 1, row: 1 }, "archer")).toBe("valid");
    expect(gameSnapshot(state)).toEqual(before);
    placeTower(state, { column: 1, row: 1 });
    expect(placementStatus(state, { column: 1, row: 1 }, "archer")).toBe("occupied");
  });

  it("targets the in-range enemy nearest to the exit", () => {
    const state = createGame();
    const first = state.world.create("enemy").id;
    const second = state.world.create("enemy").id;
    const enemies = [
      { id: first, kind: "slime" as const, health: 10, maximumHealth: 10, speed: 1, distance: 24, reward: 1 },
      { id: second, kind: "slime" as const, health: 10, maximumHealth: 10, speed: 1, distance: 160, reward: 1 }
    ];

    expect(selectNearestToExitTarget(enemies, { x: 64, y: 224 }, 200)?.id).toBe(second);
  });

  it("upgrades a tower using its next authored tier", () => {
    const state = createGame();
    placeTower(state, { column: 1, row: 1 }, "archer");
    const tower = state.towers[0];
    const before = towerStats(tower);
    const goldBefore = state.gold;

    expect(upgradeTower(state, tower.id)).toBe(true);
    expect(tower.level).toBe(1);
    expect(state.gold).toBe(goldBefore - TOWER_DEFINITIONS.archer.upgrades[0].cost);
    expect(towerStats(tower).range).toBeGreaterThan(before.range);
    expect(towerStats(tower).projectileDamage).toBeGreaterThan(before.projectileDamage);
  });

  it("instantiates the authored enemy composition for each wave", () => {
    const state = createGame(55);
    state.wave = 1;

    expect(startWave(state)).toBe(true);
    expect(state.pendingSpawns.map((spawn) => spawn.kind)).toEqual(WAVE_DEFINITIONS[1].enemyKinds);
    expect(state.pendingSpawns.some((spawn) => spawn.kind === "beetle")).toBe(true);
    expect(ENEMY_DEFINITIONS.beetle.baseHealth).toBeGreaterThan(ENEMY_DEFINITIONS.slime.baseHealth);
  });

  it("produces the same state for the same seed and inputs", () => {
    const first = createGame(77);
    const second = createGame(77);
    const inputs = [
      { column: 1, row: 1 },
      { column: 5, row: 3 }
    ];

    for (const input of inputs) {
      expect(placeTower(first, input)).toBe(true);
      expect(placeTower(second, input)).toBe(true);
    }
    startWave(first);
    startWave(second);

    for (let frame = 0; frame < 1_800; frame += 1) {
      updateGame(first, 1 / 60);
      updateGame(second, 1 / 60);
    }

    expect(gameSnapshot(first)).toEqual(gameSnapshot(second));
  });

  it("ends in victory after the final wave is cleared", () => {
    const state = createGame();
    state.wave = WAVE_DEFINITIONS.length;
    state.waveActive = true;

    updateGame(state, 1 / 60);

    expect(state.gameWon).toBe(true);
    expect(state.message).toContain("dungeon is safe");
    expect(startWave(state)).toBe(false);
  });

  it("ends in defeat when no lives remain", () => {
    const state = createGame();
    state.lives = 0;

    expect(startWave(state)).toBe(false);
    expect(state.gameOver).toBe(true);
    expect(state.message).toContain("dungeon has fallen");
  });
});
