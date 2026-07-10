import { Reveal } from "@/components/Reveal";
import { FACTS } from "@/lib/facts";

const ITEMS = [
    {
        stat: "0",
        unit: "Electron",
        body: "Real SwiftUI. Real Keychain. 13 MB on disk.",
        offset: "",
    },
    {
        stat: String(FACTS.panels),
        unit: "dock panels",
        body: "Build console, git, terminal, simulator, tests, logs, profiling — plus a ⌘0 navigator.",
        offset: "lg:translate-y-2",
    },
    {
        stat: "⌘R",
        unit: "build & run",
        body: "xcodebuild or SPM, straight to a booted simulator with live app logs.",
        offset: "lg:translate-y-1",
    },
    {
        stat: "LSP",
        unit: "live diagnostics",
        body: "SourceKit-LSP feeds real symbols and errors into the agent's context.",
        offset: "lg:translate-y-2",
    },
    {
        stat: "⌃Space",
        unit: "quick chat",
        body: "Double-tap from any app. Spotlight, OCR, and Calendar are tools too.",
        offset: "lg:translate-y-1",
    },
];

export function NativeSection() {
    return (
        <section className="mx-auto max-w-[1120px] px-6 py-24">
            <Reveal>
                <p className="eyebrow">Native macOS</p>
                <h2 className="text-h2 mt-4 max-w-[24ch] text-[var(--text-1)]">
                    A first-class Mac citizen, not a process in a terminal.
                </h2>
            </Reveal>
            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
                {ITEMS.map((item, i) => (
                    <Reveal key={item.unit} delay={Math.min(i * 30, 120)} className={item.offset}>
                        <div className="border-t border-[var(--hairline)] pt-4">
                            <p className="font-mono text-2xl text-[var(--text-1)]">{item.stat}</p>
                            <p className="eyebrow mt-1">{item.unit}</p>
                            <p className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">
                                {item.body}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
