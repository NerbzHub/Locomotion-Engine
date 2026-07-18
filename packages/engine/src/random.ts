/** A small deterministic pseudo-random number generator with explicit state. */
export class SeededRandom {
  private value: number;

  public constructor(seed: number) {
    this.value = seed >>> 0;
  }

  public next(): number {
    this.value = (this.value + 0x6d2b79f5) >>> 0;
    let value = this.value;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  }

  public between(minimum: number, maximum: number): number {
    return minimum + (maximum - minimum) * this.next();
  }

  public state(): number {
    return this.value;
  }
}
