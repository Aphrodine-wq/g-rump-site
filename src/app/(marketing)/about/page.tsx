import type { Metadata } from "next";
import Link from "next/link";
import { FrownyLogo } from "@/components/FrownyLogo";
import { GITHUB_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "About",
    description:
        "G-Rump is an open-source AI harness for macOS, built in Swift by James Walton. Why it exists, why it's grumpy, and how to get in touch.",
};

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-[680px] px-6 py-16">
            <FrownyLogo size={64} />
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-[var(--text-1)]">
                About G-Rump
            </h1>
            <div className="mt-6 space-y-5 leading-relaxed text-[var(--text-2)]">
                <p>
                    G-Rump started as a hackathon build and grew into a conviction: a
                    coding agent should be a first-class Mac citizen with a memory, not a
                    process in a terminal. It&rsquo;s roughly 62,000 lines of Swift — the
                    agent loop, tools, memory, learning loop, and safety gates that let a
                    language model do real work on a real machine.
                </p>
                <p>
                    It&rsquo;s built and maintained by{" "}
                    <strong className="font-semibold text-[var(--text-1)]">James Walton</strong>,
                    a builder from Mississippi who came to software from construction —
                    which might explain the emphasis on harnesses, load paths, and not
                    trusting anything you haven&rsquo;t inspected.
                </p>
                <p>
                    Why grumpy? Because relentlessly cheerful assistants agree with bad
                    ideas. G-Rump&rsquo;s default persona has opinions about your code —
                    defined in a SOUL.md you can edit, so it&rsquo;s exactly as grumpy as
                    you want it to be.
                </p>
                <p>
                    The app is free and MIT-licensed. There&rsquo;s no company behind it
                    to answer to, no telemetry, and no backend — just{" "}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)]"
                    >
                        the repository
                    </a>
                    .
                </p>
            </div>
            <div className="mt-10 border-t border-[var(--hairline)] pt-8">
                <h2 className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
                    Get in touch
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-[var(--text-2)]">
                    <li>
                        Bugs and feature requests →{" "}
                        <a
                            href={`${GITHUB_URL}/issues`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            GitHub Issues
                        </a>
                    </li>
                    <li>
                        Security reports →{" "}
                        <Link href="/security" className="text-[var(--accent)]">
                            the security page
                        </Link>
                    </li>
                    <li>
                        Everything else →{" "}
                        <a
                            href={`${GITHUB_URL}/discussions`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            GitHub Discussions
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
