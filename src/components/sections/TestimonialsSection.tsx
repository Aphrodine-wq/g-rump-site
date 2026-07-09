"use client";

import {
    FadeIn,
    Stagger,
    StaggerItem,
    HoverCard,
} from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const testimonials = [
    {
        quote: "The native macOS experience is leagues ahead of anything Electron-based. G-Rump launches instantly and feels like it belongs on my Mac.",
        name: "iOS Developer",
        role: "Senior Engineer",
        company: "SF Bay Area",
    },
    {
        quote: "Build mode is a game-changer. I set up a task before lunch and came back to a fully working feature with tests.",
        name: "Full-Stack Dev",
        role: "Lead Developer",
        company: "Startup",
    },
    {
        quote: "The Keychain integration alone was worth switching. No more .env files scattered across my projects.",
        name: "macOS Developer",
        role: "Staff Engineer",
        company: "Indie",
    },
    {
        quote: "58 pre-configured MCP servers out of the box. I connected to our Postgres, GitHub, and Slack in minutes. Nothing else comes close.",
        name: "Platform Engineer",
        role: "DevOps Lead",
        company: "Remote Team",
    },
    {
        quote: "Debate mode changed how I think about architecture. It challenged every assumption I had about our auth system. The result was bulletproof.",
        name: "Backend Dev",
        role: "Principal Engineer",
        company: "Enterprise",
    },
    {
        quote: "I run Ollama locally for privacy-sensitive client projects. Having local model support built in — not bolted on — is exactly what I needed.",
        name: "Freelance Dev",
        role: "Consultant",
        company: "Independent",
    },
];

const avatarColors = ["bg-blue-500", "bg-purple", "bg-green-500", "bg-amber-500", "bg-pink-500", "bg-cyan-500"];

export function TestimonialsSection() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Testimonials"
                        heading="Loved by developers."
                        description="macOS developers who&apos;ve made G-Rump their daily driver."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                    {testimonials.map((t, i) => {
                        const initials = t.name.split(" ").map((n) => n[0]).join("");
                        return (
                            <StaggerItem key={t.name}>
                                <HoverCard className="glass-card h-full rounded-2xl p-6 flex flex-col group">
                                    <div className="relative mb-4">
                                        <svg className="h-8 w-8 text-blue/20 transition-colors group-hover:text-blue/40" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm leading-relaxed text-secondary flex-1">{t.quote}</p>
                                    <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center gap-3">
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]} text-white text-xs font-bold`}>
                                            {initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-primary">{t.name}</p>
                                            <p className="text-xs text-tertiary mt-0.5">{t.role}, {t.company}</p>
                                        </div>
                                    </div>
                                </HoverCard>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
