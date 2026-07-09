"use client";

import { FadeIn, Stagger, StaggerItem, TextReveal, HoverCard } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Accordion } from "@/components/Accordion";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { apiPost } from "@/lib/api";

export default function PricingPage() {
    return (
        <>
            <PricingHero />
            <PricingCards />
            <UsageBreakdown />
            <ComparisonTable />
            <HowCreditsWork />
            <FAQ />
            <PricingCTA />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function PricingHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple/[0.04] blur-[120px]" />
            <div className="relative">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Pricing</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        Credit-based pricing.
                        <br />
                        <span className="text-secondary">Pay for what you use.</span>
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-secondary">
                        Start free with 500 credits/month. Upgrade for more credits, faster models, and priority routing. Buy credit packs anytime.
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── Pricing Cards ───────────────────────── */

function PricingCards() {
    const router = useRouter();
    const { user } = useAuth();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [loadingPack, setLoadingPack] = useState<string | null>(null);
    const [error, setError] = useState("");

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            credits: "500 credits/month",
            desc: "Get started with AI-assisted coding at no cost.",
            features: [
                "500 credits/month",
                "Free-tier models",
                "All 100+ tools",
                "All 5 agent modes",
                "Community support",
                "Credits replenish monthly",
            ],
            cta: "Get Started Free",
            priceKey: null as string | null,
            href: "/signup",
            highlighted: false,
            accent: "",
        },
        {
            name: "Starter",
            price: "$9.99",
            period: "/month",
            credits: "2,000 credits/month",
            desc: "For developers who want access to faster models.",
            features: [
                "2,000 credits/month",
                "Free + fast-tier models",
                "All 100+ tools",
                "All 5 agent modes",
                "7-day free trial",
                "Email support",
            ],
            cta: "Start 7-Day Free Trial",
            priceKey: "starter_monthly",
            href: null as string | null,
            highlighted: false,
            accent: "",
        },
        {
            name: "Pro",
            price: "$19.99",
            period: "/month",
            credits: "5,000 credits/month",
            desc: "Full access to every model, including frontier.",
            features: [
                "5,000 credits/month",
                "All models (free, fast, frontier)",
                "All 100+ tools",
                "All 5 agent modes",
                "14-day free trial",
                "Priority support",
            ],
            cta: "Start 14-Day Free Trial",
            priceKey: "pro_monthly",
            href: null as string | null,
            highlighted: true,
            accent: "border-blue/30 ring-1 ring-blue/20",
        },
        {
            name: "Team",
            price: "$49.99",
            period: "/month",
            credits: "25,000 credits/month",
            desc: "For teams that need volume and shared management.",
            features: [
                "25,000 credits/month",
                "All models (free, fast, frontier)",
                "All 100+ tools",
                "All 5 agent modes",
                "Shared team dashboard",
                "Priority support + SLA",
            ],
            cta: "Contact Sales",
            priceKey: "team_monthly",
            href: "/contact",
            highlighted: false,
            accent: "",
        },
    ];

    const handlePlanClick = async (plan: typeof plans[0]) => {
        setError("");
        // Free tier or Contact Sales — just navigate
        if (!plan.priceKey || plan.href) {
            router.push(plan.href || "/signup");
            return;
        }
        // Need auth to purchase
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }
        setLoadingPlan(plan.priceKey);
        try {
            const data = await apiPost<{ url: string }>("/api/billing/checkout", { priceKey: plan.priceKey });
            window.location.href = data.url;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to start checkout.");
        } finally {
            setLoadingPlan(null);
        }
    };

    const packs = [
        { amount: "1,000", price: "$4.99", packKey: "credits_1000" },
        { amount: "5,000", price: "$19.99", packKey: "credits_5000" },
        { amount: "20,000", price: "$69.99", packKey: "credits_20000" },
    ];

    const handlePackClick = async (packKey: string) => {
        setError("");
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }
        setLoadingPack(packKey);
        try {
            const data = await apiPost<{ url: string }>("/api/billing/credit-pack", { packKey });
            window.location.href = data.url;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to start checkout.");
        } finally {
            setLoadingPack(null);
        }
    };

    return (
        <section className="px-5 py-16">
            <div className="mx-auto max-w-[1200px]">
                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
                        {error}
                    </div>
                )}

                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
                    {plans.map((plan) => (
                        <StaggerItem key={plan.name}>
                            <HoverCard className={`glass-card relative h-full rounded-2xl p-7 transition-all ${plan.highlighted ? plan.accent : "hover:border-black/[0.1]"}`}>
                                {plan.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                                        Most Popular
                                    </div>
                                )}
                                <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">{plan.name}</p>
                                <div className="mt-3 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-primary">
                                        {plan.price}
                                    </span>
                                    {plan.period && plan.price !== "$0" && (
                                        <span className="text-sm text-tertiary">{plan.period}</span>
                                    )}
                                </div>
                                <p className="mt-1.5 text-xs font-medium text-blue">{plan.credits}</p>
                                <p className="mt-3 text-sm text-secondary">{plan.desc}</p>

                                <div className="mt-6 border-t border-black/[0.06] pt-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2.5 text-[13px] text-secondary">
                                                <svg className="h-4 w-4 shrink-0 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handlePlanClick(plan)}
                                    disabled={loadingPlan === plan.priceKey}
                                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${plan.highlighted
                                            ? "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                            : "border border-black/[0.06] bg-black/[0.02] text-primary hover:bg-black/[0.04]"
                                        }`}
                                >
                                    {loadingPlan === plan.priceKey ? "Redirecting..." : plan.cta}
                                </button>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>

                {/* Credit Packs */}
                <FadeIn delay={0.3} className="mt-16">
                    <div id="credits" className="glass-card rounded-2xl p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">Need more credits?</h3>
                                <p className="mt-1 text-sm text-secondary">Buy credit packs anytime. Credits never expire and stack on top of your monthly allowance.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {packs.map((pack) => (
                                    <button
                                        key={pack.packKey}
                                        onClick={() => handlePackClick(pack.packKey)}
                                        disabled={loadingPack === pack.packKey}
                                        className="rounded-xl border border-black/[0.06] bg-black/[0.02] px-5 py-3 text-center transition-all hover:bg-black/[0.04] hover:border-black/[0.08] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <p className="text-sm font-semibold text-primary">{pack.amount} credits</p>
                                        <p className="text-xs text-blue font-medium">
                                            {loadingPack === pack.packKey ? "Redirecting..." : pack.price}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

/* ───────────────────────── Usage Breakdown ───────────────────────── */

function UsageBreakdown() {
    const usageItems = [
        {
            category: "Credits & Models",
            items: [
                { name: "Monthly Credits", free: "500", starter: "2,000", pro: "5,000", team: "25,000" },
                { name: "Model Access", free: "Free-tier", starter: "Free + Fast", pro: "All models", team: "All models" },
                { name: "Credit Packs", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Credits per 1K tokens", free: "1 credit", starter: "1 credit", pro: "1 credit", team: "1 credit" },
            ],
        },
        {
            category: "Tools & Capabilities",
            items: [
                { name: "Built-in Tools", free: "100+", starter: "100+", pro: "100+", team: "100+" },
                { name: "Agent Modes", free: "All 7", starter: "All 7", pro: "All 7", team: "All 7" },
                { name: "Expert Skills", free: "40+", starter: "40+", pro: "40+", team: "40+" },
                { name: "MCP Servers", free: "58", starter: "58", pro: "58", team: "58" },
            ],
        },
        {
            category: "AI Providers (BYOK)",
            items: [
                { name: "Anthropic (Claude)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "OpenAI (GPT-4)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Ollama (Local)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "CoreML (On-Device)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "OpenRouter (Platform)", free: "Free-tier", starter: "Free + Fast", pro: "All models", team: "All models" },
            ],
        },
    ];

    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="What's Included"
                        heading="Detailed usage breakdown."
                        description="Every plan includes the full G-Rump app with all tools and agent modes. Higher tiers unlock more credits and model access via the platform."
                    />
                </FadeIn>

                <div className="mt-14 space-y-10">
                    {usageItems.map((group, gi) => (
                        <FadeIn key={group.category} delay={gi * 0.1}>
                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-blue mb-4">{group.category}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-black/[0.06]">
                                                <th className="py-2.5 pr-4 text-[11px] font-semibold uppercase tracking-widest text-tertiary min-w-[160px]"></th>
                                                <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-center min-w-[100px]">Free</th>
                                                <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-center min-w-[100px]">Starter</th>
                                                <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-blue text-center min-w-[100px]">Pro</th>
                                                <th className="pl-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-tertiary text-center min-w-[100px]">Team</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.items.map((item) => (
                                                <tr key={item.name} className="border-b border-black/[0.03]">
                                                    <td className="py-3 pr-4 text-sm text-primary">{item.name}</td>
                                                    <td className="px-3 py-3 text-[13px] text-secondary text-center">{item.free}</td>
                                                    <td className="px-3 py-3 text-[13px] text-secondary text-center">{item.starter}</td>
                                                    <td className="px-3 py-3 text-[13px] text-primary font-medium text-center">{item.pro}</td>
                                                    <td className="pl-3 py-3 text-[13px] text-secondary text-center">{item.team}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── Comparison Table ───────────────────────── */

function ComparisonTable() {
    const sections = [
        {
            title: "Credits & Billing",
            rows: [
                { name: "Monthly Credits", free: "500", starter: "2,000", pro: "5,000", team: "25,000" },
                { name: "Model Tiers", free: "Free", starter: "Free + Fast", pro: "All", team: "All" },
                { name: "Credit Packs", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Monthly Replenishment", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Free Trial", free: "—", starter: "7 days", pro: "14 days", team: "—" },
            ],
        },
        {
            title: "App Features",
            rows: [
                { name: "Built-in Tools", free: "100+", starter: "100+", pro: "100+", team: "100+" },
                { name: "Agent Modes", free: "All 7", starter: "All 7", pro: "All 7", team: "All 7" },
                { name: "Expert Skills", free: "40+", starter: "40+", pro: "40+", team: "40+" },
                { name: "MCP Servers", free: "58", starter: "58", pro: "58", team: "58" },
                { name: "IDE Panels", free: "17", starter: "17", pro: "17", team: "17" },
                { name: "SOUL.md Personality", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Workflow Presets", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
            ],
        },
        {
            title: "AI Providers (BYOK)",
            rows: [
                { name: "Anthropic, OpenAI, Ollama", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "CoreML (On-Device)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "OpenRouter (via Platform)", free: "Free-tier", starter: "Free + Fast", pro: "All models", team: "All models" },
            ],
        },
        {
            title: "Security",
            rows: [
                { name: "Keychain Credential Storage", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Exec Approval System", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Google SSO", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
            ],
        },
        {
            title: "Support",
            rows: [
                { name: "Community (GitHub/Discord)", free: "Yes", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Email Support", free: "—", starter: "Yes", pro: "Yes", team: "Yes" },
                { name: "Priority Support", free: "—", starter: "—", pro: "Yes", team: "Yes" },
                { name: "SLA Guarantee", free: "—", starter: "—", pro: "—", team: "Yes" },
            ],
        },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28">
            <div className="mx-auto max-w-[1000px]">
                <FadeIn>
                    <SectionHeader
                        label="Compare"
                        heading="Full feature comparison."
                    />
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="mt-12 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-black/[0.06]">
                                    <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-tertiary min-w-[200px]">Feature</th>
                                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Free</th>
                                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Starter</th>
                                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-blue text-center">Pro</th>
                                    <th className="pl-3 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sections.map((section) => (
                                    <React.Fragment key={section.title}>
                                        <tr>
                                            <td colSpan={5} className="pt-6 pb-2 text-[11px] font-semibold uppercase tracking-widest text-blue/70">
                                                {section.title}
                                            </td>
                                        </tr>
                                        {section.rows.map((f) => (
                                            <tr key={f.name} className="border-b border-black/[0.03]">
                                                <td className="py-3 pr-4 text-sm text-primary">{f.name}</td>
                                                <td className="px-3 py-3 text-[13px] text-secondary text-center">{f.free}</td>
                                                <td className="px-3 py-3 text-[13px] text-secondary text-center">{f.starter}</td>
                                                <td className="px-3 py-3 text-[13px] text-primary font-medium text-center">{f.pro}</td>
                                                <td className="pl-3 py-3 text-[13px] text-secondary text-center">{f.team}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

/* ───────────────────────── Enterprise Pitch ───────────────────────── */

function HowCreditsWork() {
    const steps = [
        {
            title: "Sign in with Google",
            desc: "Create your account via Google Sign-In. No passwords to manage — authentication is handled securely via OAuth.",
            icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
        },
        {
            title: "Get monthly credits",
            desc: "Every month, your credit balance replenishes based on your tier. Free users get 500 credits, Team users get 25,000.",
            icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
        },
        {
            title: "Use AI via the platform",
            desc: "Chat with AI models through the G-Rump app. Each request deducts credits based on token usage (1 credit per 1K tokens).",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        },
        {
            title: "Buy more if you need it",
            desc: "Running low? Purchase credit packs anytime. They stack on top of your monthly allowance and never expire.",
            icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: "Or bring your own keys",
            desc: "Prefer direct API access? Use your own Anthropic, OpenAI, or Ollama keys alongside platform credits. BYOK works on every tier.",
            icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
        },
        {
            title: "Manage billing on the web",
            desc: "View usage, upgrade tiers, purchase credit packs, and manage your subscription — all from your dashboard at g-rump.com.",
            icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
        },
    ];

    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="How It Works"
                        heading="Simple credit-based billing."
                        description="Sign in, get credits, use AI. Upgrade or buy packs as you need more."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
                    {steps.map((f) => (
                        <StaggerItem key={f.title}>
                            <HoverCard className="glass-card h-full rounded-2xl p-6 transition-all hover:border-black/[0.1]">
                                <svg className="h-7 w-7 text-blue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                                </svg>
                                <h3 className="text-sm font-semibold text-primary">{f.title}</h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-secondary">{f.desc}</p>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── FAQ ───────────────────────── */

function FAQ() {
    const faqs = [
        {
            question: "How do credits work?",
            answer: "Credits are deducted based on token usage when you use AI through the G-Rump platform (1 credit per 1,000 tokens). Your monthly credit allowance replenishes each billing cycle. You can also purchase credit packs that stack on top of your monthly credits and never expire.",
        },
        {
            question: "Can I bring my own API keys instead?",
            answer: "Yes! G-Rump supports Bring Your Own Key (BYOK) on every tier. Connect your Anthropic, OpenAI, or Ollama keys directly — stored securely in macOS Keychain. BYOK usage doesn't consume platform credits.",
        },
        {
            question: "What models can I access?",
            answer: "Model access depends on your tier. Free users get free-tier models. Starter adds fast-tier models for quicker responses. Pro and Team unlock all models including frontier (Claude, GPT-4, etc.). With BYOK, you can use any model your API key supports regardless of tier.",
        },
        {
            question: "Can I use local models?",
            answer: "Absolutely. G-Rump supports Ollama and CoreML for fully offline, private AI. Run open-source models locally without any data leaving your machine. Local model usage doesn't consume credits.",
        },
        {
            question: "What macOS version do I need?",
            answer: "G-Rump requires macOS 14 (Sonoma) or later and Swift 5.9+. It's built with SwiftUI and leverages modern macOS APIs like the Accessibility framework and Vision OCR.",
        },
        {
            question: "Is there a free trial?",
            answer: "Yes. Starter comes with a 7-day free trial and Pro comes with a 14-day free trial. You'll have full access to all features and model tiers during the trial period.",
        },
        {
            question: "Can I switch plans at any time?",
            answer: "Yes. Upgrade, downgrade, or cancel at any time. Manage your subscription through the Stripe customer portal from your account settings.",
        },
        {
            question: "How is my data handled?",
            answer: "G-Rump never collects telemetry without explicit consent. When using BYOK, your code goes directly to your AI provider. When using platform credits, requests are proxied through our backend with a single server-side API key. Credentials are stored in macOS Keychain, never in config files.",
        },
        {
            question: "What happens if I run out of credits?",
            answer: "You can purchase credit packs anytime from the billing page. Packs come in 1,000 ($4.99), 5,000 ($19.99), and 20,000 ($69.99) credit bundles. Or switch to BYOK mode to use your own API keys.",
        },
        {
            question: "Can I use G-Rump offline?",
            answer: "Yes, with local models. Connect Ollama or use CoreML to run models entirely on your Mac. All 100+ tools work offline — file operations, git, shell, everything. Only cloud AI providers and platform credits require internet.",
        },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28">
            <div className="mx-auto max-w-[700px]">
                <FadeIn>
                    <SectionHeader
                        label="FAQ"
                        heading="Frequently asked questions."
                    />
                </FadeIn>

                <FadeIn delay={0.1}>
                    <Accordion items={faqs} className="mt-12" />
                </FadeIn>
            </div>
        </section>
    );
}

/* ───────────────────────── CTA ───────────────────────── */

function PricingCTA() {
    return (
        <section className="relative px-5 py-28 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-blue/[0.03] blur-[100px]" />
            <FadeIn className="relative">
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
                    Start with 500 free credits.
                </h2>
                <p className="mt-4 max-w-[440px] mx-auto text-[15px] text-secondary">
                    Download G-Rump, sign in with Google, and start coding with AI. Upgrade when you need more credits or faster models.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/docs/quick-start"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        Download for Mac
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                    >
                        Contact Sales
                    </Link>
                </div>
            </FadeIn>
        </section>
    );
}
