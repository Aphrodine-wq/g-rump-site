import type { ReactNode } from "react";

type AccordionItem = { question: string; answer: ReactNode };

/** Native details/summary disclosure list — no JS, accessible by default. */
export function Accordion({ items }: { items: AccordionItem[] }) {
    return (
        <div className="divide-y divide-[var(--hairline-soft)] rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)]">
            {items.map((item) => (
                <details key={item.question} className="group px-6 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-[var(--text-1)] [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <span
                            aria-hidden="true"
                            className="text-[var(--text-3)] transition-transform duration-150 group-open:rotate-45"
                        >
                            +
                        </span>
                    </summary>
                    <div className="pt-3 text-sm leading-relaxed text-[var(--text-2)]">
                        {item.answer}
                    </div>
                </details>
            ))}
        </div>
    );
}
