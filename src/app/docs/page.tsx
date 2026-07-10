import type { Metadata } from "next";
import Link from "next/link";
import { getDocsByGroup } from "@/lib/docs-manifest";

export const metadata: Metadata = {
    title: { absolute: "Documentation — G-Rump" },
    description:
        "Everything in the G-Rump open-source AI harness, documented: the agent loop, 153 tools, providers, learning loop, MCP, security model, and distribution.",
};

export default function DocsIndex() {
    const groups = getDocsByGroup();

    return (
        <div className="max-w-[760px]">
            <p className="eyebrow">Documentation</p>
            <h1 className="mt-3 text-h2 text-[var(--text-1)]">
                Everything the harness does, documented.
            </h1>
            <p className="mt-4 text-[var(--text-2)]">
                These pages are synced from the{" "}
                <a
                    href="https://github.com/Aphrodine-wq/G-Rump/tree/main/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)]"
                >
                    G-Rump repository
                </a>{" "}
                — the same docs contributors use. Start with the{" "}
                <Link href="/docs/quick-start" className="text-[var(--accent)]">
                    Quick Start
                </Link>
                , or press <kbd className="rounded border border-[var(--hairline)] bg-[var(--bg-inset)] px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>{" "}
                to search.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {groups.map(({ group, pages }) => (
                    <div key={group} className="glass rounded-2xl p-6">
                        <h2 className="eyebrow">{group}</h2>
                        <ul className="mt-3 space-y-2">
                            {pages.map((page) => (
                                <li key={page.slug}>
                                    <Link
                                        href={`/docs/${page.slug}`}
                                        className="text-sm font-medium text-[var(--text-1)] transition-colors duration-150 hover:text-[var(--accent)]"
                                    >
                                        {page.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
