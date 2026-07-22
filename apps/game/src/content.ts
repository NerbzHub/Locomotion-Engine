export interface TowerDefinition {
  readonly displayName: string;
  readonly cost: number;
  readonly range: number;
  readonly cooldownSeconds: number;
  readonly projectileDamage: number;
  readonly projectileSpeed: number;
  readonly projectileColor: string;
  readonly slowEffect?: TowerSlowEffect;
  readonly upgrades: readonly TowerUpgradeDefinition[];
  readonly specialisations: readonly TowerSpecialisationDefinition[];
}

export interface TowerSlowEffect {
  readonly speedMultiplier: number;
  readonly durationSeconds: number;
}

/** Each tier modifies the base tower without mutating its authored definition. */
export interface TowerUpgradeDefinition {
  readonly cost: number;
  readonly rangeBonus: number;
  readonly damageBonus: number;
  readonly cooldownMultiplier: number;
}

export interface TowerSpecialisationDefinition {
  readonly id: string;
  readonly displayName: string;
  readonly cost: number;
  readonly rangeBonus: number;
  readonly damageBonus: number;
  readonly cooldownMultiplier: number;
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
  readonly trait?: EnemyTraitDefinition;
}

/** Enemy traits stay authored data so combat behaviour remains specific and testable. */
export type EnemyTraitDefinition = EnemyArmorTrait | EnemySpeedBurstTrait;

export interface EnemyArmorTrait {
  readonly kind: "armor";
  readonly flatDamageReduction: number;
}

export interface EnemySpeedBurstTrait {
  readonly kind: "speed-burst";
  readonly intervalSeconds: number;
  readonly durationSeconds: number;
  readonly speedMultiplier: number;
}

export interface MapDefinition {
  readonly displayName: string;
  readonly columns: number;
  readonly rows: number;
  readonly tileSize: number;
  readonly pathNodes: readonly MapPoint[];
  readonly pathCells: readonly string[];
  readonly grassColor: string;
  readonly pathColor: string;
  readonly pathEdgeColor: string;
}

export interface MapPoint {
  readonly x: number;
  readonly y: number;
}

/** Maps are authored data; both initial maps intentionally share board dimensions. */
export const MAP_DEFINITIONS = {
  gate: {
    displayName: "Dungeon Gate",
    columns: 12,
    rows: 8,
    tileSize: 64,
    pathNodes: [{ x: -32, y: 224 }, { x: 224, y: 224 }, { x: 224, y: 96 }, { x: 480, y: 96 }, { x: 480, y: 416 }, { x: 800, y: 416 }],
    pathCells: ["0:3", "1:3", "2:3", "3:3", "3:1", "3:2", "4:1", "5:1", "6:1", "7:1", "7:2", "7:3", "7:4", "7:5", "7:6", "8:6", "9:6", "10:6", "11:6"],
    grassColor: "#6caa5f",
    pathColor: "#c69b64",
    pathEdgeColor: "#e8c488"
  },
  crossroads: {
    displayName: "Crossroads",
    columns: 12,
    rows: 8,
    tileSize: 64,
    pathNodes: [{ x: -32, y: 352 }, { x: 160, y: 352 }, { x: 160, y: 160 }, { x: 416, y: 160 }, { x: 416, y: 288 }, { x: 800, y: 288 }],
    pathCells: ["0:5", "1:5", "2:5", "2:2", "2:3", "2:4", "3:2", "4:2", "5:2", "6:2", "6:3", "6:4", "7:4", "8:4", "9:4", "10:4", "11:4"],
    grassColor: "#608fa8",
    pathColor: "#8f7456",
    pathEdgeColor: "#e5c38a"
  }
} as const satisfies Record<string, MapDefinition>;

export type MapId = keyof typeof MAP_DEFINITIONS;

export interface DifficultyDefinition {
  readonly displayName: string;
  readonly startingGold: number;
  readonly startingLives: number;
  readonly enemyHealthMultiplier: number;
}

export interface EliteDefinition {
  readonly healthMultiplier: number;
  readonly rewardMultiplier: number;
  readonly color: string;
}

export const ELITE_DEFINITION: EliteDefinition = { healthMultiplier: 1.7, rewardMultiplier: 2, color: "#ffd166" };

export interface BossDefinition {
  readonly displayName: string;
  readonly enemyKind: EnemyKind;
  readonly healthMultiplier: number;
  readonly reward: number;
  readonly phaseThresholds: readonly number[];
  readonly phaseSpeedMultipliers: readonly number[];
  readonly color: string;
}

export const BOSS_DEFINITION: BossDefinition = {
  displayName: "Gate Warden",
  enemyKind: "beetle",
  healthMultiplier: 4,
  reward: 40,
  phaseThresholds: [0.66, 0.33],
  phaseSpeedMultipliers: [1, 1.15, 1.35],
  color: "#ff9f6e"
};

export const DIFFICULTY_DEFINITIONS = {
  casual: { displayName: "Casual", startingGold: 65, startingLives: 14, enemyHealthMultiplier: 0.85 },
  standard: { displayName: "Standard", startingGold: 50, startingLives: 10, enemyHealthMultiplier: 1 },
  veteran: { displayName: "Veteran", startingGold: 45, startingLives: 7, enemyHealthMultiplier: 1.2 }
} as const satisfies Record<string, DifficultyDefinition>;

export type DifficultyId = keyof typeof DIFFICULTY_DEFINITIONS;

export interface CampaignNodeDefinition {
  readonly id: string;
  readonly displayName: string;
  readonly description: string;
  readonly mapId: MapId;
  readonly difficultyId: DifficultyId;
}

export const CAMPAIGN_NODES: readonly CampaignNodeDefinition[] = [
  { id: "gate-watch", displayName: "Gate Watch", description: "Hold the original dungeon gate.", mapId: "gate", difficultyId: "standard" },
  { id: "crossroads-stand", displayName: "Crossroads Stand", description: "Defend the split approach against the Warden.", mapId: "crossroads", difficultyId: "standard" }
];

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
    radius: 14,
    trait: undefined
  },
  beetle: {
    displayName: "Beetle",
    baseHealth: 54,
    healthVariation: 8,
    speedRange: [24, 32],
    reward: 12,
    color: "#916d3f",
    eyeColor: "#fff0ba",
    radius: 17,
    trait: { kind: "armor", flatDamageReduction: 3 }
  },
  wisp: {
    displayName: "Wisp",
    baseHealth: 20,
    healthVariation: 4,
    speedRange: [58, 70],
    reward: 8,
    color: "#9b7be2",
    eyeColor: "#e8dfff",
    radius: 10,
    trait: { kind: "speed-burst", intervalSeconds: 2.2, durationSeconds: 0.5, speedMultiplier: 1.8 }
  }
} as const satisfies Record<string, EnemyDefinition>;

export type EnemyKind = keyof typeof ENEMY_DEFINITIONS;

export interface WaveDefinition {
  readonly enemyKinds: readonly EnemyKind[];
  readonly eliteEnemyIndices?: readonly number[];
  readonly boss?: boolean;
  readonly clearBonus: number;
}

export interface WaveEconomySummary {
  readonly enemyRewards: number;
  readonly clearBonus: number;
  readonly totalGold: number;
}

/** Wave composition deliberately introduces one new enemy type at a time. */
export const WAVE_DEFINITIONS: readonly WaveDefinition[] = [
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "slime", "slime"], clearBonus: 12 },
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "beetle", "beetle", "beetle"], clearBonus: 18 },
  { enemyKinds: ["slime", "slime", "slime", "slime", "slime", "beetle", "beetle", "beetle", "beetle", "wisp", "wisp"], eliteEnemyIndices: [6], boss: true, clearBonus: 26 }
];

/** Expected income is derived from authored wave content, not duplicated balance constants. */
export function waveEconomySummary(wave: WaveDefinition): WaveEconomySummary {
  const enemyRewards = wave.enemyKinds.reduce((total, kind, index) => {
    const multiplier = wave.eliteEnemyIndices?.includes(index) ? ELITE_DEFINITION.rewardMultiplier : 1;
    return total + ENEMY_DEFINITIONS[kind].reward * multiplier;
  }, 0) + (wave.boss ? BOSS_DEFINITION.reward : 0);
  return { enemyRewards, clearBonus: wave.clearBonus, totalGold: enemyRewards + wave.clearBonus };
}

/** Tower balance and presentation are authored game content, not engine concerns. */
export const TOWER_DEFINITIONS = {
  archer: {
    displayName: "Archer",
    cost: 25,
    range: 145,
    cooldownSeconds: 0.45,
    projectileDamage: 8,
    projectileSpeed: 420,
    projectileColor: "#fff2a6",
    slowEffect: undefined,
    upgrades: [
      { cost: 20, rangeBonus: 24, damageBonus: 4, cooldownMultiplier: 0.88 },
      { cost: 34, rangeBonus: 38, damageBonus: 7, cooldownMultiplier: 0.82 }
    ],
    specialisations: [
      { id: "rapid", displayName: "Rapidfire", cost: 45, rangeBonus: 0, damageBonus: 3, cooldownMultiplier: 0.72 },
      { id: "longbow", displayName: "Longbow", cost: 45, rangeBonus: 65, damageBonus: 8, cooldownMultiplier: 1 }
    ]
  },
  mage: {
    displayName: "Mage",
    cost: 35,
    range: 190,
    cooldownSeconds: 0.9,
    projectileDamage: 18,
    projectileSpeed: 360,
    projectileColor: "#9be7ff",
    slowEffect: undefined,
    upgrades: [
      { cost: 28, rangeBonus: 28, damageBonus: 7, cooldownMultiplier: 0.9 },
      { cost: 44, rangeBonus: 42, damageBonus: 12, cooldownMultiplier: 0.84 }
    ],
    specialisations: [
      { id: "nova", displayName: "Nova", cost: 52, rangeBonus: 15, damageBonus: 18, cooldownMultiplier: 1 },
      { id: "focus", displayName: "Focus", cost: 52, rangeBonus: 48, damageBonus: 8, cooldownMultiplier: 0.74 }
    ]
  },
  sentinel: {
    displayName: "Sentinel",
    cost: 40,
    range: 165,
    cooldownSeconds: 0.75,
    projectileDamage: 4,
    projectileSpeed: 340,
    projectileColor: "#c3ffc0",
    slowEffect: { speedMultiplier: 0.55, durationSeconds: 1.2 },
    upgrades: [
      { cost: 26, rangeBonus: 24, damageBonus: 3, cooldownMultiplier: 0.9 },
      { cost: 42, rangeBonus: 36, damageBonus: 5, cooldownMultiplier: 0.84 }
    ],
    specialisations: [
      { id: "frost", displayName: "Deep Frost", cost: 48, rangeBonus: 30, damageBonus: 4, cooldownMultiplier: 0.82 },
      { id: "watcher", displayName: "Watcher", cost: 48, rangeBonus: 58, damageBonus: 7, cooldownMultiplier: 0.92 }
    ]
  }
} as const satisfies Record<string, TowerDefinition>;

export type TowerKind = keyof typeof TOWER_DEFINITIONS;

/** The complete authored content set consumed by the first game. */
export interface GameContent {
  readonly towers: Readonly<Record<string, TowerDefinition>>;
  readonly enemies: Readonly<Record<string, EnemyDefinition>>;
  readonly maps: Readonly<Record<string, MapDefinition>>;
  readonly difficulties: Readonly<Record<string, DifficultyDefinition>>;
  readonly campaignNodes: readonly CampaignNodeDefinition[];
  readonly waves: readonly {
    readonly enemyKinds: readonly string[];
    readonly eliteEnemyIndices?: readonly number[];
    readonly clearBonus: number;
  }[];
}

export const GAME_CONTENT = {
  towers: TOWER_DEFINITIONS,
  enemies: ENEMY_DEFINITIONS,
  maps: MAP_DEFINITIONS,
  difficulties: DIFFICULTY_DEFINITIONS,
  campaignNodes: CAMPAIGN_NODES,
  waves: WAVE_DEFINITIONS
} satisfies GameContent;
