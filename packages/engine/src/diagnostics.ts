export type DiagnosticLevel = "info" | "warn" | "error";

export interface DiagnosticEntry {
  readonly level: DiagnosticLevel;
  readonly message: string;
  readonly timestamp: number;
  readonly details?: unknown;
}

export class Diagnostics {
  private readonly entries: DiagnosticEntry[] = [];

  public info(message: string, details?: unknown): void {
    this.record("info", message, details);
  }

  public warn(message: string, details?: unknown): void {
    this.record("warn", message, details);
  }

  public error(message: string, details?: unknown): void {
    this.record("error", message, details);
  }

  public history(): readonly DiagnosticEntry[] {
    return this.entries;
  }

  private record(level: DiagnosticLevel, message: string, details?: unknown): void {
    const entry: DiagnosticEntry = { level, message, timestamp: performance.now(), details };
    this.entries.push(entry);
    console[level](`[Locomotion] ${message}`, details ?? "");
  }
}
