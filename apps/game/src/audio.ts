export type AudioCue = "placement" | "wave" | "hit" | "defeat" | "escape" | "victory";

export interface AudioSettings {
  readonly muted: boolean;
  readonly volume: number;
}

const SETTINGS_KEY = "locomotion-engine:dungeon-defense:audio";

export function normaliseAudioSettings(value: Partial<AudioSettings> | undefined): AudioSettings {
  return { muted: Boolean(value?.muted), volume: Math.max(0, Math.min(1, value?.volume ?? 0.35)) };
}

export class GameAudio {
  private context: AudioContext | undefined;

  public constructor(private settings: AudioSettings) {}

  public setSettings(settings: AudioSettings): void {
    this.settings = settings;
  }

  public play(cue: AudioCue): void {
    if (this.settings.muted || this.settings.volume === 0 || typeof AudioContext === "undefined") return;
    this.context ??= new AudioContext();
    const frequencies: Record<AudioCue, number> = { placement: 440, wave: 262, hit: 620, defeat: 330, escape: 180, victory: 784 };
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.frequency.value = frequencies[cue];
    gain.gain.value = this.settings.volume * (cue === "escape" ? 0.55 : 1);
    oscillator.connect(gain).connect(this.context.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.12);
    oscillator.stop(this.context.currentTime + 0.13);
  }
}

export function loadAudioSettings(storage: Storage): AudioSettings {
  try { return normaliseAudioSettings(JSON.parse(storage.getItem(SETTINGS_KEY) ?? "")); } catch { return normaliseAudioSettings(undefined); }
}

export function saveAudioSettings(storage: Storage, settings: AudioSettings): void {
  storage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
