import { Metadata } from "next";
import { FadeIn, SlideIn, Stagger, StaggerItem, TextReveal, HoverCard, Counter } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About — G-Rump",
    description: "The story behind G-Rump. We're building the definitive AI coding agent for macOS.",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <Mission />
            <Values />
            <Timeline />
            <Team />
            <AboutCTA />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function AboutHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-20 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple/[0.04] blur-[120px]" />
            <div className="relative mx-auto max-w-[700px]">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">About</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        We believe AI
                        <br />
                        should feel{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-purple bg-clip-text text-transparent">
                            native
                        </span>
                        .
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-secondary">
                        G-Rump started as a frustration — why did every AI coding tool feel like a web app
                        stuffed into a desktop wrapper? We set out to build something that belongs on macOS.
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── Mission ───────────────────────── */

function Mission() {
    return (
        <section className="bg-bg-alt px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <SlideIn direction="left">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue">Our Mission</p>
                            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
                                Make every macOS developer 10x more productive.
                            </h2>
                            <p className="mt-5 text-[15px] leading-relaxed text-secondary">
                                We&apos;re building the most powerful AI coding agent ever made for macOS. Not a port, not a wrapper — 
                                a native application that leverages every capability of your Mac to help you write better code, faster.
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                                We believe that developer tools should respect your machine, your privacy, and your time. 
                                G-Rump stores credentials in Keychain, runs models locally when you want, and never phones home without permission.
                            </p>
                        </div>
                    </SlideIn>

                    <SlideIn direction="right">
                        <Stagger className="grid grid-cols-2 gap-4" staggerDelay={0.08}>
                            {[
                                { value: 100, suffix: "+", label: "Tools Built" },
                                { value: 40, suffix: "+", label: "Expert Skills" },
                                { value: 17, suffix: "", label: "IDE Panels" },
                                { value: 58, suffix: "", label: "MCP Servers" },
                            ].map((stat) => (
                                <StaggerItem key={stat.label}>
                                    <div className="glass-card rounded-2xl p-6 text-center">
                                        <p className="text-3xl font-bold tracking-tight text-primary">
                                            <Counter value={stat.value} suffix={stat.suffix} />
                                        </p>
                                        <p className="mt-1 text-xs text-tertiary">{stat.label}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </SlideIn>
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── Values ───────────────────────── */

function Values() {
    const values = [
        {
            title: "Native First",
            desc: "We use Swift and SwiftUI because macOS developers deserve tools built with the same frameworks they use every day. No Electron. No compromises.",
            icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
        },
        {
            title: "Privacy by Default",
            desc: "Your code stays on your machine. API keys live in Keychain. Run models locally with Ollama or CoreML. We never collect telemetry without explicit consent.",
            icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
        },
        {
            title: "Developer Experience",
            desc: "Every interaction is optimized for speed and clarity. From keyboard shortcuts to panel layouts, we obsess over the details that make a tool feel right.",
            icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
        },
        {
            title: "Open Integration",
            desc: "58 MCP servers, 5 AI providers, custom skills, and a configuration system that lets you adapt G-Rump to any workflow or team convention.",
            icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
        },
    ];

    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Values"
                        heading="What we stand for."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" staggerDelay={0.08}>
                    {values.map((v) => (
                        <StaggerItem key={v.title}>
                            <HoverCard className="glass-card h-full rounded-2xl p-8 transition-all hover:border-black/[0.1]">
                                <svg className="h-8 w-8 text-blue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                                </svg>
                                <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-secondary">{v.desc}</p>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── Timeline ───────────────────────── */

function Timeline() {
    const milestones = [
        { date: "Jan 2024", title: "Project kickoff", desc: "First commit. Swift + SwiftUI foundation." },
        { date: "Jun 2024", title: "Alpha release", desc: "10 tools, single-provider AI, Chat mode only." },
        { date: "Nov 2024", title: "Beta launch", desc: "50 tools, 3 agent modes, MCP support." },
        { date: "Feb 2025", title: "1.0 release", desc: "100+ tools, 5 modes, 40+ skills. Public launch." },
        { date: "Feb 2026", title: "2.0 release", desc: "150-step Build mode, 58 MCP servers, CoreML." },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28">
            <div className="mx-auto max-w-[700px]">
                <FadeIn>
                    <SectionHeader
                        label="Timeline"
                        heading="How we got here."
                    />
                </FadeIn>

                <div className="mt-14 relative">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue/40 via-purple/40 to-transparent" />

                    <div className="space-y-8">
                        {milestones.map((m, i) => (
                            <FadeIn key={m.date} delay={i * 0.08}>
                                <div className="flex gap-5 items-start">
                                    <div className="relative mt-1.5 shrink-0">
                                        <div className="h-[14px] w-[14px] rounded-full border-2 border-blue bg-bg-alt" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-1">{m.date}</p>
                                        <h3 className="text-[15px] font-semibold text-primary">{m.title}</h3>
                                        <p className="mt-1 text-sm text-secondary">{m.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── Team ───────────────────────── */

function Team() {
    return (
        <section className="px-5 py-28" id="careers">
            <div className="mx-auto max-w-[700px] text-center">
                <FadeIn>
                    <SectionHeader
                        label="Team"
                        heading="Built by developers, for developers."
                        description="We're a small, focused team obsessed with developer experience. We believe the best tools come from people who use them every day."
                    />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="mt-10 glass-card rounded-2xl p-8">
                        <p className="text-sm leading-relaxed text-secondary">
                            We&apos;re always looking for talented Swift developers, systems programmers, and AI researchers
                            who want to build the future of developer tools on macOS.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue transition-all hover:gap-3"
                        >
                            See open positions
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

/* ───────────────────────── CTA ───────────────────────── */

function AboutCTA() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid" />
            <FadeIn className="relative">
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
                    Join us on the journey.
                </h2>
                <p className="mt-4 text-[15px] text-secondary">
                    Try G-Rump today or follow our progress on GitHub.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/docs/quick-start"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        Download for Mac
                    </Link>
                    <a
                        href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04]"
                    >
                        Star on GitHub
                    </a>
                </div>
            </FadeIn>
        </section>
    );
}
