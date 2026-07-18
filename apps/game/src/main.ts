import "./style.css";
import { Diagnostics, Engine, PointerInput } from "../../../packages/engine/src";
import type { EntityId } from "../../../packages/engine/src";
import { renderGame } from "./render";
import { GAME_CONTENT, TOWER_DEFINITIONS } from "./content";
import type { TowerKind } from "./content";
import { assertValidGameContent } from "./content-validation";
import { BOARD, createGame, nextTowerUpgrade, placementStatus, placeTower, startWave, towerAtCell, towerStats, TOTAL_WAVES, updateGame, upgradeTower } from "./simulation";
import type { Cell } from "./simulation";

const canvas = requiredElement<HTMLCanvasElement>("game-canvas");
const startWaveButton = requiredElement<HTMLButtonElement>("start-wave");
const restartButton = requiredElement<HTMLButtonElement>("restart-game");
const archerButton = requiredElement<HTMLButtonElement>("select-archer");
const mageButton = requiredElement<HTMLButtonElement>("select-mage");
const gold = requiredElement<HTMLElement>("gold");
const lives = requiredElement<HTMLElement>("lives");
const wave = requiredElement<HTMLElement>("wave");
const message = requiredElement<HTMLElement>("message");
const placementMessage = requiredElement<HTMLElement>("placement-message");
const towerInspector = requiredElement<HTMLElement>("tower-inspector");
const towerName = requiredElement<HTMLElement>("tower-name");
const towerStatsElement = requiredElement<HTMLElement>("tower-stats");
const upgradeTowerButton = requiredElement<HTMLButtonElement>("upgrade-tower");
const context = canvas.getContext("2d");

if (!context) throw new Error("Canvas 2D is unavailable in this browser.");

context.imageSmoothingEnabled = false;
const diagnostics = new Diagnostics();
try {
  diagnostics.info("Game content validated", assertValidGameContent(GAME_CONTENT));
} catch (error) {
  diagnostics.error("Game content validation failed", error);
  throw error;
}

const initialSeed = 4_242;
let state = createGame(initialSeed);
let selectedTower: TowerKind = "archer";
let hoveredCell: Cell | undefined;
let inspectedTowerId: EntityId | undefined;
const pointer = new PointerInput(canvas);

pointer.onPointerDown((point) => {
  const cell = cellAt(point.x, point.y);
  const tower = towerAtCell(state, cell);
  if (tower) inspectedTowerId = tower.id;
  else placeTower(state, cell, selectedTower);
  updateHud();
});

pointer.onPointerMove((point) => {
  hoveredCell = cellAt(point.x, point.y);
  updatePlacementMessage();
});

startWaveButton.addEventListener("click", () => {
  startWave(state);
  updateHud();
});

restartButton.addEventListener("click", () => {
  state = createGame(initialSeed);
  inspectedTowerId = undefined;
  updateHud();
});

archerButton.addEventListener("click", () => selectTower("archer"));
mageButton.addEventListener("click", () => selectTower("mage"));
upgradeTowerButton.addEventListener("click", () => {
  if (inspectedTowerId) upgradeTower(state, inspectedTowerId);
  updateHud();
});

const engine = new Engine({
  fixedDeltaSeconds: 1 / 60,
  diagnostics,
  update: (deltaSeconds) => updateGame(state, deltaSeconds),
  render: () => {
    renderGame(context, state, placementPreview());
    updateHud();
  }
});

window.addEventListener("beforeunload", () => {
  pointer.dispose();
  engine.stop();
});

engine.start();
updateHud();

function selectTower(kind: TowerKind): void {
  selectedTower = kind;
  archerButton.setAttribute("aria-pressed", String(kind === "archer"));
  mageButton.setAttribute("aria-pressed", String(kind === "mage"));
  archerButton.classList.toggle("selected", kind === "archer");
  mageButton.classList.toggle("selected", kind === "mage");
  state.message = `${TOWER_DEFINITIONS[kind].displayName} selected. Click grass to place it.`;
  updateHud();
}

function placementPreview() {
  if (!hoveredCell) return undefined;
  return { cell: hoveredCell, kind: selectedTower, status: placementStatus(state, hoveredCell, selectedTower) };
}

function updateHud(): void {
  gold.textContent = String(state.gold);
  lives.textContent = String(state.lives);
  wave.textContent = `${state.wave}/${TOTAL_WAVES}`;
  message.textContent = state.message;
  startWaveButton.disabled = state.waveActive || state.gameOver || state.gameWon;
  updatePlacementMessage();
  updateTowerInspector();
}

function updatePlacementMessage(): void {
  if (!hoveredCell) {
    placementMessage.textContent = "";
    return;
  }
  const status = placementStatus(state, hoveredCell, selectedTower);
  const definition = TOWER_DEFINITIONS[selectedTower];
  const descriptions: Record<typeof status, string> = {
    valid: `${definition.displayName} ready: ${definition.cost} gold.`,
    path: "Path tiles cannot hold towers.",
    occupied: "This tile is occupied — click the tower to inspect it.",
    unaffordable: `Need ${definition.cost} gold for ${definition.displayName}.`,
    ended: "Restart to build a new defense."
  };
  placementMessage.textContent = descriptions[status];
}

function updateTowerInspector(): void {
  const tower = state.towers.find((candidate) => candidate.id === inspectedTowerId);
  if (!tower) {
    inspectedTowerId = undefined;
    towerInspector.hidden = true;
    return;
  }
  const definition = TOWER_DEFINITIONS[tower.kind];
  const stats = towerStats(tower);
  const upgrade = nextTowerUpgrade(tower);
  towerInspector.hidden = false;
  towerName.textContent = `${definition.displayName} · level ${tower.level + 1}`;
  towerStatsElement.textContent = `Damage ${stats.projectileDamage} · range ${Math.round(stats.range)} · ${stats.cooldownSeconds.toFixed(2)}s cooldown`;
  upgradeTowerButton.textContent = upgrade ? `Upgrade (${upgrade.cost} gold)` : "Maximum level";
  upgradeTowerButton.disabled = !upgrade || state.gold < upgrade.cost || state.gameOver || state.gameWon;
}

function cellAt(x: number, y: number): Cell {
  return { column: Math.floor(x / BOARD.tileSize), row: Math.floor(y / BOARD.tileSize) };
}

function requiredElement<ElementType extends HTMLElement>(id: string): ElementType {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Expected page element #${id}.`);
  return element as ElementType;
}
