"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { apiGet, setToken, clearToken } from "./api";

export interface User {
    id: string;
    email: string;
    displayName: string | null;
    avatarUrl: string | null;
    tier: "free" | "starter" | "pro" | "team";
    creditsBalance: number;
    creditsReplenishedAt: string | null;
    subscriptionStatus: string | null;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

interface MeResponse {
    user: {
        id: string;
        email: string;
        display_name: string | null;
        avatar_url: string | null;
        tier: "free" | "starter" | "pro" | "team";
        credits_balance: number;
        credits_replenished_at: string | null;
        subscription_status: string | null;
    };
}

function mapUser(raw: MeResponse["user"]): User {
    return {
        id: raw.id,
        email: raw.email,
        displayName: raw.display_name,
        avatarUrl: raw.avatar_url,
        tier: raw.tier,
        creditsBalance: raw.credits_balance,
        creditsReplenishedAt: raw.credits_replenished_at,
        subscriptionStatus: raw.subscription_status,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const data = await apiGet<MeResponse>("/api/me");
            setUser(mapUser(data.user));
        } catch {
            setUser(null);
            setTokenState(null);
            clearToken();
        }
    }, []);

    const login = useCallback(async (newToken: string) => {
        setToken(newToken);
        setTokenState(newToken);
        await fetchUser();
    }, [fetchUser]);

    const logout = useCallback(() => {
        clearToken();
        setUser(null);
        setTokenState(null);
    }, []);

    const refresh = useCallback(async () => {
        await fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("grump_token") : null;
        if (stored) {
            setTokenState(stored);
            fetchUser().finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [fetchUser]);

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthState {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
