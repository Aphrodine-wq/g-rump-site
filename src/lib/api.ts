const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3042";
const TOKEN_KEY = "grump_token";

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        clearToken();
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const err = new Error(body.error || `Request failed: ${res.status}`);
        (err as ApiError).status = res.status;
        (err as ApiError).body = body;
        throw err;
    }

    return res.json();
}

export interface ApiError extends Error {
    status: number;
    body: Record<string, unknown>;
}

export function apiGet<T>(path: string): Promise<T> {
    return request<T>(path);
}

export function apiPost<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
    });
}

export function apiPatch<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, {
        method: "PATCH",
        body: JSON.stringify(body),
    });
}

export function apiDelete<T>(path: string): Promise<T> {
    return request<T>(path, { method: "DELETE" });
}
