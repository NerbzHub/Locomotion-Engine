import { Diagnostics } from "./diagnostics";

export interface EngineOptions {
  readonly fixedDeltaSeconds: number;
  readonly diagnostics: Diagnostics;
  readonly update: (deltaSeconds: number) => void;
  readonly render: (alpha: number) => void;
}

export class Engine {
  private animationFrameId: number | undefined;
  private accumulatorSeconds = 0;
  private lastFrameMilliseconds = 0;
  private running = false;

  public constructor(private readonly options: EngineOptions) {}

  public start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastFrameMilliseconds = performance.now();
    this.options.diagnostics.info("Engine started");
    this.animationFrameId = requestAnimationFrame(this.frame);
  }

  public stop(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
    this.options.diagnostics.info("Engine stopped");
  }

  private readonly frame = (frameMilliseconds: number): void => {
    if (!this.running) {
      return;
    }

    const elapsedSeconds = Math.min((frameMilliseconds - this.lastFrameMilliseconds) / 1000, 0.25);
    this.lastFrameMilliseconds = frameMilliseconds;
    this.accumulatorSeconds += elapsedSeconds;

    try {
      while (this.accumulatorSeconds >= this.options.fixedDeltaSeconds) {
        this.options.update(this.options.fixedDeltaSeconds);
        this.accumulatorSeconds -= this.options.fixedDeltaSeconds;
      }
      this.options.render(this.accumulatorSeconds / this.options.fixedDeltaSeconds);
    } catch (error) {
      this.options.diagnostics.error("Engine frame failed", error);
      this.stop();
      throw error;
    }

    this.animationFrameId = requestAnimationFrame(this.frame);
  };
}
