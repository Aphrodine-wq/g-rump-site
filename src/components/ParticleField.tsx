"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
}

export function ParticleField({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        const initParticles = () => {
            const rect = canvas.getBoundingClientRect();
            const count = Math.min(Math.floor((rect.width * rect.height) / 8000), 120);
            particles.current = Array.from({ length: count }, () => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            }));
        };

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            const pts = particles.current;
            const mx = mouse.current.x;
            const my = mouse.current.y;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += p.pulseSpeed;

                if (p.x < 0) p.x = rect.width;
                if (p.x > rect.width) p.x = 0;
                if (p.y < 0) p.y = rect.height;
                if (p.y > rect.height) p.y = 0;

                const pulseOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

                // Mouse repulsion
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.vx += (dx / dist) * force * 0.08;
                    p.vy += (dy / dist) * force * 0.08;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 122, 255, ${pulseOpacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < pts.length; j++) {
                    const p2 = pts[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                    if (cdist < 100) {
                        const lineOpacity = (1 - cdist / 100) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 122, 255, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        const handleMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };

        const handleLeave = () => {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
        };

        resize();
        initParticles();
        draw();

        window.addEventListener("resize", () => {
            resize();
            initParticles();
        });
        canvas.addEventListener("mousemove", handleMouse);
        canvas.addEventListener("mouseleave", handleLeave);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
            canvas.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-auto absolute inset-0 ${className}`}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
