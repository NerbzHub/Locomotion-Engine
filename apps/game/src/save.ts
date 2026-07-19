import { DIFFICULTY_DEFINITIONS, MAP_DEFINITIONS, TOWER_DEFINITIONS, WAVE_DEFINITIONS } from "./content";
import type { DifficultyId, MapId, TowerKind } from "./content";
import { createGame } from "./simulation";
import type { GameState, TargetPolicy } from "./simulation";

const SAVE_KEY = "locomotion-engine:dungeon-defense:save";
const SAVE_VERSION = 1;

interface SavedTower {
  readonly kind: TowerKind;
  readonly cell: { readonly column: number; readonly row: number };
  readonly level: number;
  readonly targetPolicy: TargetPolicy;
  readonly specialisationId?: string;
}

interface SavedGame {
  readonly version: typeof SAVE_VERSION;
  readonly seed: number;
  readonly randomState: number;
  readonly mapId: MapId;
  readonly difficultyId: DifficultyId;
  readonly gold: number;
  readonly lives: number;
  readonly wave: number;
  readonly towers: readonly SavedTower[];
}

export type SaveResult = { readonly ok: true } | { readonly ok: false; readonly message: string };
export type LoadResult = { readonly ok: true; readonly state: GameState } | { readonly ok: false; readonly message: string };

/** Serialises only an intermission, never unstable mid-wave entities. */
export function serialiseIntermission(state: GameState): string | undefined {
  if (state.phase !== "intermission") return undefined;
  const saved: SavedGame = {
    version: SAVE_VERSION,
    seed: state.seed,
    randomState: state.random.state(),
    mapId: state.mapId,
    difficultyId: state.difficultyId,
    gold: state.gold,
    lives: state.lives,
    wave: state.wave,
    towers: state.towers.map((tower) => ({ kind: tower.kind, cell: { ...tower.cell }, level: tower.level, targetPolicy: tower.targetPolicy, specialisationId: tower.specialisationId }))
  };
  return JSON.stringify(saved);
}

export function restoreIntermission(serialised: string): LoadResult {
  try {
    const value: unknown = JSON.parse(serialised);
    if (!isSavedGame(value)) return { ok: false, message: "This save is incompatible or malformed." };
    const state = createGame(value.seed, value.mapId, value.difficultyId);
    state.random.restoreState(value.randomState);
    state.gold = value.gold;
    state.lives = value.lives;
    state.wave = value.wave;
    for (const savedTower of value.towers) {
      state.towers.push({ id: state.world.create("tower").id, kind: savedTower.kind, cell: { ...savedTower.cell }, level: savedTower.level, targetPolicy: savedTower.targetPolicy, specialisationId: savedTower.specialisationId, cooldownSeconds: 0 });
    }
    state.message = `Intermission restored before wave ${state.wave + 1}.`;
    return { ok: true, state };
  } catch {
    return { ok: false, message: "This save could not be read." };
  }
}

export function saveToLocalStorage(storage: Storage, state: GameState): SaveResult {
  const serialised = serialiseIntermission(state);
  if (!serialised) return { ok: false, message: "Saving is available between waves only." };
  storage.setItem(SAVE_KEY, serialised);
  return { ok: true };
}

export function loadFromLocalStorage(storage: Storage): LoadResult {
  const serialised = storage.getItem(SAVE_KEY);
  if (!serialised) return { ok: false, message: "No saved intermission was found." };
  return restoreIntermission(serialised);
}

function isSavedGame(value: unknown): value is SavedGame {
  if (!isRecord(value) || value.version !== SAVE_VERSION || !isFiniteNumber(value.seed) || !isFiniteNumber(value.randomState) || !isFiniteNumber(value.gold) || !isFiniteNumber(value.lives) || !isFiniteNumber(value.wave) || !Array.isArray(value.towers)) return false;
  if (typeof value.mapId !== "string" || !(value.mapId in MAP_DEFINITIONS) || typeof value.difficultyId !== "string" || !(value.difficultyId in DIFFICULTY_DEFINITIONS) || value.gold < 0 || value.lives < 0 || value.wave < 0 || value.wave > WAVE_DEFINITIONS.length) return false;
  return value.towers.every((tower) => isSavedTower(tower));
}

function isSavedTower(value: unknown): value is SavedTower {
  if (!isRecord(value) || typeof value.kind !== "string" || !(value.kind in TOWER_DEFINITIONS) || !isRecord(value.cell) || !isFiniteNumber(value.cell.column) || !isFiniteNumber(value.cell.row) || !isFiniteNumber(value.level) || !isTargetPolicy(value.targetPolicy)) return false;
  return Number.isInteger(value.cell.column) && Number.isInteger(value.cell.row) && Number.isInteger(value.level) && value.level >= 0 && value.level <= TOWER_DEFINITIONS[value.kind as TowerKind].upgrades.length && (value.specialisationId === undefined || typeof value.specialisationId === "string");
}

function isTargetPolicy(value: unknown): value is TargetPolicy {
  return value === "nearest-exit" || value === "closest" || value === "strongest" || value === "weakest";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
