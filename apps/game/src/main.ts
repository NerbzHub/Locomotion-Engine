import "./style.css";
import { Diagnostics, Engine, PointerInput } from "../../../packages/engine/src";
import { renderGame } from "./render";
import { GAME_CONTENT } from "./content";
import type { TowerKind } from "./content";
import { assertValidGameContent } from "./content-validation";
import { BOARD, createGame, placeTower, startWave, TOTAL_WAVES, updateGame } from "./simulation";

const canvas = requiredElement<HTMLCanvasElement>("game-canvas");
const startWaveButton = requiredElement<HTMLButtonElement>("start-wave");
const restartButton = requiredElement<HTMLButtonElement>("restart-game");
const archerButton = requiredElement<HTMLButtonElement>("select-archer");
const mageButton = requiredElement<HTMLButtonElement>("select-mage");
const gold = requiredElement<HTMLElement>("gold");
const lives = requiredElement<HTMLElement>("lives");
const wave = requiredElement<HTMLElement>("wave");
const message = requiredElement<HTMLElement>("message");
const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Canvas 2D is unavailable in this browser.");
}

context.imageSmoothingEnabled = false;
const diagnostics = new Diagnostics();
try {
  const report = assertValidGameContent(GAME_CONTENT);
  diagnostics.info("Game content validated", report);
} catch (error) {
  diagnostics.error("Game content validation failed", error);
  throw error;
}
const initialSeed = 4_242;
let state = createGame(initialSeed);
let selectedTower: TowerKind = "archer";
const pointer = new PointerInput(canvas);

pointer.onPointerDown((point) => {
  placeTower(state, {
    column: Math.floor(point.x / BOARD.tileSize),
    row: Math.floor(point.y / BOARD.tileSize)
  }, selectedTower);
  updateHud();
});

startWaveButton.addEventListener("click", () => {
  startWave(state);
  updateHud();
});

restartButton.addEventListener("click", () => {
  state = createGame(initialSeed);
  updateHud();
});

archerButton.addEventListener("click", () => selectTower("archer"));
mageButton.addEventListener("click", () => selectTower("mage"));

const engine = new Engine({
  fixedDeltaSeconds: 1 / 60,
  diagnostics,
  update: (deltaSeconds) => updateGame(state, deltaSeconds),
  render: () => {
    renderGame(context, state);
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
  state.message = `${kind === "archer" ? "Archer" : "Mage"} selected. Click grass to place it.`;
  updateHud();
}

function updateHud(): void {
  gold.textContent = String(state.gold);
  lives.textContent = String(state.lives);
  wave.textContent = `${state.wave}/${TOTAL_WAVES}`;
  message.textContent = state.message;
  startWaveButton.disabled = state.waveActive || state.gameOver || state.gameWon;
}

function requiredElement<ElementType extends HTMLElement>(id: string): ElementType {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Expected page element #${id}.`);
  }
  return element as ElementType;
}
