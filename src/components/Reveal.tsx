"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Stagger delay in ms (kept small — the whole entrance is 150ms). */
    delay?: number;
};

/**
 * The one entrance-motion primitive: opacity 0→1, translateY 8px→0, 150ms
 * ease-out, driven by IntersectionObserver. Renders static under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        el.classList.add("is-visible");
                        observer.disconnect();
                    }
                }
            },
            { rootMargin: "0px 0px -10% 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
