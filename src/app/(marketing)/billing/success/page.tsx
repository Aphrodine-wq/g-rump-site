"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function BillingSuccessPage() {
    const router = useRouter();
    const { user, isLoading, refresh } = useAuth();
    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login?redirect=/billing/success");
            return;
        }
        if (user && !refreshed) {
            // Webhook may still be processing — retry after short delay
            const timer = setTimeout(async () => {
                await refresh();
                setRefreshed(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, user, refresh, refreshed, router]);

    return (
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-green-500/[0.06] blur-[120px]" />

            <div className="relative mx-auto max-w-[480px]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 mb-8">
                    <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-primary">
                    Payment successful!
                </h1>

                <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                    Your account has been updated. Credits and tier changes take effect immediately.
                    Open G-Rump to start using your new plan.
                </p>

                {user && refreshed && (
                    <div className="mt-6 glass-card rounded-xl p-4 inline-flex items-center gap-4">
                        <div className="text-left">
                            <p className="text-xs text-tertiary">Current Balance</p>
                            <p className="text-lg font-bold text-primary">{user.creditsBalance.toLocaleString()} credits</p>
                        </div>
                        <div className="h-8 w-px bg-black/[0.05]" />
                        <div className="text-left">
                            <p className="text-xs text-tertiary">Plan</p>
                            <p className="text-lg font-bold text-primary capitalize">{user.tier}</p>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/account"
                        className="rounded-full bg-green-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    >
                        Go to Account
                    </Link>
                    <Link
                        href="/"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                    >
                        Continue Browsing
                    </Link>
                </div>

                <p className="mt-8 text-xs text-tertiary">
                    A receipt has been sent to your email. Manage your subscription anytime from
                    your{" "}
                    <Link href="/account" className="text-blue hover:underline">
                        account dashboard
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
