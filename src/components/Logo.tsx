import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
    return (
        <Link href="/" className={`text-[15px] font-bold tracking-tight text-primary hover:opacity-80 transition-opacity ${className}`}>
            <span className="font-semibold text-primary">G-Rump</span>
        </Link>
    );
}
