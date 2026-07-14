import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { FACTS } from "@/lib/facts";

type Card = {
    stat: string;
    title: string;
    body: string;
    href: string;
    large?: boolean;
};

const CARDS: Card[] = [
    {
        stat: `${FACTS.agentLoopMaxTurns}-step loop`,
        title: "The agent loop",
        body: "Multi-turn streaming tool use with parallel execution and retries with backoff. 200 steps by default, configurable from 5 to 1,000 — enough rope to take on real work, gated so it can't hang itself.",
        href: "/docs/architecture",
        large: true,
    },
    {
        stat: "act → apply",
        title: "Built to learn from its runs — experimental",
        body: "Every run feeds an outcome ledger. A reflection pass distills lessons that ride along on future prompts, and strong lesson clusters become skill proposals — diffs you approve, never silent edits. New in 2.1; treat it as a lab, not a guarantee.",
        href: "/docs/learning-loop",
        large: true,
    },
    {
        stat: `${FACTS.tools} tools`,
        title: "Native tools",
        body: "Files, shell, git, HTTP, SQLite, OCR, Apple-native — all local.",
        href: "/docs/tools",
    },
    {
        stat: `${FACTS.agentModes} modes`,
        title: "Plan · Build · Spec",
        body: "Each mode swaps the system strategy, not just the prompt.",
        href: "/docs/agent-modes",
    },
    {
        stat: `${FACTS.providers} providers`,
        title: "Your keys, direct",
        body: "Anthropic default, OpenAI, Google, OpenRouter — or local Ollama, no key. Keychain only.",
        href: "/docs/providers",
    },
    {
        stat: `:${FACTS.mcpServerPort}`,
        title: "MCP, both directions",
        body: `Client and server — ${FACTS.mcpPresets} one-click presets, and G-Rump serves its own tools too.`,
        href: "/docs/mcp",
    },
];

export function AnatomySection() {
    return (
        <section className="mx-auto max-w-[1120px] px-6 py-24">
            <Reveal>
                <p className="eyebrow">Anatomy of a harness</p>
                <h2 className="text-h2 mt-4 max-w-[24ch] text-[var(--text-1)]">
                    A harness is everything between the model and your machine.
                </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CARDS.map((card, i) => (
                    <Reveal
                        key={card.title}
                        delay={Math.min(i * 30, 90)}
                        className={card.large ? "sm:col-span-2" : ""}
                    >
                        <Link href={card.href} className="group block h-full">
                            <GlassCard className="flex h-full flex-col transition-transform duration-150 group-hover:-translate-y-0.5">
                                <span className="font-mono text-sm text-[var(--accent)]">
                                    {card.stat}
                                </span>
                                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-1)]">
                                    {card.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-2)]">
                                    {card.body}
                                </p>
                                <span className="mt-4 font-mono text-xs text-[var(--text-3)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                                    Read the docs →
                                </span>
                            </GlassCard>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
