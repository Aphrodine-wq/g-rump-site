"use client";

import Link from "next/link";
import { FadeIn } from "@/ui/motion";

export function CTASection() {
    return (
        <section className="relative overflow-hidden px-5 py-32">
            <div className="pointer-events-none absolute inset-0 bg-grid" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-blue/[0.08] blur-[100px]" />

            <FadeIn className="relative mx-auto max-w-[600px] text-center">
                <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight">
                    Start building
                    <br />
                    with{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple bg-clip-text text-transparent">
                        G-Rump
                    </span>
                    .
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-secondary">
                    Free to download. Native to macOS. Requires macOS 14+ and Swift 5.9+.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/docs/quick-start"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                        Download for Mac
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                    >
                        Read the Docs
                    </Link>
                </div>
            </FadeIn>
        </section>
    );
}
