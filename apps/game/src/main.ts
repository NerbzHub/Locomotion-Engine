import "./style.css";
import { Diagnostics, Engine, PointerInput } from "../../../packages/engine/src";
import type { EntityId } from "../../../packages/engine/src";
import { renderGame } from "./render";
import { CAMPAIGN_NODES, DIFFICULTY_DEFINITIONS, GAME_CONTENT, MAP_DEFINITIONS, TOWER_DEFINITIONS } from "./content";
import type { DifficultyId, MapId, TowerKind } from "./content";
import { assertValidGameContent } from "./content-validation";
import { loadFromLocalStorage, saveToLocalStorage } from "./save";
import { completeCampaignNode, isCampaignNodeUnlocked, loadProfile, resetProfile, saveProfile } from "./progression";
import { GameAudio, loadAudioSettings, normaliseAudioSettings, saveAudioSettings } from "./audio";
import { BOARD, createGame, nextWaveBriefing, nextTowerUpgrade, placementStatus, placeTower, setTowerTargetPolicy, specialiseTower, startWave, telemetryReport, towerAtCell, towerStats, TOTAL_WAVES, updateGame, upgradeTower } from "./simulation";
import type { Cell, TargetPolicy } from "./simulation";

const canvas = requiredElement<HTMLCanvasElement>("game-canvas");
const startWaveButton = requiredElement<HTMLButtonElement>("start-wave");
const restartButton = requiredElement<HTMLButtonElement>("restart-game");
const saveButton = requiredElement<HTMLButtonElement>("save-game");
const loadButton = requiredElement<HTMLButtonElement>("load-game");
const motionButton = requiredElement<HTMLButtonElement>("toggle-motion");
const audioButton = requiredElement<HTMLButtonElement>("toggle-audio");
const audioVolume = requiredElement<HTMLInputElement>("audio-volume");
const diagnosticsButton = requiredElement<HTMLButtonElement>("toggle-diagnostics");
const archerButton = requiredElement<HTMLButtonElement>("select-archer");
const mageButton = requiredElement<HTMLButtonElement>("select-mage");
const sentinelButton = requiredElement<HTMLButtonElement>("select-sentinel");
const gateButton = requiredElement<HTMLButtonElement>("select-gate");
const crossroadsButton = requiredElement<HTMLButtonElement>("select-crossroads");
const casualButton = requiredElement<HTMLButtonElement>("select-casual");
const standardButton = requiredElement<HTMLButtonElement>("select-standard");
const veteranButton = requiredElement<HTMLButtonElement>("select-veteran");
const gateWatchButton = requiredElement<HTMLButtonElement>("campaign-gate-watch");
const crossroadsStandButton = requiredElement<HTMLButtonElement>("campaign-crossroads-stand");
const resetProfileButton = requiredElement<HTMLButtonElement>("reset-profile");
const gold = requiredElement<HTMLElement>("gold");
const lives = requiredElement<HTMLElement>("lives");
const wave = requiredElement<HTMLElement>("wave");
const message = requiredElement<HTMLElement>("message");
const waveBriefing = requiredElement<HTMLElement>("wave-briefing");
const placementMessage = requiredElement<HTMLElement>("placement-message");
const developerOverlay = requiredElement<HTMLElement>("developer-overlay");
const developerOverlayText = requiredElement<HTMLElement>("developer-overlay-text");
const towerInspector = requiredElement<HTMLElement>("tower-inspector");
const towerName = requiredElement<HTMLElement>("tower-name");
const towerStatsElement = requiredElement<HTMLElement>("tower-stats");
const upgradeTowerButton = requiredElement<HTMLButtonElement>("upgrade-tower");
const targetPolicySelect = requiredElement<HTMLSelectElement>("target-policy");
const specialisationControl = requiredElement<HTMLElement>("specialisation-control");
const specialisationSelect = requiredElement<HTMLSelectElement>("specialisation");
const specialiseTowerButton = requiredElement<HTMLButtonElement>("specialise-tower");
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
let selectedMap: MapId = "gate";
let selectedDifficulty: DifficultyId = "standard";
let selectedCampaignNodeId = "gate-watch";
let profile = loadProfile(window.localStorage);
let recordedCampaignVictory: string | undefined;
let state = createGame(initialSeed, selectedMap, selectedDifficulty);
let selectedTower: TowerKind = "archer";
let hoveredCell: Cell | undefined;
let keyboardCursor: Cell = { column: 1, row: 1 };
let keyboardCursorActive = false;
let inspectedTowerId: EntityId | undefined;
let diagnosticsVisible = false;
let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let audioSettings = loadAudioSettings(window.localStorage);
const audio = new GameAudio(audioSettings);
const pointer = new PointerInput(canvas);

pointer.onPointerDown((point) => {
  const cell = cellAt(point.x, point.y);
  const tower = towerAtCell(state, cell);
  if (tower) inspectedTowerId = tower.id;
  else if (placeTower(state, cell, selectedTower)) audio.play("placement");
  updateHud();
});

pointer.onPointerMove((point) => {
  hoveredCell = cellAt(point.x, point.y);
  keyboardCursorActive = false;
  updatePlacementMessage();
});

canvas.addEventListener("keydown", (event) => {
  const direction: Record<string, Cell> = {
    ArrowLeft: { column: -1, row: 0 }, ArrowRight: { column: 1, row: 0 }, ArrowUp: { column: 0, row: -1 }, ArrowDown: { column: 0, row: 1 }
  };
  if (event.key in direction) {
    const delta = direction[event.key];
    keyboardCursor = { column: clamp(keyboardCursor.column + delta.column, 0, BOARD.columns - 1), row: clamp(keyboardCursor.row + delta.row, 0, BOARD.rows - 1) };
    keyboardCursorActive = true;
    event.preventDefault();
    updateHud();
    return;
  }
  if (event.key === "Enter" || event.key === " ") {
    const tower = towerAtCell(state, keyboardCursor);
    if (tower) inspectedTowerId = tower.id;
    else placeTower(state, keyboardCursor, selectedTower);
    keyboardCursorActive = true;
    event.preventDefault();
    updateHud();
  }
});

startWaveButton.addEventListener("click", () => {
  if (startWave(state)) audio.play("wave");
  updateHud();
});

restartButton.addEventListener("click", () => {
  state = createGame(initialSeed, selectedMap, selectedDifficulty);
  inspectedTowerId = undefined;
  updateHud();
});

saveButton.addEventListener("click", () => {
  const result = saveToLocalStorage(window.localStorage, state);
  state.message = result.ok ? "Intermission saved locally." : result.message;
  updateHud();
});

loadButton.addEventListener("click", () => {
  const result = loadFromLocalStorage(window.localStorage);
  if (result.ok) {
    state = result.state;
    selectedMap = state.mapId;
    selectedDifficulty = state.difficultyId;
    inspectedTowerId = undefined;
    gateButton.setAttribute("aria-pressed", String(selectedMap === "gate"));
    crossroadsButton.setAttribute("aria-pressed", String(selectedMap === "crossroads"));
    gateButton.classList.toggle("selected", selectedMap === "gate");
    crossroadsButton.classList.toggle("selected", selectedMap === "crossroads");
  } else {
    state.message = result.message;
  }
  updateHud();
});

motionButton.addEventListener("click", () => {
  reducedMotion = !reducedMotion;
  motionButton.setAttribute("aria-pressed", String(reducedMotion));
  motionButton.textContent = reducedMotion ? "Motion: reduced" : "Motion: full";
});

audioButton.addEventListener("click", () => {
  audioSettings = normaliseAudioSettings({ ...audioSettings, muted: !audioSettings.muted });
  saveAudioSettings(window.localStorage, audioSettings);
  audio.setSettings(audioSettings);
  updateAudioControls();
});
audioVolume.addEventListener("input", () => {
  audioSettings = normaliseAudioSettings({ ...audioSettings, volume: Number(audioVolume.value) });
  saveAudioSettings(window.localStorage, audioSettings);
  audio.setSettings(audioSettings);
});

diagnosticsButton.addEventListener("click", () => {
  diagnosticsVisible = !diagnosticsVisible;
  diagnosticsButton.setAttribute("aria-pressed", String(diagnosticsVisible));
  updateHud();
});

archerButton.addEventListener("click", () => selectTower("archer"));
mageButton.addEventListener("click", () => selectTower("mage"));
sentinelButton.addEventListener("click", () => selectTower("sentinel"));
gateButton.addEventListener("click", () => selectMap("gate"));
crossroadsButton.addEventListener("click", () => selectMap("crossroads"));
casualButton.addEventListener("click", () => selectDifficulty("casual"));
standardButton.addEventListener("click", () => selectDifficulty("standard"));
veteranButton.addEventListener("click", () => selectDifficulty("veteran"));
gateWatchButton.addEventListener("click", () => selectCampaignNode("gate-watch"));
crossroadsStandButton.addEventListener("click", () => selectCampaignNode("crossroads-stand"));
resetProfileButton.addEventListener("click", () => {
  profile = resetProfile(window.localStorage);
  recordedCampaignVictory = undefined;
  state.message = "Campaign progress reset.";
  updateHud();
});
upgradeTowerButton.addEventListener("click", () => {
  if (inspectedTowerId) upgradeTower(state, inspectedTowerId);
  updateHud();
});
targetPolicySelect.addEventListener("change", () => {
  if (inspectedTowerId) setTowerTargetPolicy(state, inspectedTowerId, targetPolicySelect.value as TargetPolicy);
  updateHud();
});
specialiseTowerButton.addEventListener("click", () => {
  if (inspectedTowerId) specialiseTower(state, inspectedTowerId, specialisationSelect.value);
  updateHud();
});

const engine = new Engine({
  fixedDeltaSeconds: 1 / 60,
  diagnostics,
  update: (deltaSeconds) => updateGame(state, deltaSeconds),
  render: () => {
    renderGame(context, state, placementPreview(), reducedMotion);
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
  sentinelButton.setAttribute("aria-pressed", String(kind === "sentinel"));
  archerButton.classList.toggle("selected", kind === "archer");
  mageButton.classList.toggle("selected", kind === "mage");
  sentinelButton.classList.toggle("selected", kind === "sentinel");
  state.message = `${TOWER_DEFINITIONS[kind].displayName} selected. Click grass to place it.`;
  updateHud();
}

function selectMap(mapId: MapId): void {
  if (state.waveActive) return;
  selectedMap = mapId;
  state = createGame(initialSeed, selectedMap, selectedDifficulty);
  inspectedTowerId = undefined;
  gateButton.setAttribute("aria-pressed", String(mapId === "gate"));
  crossroadsButton.setAttribute("aria-pressed", String(mapId === "crossroads"));
  gateButton.classList.toggle("selected", mapId === "gate");
  crossroadsButton.classList.toggle("selected", mapId === "crossroads");
  state.message = `${MAP_DEFINITIONS[mapId].displayName} selected. Prepare your defense.`;
  updateHud();
}

function selectDifficulty(difficultyId: DifficultyId): void {
  if (state.waveActive) return;
  selectedDifficulty = difficultyId;
  state = createGame(initialSeed, selectedMap, selectedDifficulty);
  for (const [id, button] of [["casual", casualButton], ["standard", standardButton], ["veteran", veteranButton]] as const) {
    button.setAttribute("aria-pressed", String(id === difficultyId));
    button.classList.toggle("selected", id === difficultyId);
  }
  state.message = `${DIFFICULTY_DEFINITIONS[difficultyId].displayName} difficulty selected.`;
  updateHud();
}

function selectCampaignNode(nodeId: string): void {
  if (state.waveActive) return;
  const node = CAMPAIGN_NODES.find((candidate) => candidate.id === nodeId);
  if (!node || !isCampaignNodeUnlocked(profile, node.id)) return;
  selectedCampaignNodeId = node.id;
  selectedMap = node.mapId;
  selectedDifficulty = node.difficultyId;
  state = createGame(initialSeed, selectedMap, selectedDifficulty);
  gateWatchButton.setAttribute("aria-pressed", String(node.id === "gate-watch"));
  crossroadsStandButton.setAttribute("aria-pressed", String(node.id === "crossroads-stand"));
  gateWatchButton.classList.toggle("selected", node.id === "gate-watch");
  crossroadsStandButton.classList.toggle("selected", node.id === "crossroads-stand");
  state.message = `${node.displayName}: ${node.description}`;
  updateHud();
}

function placementPreview() {
  const cell = keyboardCursorActive ? keyboardCursor : hoveredCell;
  if (!cell) return undefined;
  return { cell, kind: selectedTower, status: placementStatus(state, cell, selectedTower) };
}

function updateHud(): void {
  if (state.gameWon && recordedCampaignVictory !== selectedCampaignNodeId) {
    profile = completeCampaignNode(profile, selectedCampaignNodeId);
    saveProfile(window.localStorage, profile);
    recordedCampaignVictory = selectedCampaignNodeId;
  }
  gold.textContent = String(state.gold);
  lives.textContent = String(state.lives);
  wave.textContent = `${state.wave}/${TOTAL_WAVES}`;
  message.textContent = state.message;
  waveBriefing.textContent = nextWaveBriefing(state);
  startWaveButton.disabled = state.waveActive || state.gameOver || state.gameWon;
  saveButton.disabled = state.phase !== "intermission";
  gateButton.disabled = state.waveActive;
  crossroadsButton.disabled = state.waveActive;
  casualButton.disabled = state.waveActive;
  standardButton.disabled = state.waveActive;
  veteranButton.disabled = state.waveActive;
  gateWatchButton.disabled = state.waveActive;
  crossroadsStandButton.disabled = state.waveActive || !isCampaignNodeUnlocked(profile, "crossroads-stand");
  startWaveButton.textContent = state.waveActive ? "Wave underway" : state.gameWon || state.gameOver ? "Wave complete" : `Start wave ${state.wave + 1}`;
  updatePlacementMessage();
  updateTowerInspector();
  updateDeveloperOverlay();
  updateAudioControls();
}

function updateAudioControls(): void {
  audioButton.setAttribute("aria-pressed", String(audioSettings.muted));
  audioButton.textContent = audioSettings.muted ? "Audio: off" : "Audio: on";
  audioVolume.value = String(audioSettings.volume);
}

function updateDeveloperOverlay(): void {
  developerOverlay.hidden = !diagnosticsVisible;
  if (!diagnosticsVisible) return;
  const events = state.events.length === 0 ? "(no events yet)" : state.events.map((event) => `${event.step} ${event.kind}: ${event.message}`).join("\n");
  developerOverlayText.textContent = [
    `seed: ${initialSeed}  step: ${state.step}  map: ${state.mapId}`,
    `phase: ${state.phase}  enemies: ${state.enemies.length}  towers: ${state.towers.length}  projectiles: ${state.projectiles.length}`,
    `events:\n${events}`,
    `telemetry:\n${telemetryReport(state)}`
  ].join("\n");
}

function updatePlacementMessage(): void {
  const cell = keyboardCursorActive ? keyboardCursor : hoveredCell;
  if (!cell) {
    placementMessage.textContent = "";
    return;
  }
  const status = placementStatus(state, cell, selectedTower);
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
  targetPolicySelect.value = tower.targetPolicy;
  targetPolicySelect.disabled = state.gameOver || state.gameWon;
  const specialisations = definition.specialisations;
  const canSpecialise = tower.level >= definition.upgrades.length && !tower.specialisationId;
  specialisationControl.hidden = !canSpecialise;
  specialiseTowerButton.hidden = !canSpecialise;
  if (canSpecialise) {
    specialisationSelect.replaceChildren(...specialisations.map((specialisation) => new Option(`${specialisation.displayName} (${specialisation.cost} gold)`, specialisation.id)));
    const selected = specialisations.find((specialisation) => specialisation.id === specialisationSelect.value) ?? specialisations[0];
    specialiseTowerButton.textContent = `Specialise (${selected.cost} gold)`;
    specialiseTowerButton.disabled = state.gold < selected.cost || state.gameOver || state.gameWon;
  }
  upgradeTowerButton.textContent = upgrade ? `Upgrade (${upgrade.cost} gold)` : "Maximum level";
  upgradeTowerButton.disabled = !upgrade || state.gold < upgrade.cost || state.gameOver || state.gameWon;
}

function cellAt(x: number, y: number): Cell {
  return { column: Math.floor(x / BOARD.tileSize), row: Math.floor(y / BOARD.tileSize) };
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function requiredElement<ElementType extends HTMLElement>(id: string): ElementType {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Expected page element #${id}.`);
  return element as ElementType;
}
