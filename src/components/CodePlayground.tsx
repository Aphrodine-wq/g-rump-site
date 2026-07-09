"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

interface CommandResult {
    command: string;
    output: string[];
    typing?: boolean;
}

const demoCommands: { cmd: string; output: string[] }[] = [
    {
        cmd: "grump status",
        output: [
            "\x1b[32m●\x1b[0m Agent: Ready",
            "\x1b[32m●\x1b[0m Provider: Claude 3.5 Sonnet (Anthropic)",
            "\x1b[32m●\x1b[0m Tools: 104 loaded",
            "\x1b[32m●\x1b[0m Skills: 42 active (12 project-specific)",
            "\x1b[32m●\x1b[0m MCP: 8 servers connected",
            "\x1b[34m→\x1b[0m Mode: Build (autonomous)",
        ],
    },
    {
        cmd: "grump tools --category file",
        output: [
            "  read_file          Read file contents with line numbers",
            "  write_file         Create new files with content",
            "  edit_file          Surgical find-and-replace edits",
            "  move_file          Move or rename files",
            "  delete_file        Remove files safely",
            "  glob               Pattern-match file discovery",
            "  grep               Regex search across codebase",
            "  tree               Directory structure visualization",
            "",
            "\x1b[34mShowing 8 of 104 tools. Use --all to see everything.\x1b[0m",
        ],
    },
    {
        cmd: "grump build \"Add dark mode toggle to the settings page\"",
        output: [
            "\x1b[34m⟳\x1b[0m Planning... (3 steps identified)",
            "\x1b[34m  Step 1:\x1b[0m Analyze current theme implementation",
            "\x1b[34m  Step 2:\x1b[0m Create DarkModeToggle component",
            "\x1b[34m  Step 3:\x1b[0m Wire into SettingsPage + persist preference",
            "",
            "\x1b[32m[ok]\x1b[0m Step 1/3: Read 4 files, found ThemeProvider in app/providers.tsx",
            "\x1b[32m[ok]\x1b[0m Step 2/3: Created src/components/DarkModeToggle.tsx (47 lines)",
            "\x1b[32m[ok]\x1b[0m Step 3/3: Edited SettingsPage.tsx, added localStorage persistence",
            "",
            "\x1b[32m[ok] Build complete.\x1b[0m 3 steps · 6 tool calls · 2 files modified · 1 file created",
        ],
    },
    {
        cmd: "grump skills --active",
        output: [
            "  swift          Swift 5.9+ patterns & best practices",
            "  swiftui        SwiftUI views, modifiers, state management",
            "  testing        XCTest, snapshot testing, mocks",
            "  git            Branch management, commit conventions",
            "  accessibility  VoiceOver, Dynamic Type, a11y audit",
            "  performance    Instruments, memory profiling, optimization",
            "  security       Keychain, App Sandbox, code signing",
            "  concurrency    async/await, actors, structured concurrency",
            "  coredata       CloudKit sync, migrations, NSPredicate",
            "  networking     URLSession, Combine publishers, caching",
            "",
            "\x1b[34mShowing 10 of 42 active skills.\x1b[0m",
        ],
    },
];

function parseAnsi(text: string) {
    const parts: { text: string; color?: string }[] = [];
    const regex = /\x1b\[(\d+)m/g;
    let lastIdx = 0;
    let currentColor: string | undefined;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIdx) {
            parts.push({ text: text.slice(lastIdx, match.index), color: currentColor });
        }
        const code = match[1];
        if (code === "0") currentColor = undefined;
        else if (code === "32") currentColor = "text-green-400";
        else if (code === "34") currentColor = "text-blue";
        else if (code === "33") currentColor = "text-amber-400";
        lastIdx = regex.lastIndex;
    }
    if (lastIdx < text.length) {
        parts.push({ text: text.slice(lastIdx), color: currentColor });
    }
    return parts;
}

export function CodePlayground() {
    const [history, setHistory] = useState<CommandResult[]>([]);
    const [currentInput, setCurrentInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [demoIdx, setDemoIdx] = useState(0);
    const [autoDemo, setAutoDemo] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    const typeCommand = useCallback(
        async (cmd: string, output: string[]) => {
            setIsTyping(true);
            setCurrentInput("");

            // Type out the command character by character
            for (let i = 0; i <= cmd.length; i++) {
                await new Promise((r) => setTimeout(r, 30 + Math.random() * 40));
                setCurrentInput(cmd.slice(0, i));
            }

            await new Promise((r) => setTimeout(r, 300));

            // Add command to history with output appearing line by line
            const result: CommandResult = { command: cmd, output: [], typing: true };
            setHistory((prev) => [...prev, result]);
            setCurrentInput("");

            for (let i = 0; i < output.length; i++) {
                await new Promise((r) => setTimeout(r, 60 + Math.random() * 60));
                setHistory((prev) => {
                    const updated = [...prev];
                    const last = { ...updated[updated.length - 1] };
                    last.output = [...last.output, output[i]];
                    updated[updated.length - 1] = last;
                    return updated;
                });
                scrollToBottom();
            }

            setHistory((prev) => {
                const updated = [...prev];
                const last = { ...updated[updated.length - 1] };
                last.typing = false;
                updated[updated.length - 1] = last;
                return updated;
            });

            setIsTyping(false);
        },
        [scrollToBottom]
    );

    // Auto-demo
    useEffect(() => {
        if (!autoDemo || isTyping) return;
        if (demoIdx >= demoCommands.length) return;

        const timeout = setTimeout(() => {
            const demo = demoCommands[demoIdx];
            typeCommand(demo.cmd, demo.output);
            setDemoIdx((prev) => prev + 1);
        }, demoIdx === 0 ? 1500 : 2500);

        return () => clearTimeout(timeout);
    }, [autoDemo, demoIdx, isTyping, typeCommand]);

    useEffect(scrollToBottom, [history, currentInput, scrollToBottom]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentInput.trim() || isTyping) return;
        setAutoDemo(false);

        const input = currentInput.trim();
        const demo = demoCommands.find((d) => d.cmd === input);

        if (demo) {
            typeCommand(demo.cmd, demo.output);
        } else if (input === "help") {
            setHistory((prev) => [
                ...prev,
                {
                    command: input,
                    output: [
                        "Available commands:",
                        "  grump status       Show agent status",
                        "  grump tools        List available tools",
                        "  grump build        Start autonomous build",
                        "  grump skills       List active skills",
                        "  help               Show this help",
                        "  clear              Clear terminal",
                    ],
                },
            ]);
        } else if (input === "clear") {
            setHistory([]);
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    command: input,
                    output: [`Command not found: ${input}. Type "help" for available commands.`],
                },
            ]);
        }
        setCurrentInput("");
    };

    return (
        <section className="relative px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Try It"
                        heading="See G-Rump in action."
                        description="An interactive demo of G-Rump's command interface. Watch the auto-demo or type your own commands."
                    />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div
                        className="mx-auto mt-14 max-w-[700px] rounded-2xl border border-black/[0.06] bg-[#1d1d1f] shadow-2xl overflow-hidden cursor-text"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                            <span className="h-3 w-3 rounded-full bg-[#28ca41]" />
                            <span className="ml-3 text-[11px] text-tertiary font-[family-name:var(--font-mono)]">
                                grump — Terminal
                            </span>
                        </div>

                        {/* Terminal body */}
                        <div
                            ref={terminalRef}
                            className="h-[380px] overflow-y-auto p-5 font-[family-name:var(--font-mono)] text-xs leading-relaxed scrollbar-thin"
                        >
                            {/* Welcome message */}
                            <p className="text-tertiary mb-1">G-Rump v2.0.4 — Native macOS AI Coding Agent</p>
                            <p className="text-tertiary mb-4">Type &quot;help&quot; for available commands.</p>

                            {/* Command history */}
                            <AnimatePresence>
                                {history.map((entry, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-3"
                                    >
                                        <p>
                                            <span className="text-green-400">$</span>{" "}
                                            <span className="text-primary">{entry.command}</span>
                                        </p>
                                        {entry.output.map((line, j) => (
                                            <motion.p
                                                key={j}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-secondary"
                                            >
                                                {line === "" ? (
                                                    <br />
                                                ) : (
                                                    parseAnsi(line).map((part, k) => (
                                                        <span key={k} className={part.color || "text-secondary"}>
                                                            {part.text}
                                                        </span>
                                                    ))
                                                )}
                                            </motion.p>
                                        ))}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Current input line */}
                            <form onSubmit={handleSubmit} className="flex items-center">
                                <span className="text-green-400 mr-1.5">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => {
                                        setAutoDemo(false);
                                        setCurrentInput(e.target.value);
                                    }}
                                    className="flex-1 bg-transparent text-primary outline-none caret-blue"
                                    spellCheck={false}
                                    autoComplete="off"
                                    disabled={isTyping}
                                    aria-label="Terminal input"
                                />
                                {!isTyping && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                                        className="inline-block w-[7px] h-[14px] bg-blue ml-0.5"
                                    />
                                )}
                            </form>
                        </div>

                        {/* Terminal footer */}
                        <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.04] px-4 py-2">
                            <span className="text-[10px] text-tertiary">Interactive Demo</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setHistory([]);
                                        setDemoIdx(0);
                                        setAutoDemo(true);
                                        setCurrentInput("");
                                    }}
                                    className="text-[10px] text-tertiary hover:text-secondary transition-colors"
                                >
                                    Replay demo
                                </button>
                                <button
                                    onClick={() => {
                                        setHistory([]);
                                        setCurrentInput("");
                                    }}
                                    className="text-[10px] text-tertiary hover:text-secondary transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
