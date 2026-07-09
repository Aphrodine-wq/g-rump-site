"use client";

import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef, Suspense, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { apiPost } from "@/lib/api";

interface AuthResponse {
    token: string;
    user: { id: string; email: string };
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: Record<string, unknown>) => void;
                    renderButton: (el: HTMLElement, config: Record<string, unknown>) => void;
                };
            };
        };
    }
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-blue/30 border-t-blue animate-spin" /></div>}>
            <LoginForm />
        </Suspense>
    );
}

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const googleBtnRef = useRef<HTMLDivElement>(null);

    const handleRedirect = useCallback(() => {
        router.push(redirect && redirect.startsWith("/") ? redirect : "/account");
    }, [redirect, router]);

    const handleGoogleCallback = useCallback(async (response: { credential: string }) => {
        setError("");
        setLoading(true);
        try {
            const data = await apiPost<AuthResponse>("/api/auth/google", { credential: response.credential });
            await login(data.token);
            handleRedirect();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Google sign-in failed.");
        } finally {
            setLoading(false);
        }
    }, [login, handleRedirect]);

    useEffect(() => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId || !window.google || !googleBtnRef.current) return;

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallback,
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
            type: "standard",
            theme: "filled_black",
            size: "large",
            width: "100%",
            text: "signin_with",
            shape: "pill",
        });
    }, [handleGoogleCallback]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiPost<AuthResponse>("/api/auth/login", { email, password });
            await login(data.token);
            handleRedirect();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

            <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-5">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />

                <div className="relative w-full max-w-[400px]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome back</h1>
                        <p className="mt-2 text-sm text-secondary">Sign in to your G-Rump account.</p>
                    </div>

                    <div className="glass-card rounded-2xl p-8 space-y-5">
                        {error && (
                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Google Sign-In */}
                        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
                            <>
                                <div ref={googleBtnRef} className="flex justify-center" />
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-black/[0.05]" />
                                    <span className="text-xs text-tertiary">or</span>
                                    <div className="h-px flex-1 bg-black/[0.05]" />
                                </div>
                            </>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-secondary mb-1.5">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder-tertiary outline-none transition-all focus:border-blue/50 focus:ring-1 focus:ring-blue/30"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-secondary mb-1.5">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder-tertiary outline-none transition-all focus:border-blue/50 focus:ring-1 focus:ring-blue/30"
                                    placeholder="Your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-blue-500 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-sm text-secondary">
                        Don&apos;t have an account?{" "}
                        <Link href={redirect ? `/signup?redirect=${encodeURIComponent(redirect)}` : "/signup"} className="text-blue hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}
