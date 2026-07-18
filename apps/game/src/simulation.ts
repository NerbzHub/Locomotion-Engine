import { SeededRandom, World } from "../../../packages/engine/src";
import type { EntityId } from "../../../packages/engine/src";
import { ENEMY_DEFINITIONS, MAP_DEFINITIONS, TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "./content";
import type { EnemyKind, MapId, TowerKind } from "./content";

export const BOARD = MAP_DEFINITIONS.gate;
export const TOTAL_WAVES = WAVE_DEFINITIONS.length;

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Cell {
  readonly column: number;
  readonly row: number;
}

export interface Enemy {
  readonly id: EntityId;
  readonly kind: EnemyKind;
  readonly mapId: MapId;
  health: number;
  readonly maximumHealth: number;
  readonly speed: number;
  readonly armorDamageReduction: number;
  burstCooldownSeconds: number;
  burstRemainingSeconds: number;
  distance: number;
  readonly reward: number;
}

export interface Tower {
  readonly id: EntityId;
  readonly kind: TowerKind;
  readonly cell: Cell;
  level: number;
  cooldownSeconds: number;
  lastTargetId?: EntityId;
}

export interface TowerStats {
  readonly range: number;
  readonly projectileDamage: number;
  readonly cooldownSeconds: number;
  readonly projectileSpeed: number;
  readonly projectileColor: string;
}

export interface Projectile {
  readonly id: EntityId;
  readonly targetId: EntityId;
  readonly damage: number;
  readonly speed: number;
  readonly color: string;
  previousX: number;
  previousY: number;
  x: number;
  y: number;
}

export interface CombatEffect {
  readonly id: EntityId;
  readonly kind: "impact" | "armor" | "defeat";
  readonly color: string;
  readonly x: number;
  readonly y: number;
  remainingSeconds: number;
  readonly maximumSeconds: number;
}

export type PlacementStatus = "valid" | "path" | "occupied" | "unaffordable" | "ended";
export type GamePhase = "intermission" | "wave" | "victory" | "defeat";

export interface PendingSpawn {
  readonly kind: EnemyKind;
  readonly health: number;
  readonly speed: number;
  readonly reward: number;
}

export interface GameEvent {
  readonly step: number;
  readonly kind: "placement" | "upgrade" | "wave-start" | "spawn" | "defeat" | "escape" | "wave-clear";
  readonly message: string;
}

export interface GameState {
  readonly world: World;
  readonly random: SeededRandom;
  readonly seed: number;
  gold: number;
  lives: number;
  wave: number;
  mapId: MapId;
  phase: GamePhase;
  waveActive: boolean;
  gameOver: boolean;
  gameWon: boolean;
  spawnDelaySeconds: number;
  step: number;
  readonly pendingSpawns: PendingSpawn[];
  readonly enemies: Enemy[];
  readonly towers: Tower[];
  readonly projectiles: Projectile[];
  readonly effects: CombatEffect[];
  readonly events: GameEvent[];
  message: string;
}

export function createGame(seed = 4_242, mapId: MapId = "gate"): GameState {
  return {
    world: new World(),
    random: new SeededRandom(seed),
    seed,
    gold: 50,
    lives: 10,
    wave: 0,
    mapId,
    phase: "intermission",
    waveActive: false,
    gameOver: false,
    gameWon: false,
    spawnDelaySeconds: 0,
    step: 0,
    pendingSpawns: [],
    enemies: [],
    towers: [],
    projectiles: [],
    effects: [],
    events: [],
    message: "Prepare your defense for wave 1."
  };
}

export function isBuildable(cell: Cell, mapId: MapId = "gate"): boolean {
  const map = MAP_DEFINITIONS[mapId];
  return cell.column >= 0 && cell.column < map.columns && cell.row >= 0 && cell.row < map.rows && !(map.pathCells as readonly string[]).includes(cellKey(cell));
}

export function towerAtCell(state: GameState, cell: Cell): Tower | undefined {
  return state.towers.find((tower) => tower.cell.column === cell.column && tower.cell.row === cell.row);
}

export function placementStatus(state: GameState, cell: Cell, kind: TowerKind): PlacementStatus {
  if (state.gameOver || state.gameWon) return "ended";
  if (!isBuildable(cell, state.mapId)) return "path";
  if (towerAtCell(state, cell)) return "occupied";
  if (state.gold < TOWER_DEFINITIONS[kind].cost) return "unaffordable";
  return "valid";
}

export function placeTower(state: GameState, cell: Cell, kind: TowerKind = "archer"): boolean {
  const definition = TOWER_DEFINITIONS[kind];
  const status = placementStatus(state, cell, kind);
  if (status === "ended") {
    state.message = "This game has ended. Restart to defend the dungeon again.";
    return false;
  }
  if (status === "path") {
    state.message = "Towers must be placed on grass, not the path.";
    return false;
  }
  if (status === "unaffordable") {
    state.message = `Not enough gold for a ${definition.displayName.toLowerCase()} tower.`;
    return false;
  }
  if (status === "occupied") {
    state.message = "A tower already occupies that tile.";
    return false;
  }

  state.gold -= definition.cost;
  state.towers.push({ id: state.world.create("tower").id, kind, cell, level: 0, cooldownSeconds: 0 });
  recordEvent(state, "placement", `${definition.displayName} placed at ${cell.column},${cell.row}`);
  state.message = `${definition.displayName} tower placed. Start the wave when you are ready.`;
  return true;
}

export function nextTowerUpgrade(tower: Tower) {
  return TOWER_DEFINITIONS[tower.kind].upgrades[tower.level];
}

export function towerStats(tower: Tower): TowerStats {
  const definition = TOWER_DEFINITIONS[tower.kind];
  let range = definition.range;
  let projectileDamage = definition.projectileDamage;
  let cooldownSeconds = definition.cooldownSeconds;
  for (const upgrade of definition.upgrades.slice(0, tower.level)) {
    range += upgrade.rangeBonus;
    projectileDamage += upgrade.damageBonus;
    cooldownSeconds *= upgrade.cooldownMultiplier;
  }
  return { range, projectileDamage, cooldownSeconds, projectileSpeed: definition.projectileSpeed, projectileColor: definition.projectileColor };
}

export function upgradeTower(state: GameState, towerId: EntityId): boolean {
  const tower = state.towers.find((candidate) => candidate.id === towerId);
  if (!tower) return false;
  const upgrade = nextTowerUpgrade(tower);
  if (!upgrade) {
    state.message = `${TOWER_DEFINITIONS[tower.kind].displayName} is already at maximum level.`;
    return false;
  }
  if (state.gold < upgrade.cost) {
    state.message = `Not enough gold for the ${TOWER_DEFINITIONS[tower.kind].displayName.toLowerCase()} upgrade.`;
    return false;
  }
  state.gold -= upgrade.cost;
  tower.level += 1;
  recordEvent(state, "upgrade", `${TOWER_DEFINITIONS[tower.kind].displayName} reached level ${tower.level + 1}`);
  state.message = `${TOWER_DEFINITIONS[tower.kind].displayName} upgraded to level ${tower.level + 1}.`;
  return true;
}

export function startWave(state: GameState): boolean {
  if (state.gameWon) {
    state.message = "The dungeon is already safe. Restart to play again.";
    return false;
  }
  if (state.waveActive) {
    state.message = "This wave is already underway.";
    return false;
  }
  if (state.lives <= 0) {
    state.gameOver = true;
    state.phase = "defeat";
    state.message = "The dungeon has fallen. Restart to begin again.";
    return false;
  }
  if (state.wave >= TOTAL_WAVES) {
    state.gameWon = true;
    state.phase = "victory";
    state.message = "The dungeon is safe. Restart to defend it again.";
    return false;
  }

  state.wave += 1;
  state.waveActive = true;
  state.phase = "wave";
  state.spawnDelaySeconds = 0;
  const definition = WAVE_DEFINITIONS[state.wave - 1];
  for (const kind of definition.enemyKinds) {
    const enemyDefinition = ENEMY_DEFINITIONS[kind];
    const health = enemyDefinition.baseHealth + Math.round(state.random.between(0, enemyDefinition.healthVariation));
    state.pendingSpawns.push({
      kind,
      health,
      speed: state.random.between(enemyDefinition.speedRange[0], enemyDefinition.speedRange[1]),
      reward: enemyDefinition.reward
    });
  }
  state.message = `Wave ${state.wave} underway: ${waveEnemyNames(definition)}.`;
  recordEvent(state, "wave-start", `Wave ${state.wave} started`);
  return true;
}

/** A UI-facing summary of the next authored encounter; it does not mutate simulation state. */
export function nextWaveBriefing(state: GameState): string {
  if (state.gameWon) return "All waves cleared — the dungeon is safe.";
  if (state.gameOver) return "The dungeon has fallen. Restart to try again.";
  const definition = WAVE_DEFINITIONS[state.wave];
  if (!definition) return "No further waves are available.";
  return `Next: wave ${state.wave + 1} · ${waveEnemyCounts(definition)} · ${definition.clearBonus} gold clear reward.`;
}

export function updateGame(state: GameState, deltaSeconds: number): void {
  if (state.gameOver || state.gameWon) {
    return;
  }

  state.step += 1;

  updateSpawning(state, deltaSeconds);
  updateEnemies(state, deltaSeconds);
  if (state.gameOver) {
    return;
  }
  updateTowers(state, deltaSeconds);
  updateProjectiles(state, deltaSeconds);
  removeDefeatedEnemies(state);
  updateEffects(state, deltaSeconds);

  if (state.waveActive && state.pendingSpawns.length === 0 && state.enemies.length === 0) {
    state.waveActive = false;
    state.phase = "intermission";
    const definition = WAVE_DEFINITIONS[state.wave - 1];
    state.gold += definition.clearBonus;
    recordEvent(state, "wave-clear", `Wave ${state.wave} cleared for ${definition.clearBonus} gold`);
    if (state.wave === TOTAL_WAVES) {
      state.gameWon = true;
      state.phase = "victory";
      state.message = "The dungeon is safe! All three waves have been defeated.";
      return;
    }
    state.message = `Wave ${state.wave} cleared: +${definition.clearBonus} gold. Prepare for wave ${state.wave + 1}.`;
  }
}

export function enemyPosition(enemy: Enemy): Point {
  return pointOnPath(enemy.distance, enemy.mapId);
}

export function enemySpeed(enemy: Enemy): number {
  const trait = ENEMY_DEFINITIONS[enemy.kind].trait;
  return trait?.kind === "speed-burst" && enemy.burstRemainingSeconds > 0 ? enemy.speed * trait.speedMultiplier : enemy.speed;
}

/** Applies flat armour and returns the amount that actually reached the enemy. */
export function applyDamage(enemy: Enemy, incomingDamage: number): number {
  const damage = Math.max(0, incomingDamage - enemy.armorDamageReduction);
  enemy.health -= damage;
  return damage;
}

export function towerPosition(tower: Tower): Point {
  return { x: tower.cell.column * BOARD.tileSize + BOARD.tileSize / 2, y: tower.cell.row * BOARD.tileSize + BOARD.tileSize / 2 };
}

export function gameSnapshot(state: GameState): object {
  return {
    gold: state.gold,
    seed: state.seed,
    lives: state.lives,
    wave: state.wave,
    mapId: state.mapId,
    phase: state.phase,
    step: state.step,
    waveActive: state.waveActive,
    gameOver: state.gameOver,
    gameWon: state.gameWon,
    randomState: state.random.state(),
    pendingSpawns: state.pendingSpawns,
    enemies: state.enemies.map((enemy) => ({ ...enemy })),
    towers: state.towers.map((tower) => ({ ...tower, cell: { ...tower.cell } })),
    projectiles: state.projectiles.map((projectile) => ({ ...projectile })),
    effects: state.effects.map((effect) => ({ ...effect })),
    events: state.events.map((event) => ({ ...event })),
    message: state.message
  };
}

function updateSpawning(state: GameState, deltaSeconds: number): void {
  if (!state.waveActive || state.pendingSpawns.length === 0) {
    return;
  }
  state.spawnDelaySeconds -= deltaSeconds;
  if (state.spawnDelaySeconds > 0) {
    return;
  }

  const spawn = state.pendingSpawns.shift();
  if (!spawn) {
    return;
  }
  const enemyDefinition = ENEMY_DEFINITIONS[spawn.kind];
  state.enemies.push({
    id: state.world.create("enemy").id,
    kind: spawn.kind,
    mapId: state.mapId,
    health: spawn.health,
    maximumHealth: spawn.health,
    speed: spawn.speed,
    armorDamageReduction: enemyDefinition.trait?.kind === "armor" ? enemyDefinition.trait.flatDamageReduction : 0,
    burstCooldownSeconds: enemyDefinition.trait?.kind === "speed-burst" ? enemyDefinition.trait.intervalSeconds : 0,
    burstRemainingSeconds: 0,
    distance: 0,
    reward: spawn.reward
  });
  recordEvent(state, "spawn", `${enemyDefinition.displayName} spawned`);
  state.spawnDelaySeconds = 0.7;
}

function updateEnemies(state: GameState, deltaSeconds: number): void {
  for (const enemy of state.enemies) {
    updateEnemyTrait(enemy, deltaSeconds);
    enemy.distance += enemySpeed(enemy) * deltaSeconds;
  }
  const escaped = state.enemies.filter((enemy) => enemy.distance >= pathLength(enemy.mapId));
  for (const enemy of escaped) {
    state.lives -= 1;
    state.world.destroy(enemy.id);
    recordEvent(state, "escape", `${ENEMY_DEFINITIONS[enemy.kind].displayName} escaped`);
  }
  removeFromArray(state.enemies, (enemy) => enemy.distance >= pathLength(enemy.mapId));
  if (escaped.length > 0) {
    if (state.lives <= 0) {
      state.gameOver = true;
      state.phase = "defeat";
      state.message = "The dungeon has fallen. Restart to begin again.";
    } else {
      state.message = `${escaped.length} enem${escaped.length === 1 ? "y" : "ies"} reached the dungeon.`;
    }
  }
}

function updateEnemyTrait(enemy: Enemy, deltaSeconds: number): void {
  const trait = ENEMY_DEFINITIONS[enemy.kind].trait;
  if (trait?.kind !== "speed-burst") return;
  if (enemy.burstRemainingSeconds > 0) {
    enemy.burstRemainingSeconds = Math.max(0, enemy.burstRemainingSeconds - deltaSeconds);
    return;
  }
  enemy.burstCooldownSeconds -= deltaSeconds;
  if (enemy.burstCooldownSeconds <= 0) {
    enemy.burstRemainingSeconds = trait.durationSeconds;
    enemy.burstCooldownSeconds += trait.intervalSeconds;
  }
}

function updateTowers(state: GameState, deltaSeconds: number): void {
  for (const tower of state.towers) {
    const stats = towerStats(tower);
    tower.lastTargetId = undefined;
    tower.cooldownSeconds -= deltaSeconds;
    if (tower.cooldownSeconds > 0) {
      continue;
    }
    const origin = towerPosition(tower);
    const target = selectNearestToExitTarget(state.enemies, origin, stats.range);
    if (!target) {
      continue;
    }
    state.projectiles.push({
      id: state.world.create("projectile").id,
      targetId: target.id,
      damage: stats.projectileDamage,
      speed: stats.projectileSpeed,
      color: stats.projectileColor,
      previousX: origin.x,
      previousY: origin.y,
      x: origin.x,
      y: origin.y
    });
    tower.lastTargetId = target.id;
    tower.cooldownSeconds = stats.cooldownSeconds;
  }
}

/** Towers prioritize the enemy that has progressed furthest toward the dungeon exit. */
export function selectNearestToExitTarget(enemies: readonly Enemy[], origin: Point, range: number): Enemy | undefined {
  let selected: Enemy | undefined;
  for (const enemy of enemies) {
    if (distance(origin, enemyPosition(enemy)) > range) continue;
    if (!selected || enemy.distance > selected.distance || (enemy.distance === selected.distance && enemy.id < selected.id)) {
      selected = enemy;
    }
  }
  return selected;
}

function updateProjectiles(state: GameState, deltaSeconds: number): void {
  const expired = new Set<EntityId>();
  for (const projectile of state.projectiles) {
    const target = state.enemies.find((enemy) => enemy.id === projectile.targetId);
    if (!target) {
      expired.add(projectile.id);
      continue;
    }
    const targetPosition = enemyPosition(target);
    projectile.previousX = projectile.x;
    projectile.previousY = projectile.y;
    const deltaX = targetPosition.x - projectile.x;
    const deltaY = targetPosition.y - projectile.y;
    const distanceToTarget = Math.hypot(deltaX, deltaY);
    const travel = projectile.speed * deltaSeconds;
    if (distanceToTarget <= travel) {
      const dealtDamage = applyDamage(target, projectile.damage);
      addEffect(state, "impact", projectile.color, targetPosition, 0.16);
      if (dealtDamage < projectile.damage) addEffect(state, "armor", "#fff0ba", targetPosition, 0.22);
      expired.add(projectile.id);
      continue;
    }
    projectile.x += (deltaX / distanceToTarget) * travel;
    projectile.y += (deltaY / distanceToTarget) * travel;
  }
  for (const id of expired) {
    state.world.destroy(id);
  }
  removeFromArray(state.projectiles, (projectile) => expired.has(projectile.id));
}

function removeDefeatedEnemies(state: GameState): void {
  const defeated = state.enemies.filter((enemy) => enemy.health <= 0);
  for (const enemy of defeated) {
    state.gold += enemy.reward;
    recordEvent(state, "defeat", `${ENEMY_DEFINITIONS[enemy.kind].displayName} defeated`);
    addEffect(state, "defeat", ENEMY_DEFINITIONS[enemy.kind].color, enemyPosition(enemy), 0.34);
    state.world.destroy(enemy.id);
  }
  removeFromArray(state.enemies, (enemy) => enemy.health <= 0);
}

function addEffect(state: GameState, kind: CombatEffect["kind"], color: string, position: Point, duration: number): void {
  state.effects.push({ id: state.world.create("effect").id, kind, color, x: position.x, y: position.y, remainingSeconds: duration, maximumSeconds: duration });
}

function updateEffects(state: GameState, deltaSeconds: number): void {
  const expired = new Set<EntityId>();
  for (const effect of state.effects) {
    effect.remainingSeconds -= deltaSeconds;
    if (effect.remainingSeconds <= 0) expired.add(effect.id);
  }
  for (const id of expired) state.world.destroy(id);
  removeFromArray(state.effects, (effect) => expired.has(effect.id));
}

function pointOnPath(distanceAlongPath: number, mapId: MapId): Point {
  const nodes = MAP_DEFINITIONS[mapId].pathNodes;
  let remainingDistance = distanceAlongPath;
  for (let index = 0; index < nodes.length - 1; index += 1) {
    const start = nodes[index];
    const end = nodes[index + 1];
    const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);
    if (remainingDistance <= segmentLength) {
      const progress = remainingDistance / segmentLength;
      return { x: start.x + (end.x - start.x) * progress, y: start.y + (end.y - start.y) * progress };
    }
    remainingDistance -= segmentLength;
  }
  return nodes[nodes.length - 1];
}

function pathLength(mapId: MapId): number {
  const nodes = MAP_DEFINITIONS[mapId].pathNodes;
  return nodes.slice(1).reduce((total, node, index) => total + Math.hypot(node.x - nodes[index].x, node.y - nodes[index].y), 0);
}

function cellKey(cell: Cell): string {
  return `${cell.column}:${cell.row}`;
}

function waveEnemyNames(definition: { readonly enemyKinds: readonly EnemyKind[] }): string {
  return [...new Set(definition.enemyKinds)].map((kind) => ENEMY_DEFINITIONS[kind].displayName.toLowerCase()).join(" and ");
}

function waveEnemyCounts(definition: { readonly enemyKinds: readonly EnemyKind[] }): string {
  const counts = new Map<EnemyKind, number>();
  for (const kind of definition.enemyKinds) counts.set(kind, (counts.get(kind) ?? 0) + 1);
  return [...counts].map(([kind, count]) => `${count} ${ENEMY_DEFINITIONS[kind].displayName}${count === 1 ? "" : "s"}`).join(", ");
}

function distance(first: Point, second: Point): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function removeFromArray<T>(items: T[], predicate: (item: T) => boolean): void {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index])) {
      items.splice(index, 1);
    }
  }
}

function recordEvent(state: GameState, kind: GameEvent["kind"], message: string): void {
  state.events.push({ step: state.step, kind, message });
  if (state.events.length > 8) state.events.shift();
}
