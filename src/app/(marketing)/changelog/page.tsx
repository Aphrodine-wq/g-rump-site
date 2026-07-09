import { Metadata } from "next";
import { FadeIn, TextReveal, Stagger, StaggerItem } from "@/ui/motion";
import { changelog } from "@/data/changelog";

export const metadata: Metadata = {
    title: "Changelog — G-Rump",
    description: "See what's new in G-Rump. Release notes, new features, improvements, and bug fixes.",
};

const typeConfig = {
    new: { label: "New", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    improved: { label: "Improved", color: "text-blue", bg: "bg-blue-500/10 border-blue-500/20" },
    fixed: { label: "Fixed", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
};

export default function ChangelogPage() {
    return (
        <>
            <ChangelogHero />
            <ChangelogList />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function ChangelogHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-green-500/[0.03] blur-[120px]" />
            <div className="relative">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Changelog</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        What&apos;s new in
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple bg-clip-text text-transparent">G-Rump</span>.
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-relaxed text-secondary">
                        Every release, every improvement. Follow our progress as we build the best AI coding agent for macOS.
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── Changelog List ───────────────────────── */

function ChangelogList() {
    return (
        <section className="px-5 py-16 pb-28">
            <div className="mx-auto max-w-[800px]">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-blue/30 via-black/[0.04] to-transparent hidden sm:block" />

                    <div className="space-y-12">
                        {changelog.map((entry, i) => (
                            <FadeIn key={entry.version} delay={i * 0.08}>
                                <div className="relative sm:pl-10">
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 hidden sm:flex h-[15px] w-[15px] items-center justify-center">
                                        <div className={`h-3 w-3 rounded-full ${i === 0 ? "bg-blue-500 ring-4 ring-blue-500/20" : "bg-black/[0.08]"}`} />
                                    </div>

                                    <div className="glass-card rounded-2xl p-6 lg:p-8 transition-all hover:border-black/[0.08]">
                                        {/* Header */}
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue tracking-wide">
                                                v{entry.version}
                                            </span>
                                            <span className="text-xs text-tertiary">
                                                {new Date(entry.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            {i === 0 && (
                                                <span className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                                                    Latest
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-lg font-bold text-primary">{entry.title}</h2>
                                        <p className="mt-1.5 text-sm text-secondary">{entry.description}</p>

                                        {/* Changes */}
                                        <div className="mt-5 border-t border-black/[0.04] pt-5 space-y-2.5">
                                            {entry.changes.map((change, ci) => {
                                                const config = typeConfig[change.type];
                                                return (
                                                    <div key={ci} className="flex items-start gap-3">
                                                        <span className={`mt-0.5 shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.color}`}>
                                                            {config.label}
                                                        </span>
                                                        <p className="text-sm text-secondary leading-relaxed">{change.text}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
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
