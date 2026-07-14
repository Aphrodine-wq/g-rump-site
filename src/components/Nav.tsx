"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Wordmark } from "./Wordmark";
import { GITHUB_URL } from "@/lib/facts";
import github from "@/data/github.json";

const LINKS = [
    { href: "/features", label: "Features" },
    { href: "/docs", label: "Docs" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/download", label: "Download" },
    { href: "/changelog", label: "Changelog" },
];

export function Nav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-0 top-4 z-50 px-4">
            <nav className="glass mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-2xl px-5">
                <Wordmark />
                <div className="hidden items-center gap-1 md:flex">
                    {LINKS.map((link) => {
                        const active =
                            pathname === link.href || pathname.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-150 ${
                                    active
                                        ? "text-[var(--text-1)] font-medium"
                                        : "text-[var(--text-2)] hover:text-[var(--text-1)]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
                <div className="hidden items-center gap-3 md:flex">
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
                        onClick={() => track("github_click", { placement: "nav" })}
                    >
                        <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
                            <path
                                d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinejoin="round"
                            />
                        </svg>
                        GitHub
                        {github.stars > 0 && (
                            <span className="font-mono text-xs text-[var(--text-3)]">
                                {github.stars >= 1000
                                    ? `${(github.stars / 1000).toFixed(1)}k`
                                    : github.stars}
                            </span>
                        )}
                    </a>
                    <Link href="/download" className="btn-primary text-sm">
                        Download
                    </Link>
                </div>
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
                    aria-expanded={open}
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen((v) => !v)}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        {open ? (
                            <path
                                d="M 3 3 L 15 15 M 15 3 L 3 15"
                                stroke="var(--text-1)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        ) : (
                            <path
                                d="M 2 5 H 16 M 2 9 H 16 M 2 13 H 16"
                                stroke="var(--text-1)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        )}
                    </svg>
                </button>
            </nav>
            {open && (
                <div className="glass mx-auto mt-2 max-w-[1120px] rounded-2xl p-3 md:hidden">
                    {LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block rounded-lg px-3 py-2.5 text-[15px] text-[var(--text-1)]"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg px-3 py-2.5 text-[15px] text-[var(--text-1)]"
                    >
                        GitHub
                    </a>
                </div>
            )}
        </header>
    );
}
