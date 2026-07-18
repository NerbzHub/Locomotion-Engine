export interface WaveDefinition {
  readonly enemyCount: number;
  readonly baseHealth: number;
  readonly healthVariation: number;
  readonly speedRange: readonly [minimum: number, maximum: number];
  readonly reward: number;
  readonly clearBonus: number;
}

export interface TowerDefinition {
  readonly displayName: string;
  readonly cost: number;
  readonly range: number;
  readonly cooldownSeconds: number;
  readonly projectileDamage: number;
  readonly projectileSpeed: number;
  readonly projectileColor: string;
}

/** Game-owned balance data. Engine code has no knowledge of towers or waves. */
export const WAVE_DEFINITIONS: readonly WaveDefinition[] = [
  { enemyCount: 7, baseHealth: 24, healthVariation: 6, speedRange: [34, 46], reward: 6, clearBonus: 12 },
  { enemyCount: 9, baseHealth: 34, healthVariation: 8, speedRange: [36, 48], reward: 8, clearBonus: 18 },
  { enemyCount: 11, baseHealth: 46, healthVariation: 10, speedRange: [38, 50], reward: 10, clearBonus: 26 }
];

/** Tower balance and presentation are authored game content, not engine concerns. */
export const TOWER_DEFINITIONS = {
  archer: {
    displayName: "Archer",
    cost: 25,
    range: 145,
    cooldownSeconds: 0.45,
    projectileDamage: 8,
    projectileSpeed: 420,
    projectileColor: "#fff2a6"
  },
  mage: {
    displayName: "Mage",
    cost: 35,
    range: 190,
    cooldownSeconds: 0.9,
    projectileDamage: 18,
    projectileSpeed: 360,
    projectileColor: "#9be7ff"
  }
} as const satisfies Record<string, TowerDefinition>;

export type TowerKind = keyof typeof TOWER_DEFINITIONS;
