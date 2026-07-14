import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "Contribute",
    description:
        "How to contribute to G-Rump, the open-source AI harness for macOS: build setup in four commands, good first issues, and where help lands well.",
    alternates: { canonical: "/contribute" },
};

const GFI_URL = `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`;
const HW_URL = `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22`;

const LANES = [
    {
        title: "Good first issues",
        body: "Scoped, labeled, and real — filtering Ollama's paywalled models, an accessibility pass on the new mode card, docs audits. Each one says exactly where to look.",
        href: GFI_URL,
        linkLabel: "Browse good first issues",
        external: true,
    },
    {
        title: "Break it, then tell us",
        body: "The fastest way to help: use it on your real project and file what goes wrong. Build-and-run edge cases and chat rough spots are exactly what the roadmap's 'rough' column needs.",
        href: `${GITHUB_URL}/issues/new/choose`,
        linkLabel: "File a bug",
        external: true,
    },
    {
        title: "The big one: GRumpKit",
        body: "Extracting the harness into a SwiftPM library is the top roadmap item, and the boundary design is happening in the open. If you want your name on the foundation, start there.",
        href: `${GITHUB_URL}/issues/7`,
        linkLabel: "Join the design discussion",
        external: true,
    },
    {
        title: "No Swift required",
        body: "Verifying MCP presets still work, docs fixes, and comparison-page corrections are all real contributions. Help wanted is labeled.",
        href: HW_URL,
        linkLabel: "Browse help wanted",
        external: true,
    },
];

export default function ContributePage() {
    return (
        <div className="mx-auto max-w-[880px] px-6 pb-24">
            <section className="py-16">
                <Reveal>
                    <p className="eyebrow">Contribute</p>
                    <h1 className="text-display mt-4 max-w-[22ch] text-[var(--text-1)]">
                        67,000 lines of Swift. One maintainer. You see the problem.
                    </h1>
                    <p className="mt-5 max-w-[56ch] text-lg text-[var(--text-2)]">
                        G-Rump is MIT-licensed, built in the open, and honest about being
                        early. That makes it a genuinely good project to contribute to:
                        the rough edges are{" "}
                        <Link href="/roadmap" className="text-[var(--accent)]">
                            documented
                        </Link>
                        , the issues are labeled, and PRs get read by the person who wrote
                        the code they touch.
                    </p>
                </Reveal>
            </section>

            <Reveal>
                <h2 className="text-h2 text-[var(--text-1)]">Build it in four commands</h2>
                <pre className="mt-6 overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-raised)] px-5 py-4 font-mono text-[13px] leading-relaxed text-[var(--text-1)]">
                    {`git clone ${GITHUB_URL.replace("https://", "")}.git
cd G-Rump
make run        # debug build + launch
swift test --parallel   # the suite — 1,500+ tests, run before you PR`}
                </pre>
                <p className="mt-4 text-sm text-[var(--text-3)]">
                    macOS 14+ and Swift 5.9+. There&rsquo;s one SwiftData/SPM gotcha worth
                    reading about first —{" "}
                    <a
                        href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)]"
                    >
                        CONTRIBUTING.md
                    </a>{" "}
                    covers it, plus the hard rules (no <code className="font-mono">print()</code>,
                    SwiftLint strict).
                </p>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
                {LANES.map((lane, i) => (
                    <Reveal key={lane.title} delay={Math.min(i * 30, 90)}>
                        <GlassCard className="flex h-full flex-col">
                            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
                                {lane.title}
                            </h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-2)]">
                                {lane.body}
                            </p>
                            <a
                                href={lane.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 font-mono text-xs text-[var(--accent)]"
                            >
                                {lane.linkLabel} →
                            </a>
                        </GlassCard>
                    </Reveal>
                ))}
            </div>

            <Reveal>
                <div className="mt-14 border-t border-[var(--hairline)] pt-8 text-sm text-[var(--text-2)]">
                    <p>
                        Questions before you start? Use{" "}
                        <a
                            href={`${GITHUB_URL}/discussions`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            GitHub Discussions
                        </a>
                        . Security reports go through{" "}
                        <Link href="/security" className="text-[var(--accent)]">
                            the security page
                        </Link>
                        , not public issues.
                    </p>
                </div>
            </Reveal>
        </div>
    );
}
