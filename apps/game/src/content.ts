export interface TowerDefinition {
  readonly displayName: string;
  readonly cost: number;
  readonly range: number;
  readonly cooldownSeconds: number;
  readonly projectileDamage: number;
  readonly projectileSpeed: number;
  readonly projectileColor: string;
}

export interface EnemyDefinition {
  readonly displayName: string;
  readonly baseHealth: number;
  readonly healthVariation: number;
  readonly speedRange: readonly [minimum: number, maximum: number];
  readonly reward: number;
  readonly color: string;
  readonly eyeColor: string;
  readonly radius: number;
}

/** Enemy balance and presentation are authored game content, not engine concerns. */
export const ENEMY_DEFINITIONS = {
  slime: {
    displayName: "Slime",
    baseHealth: 24,
    healthVariation: 6,
    speedRange: [34, 46],
    reward: 6,
    color: "#bf5e5e",
    eyeColor: "#33263a",
    radius: 14
  },
  beetle: {
    displayName: "Beetle",
    baseHealth: 54,
    healthVariation: 8,
    speedRange: [24, 32],
    reward: 12,
    color: "#916d3f",
    eyeColor: "#fff0ba",
    radius: 17
  },
  wisp: {
    displayName: "Wisp",
    baseHealth: 20,
    healthVariation: 4,
    speedRange: [58, 70],
    reward: 8,
    color: "#9b7be2",
    eyeColor: "#e8dfff",
    radius: 10
  }
} as const satisfies Record<string, EnemyDefinition>;

export type EnemyKind = keyof typeof ENEMY_DEFINITIONS;

export interface WaveDefinition {
  readonly enemyKinds: readonly EnemyKind[];
  readonly clearBonus: number;
}

/** Wave composition deliberately introduces one new enemy type at a time. */
export const WAVE_DEFINITIONS: readonly WaveDefinition[] = [
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "slime", "slime"], clearBonus: 12 },
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "beetle", "beetle", "beetle"], clearBonus: 18 },
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "beetle", "beetle", "beetle", "beetle", "wisp", "wisp"], clearBonus: 26 }
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
