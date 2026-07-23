import { CAMPAIGN_NODES } from "./content";
import type { DifficultyId, MapId, TowerKind } from "./content";
import { createGame, placeTower, startWave, updateGame } from "./simulation";
import type { Cell, GameState } from "./simulation";

const REPLAY_VERSION = 1;

export type ReplayAction =
  | { readonly step: number; readonly type: "place"; readonly cell: Cell; readonly kind: TowerKind }
  | { readonly step: number; readonly type: "start-wave" };

export interface Replay {
  readonly version: typeof REPLAY_VERSION;
  readonly seed: number;
  readonly mapId: MapId;
  readonly difficultyId: DifficultyId;
  readonly missionId?: string;
  readonly actions: readonly ReplayAction[];
}

export function exportReplay(state: GameState, actions: readonly ReplayAction[]): string {
  return JSON.stringify({ version: REPLAY_VERSION, seed: state.seed, mapId: state.mapId, difficultyId: state.difficultyId, missionId: state.missionId, actions }, null, 2);
}

export function importReplay(serialised: string): Replay | undefined {
  try {
    const value: unknown = JSON.parse(serialised);
    if (!isReplay(value)) return undefined;
    return value;
  } catch { return undefined; }
}

export function playReplay(replay: Replay, finalStep: number): GameState {
  const state = createGame(replay.seed, replay.mapId, replay.difficultyId, replay.missionId);
  for (const action of replay.actions) {
    while (state.step < action.step) updateGame(state, 1 / 60);
    if (action.type === "place") placeTower(state, action.cell, action.kind);
    else startWave(state);
  }
  while (state.step < finalStep) updateGame(state, 1 / 60);
  return state;
}

function isReplay(value: unknown): value is Replay {
  if (!isRecord(value) || value.version !== REPLAY_VERSION || typeof value.seed !== "number" || typeof value.mapId !== "string" || typeof value.difficultyId !== "string" || (value.missionId !== undefined && (typeof value.missionId !== "string" || !CAMPAIGN_NODES.some((node) => node.id === value.missionId))) || !Array.isArray(value.actions)) return false;
  return value.actions.every((action) => isRecord(action) && typeof action.step === "number" && Number.isInteger(action.step) && action.step >= 0 && (action.type === "start-wave" || (action.type === "place" && isRecord(action.cell) && typeof action.cell.column === "number" && typeof action.cell.row === "number" && typeof action.kind === "string")));
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
