import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { COMPARISONS, getComparison } from "@/lib/comparisons";

export const dynamicParams = false;

export function generateStaticParams() {
    return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const c = getComparison(slug);
    if (!c) return {};
    return {
        title: c.title,
        description: c.description,
        alternates: { canonical: `/vs/${c.slug}` },
    };
}

export default async function ComparisonPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const c = getComparison(slug);
    if (!c) notFound();

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What is the difference between G-Rump and ${c.name}?`,
                acceptedAnswer: { "@type": "Answer", text: c.intro },
            },
            {
                "@type": "Question",
                name: `Should I use G-Rump or ${c.name}?`,
                acceptedAnswer: { "@type": "Answer", text: c.verdict },
            },
        ],
    };

    return (
        <div className="mx-auto max-w-[880px] px-6 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <section className="py-16">
                <Reveal>
                    <p className="eyebrow">Comparison</p>
                    <h1 className="text-display mt-4 text-[var(--text-1)]">{c.title}</h1>
                    <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--text-2)]">
                        {c.intro}
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-3)]">
                        Written by the G-Rump side, so read accordingly — but every row
                        below is checkable, and the &ldquo;choose {c.name}&rdquo; list is
                        real advice.
                    </p>
                </Reveal>
            </section>

            <Reveal>
                <div className="overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[var(--hairline)]">
                                <th scope="col" className="px-4 py-3 text-left font-medium">
                                    <span className="sr-only">Aspect</span>
                                </th>
                                <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-medium text-[var(--accent)]">
                                    G-Rump
                                </th>
                                <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-medium text-[var(--text-2)]">
                                    {c.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {c.rows.map((row) => (
                                <tr key={row[0]} className="border-b border-[var(--hairline-soft)] last:border-0">
                                    <th scope="row" className="px-4 py-3 text-left align-top font-medium text-[var(--text-1)]">
                                        {row[0]}
                                    </th>
                                    <td className="px-4 py-3 align-top text-[var(--text-1)]">{row[1]}</td>
                                    <td className="px-4 py-3 align-top text-[var(--text-2)]">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <Reveal>
                    <GlassCard className="h-full">
                        <h2 className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
                            Choose {c.name} if…
                        </h2>
                        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-2)]">
                            {c.chooseThem.map((point) => (
                                <li key={point} className="flex gap-2">
                                    <span aria-hidden="true" className="text-[var(--text-3)]">·</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={c.theirUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block font-mono text-xs text-[var(--accent)]"
                        >
                            Visit {c.name} →
                        </a>
                    </GlassCard>
                </Reveal>
                <Reveal delay={40}>
                    <GlassCard className="h-full">
                        <h2 className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
                            Choose G-Rump if…
                        </h2>
                        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-2)]">
                            {c.chooseGrump.map((point) => (
                                <li key={point} className="flex gap-2">
                                    <span aria-hidden="true" className="text-[var(--text-3)]">·</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <Link href="/download" className="mt-5 inline-block font-mono text-xs text-[var(--accent)]">
                            Download G-Rump →
                        </Link>
                    </GlassCard>
                </Reveal>
            </div>

            <Reveal>
                <div className="mt-12 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)] p-6">
                    <p className="eyebrow">The grumpy verdict</p>
                    <p className="mt-3 leading-relaxed text-[var(--text-2)]">{c.verdict}</p>
                </div>
            </Reveal>

            <p className="mt-10 text-sm text-[var(--text-3)]">
                More comparisons:{" "}
                {COMPARISONS.filter((o) => o.slug !== c.slug).map((o, i, arr) => (
                    <span key={o.slug}>
                        <Link href={`/vs/${o.slug}`} className="text-[var(--accent)]">
                            vs {o.name}
                        </Link>
                        {i < arr.length - 1 ? " · " : ""}
                    </span>
                ))}{" "}
                · Or see{" "}
                <Link href="/roadmap" className="text-[var(--accent)]">
                    exactly where G-Rump stands
                </Link>
                .
            </p>
        </div>
    );
}
