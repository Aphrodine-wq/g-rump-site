import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "Roadmap & status",
    description:
        "What works in G-Rump today, what's rough and being ironed out, and what's next — stated plainly. Early software, honest about it.",
    alternates: { canonical: "/roadmap" },
};

const ISSUES_URL = `${GITHUB_URL}/issues`;
const GFI_URL = `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`;

type Item = {
    title: string;
    body: string;
    href?: string;
    linkLabel?: string;
};

const WORKS: Item[] = [
    {
        title: "The native app itself",
        body: "Pure SwiftUI, 13 MB, macOS 14+. Onboarding, Welcome window, Settings, 20 dock panels, ⌘0 navigator — the surfaces are solid.",
    },
    {
        title: "Multi-provider BYOK",
        body: "Anthropic, OpenAI, Google, OpenRouter with native wire formats and streaming tool calls. Keys validate on save and live in the Keychain only.",
        href: "/docs/providers",
        linkLabel: "Provider docs",
    },
    {
        title: "The tool system",
        body: "160 native tools with parallel execution, retries, and exec approvals on every shell command. This is the oldest, most-tested part of the harness.",
        href: "/docs/tools",
        linkLabel: "Tool docs",
    },
    {
        title: "MCP, both directions",
        body: "Client over stdio/HTTP/WebSocket with 67 presets; server on TCP 18790 that refuses run_command. Battle-tested against real servers.",
        href: "/docs/mcp",
        linkLabel: "MCP docs",
    },
    {
        title: "The security model",
        body: "Exec approvals, the fail-closed Conscience gate, protected identity-file writes, an off-by-default daemon. Deterministic code, heavily tested.",
        href: "/docs/security",
        linkLabel: "Security model",
    },
    {
        title: "Skills, soul, memory substrate",
        body: "73 bundled skills, SOUL.md/MIND.md personality, three-tier memory store with ranked recall. The plumbing works; see the next column for the payoff.",
        href: "/docs/soul",
        linkLabel: "Soul & skills",
    },
];

const ROUGH: Item[] = [
    {
        title: "Chat polish",
        body: "The core loop streams fine, but the conversation experience has rough edges — rendering hiccups, occasional awkward states. Being sanded down release by release.",
        href: ISSUES_URL,
        linkLabel: "File what you hit",
    },
    {
        title: "Agentic coding reliability",
        body: "Some tasks land clean end-to-end; some wander and need you to steer. This is the honest state of the whole category — we're just the ones saying it on the website.",
    },
    {
        title: "Build & run to simulator",
        body: "New in 2.1. Works on the happy path (xcodebuild/SPM → booted simulator → live logs); environment differences will surprise it. Bug reports here are gold.",
        href: ISSUES_URL,
        linkLabel: "Report an edge case",
    },
    {
        title: "The learning loop",
        body: "All the mechanics shipped and tested — outcome ledger, lessons, reflection, approval-gated skill proposals. Whether it compounds into a meaningfully smarter agent over weeks is the experiment, and it's running in the open.",
        href: "/docs/learning-loop",
        linkLabel: "How it works",
    },
    {
        title: "Local Ollama models",
        body: "New in 2.1: keyless, live-discovered, offline-friendly. Known issue: paywalled :cloud models list but fail on use.",
        href: `${GITHUB_URL}/issues/8`,
        linkLabel: "The known issue",
    },
];

const NEXT: Item[] = [
    {
        title: "GRumpKit",
        body: "Extract the harness into a SwiftPM library so you can build your own surface on it instead of forking the app. Boundary design is the first step — and it's open for discussion.",
        href: `${GITHUB_URL}/issues/7`,
        linkLabel: "Join the design",
    },
    {
        title: "Notarized builds",
        body: "Current builds are ad-hoc signed, so macOS quarantines them on first launch. The signing pipeline exists; a Developer ID is the missing piece. Until then, the download page tells you exactly what to expect.",
        href: "/download",
        linkLabel: "Install notes",
    },
    {
        title: "Homebrew cask",
        body: "brew install --cask g-rump. Tap-hosted first, homebrew/cask once builds are notarized.",
        href: `${GITHUB_URL}/issues/5`,
        linkLabel: "The issue",
    },
    {
        title: "Sparkle auto-updates",
        body: "The update service is already wired into the app; it needs an appcast feed and signing keys to come alive.",
        href: `${GITHUB_URL}/issues/6`,
        linkLabel: "The issue",
    },
    {
        title: "Deeper debugging",
        body: "Breakpoint-level debugging and on-device runs, building on the 2.1 build engine.",
    },
];

const COLUMNS = [
    {
        key: "works",
        eyebrow: "Works today",
        heading: "Use it for this now.",
        items: WORKS,
    },
    {
        key: "rough",
        eyebrow: "Rough — being ironed out",
        heading: "Real, shipped, and imperfect.",
        items: ROUGH,
    },
    {
        key: "next",
        eyebrow: "Next",
        heading: "In order. No dates.",
        items: NEXT,
    },
];

export default function RoadmapPage() {
    return (
        <div className="mx-auto max-w-[1120px] px-6 pb-24">
            <section className="py-16">
                <Reveal>
                    <p className="eyebrow">Roadmap &amp; status</p>
                    <h1 className="text-display mt-4 max-w-[22ch] text-[var(--text-1)]">
                        Grumpy enough to tell you what&rsquo;s broken.
                    </h1>
                    <p className="mt-5 max-w-[56ch] text-lg text-[var(--text-2)]">
                        G-Rump is early software. Most product pages hide that; this one
                        is the map. Three lists, stated plainly: what you can rely on,
                        what&rsquo;s shipped but rough, and what&rsquo;s coming. If the
                        rough column annoys you enough to fix something,{" "}
                        <a
                            href={GFI_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            the good first issues
                        </a>{" "}
                        are waiting.
                    </p>
                </Reveal>
            </section>

            {COLUMNS.map((col, ci) => (
                <section key={col.key} className="border-t border-[var(--hairline)] py-14">
                    <Reveal>
                        <p className="eyebrow">{col.eyebrow}</p>
                        <h2 className="text-h2 mt-3 text-[var(--text-1)]">{col.heading}</h2>
                    </Reveal>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {col.items.map((item, i) => (
                            <Reveal key={item.title} delay={Math.min(i * 30, 90)}>
                                <GlassCard className="flex h-full flex-col">
                                    <h3 className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-2)]">
                                        {item.body}
                                    </p>
                                    {item.href ? (
                                        item.href.startsWith("/") ? (
                                            <Link
                                                href={item.href}
                                                className="mt-4 font-mono text-xs text-[var(--accent)]"
                                            >
                                                {item.linkLabel} →
                                            </Link>
                                        ) : (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 font-mono text-xs text-[var(--accent)]"
                                            >
                                                {item.linkLabel} →
                                            </a>
                                        )
                                    ) : null}
                                </GlassCard>
                            </Reveal>
                        ))}
                    </div>
                    {ci === COLUMNS.length - 1 ? (
                        <p className="mt-10 text-sm text-[var(--text-3)]">
                            Progress lands in the{" "}
                            <Link href="/changelog" className="text-[var(--accent)]">
                                changelog
                            </Link>
                            ; discussion happens on{" "}
                            <a
                                href={`${GITHUB_URL}/discussions`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--accent)]"
                            >
                                GitHub
                            </a>
                            .
                        </p>
                    ) : null}
                </section>
            ))}
        </div>
    );
}
