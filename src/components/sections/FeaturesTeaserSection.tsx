"use client";

import Link from "next/link";
import {
    FadeIn,
    Stagger,
    StaggerItem,
    HoverCard,
} from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const features = [
    {
        title: "100+ Native Tools",
        desc: "File, shell, git, docker, browser, cloud deploy, and Apple-native integrations — Spotlight, Keychain, Calendar, OCR, xcodebuild.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        accent: "#3b82f6",
    },
    {
        title: "Multi-Provider AI",
        desc: "Route requests across Anthropic, OpenAI, Ollama, OpenRouter, and CoreML. Switch mid-conversation. Run models locally for full privacy.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        ),
        accent: "#22c55e",
    },
    {
        title: "7 Agent Modes",
        desc: "Chat, Plan, Build, Debate, Spec, Parallel, and Explore — each mode tailors the agent's behavior, tool access, and output format to match your workflow.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
        ),
        accent: "#f97316",
    },
    {
        title: "Deep macOS Integration",
        desc: "Built with Swift and SwiftUI. Access Spotlight, Keychain, Calendar, Notification Center, and the Accessibility API. No Electron wrappers.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
        accent: "#a855f7",
    },
    {
        title: "40+ Expert Skills",
        desc: "Curated SKILL.md files with deep domain expertise. Activated automatically based on project context. Create custom skills for any team.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
        ),
        accent: "#06b6d4",
    },
    {
        title: "17 IDE Panels",
        desc: "File navigator, git, tests, assets, profiling, logs, terminal, Apple Docs, and more — all purpose-built for AI-assisted development.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
        accent: "#ec4899",
    },
];

export function FeaturesTeaserSection() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" />
            <div className="relative mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Features"
                        heading="Everything you need. Nothing you don't."
                        description="Built from the ground up for macOS developers who demand the best tools."
                    />
                </FadeIn>

                <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
                    {features.map((f) => (
                        <StaggerItem key={f.title}>
                            <HoverCard className="glass-card group h-full rounded-2xl p-6 relative overflow-hidden transition-all hover:border-black/[0.1]">
                                <div
                                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }}
                                />
                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                                    style={{ background: `${f.accent}25` }}
                                >
                                    <div style={{ color: f.accent }}>{f.icon}</div>
                                </div>
                                <h3 className="text-[15px] font-semibold text-primary">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-secondary">{f.desc}</p>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>

                <FadeIn delay={0.3} className="mt-12 text-center">
                    <Link
                        href="/features"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue transition-all hover:gap-3"
                    >
                        See all features
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
