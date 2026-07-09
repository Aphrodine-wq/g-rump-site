import { Metadata } from "next";
import { FadeIn, Stagger, StaggerItem, TextReveal, HoverCard, GlowCard } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Security — G-Rump",
    description: "How G-Rump keeps your code, credentials, and data safe. Keychain storage, sandboxed execution, local models, and zero telemetry.",
};

export default function SecurityPage() {
    return (
        <>
            <SecurityHero />
            <SecurityPillars />
            <DataFlow />
            <SecurityDetails />
            <Compliance />
            <SecurityCTA />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function SecurityHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-green-500/[0.03] blur-[140px]" />
            <div className="relative">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Security</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        Security by design.
                        <br />
                        <span className="text-secondary">Privacy by default.</span>
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-relaxed text-secondary">
                        G-Rump is built from the ground up with security as a core principle — not an afterthought.
                        Your code stays yours. Your credentials stay safe. Your data stays private.
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── Pillars ───────────────────────── */

function SecurityPillars() {
    const pillars = [
        {
            title: "Keychain Vault",
            desc: "All API keys and credentials are stored in the macOS Keychain — Apple's hardware-backed credential store. Never in config files, never in plaintext, never on disk unencrypted.",
            icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
            accent: "#22c55e",
        },
        {
            title: "Sandboxed Execution",
            desc: "Every shell command the agent wants to run requires your explicit approval. You see the full command, the working directory, and the expected impact before anything executes.",
            icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
            accent: "#3b82f6",
        },
        {
            title: "Zero Telemetry",
            desc: "G-Rump collects absolutely no telemetry, usage data, or analytics without your explicit opt-in. We don't even know you've installed it unless you tell us.",
            icon: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88",
            accent: "#a855f7",
        },
        {
            title: "Local-First AI",
            desc: "Run models entirely on your machine with Ollama or CoreML. Zero data leaves your device. Perfect for proprietary code, regulated industries, and air-gapped environments.",
            icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
            accent: "#f97316",
        },
    ];

    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <Stagger className="grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
                    {pillars.map((p) => (
                        <StaggerItem key={p.title}>
                            <GlowCard color="blue" className="glass-card h-full rounded-2xl p-8 transition-all hover:border-black/[0.1]">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                                    style={{ background: `${p.accent}12` }}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={p.accent} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-secondary">{p.desc}</p>
                            </GlowCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ───────────────────────── Data Flow ───────────────────────── */

function DataFlow() {
    const steps = [
        { label: "Your Code", sub: "Stays on your Mac", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
        { label: "G-Rump Agent", sub: "Processes locally", color: "text-blue", bg: "bg-blue-500/10 border-blue-500/20" },
        { label: "AI Provider", sub: "Your keys, direct API", color: "text-purple", bg: "bg-purple/10 border-purple/20" },
        { label: "Response", sub: "Back to your Mac", color: "text-blue", bg: "bg-blue-500/10 border-blue-500/20" },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
            <div className="mx-auto max-w-[900px]">
                <FadeIn>
                    <SectionHeader
                        label="Data Flow"
                        heading="Your code never touches our servers."
                        description="G-Rump sends code context directly to your chosen AI provider using your API keys. We are never a middleman."
                    />
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex items-center gap-4">
                                <div className={`rounded-xl border ${step.bg} px-5 py-4 text-center min-w-[140px]`}>
                                    <p className={`text-sm font-semibold ${step.color}`}>{step.label}</p>
                                    <p className="mt-1 text-[11px] text-tertiary">{step.sub}</p>
                                </div>
                                {i < steps.length - 1 && (
                                    <svg className="h-4 w-4 text-tertiary shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                    <div className="mt-12 glass-card rounded-2xl p-6 lg:p-8">
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-400">0</p>
                                <p className="mt-1 text-xs text-tertiary">Bytes sent to G-Rump servers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue">Direct</p>
                                <p className="mt-1 text-xs text-tertiary">API calls to your provider</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple">Your Keys</p>
                                <p className="mt-1 text-xs text-tertiary">Stored in macOS Keychain</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

/* ───────────────────────── Security Details ───────────────────────── */

function SecurityDetails() {
    const details = [
        {
            title: "Credential Management",
            items: [
                "All API keys stored in macOS Keychain (hardware-backed on Apple Silicon)",
                "Biometric unlock support (Touch ID) for sensitive operations",
                "Per-provider key rotation without restarting the agent",
                "No .env files — credentials never written to disk in plaintext",
            ],
        },
        {
            title: "Execution Safety",
            items: [
                "Every shell command requires explicit user approval before execution",
                "Command preview with syntax highlighting and risk assessment",
                "File write operations show full diffs before applying changes",
                "Network requests are logged and can be restricted per-project",
            ],
        },
        {
            title: "Data Privacy",
            items: [
                "Zero telemetry collection without opt-in consent",
                "No analytics, no crash reports, no usage tracking by default",
                "Conversation history stored locally — never synced to cloud",
                "Full offline mode with local models (Ollama, CoreML)",
            ],
        },
        {
            title: "Code Security",
            items: [
                "Open source — full audit of every line of code on GitHub",
                "Signed macOS releases with notarization",
                "No background network connections when using local models",
                "Project-level configuration for sensitive file exclusions",
            ],
        },
    ];

    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="In Depth"
                        heading="Security at every layer."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-6 sm:grid-cols-2" staggerDelay={0.08}>
                    {details.map((d) => (
                        <StaggerItem key={d.title}>
                            <HoverCard className="glass-card h-full rounded-2xl p-6 lg:p-8 transition-all hover:border-black/[0.1]">
                                <h3 className="text-[15px] font-semibold text-primary mb-4">{d.title}</h3>
                                <ul className="space-y-3">
                                    {d.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-[13px] text-secondary leading-relaxed">
                                            <svg className="h-4 w-4 shrink-0 mt-0.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            {item}
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

/* ───────────────────────── Compliance ───────────────────────── */

function Compliance() {
    const items = [
        {
            title: "SOC 2 Ready",
            desc: "Architecture designed for SOC 2 Type II compliance. Audit logging, access controls, and data handling policies built in.",
        },
        {
            title: "GDPR Compliant",
            desc: "No personal data collection. No cross-border data transfers. Your code stays on your machine and goes directly to your chosen provider.",
        },
        {
            title: "HIPAA Compatible",
            desc: "With local models, G-Rump can operate in HIPAA-regulated environments. No PHI ever leaves the device.",
        },
    ];

    return (
        <section className="bg-bg-alt px-5 py-28">
            <div className="mx-auto max-w-[900px]">
                <FadeIn>
                    <SectionHeader
                        label="Compliance"
                        heading="Enterprise-grade compliance."
                        description="G-Rump's architecture is designed to meet the strictest security and compliance requirements."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-5 sm:grid-cols-3" staggerDelay={0.1}>
                    {items.map((item) => (
                        <StaggerItem key={item.title}>
                            <HoverCard className="glass-card h-full rounded-2xl p-6 text-center transition-all hover:border-black/[0.1]">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
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

/* ───────────────────────── CTA ───────────────────────── */

function SecurityCTA() {
    return (
        <section className="relative px-5 py-28 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-green-500/[0.03] blur-[100px]" />
            <FadeIn className="relative">
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
                    Questions about security?
                </h2>
                <p className="mt-4 max-w-[440px] mx-auto text-[15px] text-secondary">
                    We take security seriously. Reach out to discuss your specific requirements or request our security documentation.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/contact"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        Contact Security Team
                    </Link>
                    <Link
                        href="https://github.com/example/grump"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                    >
                        View Source Code
                    </Link>
                </div>
            </FadeIn>
        </section>
    );
}
