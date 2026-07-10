type FrownyLogoProps = {
    size?: number;
    mood?: "neutral" | "error";
    className?: string;
};

/**
 * The G-Rump mark. Geometry ported from the app's FrownyFaceLogo.swift:
 * eyes r=7.5 at (33,40)/(67,40), frown arc r=22 centered at (50,81.2),
 * -160deg to -20deg. Solid single-color stroke — no gradients.
 */
export function FrownyLogo({ size = 32, mood = "neutral", className }: FrownyLogoProps) {
    const stroke = mood === "error" ? "#ff5959" : "var(--accent)";
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            role="img"
            aria-label="G-Rump logo"
            className={className}
        >
            <circle cx="50" cy="50" r="47.5" fill="var(--bg-raised)" stroke={stroke} strokeWidth="5" />
            {mood === "error" ? (
                <g stroke={stroke} strokeWidth="4" strokeLinecap="round" fill="none">
                    <path d="M 28.5 35.5 L 37.5 44.5 M 37.5 35.5 L 28.5 44.5" />
                    <path d="M 62.5 35.5 L 71.5 44.5 M 71.5 35.5 L 62.5 44.5" />
                </g>
            ) : (
                <g fill={stroke}>
                    <circle cx="33" cy="40" r="7.5" />
                    <circle cx="67" cy="40" r="7.5" />
                </g>
            )}
            <path
                d="M 29.3 73.7 A 22 22 0 0 1 70.7 73.7"
                fill="none"
                stroke={stroke}
                strokeWidth="5.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
