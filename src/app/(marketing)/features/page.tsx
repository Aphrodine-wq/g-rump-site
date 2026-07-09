import { Metadata } from "next";
import {
    FadeIn,
    Stagger,
    StaggerItem,
    SlideIn,
    TextReveal,
    HoverCard,
    GlowCard,
} from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Features — G-Rump",
    description: "100+ tools, multi-provider AI, 5 agent modes, 17 IDE panels, 40+ skills, and deep macOS integration.",
};

export default function FeaturesPage() {
    return (
        <>
            <FeaturesHero />
            <ToolsSection />
            <AgentModesSection />
            <PanelsSection />
            <SkillsSection />
            <MCPSection />
            <NativeSection />
            <TechStack />
            <FeaturesCTA />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function FeaturesHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-20 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue/[0.04] blur-[120px]" />
            <div className="relative mx-auto max-w-[700px]">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Features</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        Built to make you{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-purple bg-clip-text text-transparent">
                            dangerously
                        </span>{" "}
                        productive.
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-secondary">
                        Every feature is purpose-built for macOS developers. No compromises, no Electron, no bloat.
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── 100+ Tools ───────────────────────── */

function ToolsSection() {
    const toolCategories = [
        {
            title: "File System",
            tools: ["Read/Write Files", "Search (ripgrep)", "Rename/Move", "Watch Changes", "Glob Patterns"],
            accent: "#3b82f6",
        },
        {
            title: "Shell & Process",
            tools: ["Command Execution", "Background Tasks", "Process Management", "Environment Vars", "Shell History"],
            accent: "#22c55e",
        },
        {
            title: "Git & VCS",
            tools: ["Status/Diff/Log", "Commit/Push/Pull", "Branch Management", "Stash Operations", "Conflict Resolution"],
            accent: "#f97316",
        },
        {
            title: "Docker & Cloud",
            tools: ["Container Management", "Image Build", "Compose Stack", "Cloud Deploy", "Log Streaming"],
            accent: "#06b6d4",
        },
        {
            title: "Browser & Web",
            tools: ["Headless Chrome", "Screenshot Capture", "DOM Inspection", "Network Requests", "Cookie Management"],
            accent: "#a855f7",
        },
        {
            title: "Apple Native",
            tools: ["Spotlight Search", "Keychain Vault", "Calendar Access", "Notification Center", "OCR / Vision"],
            accent: "#ec4899",
        },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28" id="tools">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Tools"
                        heading="100+ tools at your agent's fingertips."
                        description="Every tool is sandboxed with exec approvals. The agent gets exactly the capabilities it needs, nothing more."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
                    {toolCategories.map((cat) => (
                        <StaggerItem key={cat.title}>
                            <HoverCard className="glass-card group h-full rounded-2xl p-6 transition-all hover:border-black/[0.1]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ background: cat.accent }}
                                    />
                                    <h3 className="text-sm font-semibold text-primary">{cat.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {cat.tools.map((tool) => (
                                        <li key={tool} className="flex items-center gap-2 text-[13px] text-secondary">
                                            <svg className="h-3.5 w-3.5 shrink-0 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── Agent Modes ───────────────────────── */

function AgentModesSection() {
    const modes = [
        {
            name: "Chat",
            desc: "Conversational coding assistant with full project context. Ask questions, get explanations, generate snippets. Maintains complete conversation history with automatic context compaction.",
            tools: "Core tools only",
            steps: "Single response",
            accent: "#3b82f6",
        },
        {
            name: "Plan",
            desc: "Generate structured implementation plans before writing any code. Produces dependency graphs, verification criteria, and step-by-step roadmaps. Perfect for complex features.",
            tools: "Read-only tools",
            steps: "Single plan output",
            accent: "#22c55e",
        },
        {
            name: "Build",
            desc: "Autonomous multi-step execution engine. Writes files, runs shell commands, executes tests, and iterates on errors independently. Full access to all 100+ tools.",
            tools: "All 100+ tools",
            steps: "Up to 150 steps",
            accent: "#f97316",
        },
        {
            name: "Debate",
            desc: "Challenge your assumptions. Debate mode presents counterarguments, explores edge cases, and forces you to consider failure modes. Makes your architecture decisions bulletproof.",
            tools: "Analysis tools",
            steps: "Multi-turn discussion",
            accent: "#ef4444",
        },
        {
            name: "Spec",
            desc: "Generate comprehensive technical specifications from high-level requirements. Outputs acceptance criteria, data models, API contracts, and sequence diagrams.",
            tools: "Documentation tools",
            steps: "Structured output",
            accent: "#a855f7",
        },
    ];

    return (
        <section className="px-5 py-28" id="agent-modes">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Agent Modes"
                        heading="Five modes. Every workflow."
                        description="Switch modes mid-conversation. Context carries over seamlessly."
                    />
                </FadeIn>

                <div className="mt-14 space-y-4">
                    {modes.map((m, i) => (
                        <FadeIn key={m.name} delay={i * 0.08}>
                            <div className="glass-card group rounded-2xl p-6 lg:p-8 transition-all hover:border-black/[0.1] flex flex-col lg:flex-row lg:items-center gap-5">
                                <div className="flex items-center gap-4 lg:w-[160px] shrink-0">
                                    <div
                                        className="h-10 w-10 rounded-xl flex items-center justify-center text-lg font-bold"
                                        style={{ background: `${m.accent}15`, color: m.accent }}
                                    >
                                        {m.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-semibold text-primary">{m.name}</p>
                                    </div>
                                </div>
                                <p className="flex-1 text-sm leading-relaxed text-secondary">{m.desc}</p>
                                <div className="flex gap-6 shrink-0 text-xs">
                                    <div>
                                        <p className="text-tertiary mb-0.5">Tools</p>
                                        <p className="text-primary font-medium">{m.tools}</p>
                                    </div>
                                    <div>
                                        <p className="text-tertiary mb-0.5">Capacity</p>
                                        <p className="text-primary font-medium">{m.steps}</p>
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

/* ───────────────────────── Panels ───────────────────────── */

function PanelsSection() {
    const panels = [
        "File Navigator", "Git Panel", "Test Runner", "Asset Browser", "Performance Profiler",
        "Log Viewer", "Terminal", "Apple Docs", "Diagnostics", "Search", "Outline",
        "Dependency Graph", "Symbols", "Breakpoints", "Network", "Database", "Extensions",
    ];

    return (
        <section className="bg-bg-alt px-5 py-28" id="panels">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="IDE Panels"
                        heading="17 purpose-built panels."
                        description="Every panel is designed for AI-assisted development workflows. Navigate code, run tests, browse assets, and profile performance — all without leaving G-Rump."
                    />
                </FadeIn>

                <Stagger className="mt-14 flex flex-wrap justify-center gap-3" staggerDelay={0.03}>
                    {panels.map((p) => (
                        <StaggerItem key={p}>
                            <div className="rounded-full border border-black/[0.06] bg-black/[0.02] px-5 py-2.5 text-sm text-secondary transition-all hover:bg-black/[0.04] hover:text-primary hover:border-black/[0.1]">
                                {p}
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── Skills ───────────────────────── */

function SkillsSection() {
    const skillGroups = [
        {
            title: "Languages",
            skills: ["Swift", "TypeScript", "Python", "Rust", "Go", "Ruby", "Java", "C++"],
        },
        {
            title: "Frameworks",
            skills: ["SwiftUI", "React", "Next.js", "Django", "Rails", "Vapor", "FastAPI"],
        },
        {
            title: "DevOps & Infra",
            skills: ["Docker", "Kubernetes", "Terraform", "CI/CD", "AWS", "Vercel"],
        },
        {
            title: "Practices",
            skills: ["Testing", "Code Review", "Security Audit", "Performance", "Accessibility"],
        },
    ];

    return (
        <section className="px-5 py-28" id="skills">
            <div className="mx-auto max-w-[1100px]">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <SlideIn direction="left">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue">Skills</p>
                            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
                                40+ expert skills. Activate automatically.
                            </h2>
                            <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                                Each skill is a curated SKILL.md file containing deep domain expertise — coding patterns, best practices, common pitfalls, and framework-specific knowledge. Skills activate based on your project&apos;s tech stack.
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                                Create custom skills for your team&apos;s conventions, internal APIs, and deployment processes.
                            </p>
                            <Link
                                href="/docs/skills"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue transition-all hover:gap-3"
                            >
                                Learn about Skills
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </SlideIn>

                    <SlideIn direction="right">
                        <div className="space-y-5">
                            {skillGroups.map((group) => (
                                <div key={group.title}>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-tertiary">{group.title}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-xs font-medium text-secondary transition-all hover:bg-black/[0.04] hover:text-primary"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SlideIn>
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── MCP ───────────────────────── */

function MCPSection() {
    return (
        <section className="bg-bg-alt px-5 py-28" id="mcp">
            <div className="mx-auto max-w-[1100px]">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <SlideIn direction="left">
                        <div className="glass-card rounded-2xl p-6">
                            <div className="terminal-chrome">
                                <div className="terminal-dots">
                                    <span /><span /><span />
                                </div>
                                <div className="p-5 font-[family-name:var(--font-mono)] text-xs leading-loose">
                                    <p className="text-tertiary"># grump.toml</p>
                                    <p><span className="text-blue">[mcp.servers.filesystem]</span></p>
                                    <p className="text-secondary">command = <span className="text-green-400">&quot;npx&quot;</span></p>
                                    <p className="text-secondary">args = <span className="text-green-400">[&quot;@modelcontextprotocol/server-filesystem&quot;]</span></p>
                                    <p className="mt-2"><span className="text-blue">[mcp.servers.github]</span></p>
                                    <p className="text-secondary">command = <span className="text-green-400">&quot;npx&quot;</span></p>
                                    <p className="text-secondary">args = <span className="text-green-400">[&quot;@modelcontextprotocol/server-github&quot;]</span></p>
                                </div>
                            </div>
                        </div>
                    </SlideIn>

                    <SlideIn direction="right">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue">MCP Servers</p>
                            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
                                58 pre-built MCP servers. Add your own.
                            </h2>
                            <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                                Model Context Protocol servers extend G-Rump with external tools and data sources. Connect to databases, APIs, file systems, and cloud services.
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                                Includes servers for GitHub, GitLab, Slack, Linear, Notion, PostgreSQL, Redis, S3, and dozens more. Configure them in a single TOML file.
                            </p>
                            <Link
                                href="/docs/mcp"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue transition-all hover:gap-3"
                            >
                                Browse MCP Servers
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </SlideIn>
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── Native macOS ───────────────────────── */

function NativeSection() {
    const integrations = [
        { title: "Spotlight Search", desc: "Search your entire filesystem through macOS Spotlight's index." },
        { title: "Keychain Vault", desc: "API keys stored in macOS Keychain. No .env files." },
        { title: "Calendar Access", desc: "Create events and reminders from your coding sessions." },
        { title: "Notification Center", desc: "Native notifications for build completion and errors." },
        { title: "OCR / Vision", desc: "Extract text from screenshots and images using Apple Vision." },
        { title: "Accessibility API", desc: "Deep system automation through macOS Accessibility." },
    ];

    return (
        <section className="px-5 py-28" id="native">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Native macOS"
                        heading="Built for your Mac. Not ported to it."
                        description="Swift and SwiftUI from line one. Every feature leverages macOS APIs that Electron apps can't touch."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
                    {integrations.map((item) => (
                        <StaggerItem key={item.title}>
                            <HoverCard className="glass-card h-full rounded-2xl p-6 transition-all hover:border-black/[0.1]">
                                <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-secondary">{item.desc}</p>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── Tech Stack ───────────────────────── */

function TechStack() {
    const stack = [
        { name: "Swift 5.9+", desc: "Type-safe, performant, modern language", icon: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.28-3.74 4.25z", color: "#f97316" },
        { name: "SwiftUI", desc: "Declarative native UI framework", icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z", color: "#3b82f6" },
        { name: "AppKit", desc: "Deep macOS system integration", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25", color: "#6366f1" },
        { name: "Combine", desc: "Reactive streams for async data", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5", color: "#8b5cf6" },
        { name: "CoreML", desc: "On-device ML inference", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", color: "#22c55e" },
        { name: "Keychain", desc: "Secure credential storage", icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z", color: "#eab308" },
        { name: "XPC", desc: "Inter-process communication", icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z", color: "#06b6d4" },
        { name: "Next.js", desc: "React framework for this website", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5", color: "#f5f5f7" },
    ];

    return (
        <section className="relative px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Under the Hood"
                        heading="Built on proven technology."
                        description="G-Rump leverages the best of Apple's native frameworks for unmatched performance, security, and system integration."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.06}>
                    {stack.map((tech) => (
                        <StaggerItem key={tech.name}>
                            <HoverCard className="glass-card rounded-2xl p-5 h-full">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                                    style={{ background: `${tech.color}12`, border: `1px solid ${tech.color}20` }}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={tech.color} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={tech.icon} />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-primary">{tech.name}</p>
                                <p className="mt-1 text-xs text-tertiary leading-relaxed">{tech.desc}</p>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── CTA ───────────────────────── */

function FeaturesCTA() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-blue/[0.03] blur-[100px]" />

            <FadeIn className="relative">
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
                    Ready to try it?
                </h2>
                <p className="mt-4 text-[15px] text-secondary">
                    Free to download. Native to macOS. No account required.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/docs/quick-start"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        Download for Mac
                    </Link>
                    <Link
                        href="/pricing"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04]"
                    >
                        View Pricing
                    </Link>
                </div>
            </FadeIn>
        </section>
    );
}
