import { describe, expect, it } from "vitest";
import { ENEMY_DEFINITIONS, TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "../apps/game/src/content";
import { applyDamage, createGame, enemySpeed, gameSnapshot, isBuildable, nextWaveBriefing, placementStatus, placeTower, selectNearestToExitTarget, selectTarget, setTowerTargetPolicy, specialiseTower, startWave, telemetryReport, towerStats, updateGame, upgradeTower } from "../apps/game/src/simulation";

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

  it("uses authored map content for buildability and spawned enemy paths", () => {
    const state = createGame(55, "crossroads");

    expect(state.mapId).toBe("crossroads");
    expect(isBuildable({ column: 0, row: 5 }, "gate")).toBe(true);
    expect(isBuildable({ column: 0, row: 5 }, "crossroads")).toBe(false);
    startWave(state);
    updateGame(state, 1 / 60);
    expect(state.enemies[0].mapId).toBe("crossroads");
  });

  it("applies authored difficulty resources and enemy health deterministically", () => {
    const casual = createGame(55, "gate", "casual");
    const veteran = createGame(55, "gate", "veteran");

    expect(casual.gold).toBe(65);
    expect(casual.lives).toBe(14);
    expect(veteran.gold).toBe(45);
    expect(veteran.lives).toBe(7);
    startWave(casual);
    startWave(veteran);
    expect(veteran.pendingSpawns[0].health).toBeGreaterThan(casual.pendingSpawns[0].health);
  });

  it("targets the in-range enemy nearest to the exit", () => {
    const state = createGame();
    const first = state.world.create("enemy").id;
    const second = state.world.create("enemy").id;
    const enemies = [
      { id: first, kind: "slime" as const, isElite: false, mapId: "gate" as const, health: 10, maximumHealth: 10, speed: 1, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 1, slowRemainingSeconds: 0, distance: 24, reward: 1 },
      { id: second, kind: "slime" as const, isElite: false, mapId: "gate" as const, health: 10, maximumHealth: 10, speed: 1, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 1, slowRemainingSeconds: 0, distance: 160, reward: 1 }
    ];

    expect(selectNearestToExitTarget(enemies, { x: 64, y: 224 }, 200)?.id).toBe(second);
  });

  it("uses each named targeting policy with stable tie-breaking", () => {
    const state = createGame();
    const first = state.world.create("enemy").id;
    const second = state.world.create("enemy").id;
    const enemies = [
      { id: first, kind: "slime" as const, isElite: false, mapId: "gate" as const, health: 40, maximumHealth: 40, speed: 1, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 1, slowRemainingSeconds: 0, distance: 40, reward: 1 },
      { id: second, kind: "slime" as const, isElite: false, mapId: "gate" as const, health: 10, maximumHealth: 10, speed: 1, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 1, slowRemainingSeconds: 0, distance: 120, reward: 1 }
    ];

    expect(selectTarget(enemies, { x: 0, y: 224 }, 300, "nearest-exit")?.id).toBe(second);
    expect(selectTarget(enemies, { x: 0, y: 224 }, 300, "closest")?.id).toBe(first);
    expect(selectTarget(enemies, { x: 0, y: 224 }, 300, "strongest")?.id).toBe(first);
    expect(selectTarget(enemies, { x: 0, y: 224 }, 300, "weakest")?.id).toBe(second);
    placeTower(state, { column: 1, row: 1 });
    expect(setTowerTargetPolicy(state, state.towers[0].id, "weakest")).toBe(true);
    expect(state.towers[0].targetPolicy).toBe("weakest");
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

  it("applies one irreversible specialisation to only its chosen tower", () => {
    const state = createGame();
    state.gold = 200;
    placeTower(state, { column: 1, row: 1 }, "archer");
    placeTower(state, { column: 2, row: 1 }, "archer");
    const [first, second] = state.towers;
    upgradeTower(state, first.id);
    upgradeTower(state, first.id);
    const before = towerStats(first);

    expect(specialiseTower(state, first.id, "longbow")).toBe(true);
    expect(first.specialisationId).toBe("longbow");
    expect(towerStats(first).range).toBeGreaterThan(before.range);
    expect(second.specialisationId).toBeUndefined();
    expect(specialiseTower(state, first.id, "rapid")).toBe(false);
  });

  it("instantiates the authored enemy composition for each wave", () => {
    const state = createGame(55);
    state.wave = 1;

    expect(startWave(state)).toBe(true);
    expect(state.pendingSpawns.map((spawn) => spawn.kind)).toEqual(WAVE_DEFINITIONS[1].enemyKinds);
    expect(state.pendingSpawns.some((spawn) => spawn.kind === "beetle")).toBe(true);
    expect(ENEMY_DEFINITIONS.beetle.baseHealth).toBeGreaterThan(ENEMY_DEFINITIONS.slime.baseHealth);
  });

  it("marks authored elite wave entries with stronger health and rewards", () => {
    const state = createGame(55);
    state.wave = 2;
    startWave(state);
    const elite = state.pendingSpawns.find((spawn) => spawn.isElite);

    expect(elite).toBeDefined();
    expect(elite?.kind).toBe("beetle");
    expect(elite?.reward).toBe(ENEMY_DEFINITIONS.beetle.reward * 2);
  });

  it("adds the authored Warden as the final-wave boss", () => {
    const state = createGame(55);
    state.wave = 2;
    startWave(state);
    const boss = state.pendingSpawns.find((spawn) => spawn.isBoss);

    expect(boss).toMatchObject({ kind: "beetle", isBoss: true, reward: 40 });
    expect(boss?.health).toBeGreaterThan(ENEMY_DEFINITIONS.beetle.baseHealth * 3);
  });

  it("moves between explicit intermission and wave phases with a readable briefing", () => {
    const state = createGame(55);

    expect(state.phase).toBe("intermission");
    expect(nextWaveBriefing(state)).toContain("7 Slimes");
    expect(nextWaveBriefing(state)).toContain("12 gold");
    expect(startWave(state)).toBe(true);
    expect(state.phase).toBe("wave");

    state.pendingSpawns.splice(0);
    state.enemies.splice(0);
    updateGame(state, 1 / 60);

    expect(state.phase).toBe("intermission");
    expect(state.gold).toBe(50 + WAVE_DEFINITIONS[0].clearBonus);
    expect(state.message).toContain("+12 gold");
  });

  it("records a bounded deterministic event history for developer diagnostics", () => {
    const state = createGame(55);

    placeTower(state, { column: 1, row: 1 });
    startWave(state);
    updateGame(state, 1 / 60);

    expect(state.events.map((event) => event.kind)).toEqual(["placement", "wave-start", "spawn"]);
    expect(state.events[2].step).toBe(1);
  });

  it("records a deterministic summary when a wave is cleared", () => {
    const state = createGame(55);
    startWave(state);
    state.pendingSpawns.splice(0);
    updateGame(state, 1 / 60);

    expect(state.waveReports).toHaveLength(1);
    expect(state.waveReports[0]).toMatchObject({ wave: 1, goldAtStart: 50, goldAtEnd: 62, livesAtStart: 10, livesAtEnd: 10 });
    expect(telemetryReport(state)).toContain('"seed": 55');
  });

  it("applies authored Beetle armour to incoming damage", () => {
    const state = createGame();
    const beetle = {
      id: state.world.create("enemy").id,
      kind: "beetle" as const,
      isElite: false,
      mapId: "gate" as const,
      health: 30,
      maximumHealth: 30,
      speed: 30,
      armorDamageReduction: ENEMY_DEFINITIONS.beetle.trait.flatDamageReduction,
      burstCooldownSeconds: 0,
      burstRemainingSeconds: 0,
      slowMultiplier: 1,
      slowRemainingSeconds: 0,
      distance: 0,
      reward: 12
    };

    expect(applyDamage(beetle, 8)).toBe(5);
    expect(beetle.health).toBe(25);
  });

  it("uses the authored Wisp multiplier only while its burst is active", () => {
    const state = createGame();
    const wisp = {
      id: state.world.create("enemy").id,
      kind: "wisp" as const,
      isElite: false,
      mapId: "gate" as const,
      health: 20,
      maximumHealth: 20,
      speed: 60,
      armorDamageReduction: 0,
      burstCooldownSeconds: 2,
      burstRemainingSeconds: 0,
      slowMultiplier: 1,
      slowRemainingSeconds: 0,
      distance: 0,
      reward: 8
    };

    expect(enemySpeed(wisp)).toBe(60);
    wisp.burstRemainingSeconds = ENEMY_DEFINITIONS.wisp.trait.durationSeconds;
    expect(enemySpeed(wisp)).toBe(60 * ENEMY_DEFINITIONS.wisp.trait.speedMultiplier);
  });

  it("expires a slow effect and restores the enemy's base movement multiplier", () => {
    const state = createGame();
    state.enemies.push({ id: state.world.create("enemy").id, kind: "slime", isElite: false, mapId: "gate", health: 20, maximumHealth: 20, speed: 40, armorDamageReduction: 0, burstCooldownSeconds: 0, burstRemainingSeconds: 0, slowMultiplier: 0.55, slowRemainingSeconds: 0.1, distance: 0, reward: 1 });

    updateGame(state, 0.2);

    expect(state.enemies[0].slowMultiplier).toBe(1);
    expect(state.enemies[0].slowRemainingSeconds).toBe(0);
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
