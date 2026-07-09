"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { apiGet, apiPost } from "@/lib/api";

interface BillingData {
    tier: string;
    creditsBalance: number;
    subscriptionStatus: string | null;
    subscriptionPeriodEnd: string | null;
    recentPurchases: { created_at: string; pack_key: string; credits_added: number; amount_cents: number }[];
    usageByModel: { model: string; total_tokens: number; credits_deducted: number }[];
}

interface UsageData {
    totals: { promptTokens: number; completionTokens: number; creditsDeducted: number };
    thisMonth: { promptTokens: number; completionTokens: number; creditsDeducted: number };
    byModel: { model: string; requests: number; totalTokens: number; creditsDeducted: number }[];
    daily: { date: string; tokens: number; credits: number }[];
}

const tierColors: Record<string, string> = {
    free: "text-tertiary border-black/[0.06]",
    starter: "text-blue border-blue/30",
    pro: "text-purple border-purple/30",
    team: "text-green-400 border-green-500/30",
};

export default function AccountPage() {
    const router = useRouter();
    const { user, isLoading, refresh } = useAuth();
    const [billing, setBilling] = useState<BillingData | null>(null);
    const [usage, setUsage] = useState<UsageData | null>(null);
    const [portalLoading, setPortalLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "usage">("overview");

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login?redirect=/account");
        }
    }, [isLoading, user, router]);

    useEffect(() => {
        if (!user) return;
        apiGet<{ tier: string; credits_balance: number; subscription_status: string | null; subscription_period_end: string | null; recent_purchases: BillingData["recentPurchases"]; usage_by_model: BillingData["usageByModel"] }>("/api/billing/usage").then((data) => {
            setBilling({
                tier: data.tier,
                creditsBalance: data.credits_balance,
                subscriptionStatus: data.subscription_status,
                subscriptionPeriodEnd: data.subscription_period_end,
                recentPurchases: data.recent_purchases || [],
                usageByModel: data.usage_by_model || [],
            });
        }).catch(() => {});

        apiGet<{ totals: UsageData["totals"]; this_month: UsageData["thisMonth"]; by_model: UsageData["byModel"]; daily: UsageData["daily"] }>("/api/me/usage").then((data) => {
            setUsage({
                totals: data.totals,
                thisMonth: data.this_month,
                byModel: data.by_model || [],
                daily: data.daily || [],
            });
        }).catch(() => {});
    }, [user]);

    const handleManageSubscription = async () => {
        setPortalLoading(true);
        try {
            const data = await apiPost<{ url: string }>("/api/billing/portal");
            window.location.href = data.url;
        } catch {
            alert("Failed to open billing portal. Please try again.");
        } finally {
            setPortalLoading(false);
        }
    };

    if (isLoading || !user) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-blue/30 border-t-blue animate-spin" />
            </section>
        );
    }

    const tierConfig: Record<string, number> = { free: 500, starter: 2000, pro: 5000, team: 25000 };
    const maxCredits = tierConfig[user.tier] || 500;
    const creditPercent = Math.min(100, (user.creditsBalance / maxCredits) * 100);

    return (
        <section className="relative px-5 py-16">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-blue/[0.03] blur-[120px]" />

            <div className="relative mx-auto max-w-[800px]">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-lg font-bold text-blue">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" className="h-14 w-14 rounded-full object-cover" />
                        ) : (
                            (user.displayName || user.email)[0].toUpperCase()
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">{user.displayName || "Your Account"}</h1>
                        <p className="text-sm text-secondary">{user.email}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 border-b border-black/[0.04]">
                    {(["overview", "usage"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                                activeTab === tab
                                    ? "text-primary border-blue"
                                    : "text-secondary border-transparent hover:text-primary"
                            }`}
                        >
                            {tab === "overview" ? "Overview" : "Usage & History"}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" ? (
                    <div className="space-y-6">
                        {/* Plan & Credits */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Current Plan</p>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold capitalize ${tierColors[user.tier] || tierColors.free}`}>
                                        {user.tier}
                                    </span>
                                    {user.subscriptionStatus && user.subscriptionStatus !== "active" && (
                                        <span className="text-xs text-yellow-400 capitalize">{user.subscriptionStatus}</span>
                                    )}
                                </div>
                                {billing?.subscriptionPeriodEnd && (
                                    <p className="mt-2 text-xs text-tertiary">
                                        Renews {new Date(billing.subscriptionPeriodEnd).toLocaleDateString()}
                                    </p>
                                )}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={handleManageSubscription}
                                        disabled={portalLoading}
                                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-4 py-2 text-xs font-medium text-primary transition-all hover:bg-black/[0.04] disabled:opacity-50"
                                    >
                                        {portalLoading ? "Opening..." : "Manage Subscription"}
                                    </button>
                                    <Link
                                        href="/pricing"
                                        className="rounded-full bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue transition-all hover:bg-blue-500/20"
                                    >
                                        Upgrade
                                    </Link>
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Credits</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-primary">{user.creditsBalance.toLocaleString()}</span>
                                    <span className="text-sm text-tertiary">/ {maxCredits.toLocaleString()}</span>
                                </div>
                                <div className="mt-3 h-2 rounded-full bg-black/[0.04] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${creditPercent}%` }}
                                    />
                                </div>
                                {user.creditsReplenishedAt && (
                                    <p className="mt-2 text-xs text-tertiary">
                                        Replenishes {new Date(user.creditsReplenishedAt).toLocaleDateString()}
                                    </p>
                                )}
                                <Link
                                    href="/pricing#credits"
                                    className="mt-4 inline-block rounded-full bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue transition-all hover:bg-blue-500/20"
                                >
                                    Buy More Credits
                                </Link>
                            </div>
                        </div>

                        {/* This Month Summary */}
                        {usage && (
                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">This Month</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{usage.thisMonth.creditsDeducted.toLocaleString()}</p>
                                        <p className="text-xs text-secondary">Credits used</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{((usage.thisMonth.promptTokens + usage.thisMonth.completionTokens) / 1000).toFixed(1)}k</p>
                                        <p className="text-xs text-secondary">Tokens</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{usage.byModel.length}</p>
                                        <p className="text-xs text-secondary">Models used</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Daily Usage Chart (simple bar) */}
                        {usage && usage.daily.length > 0 && (
                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Daily Usage (14 days)</p>
                                <div className="flex items-end gap-1 h-32">
                                    {usage.daily.map((d) => {
                                        const maxDaily = Math.max(...usage.daily.map((x) => x.credits), 1);
                                        const height = (d.credits / maxDaily) * 100;
                                        return (
                                            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                                                <div
                                                    className="w-full rounded-t bg-blue-500/60 transition-all hover:bg-blue-500"
                                                    style={{ height: `${Math.max(height, 2)}%` }}
                                                    title={`${d.date}: ${d.credits} credits`}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-tertiary">{usage.daily[0]?.date}</span>
                                    <span className="text-[10px] text-tertiary">{usage.daily[usage.daily.length - 1]?.date}</span>
                                </div>
                            </div>
                        )}

                        {/* Usage by Model */}
                        {usage && usage.byModel.length > 0 && (
                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Usage by Model</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-black/[0.05]">
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary">Model</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-right">Requests</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-right">Tokens</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-right">Credits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usage.byModel.map((m) => (
                                                <tr key={m.model} className="border-b border-black/[0.02]">
                                                    <td className="py-2.5 text-sm text-primary font-[family-name:var(--font-mono)]">{m.model}</td>
                                                    <td className="py-2.5 text-sm text-secondary text-right">{m.requests}</td>
                                                    <td className="py-2.5 text-sm text-secondary text-right">{m.totalTokens.toLocaleString()}</td>
                                                    <td className="py-2.5 text-sm text-primary text-right font-medium">{m.creditsDeducted}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Recent Purchases */}
                        {billing && billing.recentPurchases.length > 0 && (
                            <div className="glass-card rounded-2xl p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Recent Purchases</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-black/[0.05]">
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary">Date</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary">Pack</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-right">Credits</th>
                                                <th className="py-2 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {billing.recentPurchases.map((p, i) => (
                                                <tr key={i} className="border-b border-black/[0.02]">
                                                    <td className="py-2.5 text-sm text-secondary">{new Date(p.created_at).toLocaleDateString()}</td>
                                                    <td className="py-2.5 text-sm text-primary capitalize">{p.pack_key.replace(/_/g, " ")}</td>
                                                    <td className="py-2.5 text-sm text-blue text-right">+{p.credits_added.toLocaleString()}</td>
                                                    <td className="py-2.5 text-sm text-secondary text-right">${(p.amount_cents / 100).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Empty state */}
                        {usage && usage.byModel.length === 0 && (
                            <div className="glass-card rounded-2xl p-8 text-center">
                                <p className="text-sm text-secondary">No usage data yet. Start using G-Rump to see your usage here.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
