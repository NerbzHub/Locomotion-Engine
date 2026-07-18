import type { EnemyDefinition, GameContent, TowerDefinition } from "./content";

export interface ContentValidationIssue {
  readonly path: string;
  readonly message: string;
}

export interface ContentValidationReport {
  readonly issues: readonly ContentValidationIssue[];
  readonly towerCount: number;
  readonly enemyCount: number;
  readonly waveCount: number;
}

export class InvalidGameContentError extends Error {
  public constructor(readonly issues: readonly ContentValidationIssue[]) {
    super(`Game content is invalid:\n${issues.map((issue) => `- ${issue.path}: ${issue.message}`).join("\n")}`);
    this.name = "InvalidGameContentError";
  }
}

export function validateGameContent(content: GameContent): ContentValidationReport {
  const issues: ContentValidationIssue[] = [];
  const towers = Object.entries(content.towers);
  const enemies = Object.entries(content.enemies);

  validateCollection("towers", towers, issues, validateTower);
  validateCollection("enemies", enemies, issues, validateEnemy);

  if (content.waves.length === 0) {
    addIssue(issues, "waves", "must contain at least one wave");
  }
  for (const [index, wave] of content.waves.entries()) {
    const path = `waves[${index}]`;
    if (wave.enemyKinds.length === 0) {
      addIssue(issues, `${path}.enemyKinds`, "must contain at least one enemy kind");
    }
    for (const [enemyIndex, kind] of wave.enemyKinds.entries()) {
      if (!content.enemies[kind]) {
        addIssue(issues, `${path}.enemyKinds[${enemyIndex}]`, `references unknown enemy kind "${kind}"`);
      }
    }
    validateNonNegativeNumber(wave.clearBonus, `${path}.clearBonus`, issues);
  }

  return { issues, towerCount: towers.length, enemyCount: enemies.length, waveCount: content.waves.length };
}

export function assertValidGameContent(content: GameContent): ContentValidationReport {
  const report = validateGameContent(content);
  if (report.issues.length > 0) {
    throw new InvalidGameContentError(report.issues);
  }
  return report;
}

function validateCollection<Definition>(
  collectionName: string,
  entries: readonly [string, Definition][],
  issues: ContentValidationIssue[],
  validateDefinition: (definition: Definition, path: string, issues: ContentValidationIssue[]) => void
): void {
  if (entries.length === 0) {
    addIssue(issues, collectionName, "must contain at least one definition");
  }
  for (const [identifier, definition] of entries) {
    const path = `${collectionName}.${identifier}`;
    if (!/^[a-z][a-z0-9-]*$/.test(identifier)) {
      addIssue(issues, path, "identifier must use lowercase letters, digits, and hyphens");
    }
    validateDefinition(definition, path, issues);
  }
}

function validateTower(definition: TowerDefinition, path: string, issues: ContentValidationIssue[]): void {
  validateDisplayName(definition.displayName, `${path}.displayName`, issues);
  validatePositiveNumber(definition.cost, `${path}.cost`, issues);
  validatePositiveNumber(definition.range, `${path}.range`, issues);
  validatePositiveNumber(definition.cooldownSeconds, `${path}.cooldownSeconds`, issues);
  validatePositiveNumber(definition.projectileDamage, `${path}.projectileDamage`, issues);
  validatePositiveNumber(definition.projectileSpeed, `${path}.projectileSpeed`, issues);
  validateColor(definition.projectileColor, `${path}.projectileColor`, issues);
}

function validateEnemy(definition: EnemyDefinition, path: string, issues: ContentValidationIssue[]): void {
  validateDisplayName(definition.displayName, `${path}.displayName`, issues);
  validatePositiveNumber(definition.baseHealth, `${path}.baseHealth`, issues);
  validateNonNegativeNumber(definition.healthVariation, `${path}.healthVariation`, issues);
  validatePositiveNumber(definition.speedRange[0], `${path}.speedRange[0]`, issues);
  validatePositiveNumber(definition.speedRange[1], `${path}.speedRange[1]`, issues);
  if (definition.speedRange[0] > definition.speedRange[1]) {
    addIssue(issues, `${path}.speedRange`, "minimum speed must not exceed maximum speed");
  }
  validatePositiveNumber(definition.reward, `${path}.reward`, issues);
  validateColor(definition.color, `${path}.color`, issues);
  validateColor(definition.eyeColor, `${path}.eyeColor`, issues);
  validatePositiveNumber(definition.radius, `${path}.radius`, issues);
}

function validateDisplayName(value: string, path: string, issues: ContentValidationIssue[]): void {
  if (value.trim().length === 0) {
    addIssue(issues, path, "must not be blank");
  }
}

function validateColor(value: string, path: string, issues: ContentValidationIssue[]): void {
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
    addIssue(issues, path, "must be a six-digit hexadecimal colour");
  }
}

function validatePositiveNumber(value: number, path: string, issues: ContentValidationIssue[]): void {
  if (!Number.isFinite(value) || value <= 0) {
    addIssue(issues, path, "must be a finite number greater than zero");
  }
}

function validateNonNegativeNumber(value: number, path: string, issues: ContentValidationIssue[]): void {
  if (!Number.isFinite(value) || value < 0) {
    addIssue(issues, path, "must be a finite number of zero or greater");
  }
}

function addIssue(issues: ContentValidationIssue[], path: string, message: string): void {
  issues.push({ path, message });
}
