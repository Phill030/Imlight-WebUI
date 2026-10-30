export interface AccountProfile {
  accountId: string;
  username: string;
  authLevel: string;
  chatMode?: string;
  crowns: number;
  characterCount?: number;
  scopes: string[];
  allowRegistration: boolean;
}
export interface AuthResponse {
  token: string;
  account: AccountProfile;
}