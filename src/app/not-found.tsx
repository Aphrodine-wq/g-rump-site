"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
            {/* Glowing orb */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                {/* 404 Number */}
                <motion.h1
                    className="text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tighter bg-gradient-to-b from-black/80 to-black/10 bg-clip-text text-transparent select-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="mt-4 text-xl font-semibold text-primary">
                        Page not found
                    </p>
                    <p className="mt-3 max-w-md text-sm text-secondary leading-relaxed">
                        Looks like this page went on a coffee break. It might have been moved, deleted, or maybe it never existed.
                        Even our AI agent couldn&apos;t find it.
                    </p>
                </motion.div>

                {/* Terminal-style error */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 mx-auto max-w-sm rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 text-left font-[family-name:var(--font-mono)]"
                >
                    <div className="flex items-center gap-1.5 mb-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <p className="text-xs text-tertiary">
                        <span className="text-blue">$</span> grump find --page <span className="text-red-400">&quot;{typeof window !== "undefined" ? window.location.pathname : "/unknown"}&quot;</span>
                    </p>
                    <p className="text-xs text-red-400 mt-1">
                        Error: Page not found in any known dimension
                    </p>
                    <p className="text-xs text-tertiary mt-1">
                        <span className="text-green-400">Suggestion:</span> Try one of the links below
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 flex flex-wrap justify-center gap-3"
                >
                    <Link
                        href="/"
                        className="rounded-full bg-blue-500 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-full border border-black/[0.08] bg-black/[0.02] px-8 py-3 text-sm font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.12]"
                    >
                        Read the Docs
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-xs text-tertiary"
                >
                    Hint: Try typing <kbd className="rounded border border-black/[0.08] bg-black/[0.04] px-1.5 py-0.5 font-mono text-[10px]">/matrix</kbd> in the URL
                </motion.p>
            </motion.div>
        </div>
    );
}
