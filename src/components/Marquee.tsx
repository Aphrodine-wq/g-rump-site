"use client";

import { motion } from "framer-motion";

const providers = [
    { name: "Anthropic", dotColor: "bg-amber-500" },
    { name: "OpenAI", dotColor: "bg-green-500" },
    { name: "Ollama", dotColor: "bg-slate-400" },
    { name: "OpenRouter", dotColor: "bg-purple-500" },
    { name: "CoreML", dotColor: "bg-blue-500" },
    { name: "Hugging Face", dotColor: "bg-yellow-500" },
    { name: "Replicate", dotColor: "bg-red-500" },
    { name: "Together AI", dotColor: "bg-cyan-500" },
];

const doubled = [...providers, ...providers];

export function Marquee() {
    return (
        <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-bg-alt to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-bg-alt to-transparent" />

            <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {doubled.map((p, i) => (
                    <div
                        key={`${p.name}-${i}`}
                        className="flex items-center gap-2.5 rounded-full border border-black/[0.06] bg-black/[0.02] px-5 py-2.5 whitespace-nowrap"
                    >
                        <span className={`h-2 w-2 rounded-full ${p.dotColor}`} />
                        <span className="text-sm font-medium text-secondary">{p.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
