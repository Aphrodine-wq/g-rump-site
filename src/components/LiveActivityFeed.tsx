"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

interface Activity {
    id: number;
    type: "download" | "skill" | "build" | "star" | "mcp";
    message: string;
    time: string;
    icon: string;
    color: string;
}

const activityTemplates = [
    { type: "download" as const, messages: ["downloaded G-Rump on macOS Sequoia", "installed G-Rump v2.0.4", "upgraded to G-Rump Pro", "downloaded G-Rump on macOS Sonoma"], icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3", color: "#3b82f6" },
    { type: "skill" as const, messages: ["published a custom SwiftUI skill", "shared a React testing skill", "activated the Kubernetes skill", "created a Django REST skill"], icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "#a855f7" },
    { type: "build" as const, messages: ["completed a 142-step Build mode task", "shipped a feature with 47 autonomous steps", "finished a 89-step refactoring session", "automated 23 test cases in Build mode"], icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", color: "#f97316" },
    { type: "star" as const, messages: ["starred G-Rump on GitHub", "gave G-Rump a 5-star review", "recommended G-Rump to their team", "forked G-Rump on GitHub"], icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z", color: "#f59e0b" },
    { type: "mcp" as const, messages: ["connected the PostgreSQL MCP server", "added a custom MCP server for Jira", "deployed with the Vercel MCP server", "activated the Slack MCP integration"], icon: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7", color: "#06b6d4" },
];

const names = [
    "A developer in Tokyo", "Someone in Berlin", "A team in San Francisco",
    "A Swift developer", "An iOS engineer", "Someone in London",
    "A startup in Austin", "A dev in Seoul", "An engineer in NYC",
    "Someone in Toronto", "A team in Stockholm", "A developer in Sydney",
    "An indie dev", "A macOS developer", "A full-stack engineer",
];

function generateActivity(id: number): Activity {
    const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const message = template.messages[Math.floor(Math.random() * template.messages.length)];
    const seconds = Math.floor(Math.random() * 55) + 5;

    return {
        id,
        type: template.type,
        message: `${name} ${message}`,
        time: `${seconds}s ago`,
        icon: template.icon,
        color: template.color,
    };
}

export function LiveActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const counterRef = useRef(0);

    useEffect(() => {
        // Initial batch
        const initial = Array.from({ length: 5 }, (_, i) => {
            counterRef.current++;
            return generateActivity(counterRef.current);
        });
        setActivities(initial);

        const interval = setInterval(() => {
            counterRef.current++;
            const newActivity = generateActivity(counterRef.current);
            setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-bg-alt px-5 py-28 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

            <div className="mx-auto max-w-[1100px]">
                <FadeIn>
                    <SectionHeader
                        label="Community"
                        heading="Happening right now."
                        description="Join thousands of macOS developers building with G-Rump."
                    />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="mt-14 mx-auto max-w-[600px] space-y-3">
                        <AnimatePresence mode="popLayout">
                            {activities.map((activity) => (
                                <motion.div
                                    key={activity.id}
                                    layout
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="flex items-center gap-4 rounded-xl border border-black/[0.06] bg-white px-5 py-4"
                                >
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{ background: `${activity.color}20`, border: `1px solid ${activity.color}35` }}
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={activity.color} strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d={activity.icon} />
                                        </svg>
                                    </div>
                                    <p className="flex-1 text-sm text-secondary min-w-0">
                                        {activity.message}
                                    </p>
                                    <span className="shrink-0 text-[11px] text-tertiary whitespace-nowrap">{activity.time}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Live indicator */}
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span className="text-xs text-tertiary">Live activity feed</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
