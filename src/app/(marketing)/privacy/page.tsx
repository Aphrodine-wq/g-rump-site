import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy",
    description:
        "G-Rump's privacy policy is short because there's little to disclose: no accounts, no telemetry, no backend. Your keys stay in the Keychain and your code stays on your machine.",
};

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-[680px] px-6 py-16">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-1)]">
                Privacy
            </h1>
            <p className="mt-3 font-mono text-sm text-[var(--text-3)]">
                Effective July 10, 2026
            </p>
            <div className="prose-grump mt-8">
                <p className="lead">
                    This policy is short because there isn&rsquo;t much to disclose.
                    G-Rump has no accounts, no telemetry, and no backend.
                </p>
                <h2>The app</h2>
                <ul>
                    <li>
                        <strong>API keys</strong> are stored in the macOS Keychain only.
                        They are sent exclusively to the provider you configured
                        (Anthropic, OpenAI, Google, or OpenRouter) to make the requests
                        you initiate.
                    </li>
                    <li>
                        <strong>Your code and prompts</strong> go directly from your
                        machine to your chosen provider. We never see them — there is no
                        intermediary server. Your provider&rsquo;s data policy applies to
                        what you send it.
                    </li>
                    <li>
                        <strong>Memory, lessons, and settings</strong> are stored locally
                        in <code>~/.grump</code> and{" "}
                        <code>~/Library/Application Support/GRump</code>. They never leave
                        your machine. <code>make reset</code> deletes them.
                    </li>
                    <li>
                        <strong>No analytics.</strong> The app contains no telemetry,
                        crash reporting, or usage tracking of any kind.
                    </li>
                </ul>
                <h2>This website</h2>
                <ul>
                    <li>
                        The site is static and sets no cookies. We run no analytics
                        scripts.
                    </li>
                    <li>
                        It is hosted on Vercel, whose infrastructure logs requests (IP
                        address, user agent) for operation of the service, per{" "}
                        <a
                            href="https://vercel.com/legal/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vercel&rsquo;s privacy policy
                        </a>
                        .
                    </li>
                </ul>
                <h2>Questions</h2>
                <p>
                    Open an issue on{" "}
                    <a
                        href="https://github.com/Aphrodine-wq/G-Rump/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>{" "}
                    or see the <Link href="/docs/privacy">privacy docs</Link> for the
                    app&rsquo;s privacy manifest and on-device processing details.
                </p>
            </div>
        </div>
    );
}
