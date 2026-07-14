import Link from "next/link";
import { FrownyLogo } from "./FrownyLogo";
import { GITHUB_URL, GITHUB_RELEASES_URL, LICENSE_URL } from "@/lib/facts";

const COLUMNS = [
    {
        title: "Product",
        links: [
            { href: "/features", label: "Features" },
            { href: "/download", label: "Download" },
            { href: "/changelog", label: "Changelog" },
            { href: "/security", label: "Security" },
        ],
    },
    {
        title: "Docs",
        links: [
            { href: "/docs/quick-start", label: "Quick start" },
            { href: "/docs/tools", label: "Tools" },
            { href: "/docs/learning-loop", label: "Learning loop" },
            { href: "/docs", label: "All docs" },
        ],
    },
    {
        title: "Open source",
        links: [
            { href: GITHUB_URL, label: "GitHub", external: true },
            { href: GITHUB_RELEASES_URL, label: "Releases", external: true },
            { href: LICENSE_URL, label: "MIT license", external: true },
            { href: "/what-is-an-ai-harness", label: "What is an AI harness?" },
        ],
    },
] as const;

export function Footer() {
    return (
        <footer className="mt-24 border-t border-[var(--hairline)] bg-[var(--bg-raised)]">
            <div className="mx-auto max-w-[1120px] px-6 py-16">
                <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <FrownyLogo size={28} />
                            <span className="text-[17px] font-semibold tracking-tight text-[var(--text-1)]">
                                G-Rump
                            </span>
                        </div>
                        <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-[var(--text-2)]">
                            The open-source AI harness for macOS. Free, MIT-licensed,
                            bring your own key.
                        </p>
                    </div>
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-3)]">
                                {col.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        {"external" in link && link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 flex flex-col gap-4 border-t border-[var(--hairline-soft)] pt-8 text-sm text-[var(--text-3)] sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; 2026 James Walton. MIT licensed. Built by{" "}
                        <a
                            href="https://waltbuilds.com"
                            target="_blank"
                            rel="noopener"
                            className="transition-colors duration-150 hover:text-[var(--text-1)]"
                        >
                            Walt Builds
                        </a>
                        .
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="transition-colors duration-150 hover:text-[var(--text-1)]">
                            Privacy
                        </Link>
                        <Link href="/terms" className="transition-colors duration-150 hover:text-[var(--text-1)]">
                            Terms
                        </Link>
                        <Link href="/about" className="transition-colors duration-150 hover:text-[var(--text-1)]">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
