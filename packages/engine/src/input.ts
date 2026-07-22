export interface CanvasPoint {
  readonly x: number;
  readonly y: number;
}

export class PointerInput {
  private readonly downListeners = new Set<(point: CanvasPoint) => void>();
  private readonly moveListeners = new Set<(point: CanvasPoint) => void>();

  public constructor(private readonly canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", this.handlePointerDown);
    canvas.addEventListener("pointermove", this.handlePointerMove);
  }

  public onPointerDown(listener: (point: CanvasPoint) => void): () => void {
    this.downListeners.add(listener);
    return () => this.downListeners.delete(listener);
  }

  public onPointerMove(listener: (point: CanvasPoint) => void): () => void {
    this.moveListeners.add(listener);
    return () => this.moveListeners.delete(listener);
  }

  public dispose(): void {
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.canvas.removeEventListener("pointermove", this.handlePointerMove);
    this.downListeners.clear();
    this.moveListeners.clear();
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    this.downListeners.forEach((listener) => listener(this.toCanvasPoint(event)));
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.moveListeners.forEach((listener) => listener(this.toCanvasPoint(event)));
  };

  private toCanvasPoint(event: PointerEvent): CanvasPoint {
    const bounds = this.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (this.canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (this.canvas.height / bounds.height)
    };
  }
}
