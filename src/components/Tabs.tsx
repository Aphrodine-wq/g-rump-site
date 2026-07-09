"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
    label: string;
    value: string;
    icon?: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    children: (activeTab: string) => ReactNode;
    className?: string;
    defaultValue?: string;
}

export function Tabs({ tabs, children, className = "", defaultValue }: TabsProps) {
    const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? "");

    return (
        <div className={className}>
            <div className="flex items-center justify-center gap-1 rounded-full border border-black/[0.06] bg-black/[0.02] p-1 w-fit mx-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActive(tab.value)}
                        className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                            active === tab.value
                                ? "text-primary"
                                : "text-secondary hover:text-primary"
                        }`}
                    >
                        {active === tab.value && (
                            <motion.span
                                layoutId="tab-bg"
                                className="absolute inset-0 rounded-full bg-black/[0.05]"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {children(active)}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
