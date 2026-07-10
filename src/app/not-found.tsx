import Link from "next/link";
import { FrownyLogo } from "@/components/FrownyLogo";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <FrownyLogo size={72} mood="error" />
            <h1 className="mt-8 text-3xl font-semibold tracking-tight text-[var(--text-1)]">
                404 — nothing here
            </h1>
            <p className="mt-3 max-w-[40ch] text-[var(--text-2)]">
                Even the harness couldn&rsquo;t find this page. It&rsquo;s appropriately
                grumpy about it.
            </p>
            <div className="mt-8 flex gap-4">
                <Link href="/" className="btn-primary">
                    Go home
                </Link>
                <Link href="/docs" className="btn-ghost">
                    Browse the docs
                </Link>
            </div>
        </main>
    );
}
