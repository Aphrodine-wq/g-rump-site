"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
    question: string;
    answer: string | ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={className}>
            {items.map((item, i) => (
                <div key={i} className="border-b border-black/[0.06]">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="flex w-full items-center justify-between py-5 text-left transition-colors group"
                    >
                        <span className="text-[15px] font-semibold text-primary pr-4 group-hover:text-blue transition-colors">
                            {item.question}
                        </span>
                        <motion.span
                            animate={{ rotate: openIndex === i ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-black/[0.02] text-secondary"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pb-5 text-sm leading-relaxed text-secondary">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
