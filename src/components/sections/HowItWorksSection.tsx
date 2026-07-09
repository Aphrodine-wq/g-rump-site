"use client";

import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
    {
        step: "01",
        title: "Install & Connect",
        desc: "Download G-Rump, add your API keys (stored in macOS Keychain), and point it at your project. Setup takes under 60 seconds.",
        terminal: [
            { text: "$ brew install grump", color: "text-tertiary" },
            { text: "[ok] G-Rump installed (v2.0.4)", color: "text-green-400" },
            { text: "$ grump auth add anthropic", color: "text-tertiary" },
            { text: "[ok] API key stored in Keychain", color: "text-green-400" },
        ],
        accent: "#3b82f6",
    },
    {
        step: "02",
        title: "Configure & Detect",
        desc: "G-Rump auto-detects your tech stack, activates relevant skills, and loads MCP servers. Or configure everything manually in grump.toml.",
        terminal: [
            { text: "$ grump init", color: "text-tertiary" },
            { text: "[ok] Detected: Swift 5.9 + SwiftUI", color: "text-green-400" },
            { text: "[ok] Activated skills: SwiftUI, Testing, Swift Concurrency", color: "text-green-400" },
            { text: "[ok] Loaded 12 MCP servers", color: "text-green-400" },
        ],
        accent: "#22c55e",
    },
    {
        step: "03",
        title: "Build Autonomously",
        desc: "Describe what you want. G-Rump plans, codes, tests, and iterates — up to 150 steps in Build mode. Review diffs, approve shell commands, ship.",
        terminal: [
            { text: "You: Add OAuth2 login with PKCE flow", color: "text-blue" },
            { text: "→ Planning 23-step implementation...", color: "text-purple" },
            { text: "[ok] Created OAuthManager.swift", color: "text-green-400" },
            { text: "[ok] All 9 tests passing · Ready for review", color: "text-green-400" },
        ],
        accent: "#a855f7",
    },
];

export function HowItWorksSection() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" />
            <div className="relative mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="How It Works"
                        heading="From install to shipping in minutes."
                        description="Three steps to your most productive coding session ever."
                    />
                </FadeIn>

                <div className="mt-16 space-y-6">
                    {steps.map((s, i) => (
                        <FadeIn key={s.step} delay={i * 0.12}>
                            <div className="glass-card rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start transition-all hover:border-black/[0.1]">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span
                                            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                                            style={{ background: `${s.accent}25`, color: s.accent }}
                                        >
                                            {s.step}
                                        </span>
                                        <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-secondary max-w-[420px]">{s.desc}</p>
                                </div>
                                <div className="w-full lg:w-[380px] shrink-0 rounded-xl border border-black/[0.06] bg-gray-50 p-5">
                                    <div className="space-y-2 font-[family-name:var(--font-mono)] text-xs">
                                        {s.terminal.map((line, li) => (
                                            <p key={li} className={line.color}>{line.text}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
