"use client";

import { FadeIn } from "@/ui/motion";

export function NewsletterSection() {
    return (
        <section className="relative bg-bg-alt px-5 py-24 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-blue/[0.08] blur-[100px]" />

            <FadeIn className="relative mx-auto max-w-[560px] text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Stay in the loop</p>
                <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-tight">
                    Get notified about new features.
                </h2>
                <p className="mt-3 text-sm text-secondary">
                    No spam, ever. We send one email per release — usually monthly.
                </p>
                <form
                    action="#"
                    className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto"
                >
                    <input
                        type="email"
                        placeholder="you@company.com"
                        className="flex-1 rounded-full border border-black/[0.06] bg-black/[0.02] px-5 py-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0"
                    >
                        Subscribe
                    </button>
                </form>
                <p className="mt-4 text-xs text-tertiary">
                    Join developers building with G-Rump.
                </p>
            </FadeIn>
        </section>
    );
}
