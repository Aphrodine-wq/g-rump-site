"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";

interface Drop {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    length: number;
}

export default function MatrixPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const fontSize = 14;
        let drops: Drop[] = [];
        let animId: number;

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            const cols = Math.floor(window.innerWidth / fontSize);
            drops = Array.from({ length: cols }, (_, i) => ({
                x: i * fontSize,
                y: Math.random() * -window.innerHeight,
                speed: Math.random() * 2 + 1,
                chars: Array.from(
                    { length: Math.floor(Math.random() * 20) + 10 },
                    () => CHARS[Math.floor(Math.random() * CHARS.length)]
                ),
                length: Math.floor(Math.random() * 20) + 10,
            }));
        };

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            for (const drop of drops) {
                for (let j = 0; j < drop.length; j++) {
                    const y = drop.y - j * fontSize;
                    if (y < 0 || y > window.innerHeight) continue;

                    const fade = 1 - j / drop.length;
                    if (j === 0) {
                        ctx.fillStyle = `rgba(180, 255, 180, ${fade})`;
                        ctx.font = `bold ${fontSize}px monospace`;
                    } else {
                        ctx.fillStyle = `rgba(0, 255, 65, ${fade * 0.8})`;
                        ctx.font = `${fontSize}px monospace`;
                    }

                    // Randomly change characters
                    if (Math.random() < 0.02) {
                        drop.chars[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }

                    ctx.fillText(drop.chars[j % drop.chars.length], drop.x, y);
                }

                drop.y += drop.speed;

                if (drop.y - drop.length * fontSize > window.innerHeight) {
                    drop.y = Math.random() * -200;
                    drop.speed = Math.random() * 2 + 1;
                }
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener("resize", resize);

        const revealTimer = setTimeout(() => setRevealed(true), 2000);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            clearTimeout(revealTimer);
        };
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ width: "100%", height: "100%" }}
            />

            <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                    revealed ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="rounded-2xl border border-green-500/20 bg-black/80 backdrop-blur-md px-12 py-10 text-center max-w-md">
                    <p className="text-green-400 font-mono text-sm mb-4">// ACCESS GRANTED</p>
                    <h1 className="text-3xl font-bold text-green-300 mb-3 font-mono">
                        Welcome to the Matrix
                    </h1>
                    <p className="text-green-500/70 text-sm leading-relaxed mb-2 font-mono">
                        You found the hidden page.
                    </p>
                    <p className="text-green-600/60 text-xs leading-relaxed mb-8 font-mono">
                        &quot;The Matrix is everywhere. It is all around us.
                        Even now, in this very room.&quot;
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-2.5 font-mono text-sm text-green-400 transition-all hover:bg-green-500/20 hover:border-green-500/50"
                        >
                            Take the blue pill &rarr; Go home
                        </Link>
                        <Link
                            href="/features"
                            className="block rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-2.5 font-mono text-sm text-green-400 transition-all hover:bg-green-500/20 hover:border-green-500/50"
                        >
                            Take the red pill &rarr; See features
                        </Link>
                    </div>
                    <p className="mt-6 text-[10px] text-green-700/50 font-mono">
                        Easter egg 3 of 5 discovered
                    </p>
                </div>
            </div>
        </div>
    );
}
