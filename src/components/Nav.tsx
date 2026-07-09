"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Docs", href: "/docs" },
];

export function Nav() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const [showSecret, setShowSecret] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const logoTimer = useRef<NodeJS.Timeout | null>(null);
    const accountRef = useRef<HTMLDivElement>(null);
    const { user, isLoading, logout } = useAuth();

    const handleLogoClick = useCallback(() => {
        setLogoClicks((prev) => {
            const next = prev + 1;
            if (next >= 7) {
                setShowSecret(true);
                setTimeout(() => setShowSecret(false), 4000);
                return 0;
            }
            if (logoTimer.current) clearTimeout(logoTimer.current);
            logoTimer.current = setTimeout(() => setLogoClicks(0), 2000);
            return next;
        });
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setAccountOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    scrolled
                        ? "border-b border-black/[0.06] bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                        : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
                    <div className="flex items-center gap-10">
                        <div onClick={handleLogoClick} className="cursor-pointer" role="button" aria-label="G-Rump home" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleLogoClick(); }}>
                            <Logo />
                        </div>

                        <div className="hidden gap-8 md:flex">
                            {navLinks.map((l) => {
                                const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
                                return (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        className={`relative text-[13px] font-medium transition-colors ${
                                            isActive ? "text-primary" : "text-secondary hover:text-primary"
                                        }`}
                                    >
                                        {l.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-blue"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Cmd+K trigger */}
                        <button
                            onClick={() => {
                                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
                            }}
                            className="hidden items-center gap-2 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-xs text-tertiary transition-all hover:bg-black/[0.04] hover:text-secondary sm:flex"
                            aria-label="Search (Cmd+K)"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <kbd className="font-[family-name:var(--font-mono)] text-[10px]">&#8984;K</kbd>
                        </button>

                        <Link
                            href="/contact"
                            className="hidden text-[13px] font-medium text-secondary transition-colors hover:text-primary sm:block"
                        >
                            Contact
                        </Link>

                        {isLoading ? (
                            <div className="hidden sm:block h-8 w-8 rounded-full bg-black/[0.06] animate-pulse" />
                        ) : user ? (
                            <div ref={accountRef} className="relative hidden sm:block">
                                <button
                                    onClick={() => setAccountOpen(!accountOpen)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue transition-all hover:bg-blue-500/30"
                                    aria-label="Account menu"
                                >
                                    {user.avatarUrl ? (
                                        <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                                    ) : (
                                        (user.displayName || user.email)[0].toUpperCase()
                                    )}
                                </button>
                                <AnimatePresence>
                                    {accountOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-52 rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-2xl z-50"
                                        >
                                            <div className="px-3 py-2 border-b border-black/[0.06] mb-1">
                                                <p className="text-xs font-medium text-primary truncate">{user.displayName || user.email}</p>
                                                <p className="text-[10px] text-tertiary truncate">{user.email}</p>
                                                <p className="mt-1 text-[10px] text-blue font-medium capitalize">{user.tier} &middot; {user.creditsBalance.toLocaleString()} credits</p>
                                            </div>
                                            <Link href="/account" className="block rounded-lg px-3 py-2 text-xs text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary">
                                                Account
                                            </Link>
                                            <Link href="/pricing" className="block rounded-lg px-3 py-2 text-xs text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary">
                                                Upgrade Plan
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setAccountOpen(false); }}
                                                className="w-full text-left rounded-lg px-3 py-2 text-xs text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden text-[13px] font-medium text-secondary transition-colors hover:text-primary sm:block"
                            >
                                Sign In
                            </Link>
                        )}

                        <Link
                            href="/docs/quick-start"
                            className="rounded-full bg-blue-500 px-5 py-2 text-xs font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)]"
                        >
                            Get Started
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary md:hidden"
                            aria-label="Toggle menu"
                        >
                            <div className="flex w-4 flex-col gap-[5px]">
                                <motion.span
                                    animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                    className="block h-[1.5px] w-full rounded-full bg-current"
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                                    className="block h-[1.5px] w-full rounded-full bg-current"
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                    className="block h-[1.5px] w-full rounded-full bg-current"
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 z-40 w-[280px] border-l border-black/[0.06] bg-white px-6 pt-24 md:hidden"
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((l, i) => {
                                    const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
                                    return (
                                        <motion.div
                                            key={l.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * i }}
                                        >
                                            <Link
                                                href={l.href}
                                                className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-all ${
                                                    isActive
                                                        ? "bg-black/[0.04] text-primary"
                                                        : "text-secondary hover:bg-black/[0.02] hover:text-primary"
                                                }`}
                                            >
                                                {l.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * navLinks.length }}
                                >
                                    <Link
                                        href="/contact"
                                        className="block rounded-xl px-4 py-3 text-[15px] font-medium text-secondary transition-all hover:bg-black/[0.02] hover:text-primary"
                                    >
                                        Contact
                                    </Link>
                                </motion.div>

                                <div className="mt-6 border-t border-black/[0.06] pt-6 space-y-2">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2 mb-2">
                                                <p className="text-xs font-medium text-primary">{user.displayName || user.email}</p>
                                                <p className="text-[10px] text-blue capitalize">{user.tier} &middot; {user.creditsBalance.toLocaleString()} credits</p>
                                            </div>
                                            <Link
                                                href="/account"
                                                className="block rounded-xl px-4 py-3 text-[15px] font-medium text-secondary hover:bg-black/[0.02] hover:text-primary"
                                            >
                                                Account
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setMobileOpen(false); }}
                                                className="block w-full text-left rounded-xl px-4 py-3 text-[15px] font-medium text-secondary hover:bg-black/[0.02] hover:text-primary"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="block w-full rounded-xl border border-black/[0.08] bg-black/[0.02] py-3 text-center text-sm font-medium text-primary transition-all hover:bg-black/[0.04]"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/docs/quick-start"
                                                className="block w-full rounded-xl bg-blue-500 py-3 text-center text-sm font-medium text-white transition-all hover:bg-blue-400"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {/* Logo click secret */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] rounded-xl border border-purple/20 bg-white/95 backdrop-blur-xl px-6 py-4 shadow-2xl text-center"
                    >
                        <p className="text-sm font-semibold text-primary">&#127881; You found a secret!</p>
                        <p className="mt-1 text-xs text-secondary">You clicked the logo 7 times. You&apos;re persistent — we like that.</p>
                        <p className="mt-2 text-[10px] text-tertiary">Easter egg 2 of 5 discovered</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
