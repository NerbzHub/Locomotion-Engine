import { CAMPAIGN_NODES } from "./content";

const PROFILE_KEY = "locomotion-engine:dungeon-defense:profile";
const PROFILE_VERSION = 1;

export interface CampaignProfile {
  readonly version: typeof PROFILE_VERSION;
  readonly completedNodeIds: readonly string[];
}

export function createProfile(): CampaignProfile {
  return { version: PROFILE_VERSION, completedNodeIds: [] };
}

export function isCampaignNodeUnlocked(profile: CampaignProfile, nodeId: string): boolean {
  const index = CAMPAIGN_NODES.findIndex((node) => node.id === nodeId);
  return index === 0 || (index > 0 && profile.completedNodeIds.includes(CAMPAIGN_NODES[index - 1].id));
}

export function completeCampaignNode(profile: CampaignProfile, nodeId: string): CampaignProfile {
  if (!CAMPAIGN_NODES.some((node) => node.id === nodeId) || profile.completedNodeIds.includes(nodeId)) return profile;
  return { ...profile, completedNodeIds: [...profile.completedNodeIds, nodeId] };
}

export function loadProfile(storage: Storage): CampaignProfile {
  try {
    const value: unknown = JSON.parse(storage.getItem(PROFILE_KEY) ?? "");
    if (isProfile(value)) return value;
  } catch {
    // Fall through to a safe empty profile.
  }
  return createProfile();
}

export function saveProfile(storage: Storage, profile: CampaignProfile): void {
  storage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function resetProfile(storage: Storage): CampaignProfile {
  const profile = createProfile();
  saveProfile(storage, profile);
  return profile;
}

function isProfile(value: unknown): value is CampaignProfile {
  return typeof value === "object" && value !== null && (value as CampaignProfile).version === PROFILE_VERSION && Array.isArray((value as CampaignProfile).completedNodeIds) && (value as CampaignProfile).completedNodeIds.every((id) => typeof id === "string" && CAMPAIGN_NODES.some((node) => node.id === id));
}
