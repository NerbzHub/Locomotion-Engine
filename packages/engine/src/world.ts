export type EntityId = `entity-${number}`;

export interface Entity {
  readonly id: EntityId;
  readonly kind: string;
}

/** Owns engine-level entity identity and lifetime, independent of game state. */
export class World {
  private nextEntityNumber = 1;
  private readonly entities = new Map<EntityId, Entity>();

  public create(kind: string): Entity {
    const id = `entity-${this.nextEntityNumber++}` as EntityId;
    const entity = { id, kind };
    this.entities.set(id, entity);
    return entity;
  }

  public destroy(id: EntityId): boolean {
    return this.entities.delete(id);
  }

  public has(id: EntityId): boolean {
    return this.entities.has(id);
  }
}
