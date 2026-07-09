"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorSpotlight() {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };
        const leave = () => setVisible(false);

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseleave", leave);
        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseleave", leave);
        };
    }, [visible]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div
                className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    left: pos.x,
                    top: pos.y,
                    background:
                        "radial-gradient(circle, rgba(0,122,255,0.03) 0%, rgba(175,82,222,0.02) 40%, transparent 70%)",
                }}
            />
        </motion.div>
    );
}
