import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Payment Cancelled",
    description: "Your G-Rump checkout was cancelled. No charges were made.",
};

export default function BillingCancelPage() {
    return (
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />

            <div className="relative mx-auto max-w-[480px]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-black/[0.06] bg-black/[0.03] mb-8">
                    <svg className="h-10 w-10 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-primary">
                    Checkout cancelled.
                </h1>

                <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                    No worries — no charges were made. You can return to pricing
                    to choose a plan or continue using G-Rump on the free tier.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/pricing"
                        className="rounded-full bg-blue-500 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        View Plans
                    </Link>
                    <Link
                        href="/"
                        className="rounded-full border border-black/[0.06] bg-black/[0.02] px-8 py-3.5 text-[15px] font-medium text-primary backdrop-blur transition-all hover:bg-black/[0.04] hover:border-black/[0.1]"
                    >
                        Back to Home
                    </Link>
                </div>

                <p className="mt-8 text-xs text-tertiary">
                    Questions about pricing?{" "}
                    <Link href="/contact" className="text-blue hover:underline">
                        Contact us
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
