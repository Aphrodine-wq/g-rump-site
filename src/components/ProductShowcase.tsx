"use client";

import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs } from "@/components/Tabs";

const showcaseTabs = [
    { label: "Agent Chat", value: "chat" },
    { label: "Build Mode", value: "build" },
    { label: "IDE Panels", value: "panels" },
    { label: "MCP Tools", value: "mcp" },
];

export function ProductShowcase() {
    return (
        <section className="relative px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-blue/[0.06] blur-[140px]" />

            <div className="relative mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Product"
                        heading="See it in action."
                        description="A native macOS experience you have to see to believe. Every pixel purpose-built for developers."
                    />
                </FadeIn>

                <FadeIn delay={0.2} className="mt-14">
                    <Tabs tabs={showcaseTabs} defaultValue="chat">
                        {(active) => (
                            <div className="mt-8">
                                <div className="glass-card rounded-2xl overflow-hidden">
                                    <div className="terminal-chrome">
                                        <div className="terminal-dots">
                                            <span /><span /><span />
                                        </div>
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] text-tertiary font-medium">
                                            G-Rump — {active === "chat" ? "Agent Chat" : active === "build" ? "Build Mode" : active === "panels" ? "IDE Panels" : "MCP Tools"}
                                        </div>
                                    </div>

                                    {active === "chat" && (
                                        <div className="p-6 lg:p-8 font-[family-name:var(--font-mono)] text-xs leading-relaxed space-y-4">
                                            <div className="flex gap-3">
                                                <span className="shrink-0 text-blue font-semibold">You</span>
                                                <p className="text-secondary">Refactor the auth module to use async/await and add comprehensive error handling.</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="shrink-0 text-purple font-semibold">Agent</span>
                                                <div className="text-secondary space-y-2">
                                                    <p>I&apos;ll refactor the auth module. Let me analyze the current implementation first.</p>
                                                    <p className="text-tertiary">Reading src/auth/handler.swift...</p>
                                                    <p className="text-tertiary">Reading src/auth/tokens.swift...</p>
                                                    <p><span className="text-green-400">[ok]</span> Found 3 files with callback-based patterns to convert</p>
                                                    <p><span className="text-green-400">[ok]</span> Refactored to async/await with structured concurrency</p>
                                                    <p><span className="text-green-400">[ok]</span> Added AuthError enum with 8 error cases</p>
                                                    <p><span className="text-green-400">[ok]</span> All 14 tests passing</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {active === "build" && (
                                        <div className="p-6 lg:p-8 font-[family-name:var(--font-mono)] text-xs leading-relaxed space-y-2">
                                            <p className="text-blue font-semibold mb-3">Build Mode — Step 12 of 47</p>
                                            <p className="text-secondary"><span className="text-green-400">[ok]</span> Step 1: Analyzed project structure</p>
                                            <p className="text-secondary"><span className="text-green-400">[ok]</span> Step 2: Created data models (User, Session, Token)</p>
                                            <p className="text-secondary"><span className="text-green-400">[ok]</span> Step 3: Built repository layer with protocols</p>
                                            <p className="text-secondary"><span className="text-green-400">[ok]</span> Step 4-8: Implemented API endpoints</p>
                                            <p className="text-secondary"><span className="text-green-400">[ok]</span> Step 9-11: Wrote 23 unit tests</p>
                                            <p className="text-secondary animate-pulse"><span className="text-blue">→</span> Step 12: Running test suite...</p>
                                            <p className="text-tertiary mt-2">Tools used: read_file, write_file, shell_exec, git_commit, run_tests</p>
                                            <div className="mt-4 flex items-center gap-2 text-tertiary">
                                                <div className="h-1.5 flex-1 rounded-full bg-black/[0.04] overflow-hidden">
                                                    <div className="h-full w-[26%] rounded-full bg-gradient-to-r from-blue-500 to-purple" />
                                                </div>
                                                <span>26%</span>
                                            </div>
                                        </div>
                                    )}

                                    {active === "panels" && (
                                        <div className="p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {[
                                                { name: "File Navigator", items: ["src/", "tests/", "docs/", "Package.swift"], color: "text-blue" },
                                                { name: "Git Panel", items: ["3 staged", "1 unstaged", "branch: main", "↑2 ahead"], color: "text-green-400" },
                                                { name: "Test Runner", items: ["23 passed", "0 failed", "2 skipped", "Coverage: 94%"], color: "text-purple" },
                                            ].map((panel) => (
                                                <div key={panel.name} className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4">
                                                    <p className={`text-[11px] font-semibold uppercase tracking-widest ${panel.color} mb-3`}>{panel.name}</p>
                                                    <div className="space-y-1.5 font-[family-name:var(--font-mono)] text-xs">
                                                        {panel.items.map((item) => (
                                                            <p key={item} className="text-secondary">{item}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {active === "mcp" && (
                                        <div className="p-6 lg:p-8 font-[family-name:var(--font-mono)] text-xs leading-loose">
                                            <p className="text-tertiary"># grump.toml — Active MCP Servers</p>
                                            <div className="mt-2 space-y-3">
                                                {[
                                                    { name: "github", status: "connected", tools: 12 },
                                                    { name: "postgres", status: "connected", tools: 8 },
                                                    { name: "filesystem", status: "connected", tools: 15 },
                                                    { name: "slack", status: "connected", tools: 6 },
                                                    { name: "linear", status: "idle", tools: 9 },
                                                ].map((server) => (
                                                    <div key={server.name} className="flex items-center justify-between">
                                                        <span className="text-blue">@{server.name}</span>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-tertiary">{server.tools} tools</span>
                                                            <span className={server.status === "connected" ? "text-green-400" : "text-tertiary"}>
                                                                {server.status === "connected" ? "● connected" : "○ idle"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mt-4 text-secondary">58 servers available · 5 active · 50 tools loaded</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Tabs>
                </FadeIn>
            </div>
        </section>
    );
}
