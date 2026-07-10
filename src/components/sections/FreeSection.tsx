import { Reveal } from "@/components/Reveal";
import { LICENSE_URL } from "@/lib/facts";

const COMPARISON = {
    header: ["", "G-Rump", "Claude Code", "Aider", "OpenHands"],
    rows: [
        ["Runs as", "native macOS app", "terminal CLI", "terminal CLI", "web UI + sandbox"],
        ["Written in", "Swift", "TypeScript", "Python", "Python"],
        ["License", "MIT", "proprietary", "Apache-2.0", "MIT"],
        ["BYOK multi-provider", "4 providers", "Anthropic-centric", "yes", "yes"],
        ["Cross-session memory built in", "yes", "project files", "no", "no"],
    ],
};

export function FreeSection() {
    return (
        <section className="mx-auto max-w-[1120px] px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Reveal>
                        <p className="eyebrow">Bring your own key</p>
                        <h2 className="text-display mt-4 text-[var(--text-1)]">
                            It&rsquo;s free.
                        </h2>
                        <p className="mt-6 max-w-[44ch] leading-relaxed text-[var(--text-2)]">
                            No subscription, no credits, no account. G-Rump is{" "}
                            <a
                                href={LICENSE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--accent)]"
                            >
                                MIT-licensed
                            </a>{" "}
                            open source. You bring an API key from Anthropic, OpenAI,
                            Google, or OpenRouter and pay your provider directly for
                            exactly what you use.
                        </p>
                    </Reveal>
                </div>
                <div className="lg:col-span-7">
                    <Reveal delay={60}>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--hairline)]">
                                        {COMPARISON.header.map((h, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className={`whitespace-nowrap px-4 py-3 text-left font-medium ${
                                                    i === 1
                                                        ? "text-[var(--accent)]"
                                                        : "text-[var(--text-2)]"
                                                }`}
                                            >
                                                {i === 0 ? <span className="sr-only">Aspect</span> : h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.rows.map((row) => (
                                        <tr
                                            key={row[0]}
                                            className="border-b border-[var(--hairline-soft)] last:border-0"
                                        >
                                            <th
                                                scope="row"
                                                className="px-4 py-3 text-left font-medium text-[var(--text-1)]"
                                            >
                                                {row[0]}
                                            </th>
                                            {row.slice(1).map((cell, i) => (
                                                <td
                                                    key={i}
                                                    className={`px-4 py-3 ${
                                                        i === 0
                                                            ? "text-[var(--text-1)]"
                                                            : "text-[var(--text-2)]"
                                                    }`}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm text-[var(--text-3)]">
                            All four are good tools. G-Rump&rsquo;s bet is that a coding
                            agent should be a first-class Mac citizen with a memory, not a
                            process in a terminal.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
