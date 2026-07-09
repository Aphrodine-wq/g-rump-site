"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const footerSections = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Agent Modes", href: "/features#agent-modes" },
            { label: "Skills", href: "/features#skills" },
            { label: "MCP Servers", href: "/features#mcp" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Blog", href: "/blog" },
            { label: "Quick Start", href: "/docs/quick-start" },
            { label: "Changelog", href: "/changelog" },
            { label: "Releases", href: "/releases" },
            { label: "GitHub", href: "https://github.com/Aphrodine-wq/G-Rump_MAC_OS", external: true },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Careers", href: "/about#careers" },
            { label: "Security", href: "/security" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "License", href: "https://github.com/Aphrodine-wq/G-Rump_MAC_OS/blob/main/LICENSE", external: true },
            { label: "Security", href: "/security" },
        ],
    },
];

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/Aphrodine-wq/G-Rump_MAC_OS",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: "Twitter",
        href: "https://twitter.com/grumpdev",
        icon: (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export function Footer() {
    const [yearHover, setYearHover] = useState(false);

    return (
        <footer className="relative border-t border-black/[0.06]">
            {/* Animated gradient border */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-blue/40 to-transparent animate-gradient-x" />
            </div>

            <div className="mx-auto max-w-[1200px] px-5">
                {/* Main footer grid */}
                <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-6">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Logo />
                        <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-secondary">
                            Native macOS AI coding agent. 100+ tools, multi-provider AI,
                            and deep system integration. Built with Swift and SwiftUI.
                        </p>
                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-black/[0.02] text-secondary transition-all hover:bg-black/[0.04] hover:text-primary hover:border-black/[0.08]"
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tertiary">
                                {section.title}
                            </p>
                            <div className="space-y-2.5">
                                {section.links.map((link) =>
                                    link.external ? (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[13px] text-secondary transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                            <svg className="h-3 w-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="block text-[13px] text-secondary transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Built with Swift badge + status */}
                <div className="flex flex-wrap items-center justify-center gap-4 border-t border-black/[0.04] pt-8 pb-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
                        <svg className="h-3.5 w-3.5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.985 13.891c-.06-.252-.152-.503-.3-.726-.527-.803-1.393-1.16-2.225-.767l.001-.001c-.12.058-.24.127-.354.209a4.793 4.793 0 01-.671.39c.025-.167.04-.339.04-.516 0-.76-.222-1.467-.604-2.063a4.197 4.197 0 00-.745-.848 8.475 8.475 0 00-.678-.536c-.08-.055-.168-.102-.25-.154a4.63 4.63 0 00-.676-.357c-.256-.109-.52-.199-.793-.268a6.1 6.1 0 00-.814-.162 7.685 7.685 0 00-.79-.065 10.06 10.06 0 00-1.3.03c-.454.043-.893.12-1.308.228a7.073 7.073 0 00-1.188.431 5.885 5.885 0 00-1.033.605 5.156 5.156 0 00-.848.746 4.197 4.197 0 00-.632.877 3.835 3.835 0 00-.389 1.022 3.902 3.902 0 00-.096.967c.008.282.047.558.113.824a3.6 3.6 0 00.286.743c-.343-.073-.7-.11-1.067-.11-.735 0-1.425.166-2.044.462a4.373 4.373 0 00-1.552 1.267 4.22 4.22 0 00-.736 1.563 4.158 4.158 0 00-.072 1.726c.073.448.21.878.406 1.279.34.696.836 1.295 1.444 1.753.608.458 1.33.774 2.108.914.39.07.785.105 1.182.105h10.442c.397 0 .792-.036 1.182-.105a4.96 4.96 0 002.108-.914 4.41 4.41 0 001.444-1.753c.196-.401.333-.831.406-1.279a4.158 4.158 0 00-.072-1.726z" />
                        </svg>
                        <span className="text-[11px] font-medium text-orange-600">Built with Swift &amp; SwiftUI</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.02] px-4 py-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        <span className="text-[11px] font-medium text-tertiary">All systems operational</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.02] px-4 py-1.5">
                        <span className="text-[11px] font-medium text-tertiary">v2.0.4</span>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[0.04] py-6 sm:flex-row">
                    <p className="relative text-xs text-tertiary">
                        &copy;{" "}
                        <span
                            className="cursor-default relative"
                            onMouseEnter={() => setYearHover(true)}
                            onMouseLeave={() => setYearHover(false)}
                        >
                            {new Date().getFullYear()}
                            {yearHover && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/[0.06] bg-white px-3 py-1 text-[10px] text-secondary shadow-lg">
                                    Time flies when you&apos;re shipping code
                                </span>
                            )}
                        </span>{" "}
                        G-Rump. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-tertiary transition-colors hover:text-secondary">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-xs text-tertiary transition-colors hover:text-secondary">
                            Terms
                        </Link>
                        <Link href="/privacy#cookies" className="text-xs text-tertiary transition-colors hover:text-secondary">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
