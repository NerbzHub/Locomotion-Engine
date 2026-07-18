import "./style.css";
import { Diagnostics, Engine, PointerInput } from "../../../packages/engine/src";
import { renderGame } from "./render";
import { BOARD, createGame, placeTower, startWave, TOTAL_WAVES, updateGame } from "./simulation";

const canvas = requiredElement<HTMLCanvasElement>("game-canvas");
const startWaveButton = requiredElement<HTMLButtonElement>("start-wave");
const restartButton = requiredElement<HTMLButtonElement>("restart-game");
const gold = requiredElement<HTMLElement>("gold");
const lives = requiredElement<HTMLElement>("lives");
const wave = requiredElement<HTMLElement>("wave");
const message = requiredElement<HTMLElement>("message");
const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Canvas 2D is unavailable in this browser.");
}

context.imageSmoothingEnabled = false;
const initialSeed = 4_242;
let state = createGame(initialSeed);
const diagnostics = new Diagnostics();
const pointer = new PointerInput(canvas);

pointer.onPointerDown((point) => {
  placeTower(state, {
    column: Math.floor(point.x / BOARD.tileSize),
    row: Math.floor(point.y / BOARD.tileSize)
  });
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
