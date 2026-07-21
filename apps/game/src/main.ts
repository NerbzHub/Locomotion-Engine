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
import { GLOSSARY_ENTRIES, dismissTutorial, shouldShowTutorial } from "./tutorial";
import { exportReplay, importReplay, playReplay } from "./replay";
import type { ReplayAction } from "./replay";
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
const helpButton = requiredElement<HTMLButtonElement>("open-help");
const exportReplayButton = requiredElement<HTMLButtonElement>("export-replay");
const importReplayButton = requiredElement<HTMLButtonElement>("import-replay");
const tutorialPanel = requiredElement<HTMLElement>("tutorial-panel");
const dismissTutorialButton = requiredElement<HTMLButtonElement>("dismiss-tutorial");
const glossary = requiredElement<HTMLElement>("glossary");
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
const missionContext = requiredElement<HTMLElement>("mission-context");
const selectedTowerSummary = requiredElement<HTMLElement>("selected-tower-summary");
const archerDetail = requiredElement<HTMLElement>("archer-detail");
const mageDetail = requiredElement<HTMLElement>("mage-detail");
const sentinelDetail = requiredElement<HTMLElement>("sentinel-detail");
const crossroadsUnlockCopy = requiredElement<HTMLElement>("crossroads-unlock-copy");
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
const setupPanel = requiredElement<HTMLElement>("setup-panel");
const towerPalette = requiredElement<HTMLElement>("tower-palette");
const waveBriefingPanel = requiredElement<HTMLElement>("wave-briefing-panel");
const gameMenu = requiredElement<HTMLDetailsElement>("game-menu");
const commandDock = requiredElement<HTMLElement>("command-dock");
const outcomePanel = requiredElement<HTMLElement>("outcome-panel");
const outcomeKicker = requiredElement<HTMLElement>("outcome-kicker");
const outcomeTitle = requiredElement<HTMLElement>("outcome-title");
const outcomeSummary = requiredElement<HTMLElement>("outcome-summary");
const outcomePrimaryButton = requiredElement<HTMLButtonElement>("outcome-primary");
const changeMissionButton = requiredElement<HTMLButtonElement>("change-mission");
const boardStage = requiredElement<HTMLElement>("board-stage");
const buildConfirmControls = requiredElement<HTMLElement>("build-confirm-controls");
const confirmBuildButton = requiredElement<HTMLButtonElement>("confirm-build");
const cancelBuildButton = requiredElement<HTMLButtonElement>("cancel-build");
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
let selectedCampaignNodeId: string | undefined = "gate-watch";
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
let replayActions: ReplayAction[] = [];
let audioSettings = loadAudioSettings(window.localStorage);
let tutorialOpenedManually = false;
let missionSetupVisible = true;
let outcomeDismissed = false;
let pendingPlacement: { readonly cell: Cell; readonly kind: TowerKind } | undefined;
const audio = new GameAudio(audioSettings);
glossary.replaceChildren(...GLOSSARY_ENTRIES.flatMap(([term, description]) => [createGlossaryTerm(term), createGlossaryDescription(description)]));
tutorialPanel.hidden = !shouldShowTutorial(window.localStorage);
const pointer = new PointerInput(canvas);

pointer.onPointerDown((point) => {
  if (pendingPlacement) return;
  const cell = cellAt(point.x, point.y);
  const tower = towerAtCell(state, cell);
  if (tower) inspectedTowerId = tower.id;
  else requestTowerPlacement(cell);
  updateHud();
});

pointer.onPointerMove((point) => {
  hoveredCell = cellAt(point.x, point.y);
  keyboardCursorActive = false;
  updateHud();
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
    if (pendingPlacement) {
      event.preventDefault();
      return;
    }
    const tower = towerAtCell(state, keyboardCursor);
    if (tower) inspectedTowerId = tower.id;
    else requestTowerPlacement(keyboardCursor);
    keyboardCursorActive = true;
    event.preventDefault();
    updateHud();
  }
});

startWaveButton.addEventListener("click", () => {
  if (startWave(state)) {
    replayActions.push({ step: state.step, type: "start-wave" });
    missionSetupVisible = false;
    audio.play("wave");
  }
  closeGameMenu();
  updateHud();
});

restartButton.addEventListener("click", () => {
  if (!window.confirm("Restart this run? Your current towers and wave progress will be lost.")) return;
  startNewDefense();
  closeGameMenu();
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
    selectedCampaignNodeId = undefined;
    missionSetupVisible = false;
    outcomeDismissed = false;
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
helpButton.addEventListener("click", () => {
  tutorialOpenedManually = true;
  tutorialPanel.hidden = false;
  closeGameMenu();
});
dismissTutorialButton.addEventListener("click", () => {
  dismissTutorial(window.localStorage);
  tutorialOpenedManually = false;
  tutorialPanel.hidden = true;
});
exportReplayButton.addEventListener("click", () => { window.prompt("Copy replay JSON", exportReplay(state, replayActions)); });
importReplayButton.addEventListener("click", () => {
  const replay = importReplay(window.prompt("Paste replay JSON") ?? "");
  if (!replay) { state.message = "Replay is incompatible or malformed."; updateHud(); return; }
  state = playReplay(replay, Math.max(0, ...replay.actions.map((action) => action.step)));
  replayActions = [...replay.actions];
  state.message = `Replay imported: ${replay.actions.length} actions. Start it or compare it in diagnostics.`;
  updateHud();
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
outcomePrimaryButton.addEventListener("click", () => {
  if (state.gameWon && selectedCampaignNodeId === "gate-watch" && isCampaignNodeUnlocked(profile, "crossroads-stand")) {
    selectCampaignNode("crossroads-stand");
    return;
  }
  startNewDefense();
  updateHud();
});
changeMissionButton.addEventListener("click", () => {
  missionSetupVisible = true;
  outcomeDismissed = true;
  updateHud();
});
confirmBuildButton.addEventListener("click", () => {
  const placement = pendingPlacement;
  if (!placement) return;
  if (placeTower(state, placement.cell, placement.kind)) {
    replayActions.push({ step: state.step, type: "place", cell: placement.cell, kind: placement.kind });
    audio.play("placement");
  }
  closeBuildConfirmation();
  updateHud();
});
cancelBuildButton.addEventListener("click", () => {
  state.message = "Build cancelled. Choose another grass tile when ready.";
  closeBuildConfirmation();
  updateHud();
});
canvas.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !pendingPlacement) return;
  state.message = "Build cancelled. Choose another grass tile when ready.";
  closeBuildConfirmation();
  event.preventDefault();
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
  update: (deltaSeconds) => {
    if (!isInterfacePaused()) updateGame(state, deltaSeconds);
  },
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
  state.message = `${TOWER_DEFINITIONS[kind].displayName} selected. Choose a grass tile.`;
  updateHud();
}

function selectMap(mapId: MapId): void {
  if (!canConfigureScenario()) return;
  selectedMap = mapId;
  selectedCampaignNodeId = undefined;
  startNewDefense();
  gateButton.setAttribute("aria-pressed", String(mapId === "gate"));
  crossroadsButton.setAttribute("aria-pressed", String(mapId === "crossroads"));
  gateButton.classList.toggle("selected", mapId === "gate");
  crossroadsButton.classList.toggle("selected", mapId === "crossroads");
  state.message = `${MAP_DEFINITIONS[mapId].displayName} custom game selected.`;
  updateHud();
}

function selectDifficulty(difficultyId: DifficultyId): void {
  if (!canConfigureScenario()) return;
  selectedDifficulty = difficultyId;
  selectedCampaignNodeId = undefined;
  startNewDefense();
  for (const [id, button] of [["casual", casualButton], ["standard", standardButton], ["veteran", veteranButton]] as const) {
    button.setAttribute("aria-pressed", String(id === difficultyId));
    button.classList.toggle("selected", id === difficultyId);
  }
  state.message = `${DIFFICULTY_DEFINITIONS[difficultyId].displayName} custom difficulty selected.`;
  updateHud();
}

function selectCampaignNode(nodeId: string): void {
  if (!canConfigureScenario()) return;
  const node = CAMPAIGN_NODES.find((candidate) => candidate.id === nodeId);
  if (!node || !isCampaignNodeUnlocked(profile, node.id)) return;
  selectedCampaignNodeId = node.id;
  selectedMap = node.mapId;
  selectedDifficulty = node.difficultyId;
  startNewDefense();
  gateWatchButton.setAttribute("aria-pressed", String(node.id === "gate-watch"));
  crossroadsStandButton.setAttribute("aria-pressed", String(node.id === "crossroads-stand"));
  gateWatchButton.classList.toggle("selected", node.id === "gate-watch");
  crossroadsStandButton.classList.toggle("selected", node.id === "crossroads-stand");
  state.message = `${node.displayName}: ${node.description}`;
  updateHud();
}

function placementPreview() {
  const cell = pendingPlacement?.cell ?? (keyboardCursorActive ? keyboardCursor : hoveredCell);
  if (!cell) return undefined;
  const kind = pendingPlacement?.kind ?? selectedTower;
  return { cell, kind, status: placementStatus(state, cell, kind) };
}

function updateHud(): void {
  if (state.gameWon && selectedCampaignNodeId && recordedCampaignVictory !== selectedCampaignNodeId) {
    profile = completeCampaignNode(profile, selectedCampaignNodeId);
    saveProfile(window.localStorage, profile);
    recordedCampaignVictory = selectedCampaignNodeId;
  }
  gold.textContent = String(state.gold);
  lives.textContent = String(state.lives);
  wave.textContent = `${state.wave}/${TOTAL_WAVES}`;
  waveBriefing.textContent = nextWaveBriefing(state);
  const gameEnded = state.gameOver || state.gameWon;
  setupPanel.hidden = !missionSetupVisible;
  tutorialPanel.hidden = !missionSetupVisible && !tutorialOpenedManually;
  outcomePanel.hidden = !gameEnded || outcomeDismissed;
  commandDock.hidden = gameEnded;
  towerPalette.hidden = gameEnded;
  waveBriefingPanel.hidden = state.waveActive || gameEnded;
  startWaveButton.hidden = state.waveActive || gameEnded;
  startWaveButton.disabled = state.waveActive || gameEnded;
  saveButton.disabled = state.phase !== "intermission";
  gateButton.disabled = !missionSetupVisible;
  crossroadsButton.disabled = !missionSetupVisible;
  casualButton.disabled = !missionSetupVisible;
  standardButton.disabled = !missionSetupVisible;
  veteranButton.disabled = !missionSetupVisible;
  gateWatchButton.disabled = !missionSetupVisible;
  crossroadsStandButton.disabled = !missionSetupVisible || !isCampaignNodeUnlocked(profile, "crossroads-stand");
  resetProfileButton.disabled = !missionSetupVisible;
  startWaveButton.textContent = `Start wave ${state.wave + 1}`;
  updateMissionControls();
  updateTowerChoices();
  updateBuildConfirmationControls();
  message.textContent = contextualMessage();
  updateOutcome();
  updateTowerInspector();
  updateDeveloperOverlay();
  updateAudioControls();
}

function canConfigureScenario(): boolean {
  return missionSetupVisible || state.gameOver || state.gameWon;
}

function closeGameMenu(): void {
  gameMenu.open = false;
}

function startNewDefense(): void {
  state = createGame(initialSeed, selectedMap, selectedDifficulty);
  inspectedTowerId = undefined;
  hoveredCell = undefined;
  keyboardCursorActive = false;
  replayActions = [];
  recordedCampaignVictory = undefined;
  missionSetupVisible = false;
  outcomeDismissed = false;
}

function isInterfacePaused(): boolean {
  return state.waveActive && (gameMenu.open || tutorialOpenedManually || Boolean(pendingPlacement));
}

function requestTowerPlacement(cell: Cell): void {
  const status = placementStatus(state, cell, selectedTower);
  if (status !== "valid") {
    placeTower(state, cell, selectedTower);
    return;
  }
  const definition = TOWER_DEFINITIONS[selectedTower];
  pendingPlacement = { cell: { ...cell }, kind: selectedTower };
  state.message = `Confirm ${definition.displayName} at tile ${cell.column + 1}, ${cell.row + 1}.`;
  updateBuildConfirmationControls();
}

function closeBuildConfirmation(): void {
  pendingPlacement = undefined;
  buildConfirmControls.hidden = true;
}

function updateBuildConfirmationControls(): void {
  const placement = pendingPlacement;
  if (!placement) {
    buildConfirmControls.hidden = true;
    return;
  }
  const bounds = boardStage.getBoundingClientRect();
  const cellWidth = bounds.width / BOARD.columns;
  const cellHeight = bounds.height / BOARD.rows;
  const centerX = (placement.cell.column + 0.5) * cellWidth;
  const buttonRadius = 21;
  const top = Math.max(buttonRadius + 4, placement.cell.row * cellHeight - buttonRadius);
  buildConfirmControls.style.left = `${centerX}px`;
  buildConfirmControls.style.top = `${top}px`;
  buildConfirmControls.hidden = false;
}

function updateMissionControls(): void {
  const node = selectedCampaignNodeId ? CAMPAIGN_NODES.find((candidate) => candidate.id === selectedCampaignNodeId) : undefined;
  missionContext.textContent = node ? `${node.displayName} · ${DIFFICULTY_DEFINITIONS[state.difficultyId].displayName}` : `${MAP_DEFINITIONS[state.mapId].displayName} · ${DIFFICULTY_DEFINITIONS[state.difficultyId].displayName}`;
  gateWatchButton.setAttribute("aria-pressed", String(selectedCampaignNodeId === "gate-watch"));
  crossroadsStandButton.setAttribute("aria-pressed", String(selectedCampaignNodeId === "crossroads-stand"));
  gateWatchButton.classList.toggle("selected", selectedCampaignNodeId === "gate-watch");
  crossroadsStandButton.classList.toggle("selected", selectedCampaignNodeId === "crossroads-stand");
  gateButton.setAttribute("aria-pressed", String(state.mapId === "gate"));
  crossroadsButton.setAttribute("aria-pressed", String(state.mapId === "crossroads"));
  gateButton.classList.toggle("selected", state.mapId === "gate");
  crossroadsButton.classList.toggle("selected", state.mapId === "crossroads");
  for (const [id, button] of [["casual", casualButton], ["standard", standardButton], ["veteran", veteranButton]] as const) {
    button.setAttribute("aria-pressed", String(state.difficultyId === id));
    button.classList.toggle("selected", state.difficultyId === id);
  }
  crossroadsUnlockCopy.textContent = isCampaignNodeUnlocked(profile, "crossroads-stand") ? "Unlocked — defend the split approach." : "Clear Gate Watch to unlock.";
}

function updateTowerChoices(): void {
  const details: Record<TowerKind, HTMLElement> = { archer: archerDetail, mage: mageDetail, sentinel: sentinelDetail };
  const buttons: Record<TowerKind, HTMLButtonElement> = { archer: archerButton, mage: mageButton, sentinel: sentinelButton };
  const roles: Record<TowerKind, string> = { archer: "reliable starter", mage: "crowd range", sentinel: "slows fast enemies" };
  const definition = TOWER_DEFINITIONS[selectedTower];
  selectedTowerSummary.textContent = `${definition.displayName} · ${definition.cost} gold · range ${Math.round(definition.range)}. ${roles[selectedTower]}. Tap grass to place.`;
  for (const kind of Object.keys(TOWER_DEFINITIONS) as TowerKind[]) {
    const tower = TOWER_DEFINITIONS[kind];
    const shortfall = Math.max(0, tower.cost - state.gold);
    details[kind].textContent = shortfall === 0 ? `${tower.cost} gold · ${roles[kind]}` : `Need ${shortfall} more gold`;
    buttons[kind].classList.toggle("unaffordable", shortfall > 0);
  }
}

function contextualMessage(): string {
  const cell = keyboardCursorActive ? keyboardCursor : hoveredCell;
  if (!cell) return state.message;
  const status = placementStatus(state, cell, selectedTower);
  if (status === "valid") return `${TOWER_DEFINITIONS[selectedTower].displayName} ready — tap grass to place.`;
  const descriptions: Record<typeof status, string> = {
    path: "Path tiles cannot hold towers.",
    occupied: "That tile already has a tower — tap it to inspect.",
    unaffordable: `Need ${TOWER_DEFINITIONS[selectedTower].cost - state.gold} more gold for ${TOWER_DEFINITIONS[selectedTower].displayName}.`,
    ended: "This run has ended. Choose your next action above."
  };
  return descriptions[status];
}

function updateOutcome(): void {
  if (!state.gameWon && !state.gameOver) return;
  if (state.gameWon) {
    const canAdvance = selectedCampaignNodeId === "gate-watch" && isCampaignNodeUnlocked(profile, "crossroads-stand");
    outcomeKicker.textContent = canAdvance ? "Mission unlocked" : "Mission complete";
    outcomeTitle.textContent = "Dungeon defended";
    outcomeSummary.textContent = `You cleared all ${TOTAL_WAVES} waves with ${state.lives} lives remaining and built ${state.towers.length} tower${state.towers.length === 1 ? "" : "s"}.`;
    outcomePrimaryButton.textContent = canAdvance ? "Play Crossroads Stand" : "Play again";
  } else {
    outcomeKicker.textContent = "Run ended";
    outcomeTitle.textContent = "The dungeon fell";
    outcomeSummary.textContent = `You reached wave ${state.wave}/${TOTAL_WAVES}, built ${state.towers.length} tower${state.towers.length === 1 ? "" : "s"}, and can try a new defense.`;
    outcomePrimaryButton.textContent = "Try again";
  }
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

function createGlossaryTerm(text: string): HTMLElement {
  const element = document.createElement("dt");
  element.textContent = text;
  return element;
}

function createGlossaryDescription(text: string): HTMLElement {
  const element = document.createElement("dd");
  element.textContent = text;
  return element;
}

function requiredElement<ElementType extends HTMLElement>(id: string): ElementType {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Expected page element #${id}.`);
  return element as ElementType;
}
