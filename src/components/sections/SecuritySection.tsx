import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FACTS } from "@/lib/facts";

const GATES = [
    {
        name: "Exec approvals",
        body: "Four levels per binary — Deny (default), Ask, Allowlist, Allow — with Strict, Balanced, and Permissive presets.",
    },
    {
        name: "The Conscience gate",
        body: "A deterministic, fail-closed check before any mutating tool. It refuses destructive shell patterns, pushes to protected branches, and writes to secret paths.",
    },
    {
        name: "Protected writes",
        body: "Changes to SOUL.md, MIND.md, or skills require explicit approval — even in normal runs. The agent cannot rewrite its own identity quietly.",
    },
    {
        name: "The daemon is off by default",
        body: "When you opt in, it works one goal at a time on a scratch branch, behind the same gates, and never pushes.",
    },
    {
        name: "The MCP host refuses run_command",
        body: `Port ${FACTS.mcpServerPort} exposes G-Rump's tools to other clients — but never your shell.`,
    },
    {
        name: "Keychain-only keys",
        body: "API keys live in the macOS Keychain and requests go straight to your provider. No accounts, no telemetry middleman, no backend.",
    },
];

export function SecuritySection() {
    return (
        <section className="border-y border-[var(--hairline)] bg-[var(--bg-raised)]">
            <div className="mx-auto max-w-[1120px] px-6 py-24">
                <Reveal>
                    <p className="eyebrow">Security model</p>
                    <h2 className="text-h2 mt-4 max-w-[26ch] text-[var(--text-1)]">
                        This app runs LLM-directed shell commands. Here is what stands in
                        the way.
                    </h2>
                </Reveal>
                <ol className="mt-14 max-w-[720px]">
                    {GATES.map((gate, i) => (
                        <li
                            key={gate.name}
                            className="border-t border-[var(--hairline)] last:border-b"
                        >
                            <Reveal className="flex gap-6 py-6">
                                <span className="font-mono text-sm text-[var(--text-3)]">
                                    0{i + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold tracking-tight text-[var(--text-1)]">
                                        {gate.name}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-2)]">
                                        {gate.body}
                                    </p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
                <p className="mt-10 text-sm text-[var(--text-2)]">
                    The full model, including what&rsquo;s in scope for reports, lives in{" "}
                    <Link href="/docs/security" className="text-[var(--accent)]">
                        the security docs
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
