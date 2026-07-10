"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STEPS = [
    {
        label: "Act",
        component: "the agent loop",
        heading: "The agent does the work.",
        body: "A run is real work — reading files, editing code, running builds and tests through 153 tools. Every run leaves a trail: which tools ran, what failed, where the agent had to pivot.",
    },
    {
        label: "Observe",
        component: "OutcomeLedger",
        heading: "Every outcome is recorded.",
        body: "The outcome ledger persists each run's signals: tool stats, build failures, loop pivots, review criticals. Success is two-stage — if your next message is a correction, the run is re-scored. Being corrected is data.",
    },
    {
        label: "Distill",
        component: "ReflectionEngine",
        heading: "Outcomes become lessons.",
        body: "A reflection pass — cheap model first — turns raw outcomes into short, imperative lessons. It can add, reinforce, weaken, or revise them, and it tells you in chat when it does.",
    },
    {
        label: "Persist",
        component: "LessonStore",
        heading: "Lessons earn their keep.",
        body: "Lessons carry a confidence score that moves with wins and losses, decays when idle, and auto-retires when it stops being right. The top lessons ride along on your next prompt — attributed, so results flow back.",
    },
    {
        label: "Apply",
        component: "SkillProposals",
        heading: "Strong patterns become skills — with your approval.",
        body: "When lessons cluster, the agent proposes a skill: a diff you review in the Learning panel. Approve it and it becomes part of the harness. Reject it and it's never proposed again. Nothing is applied silently.",
    },
];

export function LearningLoopSection() {
    const [active, setActive] = useState(0);
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const i = refs.current.indexOf(entry.target as HTMLDivElement);
                        if (i !== -1) setActive(i);
                    }
                }
            },
            { rootMargin: "-40% 0px -50% 0px" },
        );
        for (const el of refs.current) if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="border-y border-[var(--hairline)] bg-[var(--bg-raised)]">
            <div className="mx-auto max-w-[1120px] px-6 py-24">
                <p className="eyebrow">Recursive self-learning</p>
                <h2 className="text-h2 mt-4 max-w-[22ch] text-[var(--text-1)]">
                    Most agents forget every session. This one doesn&rsquo;t.
                </h2>

                <div className="mt-16 grid gap-12 lg:grid-cols-2">
                    {/* Sticky diagram */}
                    <div className="max-lg:hidden">
                        <ol className="sticky top-32 space-y-1">
                            {STEPS.map((step, i) => (
                                <li key={step.label}>
                                    <div
                                        className={`flex items-baseline gap-4 rounded-xl border px-5 py-3.5 transition-colors duration-150 ${
                                            i === active
                                                ? "border-[var(--accent)] bg-white"
                                                : "border-transparent"
                                        }`}
                                    >
                                        <span
                                            className={`font-mono text-xs ${
                                                i === active
                                                    ? "text-[var(--accent)]"
                                                    : "text-[var(--text-3)]"
                                            }`}
                                        >
                                            0{i + 1}
                                        </span>
                                        <div>
                                            <span
                                                className={`block text-[15px] font-semibold ${
                                                    i === active
                                                        ? "text-[var(--text-1)]"
                                                        : "text-[var(--text-2)]"
                                                }`}
                                            >
                                                {step.label}
                                            </span>
                                            <span className="font-mono text-xs text-[var(--text-3)]">
                                                {step.component}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Scrolling panels */}
                    <div className="space-y-6 lg:space-y-40 lg:py-8">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.label}
                                ref={(el) => {
                                    refs.current[i] = el;
                                }}
                            >
                                <p className="eyebrow lg:hidden">
                                    0{i + 1} · {step.label} · {step.component}
                                </p>
                                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-1)] lg:mt-0">
                                    {step.heading}
                                </h3>
                                <p className="mt-3 max-w-[52ch] leading-relaxed text-[var(--text-2)]">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                        <p className="pt-2 lg:pt-0">
                            <Link href="/docs/learning-loop" className="font-mono text-sm text-[var(--accent)]">
                                Walk through the loop in the docs →
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
