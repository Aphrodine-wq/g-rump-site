import type { Metadata } from "next";
import Link from "next/link";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { GITHUB_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "Security",
    description:
        "G-Rump executes LLM-directed shell commands, so the security model is the product: exec approvals, a fail-closed Conscience gate, protected writes, an opt-in daemon, and Keychain-only keys.",
};

export default function SecurityPage() {
    return (
        <div className="pb-8">
            <div className="mx-auto max-w-[1120px] px-6 py-16">
                <p className="eyebrow">Security</p>
                <h1 className="text-display mt-4 max-w-[16ch] text-[var(--text-1)]">
                    Verify, don&rsquo;t trust.
                </h1>
                <p className="mt-5 max-w-[54ch] text-lg text-[var(--text-2)]">
                    A coding agent is software that runs model-directed commands on your
                    machine. That sentence should make you ask hard questions — this page
                    and{" "}
                    <a
                        href={`${GITHUB_URL}/blob/main/SECURITY.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)]"
                    >
                        SECURITY.md
                    </a>{" "}
                    are the answers, and the{" "}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)]"
                    >
                        source
                    </a>{" "}
                    is the proof.
                </p>
            </div>
            <SecuritySection />
            <div className="mx-auto max-w-[1120px] px-6 py-16">
                <div className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                            No sandbox, stated plainly
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">
                            The app disables the macOS sandbox by design — shell execution,
                            LSP, and file tools require it. That trade-off is why the
                            approval gates above exist, and why they are deterministic
                            code rather than model judgment. Read the full model in{" "}
                            <Link href="/docs/security" className="text-[var(--accent)]">
                                the security docs
                            </Link>{" "}
                            and{" "}
                            <Link href="/docs/privacy" className="text-[var(--accent)]">
                                privacy docs
                            </Link>
                            .
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                            Reporting a vulnerability
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">
                            In scope: anything that bypasses exec approvals or the
                            Conscience gate, prompt-injection paths to command execution,
                            Keychain handling flaws, MCP host escapes, and daemon branch
                            escapes. Report privately via{" "}
                            <a
                                href={`${GITHUB_URL}/security`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--accent)]"
                            >
                                GitHub security advisories
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
