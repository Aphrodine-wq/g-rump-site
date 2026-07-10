import type { ReactNode } from "react";

type GlassCardProps = {
    children: ReactNode;
    className?: string;
    radius?: "md" | "lg";
    padding?: "sm" | "md" | "lg";
};

const RADIUS = { md: "rounded-xl", lg: "rounded-2xl" } as const;
const PADDING = { sm: "p-4", md: "p-6", lg: "p-8" } as const;

export function GlassCard({
    children,
    className = "",
    radius = "lg",
    padding = "md",
}: GlassCardProps) {
    return (
        <div className={`glass ${RADIUS[radius]} ${PADDING[padding]} ${className}`}>
            {children}
        </div>
    );
}
