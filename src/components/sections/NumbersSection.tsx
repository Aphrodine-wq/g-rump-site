"use client";

import {
    Stagger,
    StaggerItem,
    Counter,
} from "@/ui/motion";

const stats = [
    { value: 100, suffix: "+", label: "Built-in Tools" },
    { value: 17, suffix: "", label: "IDE Panels" },
    { value: 40, suffix: "+", label: "Expert Skills" },
    { value: 58, suffix: "", label: "MCP Servers" },
    { value: 7, suffix: "", label: "Agent Modes" },
];

export function NumbersSection() {
    return (
        <section className="relative px-5 py-20">
            <Stagger className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-16 gap-y-10">
                {stats.map((s) => (
                    <StaggerItem key={s.label} className="text-center">
                        <p className="text-5xl font-bold tracking-tight text-primary">
                            <Counter value={s.value} suffix={s.suffix} />
                        </p>
                        <p className="mt-1.5 text-xs tracking-wide text-tertiary">{s.label}</p>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
