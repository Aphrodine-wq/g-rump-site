"use client";

import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const rows = [
    { feature: "Native macOS App", grump: true, cursor: false, copilot: false, windsurf: false },
    { feature: "Built-in Tools", grump: "100+", cursor: "~20", copilot: "~10", windsurf: "~30" },
    { feature: "Agent Modes", grump: "7", cursor: "2", copilot: "1", windsurf: "2" },
    { feature: "Autonomous Steps", grump: "150", cursor: "25", copilot: "—", windsurf: "50" },
    { feature: "MCP Server Support", grump: "58 built-in", cursor: "Manual", copilot: "—", windsurf: "Manual" },
    { feature: "Local / Offline Models", grump: true, cursor: false, copilot: false, windsurf: false },
    { feature: "Keychain Credential Storage", grump: true, cursor: false, copilot: false, windsurf: false },
    { feature: "Custom Skills System", grump: "40+ built-in", cursor: "—", copilot: "—", windsurf: "—" },
    { feature: "IDE Panels", grump: "17", cursor: "—", copilot: "—", windsurf: "—" },
    { feature: "Bring Your Own Keys", grump: true, cursor: false, copilot: false, windsurf: true },
    { feature: "Open Source", grump: true, cursor: false, copilot: false, windsurf: false },
];

function renderCell(val: boolean | string) {
    if (val === true) return <span className="text-green-400">[ok]</span>;
    if (val === false || val === "—") return <span className="text-tertiary">—</span>;
    return <span className="text-primary font-medium">{val}</span>;
}

export function ComparisonSection() {
    return (
        <section className="px-5 py-28">
            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Compare"
                        heading="G-Rump vs. the rest."
                        description="See how G-Rump stacks up against the most popular AI coding tools."
                    />
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="mt-14 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-black/[0.06]">
                                    <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-tertiary min-w-[180px]">Feature</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-blue text-center">G-Rump</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Cursor</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Copilot</th>
                                    <th className="pl-4 py-3 text-xs font-semibold uppercase tracking-widest text-tertiary text-center">Windsurf</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.feature} className="border-b border-black/[0.02]">
                                        <td className="py-3.5 pr-4 text-sm text-primary">{row.feature}</td>
                                        <td className="px-4 py-3.5 text-sm text-center">{renderCell(row.grump)}</td>
                                        <td className="px-4 py-3.5 text-sm text-center">{renderCell(row.cursor)}</td>
                                        <td className="px-4 py-3.5 text-sm text-center">{renderCell(row.copilot)}</td>
                                        <td className="pl-4 py-3.5 text-sm text-center">{renderCell(row.windsurf)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
