import type { RealmStatus } from "./dashboard";

export interface AdminAccountRow {
  accountId: string;
  username: string;
  authLevel: string;
  chatMode: string;
  crowns: number;
  isLocked: boolean;
  characterCount: number;
  infractionCount: number;
  creationTime: string;
  lastLoginTime: string;
  isOnline: boolean;
  onlineRealm?: string;
  onlineZone?: string;
}
export interface AdminCharacterSummary {
  charId: string;
  name: string;
  school: string;
  level: number;
  gold: number;
  zone: string;
  isOnline: boolean;
}
export interface AdminInfractionItem {
  infractionId: string;
  type: 'Warn' | 'Mute' | 'Ban' | string;
  reason: string;
  infractionTime: string;
  expiration?: string | null;
  isExpired: boolean;
  wasWaived: boolean;
  wasWaivedBy?: string | null;
  moderator: string;
}
export interface AdminAccountDetail {
  accountId: string;
  username: string;
  authLevel: string;
  chatMode: string;
  crowns: number;
  isLocked: boolean;
  isBanned: boolean;
  isMuted: boolean;
  creationTime: string;
  lastLoginTime: string;
  lastLoginIp?: string;
  isOnline: boolean;
  onlineSessionId?: number;
  onlineRealm?: string;
  onlineZone?: string;
  characters: AdminCharacterSummary[];
  infractions: AdminInfractionItem[];
}

export interface ServerMetricsResponse {
  startedAtUtc: string;
  uptimeSeconds: number;
  workingSetMb: number;
  managedHeapMb: number;
  threadCount: number;
  totalOnlinePlayers: number;
  totalAccounts: number;
  totalWizards: number;
  realms: RealmStatus[];
}

export interface OnlinePlayerEntry {
  sessionId: number;
  accountId: string;
  username: string;
  authLevel: string;
  charId: string;
  wizardName: string;
  school: string;
  level: number;
  realm: string;
  zone: string;
  zoneDisplayName: string;
}