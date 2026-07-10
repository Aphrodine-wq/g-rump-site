import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { FACTS, GITHUB_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "Features",
    description:
        "Everything in the G-Rump harness: the 200-step agent loop, 153 tools, learning loop, 20-panel native IDE surface, MCP client and server, and a security model you can read.",
};

const SECTIONS = [
    {
        eyebrow: "The loop",
        title: "An agent loop built for real work",
        body: "Multi-turn streaming tool use with parallel execution and retries with backoff. 200 steps by default — configurable from 5 to 1,000 — so the agent can carry a task from plan to passing tests without hand-holding. Three modes swap the whole system strategy: Plan thinks first, Build changes code, Spec writes the document.",
        points: [
            `${FACTS.tools} native tools — files, shell, git, HTTP, SQLite, OCR, Apple-native`,
            "Parallel tool execution with exponential backoff",
            "XML tool-call parsing for models that emit inline calls",
            "Apply / reject / undo workflow on every code change",
        ],
        href: "/docs/agent-modes",
        linkLabel: "Agent modes",
    },
    {
        eyebrow: "Learning",
        title: "A harness that gets better the more you use it",
        body: "Every run's outcome is recorded. A reflection pass distills lessons — short, imperative, confidence-scored — that ride along on future prompts. Strong lesson clusters become skill proposals: diffs you review and approve in the Learning panel. Corrections count against lessons; being wrong has a cost.",
        points: [
            "Outcome ledger with two-stage success (corrections re-score runs)",
            "Lessons with Laplace confidence, idle decay, and auto-retire",
            "Skill proposals are approval-gated diffs — never silent edits",
            "One kill switch turns the whole loop off",
        ],
        href: "/docs/learning-loop",
        linkLabel: "The learning loop",
    },
    {
        eyebrow: "Native",
        title: "A real Mac app with a real IDE surface",
        body: `Pure Swift and SwiftUI — no Electron, about 13 MB on disk. ${FACTS.panels} dock panels cover build, git, terminal, simulator, tests, logs, and profiling, with a ⌘0 project navigator. ⌘R builds with xcodebuild or SPM and runs straight to a booted simulator with live app logs. SourceKit-LSP feeds real diagnostics into the agent's context.`,
        points: [
            `${FACTS.panels} dock panels + ⌘0 navigator`,
            "⌘R build-and-run to simulator with live logs",
            "SourceKit-LSP diagnostics and symbol graph",
            "Double-tap ⌃Space QuickChat from any app",
        ],
        href: "/docs/panels",
        linkLabel: "The IDE surface",
    },
    {
        eyebrow: "Memory & personality",
        title: "A brain, not a chat log",
        body: `Three-tier memory — session, project, global — with hybrid vector, keyword, and recency recall, plus deliberate forgetting. SOUL.md and MIND.md define the agent's personality and values, globally and per project. ${FACTS.skills} bundled skills in ${FACTS.skillPacks} packs, plus your own with relevance-scored auto-suggestion. The default persona is grumpy. That's a feature.`,
        points: [
            "Cross-session memory ranked by relevance × recency",
            "SOUL.md personality, editable per project",
            `${FACTS.skills} bundled SKILL.md skills in ${FACTS.skillPacks} packs`,
            "Developer profile injected into the system prompt",
        ],
        href: "/docs/soul",
        linkLabel: "Soul & skills",
    },
    {
        eyebrow: "Extension",
        title: "MCP in both directions",
        body: `A full MCP client over stdio, HTTP, and WebSocket with ${FACTS.mcpPresets} one-click presets — GitHub, Postgres, Slack, Figma, Playwright, and more — plus a credential vault for server secrets. And G-Rump is a server too: it exposes its own tools on port ${FACTS.mcpServerPort} so other clients can use them. run_command is refused there, by design.`,
        points: [
            `${FACTS.mcpPresets} one-click server presets`,
            "stdio, HTTP, and WebSocket transports",
            `Serves its own tools on TCP ${FACTS.mcpServerPort}`,
            "Credential vault injects secrets as env vars",
        ],
        href: "/docs/mcp",
        linkLabel: "MCP integration",
    },
    {
        eyebrow: "Security",
        title: "A security model you can read",
        body: "Exec approvals with four levels per binary. A deterministic, fail-closed Conscience gate before every mutating tool. Protected writes on the agent's own identity files. An autonomy daemon that is off by default, works on scratch branches, and never pushes. Keys in the Keychain only. All of it is open source — verify, don't trust.",
        points: [
            "Per-binary exec approvals: Deny, Ask, Allowlist, Allow",
            "Fail-closed Conscience gate on mutating tools",
            "SOUL.md / MIND.md / skills writes require approval",
            "Daemon: opt-in, scratch branches, never pushes",
        ],
        href: "/docs/security",
        linkLabel: "Security model",
    },
];

export default function FeaturesPage() {
    return (
        <div className="mx-auto max-w-[1120px] px-6 pb-8">
            <section className="py-16">
                <Reveal>
                    <p className="eyebrow">Features</p>
                    <h1 className="text-display mt-4 max-w-[20ch] text-[var(--text-1)]">
                        Everything in the harness.
                    </h1>
                    <p className="mt-5 max-w-[52ch] text-lg text-[var(--text-2)]">
                        Every number below is counted from the code, and every claim links
                        to the docs that back it.{" "}
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            The source is public
                        </a>{" "}
                        if you&rsquo;d rather count yourself.
                    </p>
                </Reveal>
            </section>

            <div className="space-y-6 pb-16">
                {SECTIONS.map((section, i) => (
                    <Reveal key={section.eyebrow}>
                        <GlassCard padding="lg" className="grid gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                                <p className="eyebrow">{section.eyebrow}</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-1)]">
                                    {section.title}
                                </h2>
                                <p className="mt-4 leading-relaxed text-[var(--text-2)]">
                                    {section.body}
                                </p>
                                <Link
                                    href={section.href}
                                    className="mt-5 inline-block font-mono text-sm text-[var(--accent)]"
                                >
                                    {section.linkLabel} →
                                </Link>
                            </div>
                            <ul className={`space-y-3 self-center lg:col-span-5 ${i % 2 ? "lg:order-first" : ""}`}>
                                {section.points.map((point) => (
                                    <li
                                        key={point}
                                        className="flex gap-3 border-t border-[var(--hairline-soft)] pt-3 text-sm text-[var(--text-2)]"
                                    >
                                        <span aria-hidden="true" className="text-[var(--accent)]">
                                            —
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
