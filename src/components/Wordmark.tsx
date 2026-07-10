import Link from "next/link";
import { FrownyLogo } from "./FrownyLogo";

export function Wordmark({ size = 28 }: { size?: number }) {
    return (
        <Link href="/" className="flex items-center gap-2.5" aria-label="G-Rump home">
            <FrownyLogo size={size} />
            <span className="text-[17px] font-semibold tracking-tight text-[var(--text-1)]">
                G-Rump
            </span>
        </Link>
    );
}
