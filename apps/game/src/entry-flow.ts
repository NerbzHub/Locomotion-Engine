export type GameScreen = "landing" | "mission-select" | "defense";

export function openMissionSelection(): GameScreen {
  return "mission-select";
}

export function returnToLanding(): GameScreen {
  return "landing";
}

export function beginDefense(): GameScreen {
  return "defense";
}

export function canInteractWithBoard(screen: GameScreen): boolean {
  return screen === "defense";
}
