import type { GameState, Point } from "./simulation";
import { BOARD, enemyPosition, towerPosition } from "./simulation";

export function renderGame(context: CanvasRenderingContext2D, state: GameState): void {
  context.clearRect(0, 0, BOARD.columns * BOARD.tileSize, BOARD.rows * BOARD.tileSize);
  drawBoard(context);
  drawTowers(context, state);
  drawEnemies(context, state);
  drawProjectiles(context, state);
}

function drawBoard(context: CanvasRenderingContext2D): void {
  context.fillStyle = "#6caa5f";
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

  context.strokeStyle = "#c69b64";
  context.lineWidth = BOARD.tileSize * 0.54;
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(-32, 224);
  context.lineTo(224, 224);
  context.lineTo(224, 96);
  context.lineTo(480, 96);
  context.lineTo(480, 416);
  context.lineTo(800, 416);
  context.stroke();
  context.strokeStyle = "#e8c488";
  context.lineWidth = 3;
  context.stroke();
}

function drawTowers(context: CanvasRenderingContext2D, state: GameState): void {
  for (const tower of state.towers) {
    const position = towerPosition(tower);
    context.fillStyle = "#594136";
    context.fillRect(position.x - 15, position.y - 15, 30, 30);
    context.fillStyle = "#d8d1b5";
    context.fillRect(position.x - 7, position.y - 23, 14, 18);
    context.fillStyle = "#2d3944";
    context.fillRect(position.x - 3, position.y - 35, 6, 18);
  }
}

function drawEnemies(context: CanvasRenderingContext2D, state: GameState): void {
  for (const enemy of state.enemies) {
    const position = enemyPosition(enemy);
    context.fillStyle = "#bf5e5e";
    context.beginPath();
    context.arc(position.x, position.y, 14, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#33263a";
    context.fillRect(position.x - 6, position.y - 3, 4, 4);
    context.fillRect(position.x + 2, position.y - 3, 4, 4);
    drawHealthBar(context, position, enemy.health / enemy.maximumHealth);
  }
}

function drawProjectiles(context: CanvasRenderingContext2D, state: GameState): void {
  context.fillStyle = "#fff2a6";
  for (const projectile of state.projectiles) {
    context.beginPath();
    context.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
    context.fill();
  }
}

function drawHealthBar(context: CanvasRenderingContext2D, position: Point, ratio: number): void {
  context.fillStyle = "#372f37";
  context.fillRect(position.x - 16, position.y - 25, 32, 5);
  context.fillStyle = "#a7d46f";
  context.fillRect(position.x - 16, position.y - 25, Math.max(0, ratio) * 32, 5);
}
