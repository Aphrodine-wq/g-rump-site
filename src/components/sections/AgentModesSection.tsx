"use client";

import Link from "next/link";
import {
    FadeIn,
    Stagger,
    StaggerItem,
    GlowCard,
} from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const modes = [
    { name: "Chat", desc: "Direct chat with full tool access and autonomous execution.", accent: "#3b82f6", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { name: "Plan", desc: "Creates a detailed plan before writing any code.", accent: "#22c55e", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { name: "Build", desc: "Builds complete features end-to-end across the full stack.", accent: "#f97316", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { name: "Debate", desc: "Debates both sides before recommending an approach.", accent: "#ef4444", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
    { name: "Spec", desc: "Asks clarifying questions to refine requirements.", accent: "#a855f7", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { name: "Parallel", desc: "Runs multiple sub-agents in parallel for complex tasks.", accent: "#6366f1", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
    { name: "Explore", desc: "Explores 2-3 competing approaches and picks the winner.", accent: "#eab308", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
];

export function AgentModesSection() {
    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Agent Modes"
                        heading="Seven ways to work."
                        description="Each mode tailors G-Rump's behavior, tool access, and output format. Switch modes mid-conversation."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.06}>
                    {modes.map((m) => (
                        <StaggerItem key={m.name}>
                            <GlowCard color={m.name.toLowerCase()} className="glass-card group h-full rounded-2xl p-5 text-center transition-all hover:border-black/[0.1]">
                                <div
                                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl mb-3"
                                    style={{ background: `${m.accent}25` }}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={m.accent} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-primary">{m.name}</p>
                                <p className="mt-1.5 text-xs leading-relaxed text-secondary">{m.desc}</p>
                            </GlowCard>
                        </StaggerItem>
                    ))}
                </Stagger>

                <FadeIn delay={0.3} className="mt-10 text-center">
                    <Link
                        href="/features#agent-modes"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue transition-all hover:gap-3"
                    >
                        Learn about each mode
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
