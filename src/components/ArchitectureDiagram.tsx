"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

const nodes = [
    { id: "core", label: "G-Rump Core", x: 50, y: 50, color: "#3b82f6", size: "lg" },
    { id: "anthropic", label: "Anthropic", x: 15, y: 20, color: "#f59e0b", size: "sm" },
    { id: "openai", label: "OpenAI", x: 35, y: 12, color: "#22c55e", size: "sm" },
    { id: "ollama", label: "Ollama", x: 65, y: 12, color: "#94a3b8", size: "sm" },
    { id: "coreml", label: "CoreML", x: 85, y: 20, color: "#3b82f6", size: "sm" },
    { id: "tools", label: "100+ Tools", x: 20, y: 75, color: "#f97316", size: "md" },
    { id: "mcp", label: "58 MCP Servers", x: 80, y: 75, color: "#06b6d4", size: "md" },
    { id: "skills", label: "40+ Skills", x: 15, y: 50, color: "#a855f7", size: "sm" },
    { id: "panels", label: "17 IDE Panels", x: 85, y: 50, color: "#ec4899", size: "sm" },
    { id: "keychain", label: "Keychain", x: 35, y: 88, color: "#22c55e", size: "sm" },
    { id: "spotlight", label: "Spotlight", x: 50, y: 88, color: "#f59e0b", size: "sm" },
    { id: "calendar", label: "Calendar", x: 65, y: 88, color: "#ef4444", size: "sm" },
];

const connections = [
    { from: "core", to: "anthropic" },
    { from: "core", to: "openai" },
    { from: "core", to: "ollama" },
    { from: "core", to: "coreml" },
    { from: "core", to: "tools" },
    { from: "core", to: "mcp" },
    { from: "core", to: "skills" },
    { from: "core", to: "panels" },
    { from: "tools", to: "keychain" },
    { from: "tools", to: "spotlight" },
    { from: "tools", to: "calendar" },
];

function getNodePos(id: string) {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
}

export function ArchitectureDiagram() {
    return (
        <section className="relative px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Architecture"
                        heading="How it all connects."
                        description="G-Rump sits at the center of your development ecosystem, connecting AI providers, tools, and macOS APIs through a unified native interface."
                    />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="relative mt-14 mx-auto max-w-[800px] aspect-[16/10] rounded-2xl border border-black/[0.06] bg-gray-50/50 overflow-hidden">
                        {/* Grid background */}
                        <div className="absolute inset-0 bg-grid opacity-30" />

                        {/* SVG connections */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {connections.map((conn, i) => {
                                const from = getNodePos(conn.from);
                                const to = getNodePos(conn.to);
                                return (
                                    <motion.line
                                        key={`${conn.from}-${conn.to}`}
                                        x1={from.x}
                                        y1={from.y}
                                        x2={to.x}
                                        y2={to.y}
                                        stroke="rgba(59, 130, 246, 0.3)"
                                        strokeWidth="0.2"
                                        strokeDasharray="1 1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                                    />
                                );
                            })}

                            {/* Animated pulse along connections */}
                            {connections.slice(0, 4).map((conn, i) => {
                                const from = getNodePos(conn.from);
                                const to = getNodePos(conn.to);
                                return (
                                    <motion.circle
                                        key={`pulse-${conn.from}-${conn.to}`}
                                        r="0.5"
                                        fill={nodes.find((n) => n.id === conn.to)?.color || "#3b82f6"}
                                        initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                                        animate={{
                                            cx: [from.x, to.x, from.x],
                                            cy: [from.y, to.y, from.y],
                                            opacity: [0, 0.8, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            delay: i * 0.8,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                            ease: "easeInOut",
                                        }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        {nodes.map((node, i) => {
                            const sizeClasses = {
                                sm: "h-16 px-3 text-[10px]",
                                md: "h-18 px-4 text-[11px]",
                                lg: "h-20 px-5 text-xs",
                            };

                            return (
                                <motion.div
                                    key={node.id}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-xl border border-black/[0.06] backdrop-blur-sm font-medium text-primary whitespace-nowrap ${sizeClasses[node.size as keyof typeof sizeClasses]}`}
                                    style={{
                                        left: `${node.x}%`,
                                        top: `${node.y}%`,
                                        background: `${node.color}20`,
                                        borderColor: `${node.color}40`,
                                        boxShadow: `0 0 20px ${node.color}15`,
                                    }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: 0.1 + i * 0.06,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        borderColor: `${node.color}60`,
                                        boxShadow: `0 0 30px ${node.color}20`,
                                    }}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className="h-1.5 w-1.5 rounded-full"
                                            style={{ backgroundColor: node.color }}
                                        />
                                        {node.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
