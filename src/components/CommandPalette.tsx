"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
    id: string;
    label: string;
    description: string;
    href: string;
    icon: string;
    section: string;
}

const commands: Command[] = [
    { id: "home", label: "Home", description: "Go to homepage", href: "/", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", section: "Navigation" },
    { id: "features", label: "Features", description: "100+ tools, agent modes, and more", href: "/features", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", section: "Navigation" },
    { id: "pricing", label: "Pricing", description: "Free, Pro, and Enterprise plans", href: "/pricing", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", section: "Navigation" },
    { id: "blog", label: "Blog", description: "News, updates, and tutorials", href: "/blog", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z", section: "Navigation" },
    { id: "docs", label: "Documentation", description: "Getting started, guides, and reference", href: "/docs", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", section: "Navigation" },
    { id: "changelog", label: "Changelog", description: "What's new in G-Rump", href: "/changelog", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992", section: "Navigation" },
    { id: "about", label: "About", description: "Our mission and team", href: "/about", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", section: "Navigation" },
    { id: "security", label: "Security", description: "How we protect your data", href: "/security", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", section: "Navigation" },
    { id: "contact", label: "Contact", description: "Get in touch with us", href: "/contact", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", section: "Navigation" },
    { id: "quick-start", label: "Quick Start", description: "Get running in under a minute", href: "/docs/quick-start", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z", section: "Docs" },
    { id: "tools", label: "100+ Tools", description: "File, shell, git, docker, and more", href: "/docs/tools", icon: "M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1h15.01", section: "Docs" },
    { id: "agent-modes", label: "Agent Modes", description: "Chat, Plan, Build, Debate, Spec, Parallel, Explore", href: "/docs/agent-modes", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", section: "Docs" },
    { id: "mcp-servers", label: "MCP Servers", description: "58 pre-configured servers", href: "/docs/mcp", icon: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z", section: "Docs" },
    { id: "github", label: "GitHub", description: "View source code", href: "https://github.com/Aphrodine-wq/G-Rump_MAC_OS", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5", section: "External" },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const filtered = query
        ? commands.filter(
            (c) =>
                c.label.toLowerCase().includes(query.toLowerCase()) ||
                c.description.toLowerCase().includes(query.toLowerCase())
        )
        : commands;

    const sections = Array.from(new Set(filtered.map((c) => c.section)));

    const handleOpen = useCallback(() => {
        setOpen(true);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setQuery("");
    }, []);

    const handleSelect = useCallback(
        (cmd: Command) => {
            handleClose();
            if (cmd.href.startsWith("http")) {
                window.open(cmd.href, "_blank");
            } else {
                router.push(cmd.href);
            }
        },
        [handleClose, router]
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
                if (!open) {
                    setQuery("");
                    setSelectedIndex(0);
                }
            }
            if (e.key === "Escape" && open) {
                handleClose();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, handleClose]);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleKeyNav = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
            e.preventDefault();
            handleSelect(filtered[selectedIndex]);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed left-1/2 top-[20%] z-[101] w-[90vw] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/95 shadow-2xl backdrop-blur-2xl"
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-4">
                            <svg className="h-5 w-5 shrink-0 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyNav}
                                placeholder="Search commands..."
                                className="flex-1 bg-transparent text-[15px] text-primary outline-none placeholder:text-tertiary"
                            />
                            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-black/[0.06] bg-black/[0.03] px-2 py-0.5 text-[10px] font-medium text-tertiary">
                                ESC
                            </kbd>
                        </div>

                        {/* Results */}
                        <div className="max-h-[400px] overflow-y-auto p-2">
                            {filtered.length === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-tertiary">
                                    No results found for &ldquo;{query}&rdquo;
                                </div>
                            )}
                            {sections.map((section) => (
                                <div key={section}>
                                    <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">
                                        {section}
                                    </p>
                                    {filtered
                                        .filter((c) => c.section === section)
                                        .map((cmd) => {
                                            const globalIdx = filtered.indexOf(cmd);
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    onClick={() => handleSelect(cmd)}
                                                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${globalIdx === selectedIndex
                                                            ? "bg-black/[0.04] text-primary"
                                                            : "text-secondary hover:bg-black/[0.02]"
                                                        }`}
                                                >
                                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${globalIdx === selectedIndex ? "border-blue/30 bg-blue/10" : "border-black/[0.06] bg-black/[0.02]"}`}>
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d={cmd.icon} />
                                                        </svg>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium truncate">{cmd.label}</p>
                                                        <p className="text-xs text-tertiary truncate">{cmd.description}</p>
                                                    </div>
                                                    {globalIdx === selectedIndex && (
                                                        <kbd className="hidden sm:inline-flex shrink-0 rounded-md border border-black/[0.06] bg-black/[0.03] px-1.5 py-0.5 text-[10px] text-tertiary">
                                                            &crarr;
                                                        </kbd>
                                                    )}
                                                </button>
                                            );
                                        })}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-2.5">
                            <div className="flex items-center gap-3 text-[10px] text-tertiary">
                                <span className="flex items-center gap-1">
                                    <kbd className="rounded border border-black/[0.06] bg-black/[0.03] px-1 py-0.5">↑↓</kbd>
                                    navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="rounded border border-black/[0.06] bg-black/[0.03] px-1 py-0.5">&crarr;</kbd>
                                    select
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="rounded border border-black/[0.06] bg-black/[0.03] px-1 py-0.5">esc</kbd>
                                    close
                                </span>
                            </div>
                            <span className="text-[10px] text-tertiary">G-Rump</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
