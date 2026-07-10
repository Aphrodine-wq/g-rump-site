import Image from "next/image";
import { FrownyLogo } from "./FrownyLogo";

/**
 * HTML/CSS recreation of the G-Rump app window, mid-task on its own repo —
 * "G-Rump building G-Rump". Every file, tool, and number shown is real.
 * Pass `screenshotSrc` to swap in a real capture without touching callers.
 */
export function AppWindowMock({ screenshotSrc }: { screenshotSrc?: string }) {
    if (screenshotSrc) {
        return (
            <Image
                src={screenshotSrc}
                alt="The G-Rump app on macOS — chat, agent modes, and the panel rail"
                width={1600}
                height={1000}
                priority
                className="rounded-2xl border border-[var(--hairline)] shadow-[var(--shadow-lg)]"
            />
        );
    }

    return (
        <div
            className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)] text-left shadow-[var(--shadow-lg)]"
            role="img"
            aria-label="The G-Rump app window: the agent working on its own repository — reading LessonStore.swift, editing it, and running the test suite"
        >
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-[var(--hairline-soft)] bg-white/60 px-4 py-2.5">
                <div className="traffic-lights" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <FrownyLogo size={16} />
                <span className="font-mono text-xs text-[var(--text-2)]">
                    G-Rump — ~/Projects/g-rump
                </span>
                <span className="ml-auto rounded-md border border-[var(--hairline)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-2)]">
                    Build
                </span>
            </div>

            <div className="grid grid-cols-[9rem_1fr] max-sm:grid-cols-1">
                {/* Navigator */}
                <div className="border-r border-[var(--hairline-soft)] px-3 py-3 font-mono text-[11px] leading-[1.9] text-[var(--text-2)] max-sm:hidden">
                    <p className="text-[var(--text-3)]">g-rump</p>
                    <p className="pl-2">Sources/GRump</p>
                    <p className="pl-4">Intelligence</p>
                    <p className="pl-6 text-[var(--accent)]">LessonStore.swift</p>
                    <p className="pl-6">OutcomeLedger.swift</p>
                    <p className="pl-6">ReflectionEngine.swift</p>
                    <p className="pl-4">Views</p>
                    <p className="pl-2">Tests/GRumpTests</p>
                    <p className="pl-2">docs</p>
                    <p className="pl-2">Makefile</p>
                </div>

                {/* Chat + tool timeline */}
                <div className="space-y-3 px-4 py-4">
                    <div className="ml-auto max-w-[85%] rounded-xl bg-[var(--bg-inset)] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[var(--text-1)]">
                        Add idle decay to LessonStore and prove it with a test.
                    </div>

                    <div className="max-w-[92%] space-y-2 text-[12px]">
                        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-2)]">
                            <FrownyLogo size={14} />
                            <span>working…</span>
                        </div>
                        {[
                            ["read_file", "Sources/GRump/Intelligence/Learning/LessonStore.swift"],
                            ["grep_search", '"confidence" — 14 matches'],
                            ["write_file", "LessonStore.swift · +18 −2"],
                            ["system_run", "swift test — 1,564 passed"],
                        ].map(([tool, detail]) => (
                            <div
                                key={tool}
                                className="flex items-baseline gap-2 rounded-lg border border-[var(--hairline-soft)] px-3 py-1.5 font-mono text-[11px]"
                            >
                                <span className="text-[var(--accent)]">{tool}</span>
                                <span className="truncate text-[var(--text-3)]">{detail}</span>
                                <span className="ml-auto text-[#28a745]">✓</span>
                            </div>
                        ))}
                        <div className="overflow-hidden rounded-lg border border-[var(--hairline-soft)] font-mono text-[11px] leading-[1.8]">
                            <p className="border-b border-[var(--hairline-soft)] bg-[var(--bg-inset)] px-3 py-1 text-[var(--text-3)]">
                                LessonStore.swift
                            </p>
                            <div className="px-3 py-1.5">
                                <p className="text-[#b31d28]">
                                    <span className="select-none">- </span>guard lesson.isActive else {"{"} continue {"}"}
                                </p>
                                <p className="text-[#22863a]">
                                    <span className="select-none">+ </span>let idle = now.timeIntervalSince(lesson.lastHitAt)
                                </p>
                                <p className="text-[#22863a]">
                                    <span className="select-none">+ </span>if idle &gt; Self.decayAfter {"{"} lesson.decay(0.05) {"}"}
                                </p>
                            </div>
                        </div>
                        <p className="font-mono text-[11px] text-[var(--text-2)]">
                            Decay in, tested. Lessons now earn their keep.{" "}
                            <span className="text-[var(--text-3)]">— recorded lesson #41</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-4 border-t border-[var(--hairline-soft)] bg-white/60 px-4 py-1.5 font-mono text-[10px] text-[var(--text-3)]">
                <span>main</span>
                <span>swift build ✓</span>
                <span className="max-sm:hidden">20 panels</span>
                <span className="ml-auto">claude-opus-4-8</span>
            </div>
        </div>
    );
}
