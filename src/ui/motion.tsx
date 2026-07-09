"use client";

import { motion, useMotionValue, useTransform, animate, useScroll, useInView } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";

/* ── Fade-up on scroll (renders visible, no opacity hiding) ── */
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return <div className={className}>{children}</div>;
}

/* ── Scale-in on scroll ── */
export function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return <div className={className}>{children}</div>;
}

/* ── Staggered container ── */
export function Stagger({ children, className = "", staggerDelay = 0.08 }: { children: ReactNode; className?: string; staggerDelay?: number }) {
    return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

/* ── Slide in ── */
export function SlideIn({ children, direction = "left", delay = 0, className = "" }: { children: ReactNode; direction?: "left" | "right"; delay?: number; className?: string }) {
    return <div className={className}>{children}</div>;
}

/* ── Animated counter ── */
export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "50px" });
    const motionVal = useMotionValue(0);
    const rounded = useTransform(motionVal, (v) => Math.round(v));

    useEffect(() => {
        if (inView) {
            animate(motionVal, value, { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] });
        }
    }, [inView, motionVal, value]);

    return (
        <span ref={ref} className={className}>
            <AnimatedDigits motionValue={rounded} fallback={value} />
            {suffix}
        </span>
    );
}

function AnimatedDigits({ motionValue, fallback }: { motionValue: ReturnType<typeof useTransform<number, number>>; fallback: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const unsubscribe = motionValue.on("change", (v) => {
            if (ref.current) ref.current.textContent = String(v);
        });
        return unsubscribe;
    }, [motionValue]);
    return <span ref={ref}>{fallback}</span>;
}

/* ── Hero text reveal (keeps animation — it's above the fold) ── */
export function TextReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Hover card ── */
export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className={className}>
            {children}
        </motion.div>
    );
}

/* ── Glow card ── */
export function GlowCard({ children, className = "", color = "blue" }: { children: ReactNode; className?: string; color?: string }) {
    return (
        <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className={className}>
            {children}
        </motion.div>
    );
}

/* ── Floating element (hero only — keeps animation) ── */
export function FloatingElement({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Parallax on scroll ── */
export function Parallax({ children, speed = 0.3, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);
    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}

/* ── Magnetic hover button ── */
export function MagneticButton({ children, className = "", strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const handleLeave = () => {
        animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
        animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
    };
    return (
        <motion.div ref={ref} style={{ x, y }} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
            {children}
        </motion.div>
    );
}

/* ── Animated gradient border card ── */
export function GradientBorderCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`animated-gradient-border ${className}`}>
            <div className="relative z-10 h-full rounded-[inherit] bg-bg-card">{children}</div>
        </div>
    );
}

/* ── Blur reveal ── */
export function BlurReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return <div className={className}>{children}</div>;
}

/* ── Typewriter text ── */
export function TypeWriter({ text, speed = 40, delay = 0, className = "" }: { text: string; speed?: number; delay?: number; className?: string }) {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView || started) return;
        const timer = setTimeout(() => {
            setStarted(true);
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, speed);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [inView, text, speed, delay, started]);

    return (
        <span ref={ref} className={className}>
            {displayed || text}
            {started && displayed.length < text.length && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 align-text-bottom" />
            )}
        </span>
    );
}

/* ── Animated border card ── */
export function AnimatedBorderCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`animated-gradient-border ${className}`}>
            <div className="rounded-[calc(1rem-1px)] bg-bg-card">{children}</div>
        </div>
    );
}

/* ── Reveal on hover ── */
export function RevealOnHover({ children, revealContent, className = "" }: { children: ReactNode; revealContent: ReactNode; className?: string }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className={`relative overflow-hidden ${className}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {children}
            <motion.div initial={false} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex items-center justify-center bg-bg-card/90 backdrop-blur-sm">
                {revealContent}
            </motion.div>
        </div>
    );
}
