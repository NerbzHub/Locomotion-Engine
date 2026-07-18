export interface CanvasPoint {
  readonly x: number;
  readonly y: number;
}

export class PointerInput {
  private readonly listeners = new Set<(point: CanvasPoint) => void>();

  public constructor(private readonly canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", this.handlePointerDown);
  }

  public onPointerDown(listener: (point: CanvasPoint) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public dispose(): void {
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.listeners.clear();
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    const bounds = this.canvas.getBoundingClientRect();
    const point = {
      x: (event.clientX - bounds.left) * (this.canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (this.canvas.height / bounds.height)
    };
    this.listeners.forEach((listener) => listener(point));
  };
}
