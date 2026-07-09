"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
];

function ConfettiPiece({ delay }: { delay: number }) {
    const colors = ["#3b82f6", "#a855f7", "#22c55e", "#f97316", "#ef4444", "#06b6d4"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const rotation = Math.random() * 720 - 360;
    const size = Math.random() * 8 + 4;

    return (
        <motion.div
            initial={{ y: -20, x: `${x}vw`, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ y: "110vh", opacity: 0, rotate: rotation, scale: 0.5 }}
            transition={{ duration: 2.5 + Math.random() * 2, delay, ease: "easeIn" }}
            className="fixed top-0 z-[200] pointer-events-none"
            style={{
                width: size,
                height: size * 2.5,
                backgroundColor: color,
                borderRadius: 2,
            }}
        />
    );
}

function KonamiOverlay({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[199] flex items-center justify-center bg-black/30 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Confetti */}
            {Array.from({ length: 60 }).map((_, i) => (
                <ConfettiPiece key={i} delay={i * 0.03} />
            ))}

            <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="relative z-[201] max-w-md rounded-2xl border border-black/[0.08] bg-white p-10 text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-6xl mb-4">&#127918;</div>
                <h2 className="text-2xl font-bold text-primary mb-2">You found a secret!</h2>
                <p className="text-sm text-secondary leading-relaxed mb-2">
                    The Konami Code still works. Some things never change.
                </p>
                <p className="text-xs text-tertiary mb-6">
                    &#8593;&#8593;&#8595;&#8595;&#8592;&#8594;&#8592;&#8594;BA
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-2 text-xs text-blue font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                    </span>
                    Achievement Unlocked: Retro Gamer
                </div>
                <p className="mt-6 text-xs text-tertiary">Click anywhere to close</p>
            </motion.div>
        </motion.div>
    );
}

function LabsPanel({ onClose }: { onClose: () => void }) {
    const experiments = [
        { name: "Multi-Agent Collaboration", status: "In Development", progress: 65 },
        { name: "Real-time Pair Programming", status: "Prototyping", progress: 30 },
        { name: "Plugin Marketplace", status: "Design Phase", progress: 15 },
        { name: "Voice Commands", status: "Research", progress: 8 },
        { name: "AI Code Review Bot", status: "In Development", progress: 72 },
        { name: "Smart Refactoring", status: "Beta Testing", progress: 90 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[199] flex items-center justify-center bg-black/30 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative z-[200] w-[90vw] max-w-lg rounded-2xl border border-purple/20 bg-white p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 border border-purple/20">
                        <svg className="h-5 w-5 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-primary">G-Rump Labs</h2>
                        <p className="text-xs text-purple">Experimental Features</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {experiments.map((exp) => (
                        <div key={exp.name} className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-primary">{exp.name}</p>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple">{exp.status}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${exp.progress}%` }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-center text-[11px] text-tertiary">
                    Press <kbd className="rounded border border-black/[0.06] bg-black/[0.03] px-1.5 py-0.5 text-[10px] font-mono">&#8984;&#8679;G</kbd> to toggle &middot; These features are not yet available
                </p>
            </motion.div>
        </motion.div>
    );
}

export function EasterEggs() {
    const [konamiActive, setKonamiActive] = useState(false);
    const [labsActive, setLabsActive] = useState(false);
    const konamiProgress = useRef<string[]>([]);
    const consoleLogged = useRef(false);

    // Console easter egg
    useEffect(() => {
        if (consoleLogged.current) return;
        consoleLogged.current = true;

        const styles = [
            "color: #3b82f6; font-size: 24px; font-weight: bold;",
            "color: #86868b; font-size: 12px;",
            "color: #a855f7; font-size: 12px; font-style: italic;",
        ];

        console.log(
            `%c
   ██████╗       ██████╗ ██╗   ██╗███╗   ███╗██████╗ 
  ██╔════╝       ██╔══██╗██║   ██║████╗ ████║██╔══██╗
  ██║  ███╗█████╗██████╔╝██║   ██║██╔████╔██║██████╔╝
  ██║   ██║╚════╝██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝ 
  ╚██████╔╝      ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║     
   ╚═════╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     

%cNative macOS AI Coding Agent — Built with Swift & SwiftUI
%cWe're hiring! Check out g-rump.com/about#careers`,
            styles[0],
            styles[1],
            styles[2]
        );

        console.log(
            "%cHint: Try the Konami Code... ↑↑↓↓←→←→BA",
            "color: #6e6e73; font-size: 10px;"
        );
    }, []);

    // Konami code listener
    const handleKonami = useCallback((e: KeyboardEvent) => {
        konamiProgress.current.push(e.key);
        if (konamiProgress.current.length > KONAMI.length) {
            konamiProgress.current = konamiProgress.current.slice(-KONAMI.length);
        }

        const match = konamiProgress.current.every(
            (key, i) => key === KONAMI[i]
        ) && konamiProgress.current.length === KONAMI.length;

        if (match) {
            setKonamiActive(true);
            konamiProgress.current = [];
        }
    }, []);

    // Labs shortcut: Cmd+Shift+G
    const handleLabs = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "g") {
            e.preventDefault();
            setLabsActive((prev) => !prev);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKonami);
        window.addEventListener("keydown", handleLabs);
        return () => {
            window.removeEventListener("keydown", handleKonami);
            window.removeEventListener("keydown", handleLabs);
        };
    }, [handleKonami, handleLabs]);

    return (
        <AnimatePresence>
            {konamiActive && (
                <KonamiOverlay onClose={() => setKonamiActive(false)} />
            )}
            {labsActive && (
                <LabsPanel onClose={() => setLabsActive(false)} />
            )}
        </AnimatePresence>
    );
}
