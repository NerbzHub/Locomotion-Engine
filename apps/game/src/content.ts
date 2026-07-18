export interface WaveDefinition {
  readonly enemyCount: number;
  readonly baseHealth: number;
  readonly healthVariation: number;
  readonly speedRange: readonly [minimum: number, maximum: number];
  readonly reward: number;
  readonly clearBonus: number;
}

/** Game-owned balance data. Engine code has no knowledge of towers or waves. */
export const WAVE_DEFINITIONS: readonly WaveDefinition[] = [
  { enemyCount: 7, baseHealth: 24, healthVariation: 6, speedRange: [34, 46], reward: 6, clearBonus: 12 },
  { enemyCount: 9, baseHealth: 34, healthVariation: 8, speedRange: [36, 48], reward: 8, clearBonus: 18 },
  { enemyCount: 11, baseHealth: 46, healthVariation: 10, speedRange: [38, 50], reward: 10, clearBonus: 26 }
];
