"use client";

import { FadeIn } from "@/ui/motion";
import { Marquee } from "@/components/Marquee";

export function LogoCloudSection() {
    return (
        <section className="border-y border-black/[0.06] bg-bg-alt px-5 py-12 overflow-hidden">
            <FadeIn>
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-tertiary mb-8">
                    Integrates with leading AI providers
                </p>
            </FadeIn>
            <Marquee />
        </section>
    );
}
