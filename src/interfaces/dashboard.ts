export interface RealmStatus {
  name: string;
  onlineCount: number;
}

export interface DashboardStatusResponse {
  online: boolean;
  startedAtUtc: string;
  uptimeSeconds: number;
  totalOnlinePlayers: number;
  realms: RealmStatus[];
}
export interface LeaderboardEntry {
  rank: number;
  charId: string;
  name: string;
  school: string;
  level: number;
  experience: number;
  gold: number;
}
export interface LeaderboardsResponse {
  topByLevel: LeaderboardEntry[];
  topByGold: LeaderboardEntry[];
}