const TUTORIAL_KEY = "locomotion-engine:dungeon-defense:tutorial-complete";

export const GLOSSARY_ENTRIES = [
  ["Build", "Select a tower, then place it on grass before or during a wave."],
  ["Targeting", "Each tower can prioritise enemies nearest the exit, closest, strongest, or weakest."],
  ["Beetle", "Armoured: each hit loses some damage."],
  ["Wisp", "Periodically bursts forward, so do not rely on a single chokepoint."],
  ["Elite", "Crowned enemies have more health and award more gold."],
  ["Warden", "The final boss becomes faster as its health crosses phase thresholds."],
  ["Intermission", "A safe moment to build, adjust targeting, save, or start the next wave."]
] as const;

export function shouldShowTutorial(storage: Storage): boolean {
  return storage.getItem(TUTORIAL_KEY) !== "true";
}

export function dismissTutorial(storage: Storage): void {
  storage.setItem(TUTORIAL_KEY, "true");
}
