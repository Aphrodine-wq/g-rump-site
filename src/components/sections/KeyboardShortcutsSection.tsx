"use client";

import {
    FadeIn,
    Stagger,
    StaggerItem,
} from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const shortcuts = [
    { keys: ["⌘", "K"], action: "Open Command Palette", desc: "Quick navigation and search" },
    { keys: ["⌘", "B"], action: "Toggle Build Mode", desc: "Switch to autonomous coding" },
    { keys: ["⌘", "D"], action: "Toggle Debate Mode", desc: "Multi-perspective review" },
    { keys: ["⌘", "⇧", "P"], action: "Switch Provider", desc: "Swap AI provider mid-conversation" },
    { keys: ["⌘", "⇧", "T"], action: "Open Tool Palette", desc: "Browse and run 100+ tools" },
    { keys: ["⌘", "J"], action: "Quick Panel Toggle", desc: "Show/hide IDE panels" },
    { keys: ["⌘", "."], action: "Interrupt Agent", desc: "Stop current agent execution" },
    { keys: ["⌘", "⇧", "S"], action: "Skill Browser", desc: "Browse 40+ expert skills" },
];

export function KeyboardShortcutsSection() {
    return (
        <section className="relative bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Keyboard First"
                        heading="Built for speed."
                        description="Every action in G-Rump is a keystroke away. No mouse required."
                    />
                </FadeIn>

                <Stagger className="mt-14 grid gap-3 sm:grid-cols-2" staggerDelay={0.04}>
                    {shortcuts.map((s) => (
                        <StaggerItem key={s.action}>
                            <div className="group flex items-center gap-4 rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 transition-all hover:bg-black/[0.03] hover:border-black/[0.06]">
                                <div className="flex shrink-0 items-center gap-1">
                                    {s.keys.map((key, i) => (
                                        <span key={i}>
                                            <kbd className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-black/[0.06] bg-black/[0.03] px-2 font-[family-name:var(--font-mono)] text-[11px] font-medium text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                                                {key}
                                            </kbd>
                                            {i < s.keys.length - 1 && (
                                                <span className="mx-0.5 text-[10px] text-tertiary">+</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-primary truncate">{s.action}</p>
                                    <p className="text-xs text-tertiary truncate">{s.desc}</p>
                                </div>
                                <svg className="h-4 w-4 shrink-0 text-tertiary opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>

                <FadeIn delay={0.4} className="mt-8 text-center">
                    <p className="text-xs text-tertiary">
                        Press <kbd className="mx-1 inline-flex items-center rounded border border-black/[0.06] bg-black/[0.02] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px]">⌘ K</kbd> right now to try the command palette on this site.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
