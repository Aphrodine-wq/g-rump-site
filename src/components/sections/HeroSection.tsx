"use client";

import Link from "next/link";
import {
    TextReveal,
    FloatingElement,
} from "@/ui/motion";
import { ParticleField } from "@/components/ParticleField";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
            {/* Particle field */}
            <ParticleField className="opacity-60" />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue/[0.06] blur-[120px]" />
            <div className="pointer-events-none absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-purple/[0.04] blur-[100px]" />

            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid" />

            <div className="relative">
                <TextReveal>
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.02] backdrop-blur-md px-4 py-1.5 text-sm font-medium tracking-wide text-primary">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        Native macOS AI Coding Agent
                    </p>
                </TextReveal>

                <TextReveal delay={0.15}>
                    <h1 className="max-w-[820px] text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-primary">
                        Code at the
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple bg-clip-text text-transparent">
                            speed of thought
                        </span>
                        <br />
                        on your Mac.
                    </h1>
                </TextReveal>

                <TextReveal delay={0.3}>
                    <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-[1.65] text-secondary">
                        G-Rump is a native macOS AI coding agent with 100+ tools,
                        multi-model AI across 6 providers, 17 IDE panels, and
                        deep system integration. Pure Swift and SwiftUI — no Electron.
                    </p>
                </TextReveal>

                <TextReveal delay={0.45}>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/docs/quick-start"
                            className="group relative rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                        >
                            <span className="relative z-10">Download for Mac</span>
                        </Link>
                        <Link
                            href="/features"
                            className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                        >
                            Explore Features
                        </Link>
                    </div>
                </TextReveal>
            </div>

            {/* Floating terminal preview */}
            <TextReveal delay={0.6} className="relative mt-16 w-full max-w-[620px]">
                <FloatingElement delay={0.5}>
                    <div className="terminal-chrome glass-card rounded-xl">
                        <div className="terminal-dots">
                            <span /><span /><span />
                        </div>
                        <div className="p-5 font-[family-name:var(--font-mono)] text-xs leading-relaxed">
                            <p className="text-tertiary">$ grump init</p>
                            <p className="mt-2 text-secondary">
                                <span className="text-green-400">[ok]</span> Detected Swift project (SwiftUI + Swift 6.0)
                            </p>
                            <p className="text-secondary">
                                <span className="text-green-400">[ok]</span> Activated 14 skills: SwiftUI, Testing, Concurrency...
                            </p>
                            <p className="text-secondary">
                                <span className="text-green-400">[ok]</span> Connected to Anthropic (Claude Sonnet 4)
                            </p>
                            <p className="mt-2 text-blue">Ready. 100+ tools available. 7 agent modes online.</p>
                        </div>
                    </div>
                </FloatingElement>
            </TextReveal>

            {/* Cmd+K hint */}
            <TextReveal delay={0.7} className="mt-6">
                <p className="text-xs text-tertiary flex items-center gap-2">
                    Press
                    <kbd className="rounded-md border border-black/[0.06] bg-black/[0.03] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-tertiary">&#8984;K</kbd>
                    to navigate anywhere
                </p>
            </TextReveal>

            {/* Scroll hint */}
            <TextReveal delay={0.8} className="absolute bottom-8">
                <div className="flex flex-col items-center gap-1.5 text-tertiary">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
                        <path d="M8 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </TextReveal>
        </section>
    );
}
