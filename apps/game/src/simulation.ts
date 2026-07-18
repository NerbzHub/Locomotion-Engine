import { SeededRandom, World } from "../../../packages/engine/src";
import type { EntityId } from "../../../packages/engine/src";
import { ENEMY_DEFINITIONS, TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "./content";
import type { EnemyKind, TowerKind } from "./content";

export const BOARD = { columns: 12, rows: 8, tileSize: 64 } as const;
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
  health: number;
  readonly maximumHealth: number;
  readonly speed: number;
  distance: number;
  readonly reward: number;
}

export interface Tower {
  readonly id: EntityId;
  readonly kind: TowerKind;
  readonly cell: Cell;
  cooldownSeconds: number;
}

export interface Projectile {
  readonly id: EntityId;
  readonly targetId: EntityId;
  readonly damage: number;
  readonly speed: number;
  readonly color: string;
  x: number;
  y: number;
}

export interface PendingSpawn {
  readonly kind: EnemyKind;
  readonly health: number;
  readonly speed: number;
  readonly reward: number;
}

export interface GameState {
  readonly world: World;
  readonly random: SeededRandom;
  gold: number;
  lives: number;
  wave: number;
  waveActive: boolean;
  gameOver: boolean;
  gameWon: boolean;
  spawnDelaySeconds: number;
  readonly pendingSpawns: PendingSpawn[];
  readonly enemies: Enemy[];
  readonly towers: Tower[];
  readonly projectiles: Projectile[];
  message: string;
}

const PATH_NODES: readonly Point[] = [
  { x: -32, y: 224 },
  { x: 224, y: 224 },
  { x: 224, y: 96 },
  { x: 480, y: 96 },
  { x: 480, y: 416 },
  { x: 800, y: 416 }
];

const PATH_CELLS = new Set(["0:3", "1:3", "2:3", "3:3", "3:1", "3:2", "4:1", "5:1", "6:1", "7:1", "7:2", "7:3", "7:4", "7:5", "7:6", "8:6", "9:6", "10:6", "11:6"]);
const PATH_LENGTH = pathLength();

export function createGame(seed = 4_242): GameState {
  return {
    world: new World(),
    random: new SeededRandom(seed),
    gold: 50,
    lives: 10,
    wave: 0,
    waveActive: false,
    gameOver: false,
    gameWon: false,
    spawnDelaySeconds: 0,
    pendingSpawns: [],
    enemies: [],
    towers: [],
    projectiles: [],
    message: "Click a grass tile to place an archer tower (25 gold)."
  };
}

export function isBuildable(cell: Cell): boolean {
  return cell.column >= 0 && cell.column < BOARD.columns && cell.row >= 0 && cell.row < BOARD.rows && !PATH_CELLS.has(cellKey(cell));
}

export function placeTower(state: GameState, cell: Cell, kind: TowerKind = "archer"): boolean {
  const definition = TOWER_DEFINITIONS[kind];
  if (state.gameOver || state.gameWon) {
    state.message = "This game has ended. Restart to defend the dungeon again.";
    return false;
  }
  if (!isBuildable(cell)) {
    state.message = "Towers must be placed on grass, not the path.";
    return false;
  }
  if (state.gold < definition.cost) {
    state.message = `Not enough gold for a ${definition.displayName.toLowerCase()} tower.`;
    return false;
  }
  if (state.towers.some((tower) => tower.cell.column === cell.column && tower.cell.row === cell.row)) {
    state.message = "A tower already occupies that tile.";
    return false;
  }

  state.gold -= definition.cost;
  state.towers.push({ id: state.world.create("tower").id, kind, cell, cooldownSeconds: 0 });
  state.message = `${definition.displayName} tower placed. Start the wave when you are ready.`;
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
    state.message = "The dungeon has fallen. Restart to begin again.";
    return false;
  }
  if (state.wave >= TOTAL_WAVES) {
    state.gameWon = true;
    state.message = "The dungeon is safe. Restart to defend it again.";
    return false;
  }

  state.wave += 1;
  state.waveActive = true;
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
  state.message = `Wave ${state.wave} is approaching: ${waveEnemyNames(definition)}.`;
  return true;
}

export function updateGame(state: GameState, deltaSeconds: number): void {
  if (state.gameOver || state.gameWon) {
    return;
  }

  updateSpawning(state, deltaSeconds);
  updateEnemies(state, deltaSeconds);
  if (state.gameOver) {
    return;
  }
  updateTowers(state, deltaSeconds);
  updateProjectiles(state, deltaSeconds);
  removeDefeatedEnemies(state);

  if (state.waveActive && state.pendingSpawns.length === 0 && state.enemies.length === 0) {
    state.waveActive = false;
    const definition = WAVE_DEFINITIONS[state.wave - 1];
    state.gold += definition.clearBonus;
    if (state.wave === TOTAL_WAVES) {
      state.gameWon = true;
      state.message = "The dungeon is safe! All three waves have been defeated.";
      return;
    }
    state.message = `Wave ${state.wave} cleared. Prepare for wave ${state.wave + 1}.`;
  }
}

export function enemyPosition(enemy: Enemy): Point {
  return pointOnPath(enemy.distance);
}

export function towerPosition(tower: Tower): Point {
  return { x: tower.cell.column * BOARD.tileSize + BOARD.tileSize / 2, y: tower.cell.row * BOARD.tileSize + BOARD.tileSize / 2 };
}

export function gameSnapshot(state: GameState): object {
  return {
    gold: state.gold,
    lives: state.lives,
    wave: state.wave,
    waveActive: state.waveActive,
    gameOver: state.gameOver,
    gameWon: state.gameWon,
    randomState: state.random.state(),
    pendingSpawns: state.pendingSpawns,
    enemies: state.enemies.map((enemy) => ({ ...enemy })),
    towers: state.towers.map((tower) => ({ ...tower, cell: { ...tower.cell } })),
    projectiles: state.projectiles.map((projectile) => ({ ...projectile })),
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
  state.enemies.push({
    id: state.world.create("enemy").id,
    kind: spawn.kind,
    health: spawn.health,
    maximumHealth: spawn.health,
    speed: spawn.speed,
    distance: 0,
    reward: spawn.reward
  });
  state.spawnDelaySeconds = 0.7;
}

function updateEnemies(state: GameState, deltaSeconds: number): void {
  for (const enemy of state.enemies) {
    enemy.distance += enemy.speed * deltaSeconds;
  }
  const escaped = state.enemies.filter((enemy) => enemy.distance >= PATH_LENGTH);
  for (const enemy of escaped) {
    state.lives -= 1;
    state.world.destroy(enemy.id);
  }
  removeFromArray(state.enemies, (enemy) => enemy.distance >= PATH_LENGTH);
  if (escaped.length > 0) {
    if (state.lives <= 0) {
      state.gameOver = true;
      state.message = "The dungeon has fallen. Restart to begin again.";
    } else {
      state.message = `${escaped.length} enem${escaped.length === 1 ? "y" : "ies"} reached the dungeon.`;
    }
  }
}

function updateTowers(state: GameState, deltaSeconds: number): void {
  for (const tower of state.towers) {
    const definition = TOWER_DEFINITIONS[tower.kind];
    tower.cooldownSeconds -= deltaSeconds;
    if (tower.cooldownSeconds > 0) {
      continue;
    }
    const origin = towerPosition(tower);
    const target = state.enemies.find((enemy) => distance(origin, enemyPosition(enemy)) <= definition.range);
    if (!target) {
      continue;
    }
    state.projectiles.push({
      id: state.world.create("projectile").id,
      targetId: target.id,
      damage: definition.projectileDamage,
      speed: definition.projectileSpeed,
      color: definition.projectileColor,
      x: origin.x,
      y: origin.y
    });
    tower.cooldownSeconds = definition.cooldownSeconds;
  }
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
    const deltaX = targetPosition.x - projectile.x;
    const deltaY = targetPosition.y - projectile.y;
    const distanceToTarget = Math.hypot(deltaX, deltaY);
    const travel = projectile.speed * deltaSeconds;
    if (distanceToTarget <= travel) {
      target.health -= projectile.damage;
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
    state.world.destroy(enemy.id);
  }
  removeFromArray(state.enemies, (enemy) => enemy.health <= 0);
}

function pointOnPath(distanceAlongPath: number): Point {
  let remainingDistance = distanceAlongPath;
  for (let index = 0; index < PATH_NODES.length - 1; index += 1) {
    const start = PATH_NODES[index];
    const end = PATH_NODES[index + 1];
    const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);
    if (remainingDistance <= segmentLength) {
      const progress = remainingDistance / segmentLength;
      return { x: start.x + (end.x - start.x) * progress, y: start.y + (end.y - start.y) * progress };
    }
    remainingDistance -= segmentLength;
  }
  return PATH_NODES[PATH_NODES.length - 1];
}

function pathLength(): number {
  return PATH_NODES.slice(1).reduce((total, node, index) => total + Math.hypot(node.x - PATH_NODES[index].x, node.y - PATH_NODES[index].y), 0);
}

function cellKey(cell: Cell): string {
  return `${cell.column}:${cell.row}`;
}

function waveEnemyNames(definition: { readonly enemyKinds: readonly EnemyKind[] }): string {
  return [...new Set(definition.enemyKinds)].map((kind) => ENEMY_DEFINITIONS[kind].displayName.toLowerCase()).join(" and ");
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
