import type { Cell, GameState, PlacementStatus, Point } from "./simulation";
import { BOARD, enemyPosition, towerPosition } from "./simulation";
import { BOSS_DEFINITION, ELITE_DEFINITION, ENEMY_DEFINITIONS, MAP_DEFINITIONS, TOWER_DEFINITIONS } from "./content";
import type { TowerKind } from "./content";

export interface PlacementPreview {
  readonly cell: Cell;
  readonly kind: TowerKind;
  readonly status: PlacementStatus;
}

export function renderGame(context: CanvasRenderingContext2D, state: GameState, preview?: PlacementPreview, reducedMotion = false): void {
  context.clearRect(0, 0, BOARD.columns * BOARD.tileSize, BOARD.rows * BOARD.tileSize);
  drawBoard(context, state);
  if (preview) drawPlacementPreview(context, preview);
  drawTowers(context, state);
  drawEnemies(context, state);
  drawProjectiles(context, state);
  if (!reducedMotion) drawEffects(context, state);
}

function drawPlacementPreview(context: CanvasRenderingContext2D, preview: PlacementPreview): void {
  const center = { x: preview.cell.column * BOARD.tileSize + BOARD.tileSize / 2, y: preview.cell.row * BOARD.tileSize + BOARD.tileSize / 2 };
  const isValid = preview.status === "valid";
  const color = isValid ? "#d9f58b" : preview.status === "occupied" ? "#f4c95d" : "#f07d6f";
  context.save();
  context.fillStyle = `${color}55`;
  context.fillRect(preview.cell.column * BOARD.tileSize + 2, preview.cell.row * BOARD.tileSize + 2, BOARD.tileSize - 4, BOARD.tileSize - 4);
  context.strokeStyle = `${color}bb`;
  context.lineWidth = 2;
  context.beginPath();
  context.arc(center.x, center.y, TOWER_DEFINITIONS[preview.kind].range, 0, Math.PI * 2);
  context.stroke();
  context.restore();
  if (isValid) drawTower(context, preview.kind, center);
}

function drawBoard(context: CanvasRenderingContext2D, state: GameState): void {
  const map = MAP_DEFINITIONS[state.mapId];
  context.fillStyle = map.grassColor;
  context.fillRect(0, 0, BOARD.columns * BOARD.tileSize, BOARD.rows * BOARD.tileSize);
  context.strokeStyle = "rgba(37, 83, 55, 0.18)";
  context.lineWidth = 1;
  for (let column = 0; column <= BOARD.columns; column += 1) {
    context.beginPath();
    context.moveTo(column * BOARD.tileSize, 0);
    context.lineTo(column * BOARD.tileSize, BOARD.rows * BOARD.tileSize);
    context.stroke();
  }
  for (let row = 0; row <= BOARD.rows; row += 1) {
    context.beginPath();
    context.moveTo(0, row * BOARD.tileSize);
    context.lineTo(BOARD.columns * BOARD.tileSize, row * BOARD.tileSize);
    context.stroke();
  }

  context.strokeStyle = map.pathColor;
  context.lineWidth = BOARD.tileSize * 0.54;
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(map.pathNodes[0].x, map.pathNodes[0].y);
  for (const node of map.pathNodes.slice(1)) context.lineTo(node.x, node.y);
  context.stroke();
  context.strokeStyle = map.pathEdgeColor;
  context.lineWidth = 3;
  context.stroke();
}

function drawTowers(context: CanvasRenderingContext2D, state: GameState): void {
  for (const tower of state.towers) {
    drawTower(context, tower.kind, towerPosition(tower), tower.level);
  }
}

function drawTower(context: CanvasRenderingContext2D, kind: TowerKind, position: Point, level?: number): void {
  context.save();
  if (level === undefined) context.globalAlpha = 0.5;
  context.fillStyle = "rgba(16, 25, 30, 0.28)";
  context.beginPath();
  context.ellipse(position.x + 4, position.y + 17, 19, 7, 0, 0, Math.PI * 2);
  context.fill();
  if (kind === "archer") {
    context.fillStyle = "#594136";
    context.fillRect(position.x - 15, position.y - 15, 30, 30);
    context.fillStyle = "#d8d1b5";
    context.fillRect(position.x - 7, position.y - 23, 14, 18);
    context.fillStyle = "#2d3944";
    context.fillRect(position.x - 3, position.y - 35, 6, 18);
  } else if (kind === "sentinel") {
    context.fillStyle = "#31515a";
    context.fillRect(position.x - 15, position.y - 15, 30, 30);
    context.strokeStyle = "#c3ffc0";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(position.x, position.y - 8, 11, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#c3ffc0";
    context.fillRect(position.x - 3, position.y - 11, 6, 6);
  } else {
    context.fillStyle = "#303654";
    context.fillRect(position.x - 15, position.y - 15, 30, 30);
    context.fillStyle = "#7de0eb";
    context.beginPath();
    context.moveTo(position.x, position.y - 33);
    context.lineTo(position.x + 11, position.y - 8);
    context.lineTo(position.x - 11, position.y - 8);
    context.closePath();
    context.fill();
    context.fillStyle = "#c9f8ff";
    context.fillRect(position.x - 4, position.y - 6, 8, 8);
  }
  if (level !== undefined) drawTowerLevel(context, level, position);
  context.restore();
}

function drawTowerLevel(context: CanvasRenderingContext2D, level: number, position: Point): void {
  for (let index = 0; index <= level; index += 1) {
    context.fillStyle = "#fff1b8";
    context.fillRect(position.x - 10 + index * 7, position.y + 20, 4, 4);
  }
}

function drawEnemies(context: CanvasRenderingContext2D, state: GameState): void {
  for (const enemy of state.enemies) {
    const position = enemyPosition(enemy);
    const definition = ENEMY_DEFINITIONS[enemy.kind];
    if (state.towers.some((tower) => tower.lastTargetId === enemy.id)) {
      context.strokeStyle = "#fff2a6";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(position.x, position.y, definition.radius + 5, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = definition.color;
    context.beginPath();
    context.arc(position.x, position.y, definition.radius, 0, Math.PI * 2);
    context.fill();
    if (enemy.isElite) {
      context.fillStyle = ELITE_DEFINITION.color;
      context.beginPath();
      context.moveTo(position.x - 8, position.y - definition.radius - 7);
      context.lineTo(position.x, position.y - definition.radius - 14);
      context.lineTo(position.x + 8, position.y - definition.radius - 7);
      context.closePath();
      context.fill();
    }
    if (enemy.isBoss) {
      context.strokeStyle = BOSS_DEFINITION.color;
      context.lineWidth = 4;
      context.beginPath();
      context.arc(position.x, position.y, definition.radius + 7, 0, Math.PI * 2);
      context.stroke();
    }
    if (definition.trait?.kind === "armor") {
      context.strokeStyle = "#fff0ba";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(position.x, position.y, definition.radius - 5, Math.PI * 0.15, Math.PI * 0.85);
      context.stroke();
    }
    if (definition.trait?.kind === "speed-burst" && enemy.burstRemainingSeconds > 0) {
      context.strokeStyle = "#e8dfff";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(position.x, position.y, definition.radius + 6, 0, Math.PI * 2);
      context.stroke();
    }
    if (enemy.slowRemainingSeconds > 0) {
      context.strokeStyle = "#c3ffc0";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(position.x, position.y, definition.radius + 3, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = definition.eyeColor;
    context.fillRect(position.x - definition.radius / 2, position.y - 3, 4, 4);
    context.fillRect(position.x + definition.radius / 2 - 4, position.y - 3, 4, 4);
    context.strokeStyle = "rgba(255, 249, 221, 0.5)";
    context.lineWidth = 1;
    context.beginPath();
    context.arc(position.x, position.y, definition.radius - 1, 0, Math.PI * 2);
    context.stroke();
    drawHealthBar(context, position, definition.radius, enemy.health / enemy.maximumHealth);
  }
}

function drawProjectiles(context: CanvasRenderingContext2D, state: GameState): void {
  for (const projectile of state.projectiles) {
    context.strokeStyle = `${projectile.color}99`;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(projectile.previousX, projectile.previousY);
    context.lineTo(projectile.x, projectile.y);
    context.stroke();
    context.fillStyle = projectile.color;
    context.beginPath();
    context.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
    context.fill();
  }
}

function drawEffects(context: CanvasRenderingContext2D, state: GameState): void {
  for (const effect of state.effects) {
    const progress = 1 - effect.remainingSeconds / effect.maximumSeconds;
    const radius = effect.kind === "impact" ? 5 + progress * 11 : effect.kind === "armor" ? 4 + progress * 8 : 9 + progress * 20;
    context.save();
    context.globalAlpha = Math.max(0, 1 - progress);
    context.strokeStyle = effect.color;
    context.lineWidth = effect.kind === "defeat" ? 3 : 2;
    if (effect.kind === "defeat") context.setLineDash([3, 3]);
    context.beginPath();
    context.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }
}

function drawHealthBar(context: CanvasRenderingContext2D, position: Point, radius: number, ratio: number): void {
  const width = radius * 2 + 4;
  context.fillStyle = "#1b252b";
  context.fillRect(position.x - width / 2, position.y - radius - 11, width, 5);
  context.fillStyle = ratio > 0.5 ? "#a7d46f" : ratio > 0.25 ? "#f0c95f" : "#ef7d70";
  context.fillRect(position.x - width / 2, position.y - radius - 11, Math.max(0, ratio) * width, 5);
}
