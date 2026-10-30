import { createContext, useContext, useEffect, useState } from "react";
import type { AccountProfile, AuthResponse } from "../interfaces";
import { apiFetch, getStoredToken, setStoredToken } from "../api/client";

interface AuthContextValue {
  account: AccountProfile | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  hasScope: (scope: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    const token = getStoredToken();

    if (!token) {
      setAccount(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await apiFetch<AccountProfile>("/api/v1/auth/me");
      setAccount(profile);
    } catch (error) {
      setStoredToken(null);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshProfile();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await apiFetch<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setStoredToken(res.token);
    setAccount(res.account);
  };

  const register = async (username: string, password: string) => {
    const res = await apiFetch<AuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setStoredToken(res.token);
    setAccount(res.account);
  };

  const logout = () => {
    setStoredToken(null);
    setAccount(null);
  };

  const hasScope = (scope: string) => account?.scopes?.includes(scope) ?? false;

  return (
    <AuthContext.Provider
      value={{
        account,
        loading,
        login,
        register,
        logout,
        refreshProfile,
        hasScope,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
