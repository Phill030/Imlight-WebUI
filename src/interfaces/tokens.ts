export interface ApiTokenItem {
  tokenId: string;
  name: string;
  tokenPrefix: string;
  scopes: string[];
  createdByAccountId: string;
  createdByUsername: string;
  createdAt: string;
  expiresAt?: string | null;
  lastUsedAt?: string | null;
  isRevoked: boolean;
  isValid: boolean;
}