import { Metadata } from "next";
import { FadeIn, TextReveal } from "@/ui/motion";
import { changelog } from "@/data/changelog";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Releases",
    description: "Download the latest version of G-Rump and view release history. Native macOS AI coding agent.",
};

const typeConfig = {
    new: { label: "New", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    improved: { label: "Improved", color: "text-blue", bg: "bg-blue-500/10 border-blue-500/20" },
    fixed: { label: "Fixed", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
};

export default function ReleasesPage() {
    const latest = changelog[0];

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />
                <div className="relative">
                    <TextReveal>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Releases</p>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                            Download
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple bg-clip-text text-transparent">G-Rump</span>.
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                        <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-relaxed text-secondary">
                            Get the latest release or browse the full version history below. Requires macOS 14 (Sonoma) or later.
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Latest Release Card */}
            <section className="px-5 py-8">
                <div className="mx-auto max-w-[800px]">
                    <FadeIn>
                        <div className="glass-card rounded-2xl p-8 border-blue/20">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue tracking-wide">
                                    v{latest.version}
                                </span>
                                <span className="text-xs text-tertiary">
                                    {new Date(latest.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                                    Latest
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-primary">{latest.title}</h2>
                            <p className="mt-2 text-sm text-secondary">{latest.description}</p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href="/docs/quick-start"
                                    className="rounded-full bg-blue-500 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                >
                                    Download for Mac
                                </Link>
                                <Link
                                    href="/docs/packaging"
                                    className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3 text-sm font-medium text-primary transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                                >
                                    Build from Source
                                </Link>
                            </div>

                            <div className="mt-6 border-t border-black/[0.04] pt-5 space-y-2.5">
                                {latest.changes.map((change, ci) => {
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
                    </FadeIn>
                </div>
            </section>

            {/* System Requirements */}
            <section className="px-5 py-8">
                <div className="mx-auto max-w-[800px]">
                    <FadeIn delay={0.1}>
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue mb-4">System Requirements</h3>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <p className="text-sm font-medium text-primary">macOS 14+</p>
                                    <p className="text-xs text-tertiary">Sonoma or later</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary">Swift 5.9+</p>
                                    <p className="text-xs text-tertiary">For building from source</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary">Apple Silicon / Intel</p>
                                    <p className="text-xs text-tertiary">Universal binary</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Previous Releases */}
            <section className="px-5 py-8 pb-28">
                <div className="mx-auto max-w-[800px]">
                    <FadeIn delay={0.15}>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-tertiary mb-6">Previous Releases</h3>
                    </FadeIn>
                    <div className="space-y-6">
                        {changelog.slice(1).map((entry, i) => (
                            <FadeIn key={entry.version} delay={0.2 + i * 0.05}>
                                <div className="glass-card rounded-2xl p-6 transition-all hover:border-black/[0.08]">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="rounded-full bg-black/[0.04] border border-black/[0.06] px-3 py-1 text-[11px] font-bold text-tertiary tracking-wide">
                                            v{entry.version}
                                        </span>
                                        <span className="text-xs text-tertiary">
                                            {new Date(entry.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-base font-bold text-primary">{entry.title}</h2>
                                    <p className="mt-1 text-sm text-secondary">{entry.description}</p>

                                    <div className="mt-4 border-t border-black/[0.04] pt-4 space-y-2">
                                        {entry.changes.map((change, ci) => {
                                            const config = typeConfig[change.type];
                                            return (
                                                <div key={ci} className="flex items-start gap-3">
                                                    <span className={`mt-0.5 shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.color}`}>
                                                        {config.label}
                                                    </span>
                                                    <p className="text-[13px] text-secondary leading-relaxed">{change.text}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4} className="mt-10 text-center">
                        <Link href="/changelog" className="text-sm text-blue hover:underline">
                            View full changelog &rarr;
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}
