"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { apiPost } from "@/lib/api";

interface AuthResponse {
    token: string;
    user: { id: string; email: string };
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-blue/30 border-t-blue animate-spin" /></div>}>
            <SignupForm />
        </Suspense>
    );
}

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = (): string | null => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        if (password !== confirmPassword) return "Passwords do not match.";
        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const data = await apiPost<AuthResponse>("/api/auth/signup", { email, password });
            await login(data.token);
            router.push(redirect && redirect.startsWith("/") ? redirect : "/account");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-5">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />

            <div className="relative w-full max-w-[400px]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Create your account</h1>
                    <p className="mt-2 text-sm text-secondary">Start with 500 free credits every month.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                    {error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

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
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder-tertiary outline-none transition-all focus:border-blue/50 focus:ring-1 focus:ring-blue/30"
                            placeholder="At least 8 characters"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-secondary mb-1.5">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder-tertiary outline-none transition-all focus:border-blue/50 focus:ring-1 focus:ring-blue/30"
                            placeholder="Repeat your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-blue-500 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-secondary">
                    Already have an account?{" "}
                    <Link href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login"} className="text-blue hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    );
}
