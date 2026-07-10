import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { DownloadCard } from "@/components/DownloadCard";
import { FrownyLogo } from "@/components/FrownyLogo";
import { GITHUB_URL, GITHUB_RELEASES_URL, FACTS } from "@/lib/facts";
import download from "@/data/download.json";

export const metadata: Metadata = {
    title: "Download",
    description: `Download G-Rump ${download.version} for macOS — the free, open-source AI harness. Direct download, SHA-256 checksum, and build-from-source instructions.`,
};

const SITE_URL = "https://www.g-rump.com";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "G-Rump",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS 14.0 or later",
    softwareVersion: download.version,
    fileSize: `${Math.round(download.sizeBytes / 1024)}KB`,
    downloadUrl: `${SITE_URL}${download.path}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: `${GITHUB_URL}/blob/main/LICENSE`,
};

const FAQ = [
    {
        question: "Why the quarantine step?",
        answer: (
            <>
                Current builds are ad-hoc signed rather than notarized with an Apple
                Developer ID, so Gatekeeper quarantines the app on first launch. The{" "}
                <code className="font-mono text-xs">xattr</code> command clears that flag
                once. You can read exactly what ships in the app —{" "}
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)]"
                >
                    the source is public
                </a>
                , and the SHA-256 checksum above lets you verify the download byte-for-byte.
            </>
        ),
    },
    {
        question: "What does it cost?",
        answer: (
            <>
                Nothing. G-Rump is free and MIT-licensed. You bring your own API key from
                Anthropic, OpenAI, Google, or OpenRouter, and pay that provider directly
                for what you use. There is no account, no subscription, and no backend.
            </>
        ),
    },
    {
        question: "Where do my API keys live?",
        answer: (
            <>
                In the macOS Keychain, and nowhere else. Keys never touch UserDefaults,
                config files, or disk, and the app talks to your provider directly. See{" "}
                <Link href="/docs/security" className="text-[var(--accent)]">
                    the security model
                </Link>{" "}
                for the full picture.
            </>
        ),
    },
    {
        question: "Apple silicon or Intel?",
        answer: <>Both — the release build is a universal binary. {FACTS.macOSRequirement} is the only hard requirement.</>,
    },
];

export default function DownloadPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mx-auto max-w-[1120px] px-6 pb-8">
                <section className="py-16">
                    <div className="flex items-center gap-4">
                        <FrownyLogo size={56} />
                        <div>
                            <p className="eyebrow">Download</p>
                            <h1 className="text-h2 text-[var(--text-1)]">Get G-Rump</h1>
                        </div>
                    </div>
                    <p className="mt-4 max-w-[52ch] text-[var(--text-2)]">
                        Served straight from g-rump.com. Free, open source, and yours — no
                        account, no telemetry, bring your own key.
                    </p>
                    <div className="mt-8">
                        <DownloadCard />
                    </div>
                </section>

                <section className="grid gap-12 border-t border-[var(--hairline)] py-16 lg:grid-cols-2">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                            Install
                        </h2>
                        <ol className="mt-6 space-y-5">
                            {[
                                <>Unzip <code className="font-mono text-[13px]">{download.filename}</code>.</>,
                                <>Drag <strong className="font-medium text-[var(--text-1)]">G-Rump.app</strong> into <strong className="font-medium text-[var(--text-1)]">Applications</strong>.</>,
                                <>
                                    Clear the one-time Gatekeeper quarantine (current builds are
                                    ad-hoc signed):
                                    <pre className="mt-2 overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-raised)] px-4 py-3 font-mono text-[13px] text-[var(--text-1)]">
                                        xattr -dr com.apple.quarantine /Applications/G-Rump.app
                                    </pre>
                                </>,
                                <>Launch G-Rump and paste an API key from any supported provider. Keys live in the Keychain only.</>,
                            ].map((step, i) => (
                                <li key={i} className="flex gap-4 text-sm leading-relaxed text-[var(--text-2)]">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] font-mono text-xs text-[var(--text-1)]">
                                        {i + 1}
                                    </span>
                                    <div className="min-w-0 flex-1">{step}</div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                                Verify the download
                            </h2>
                            <p className="mt-3 text-sm text-[var(--text-2)]">
                                Compare against the checksum shown above:
                            </p>
                            <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-raised)] px-4 py-3 font-mono text-[13px] text-[var(--text-1)]">
                                shasum -a 256 ~/Downloads/{download.filename}
                            </pre>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                                Build from source
                            </h2>
                            <p className="mt-3 text-sm text-[var(--text-2)]">
                                Prefer to compile it yourself? Xcode 16.2+ and two commands:
                            </p>
                            <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-raised)] px-4 py-3 font-mono text-[13px] leading-relaxed text-[var(--text-1)]">
                                {`git clone ${GITHUB_URL}.git\ncd G-Rump && make run`}
                            </pre>
                            <p className="mt-3 text-sm text-[var(--text-2)]">
                                See{" "}
                                <Link href="/docs/distribution" className="text-[var(--accent)]">
                                    Distribution
                                </Link>{" "}
                                for packaging, signing, and notarization.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--hairline)] py-16">
                    <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                        Version history
                    </h2>
                    <div className="mt-6 space-y-4">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="font-mono text-sm font-medium text-[var(--text-1)]">
                                v{download.version}
                            </span>
                            <span className="text-sm text-[var(--text-2)]">
                                Current — multi-provider release. Hosted here and on GitHub.
                            </span>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="font-mono text-sm text-[var(--text-3)]">v1.0</span>
                            <span className="text-sm text-[var(--text-3)]">
                                Pre-release (Qwen-era) — available on GitHub only.
                            </span>
                        </div>
                    </div>
                    <p className="mt-6 text-sm text-[var(--text-2)]">
                        Full details in the{" "}
                        <Link href="/changelog" className="text-[var(--accent)]">
                            changelog
                        </Link>
                        , every artifact on{" "}
                        <a
                            href={GITHUB_RELEASES_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)]"
                        >
                            GitHub Releases
                        </a>
                        .
                    </p>
                </section>

                <section className="border-t border-[var(--hairline)] py-16">
                    <h2 className="text-xl font-semibold tracking-tight text-[var(--text-1)]">
                        Questions
                    </h2>
                    <div className="mt-6 max-w-2xl">
                        <Accordion items={FAQ} />
                    </div>
                </section>
            </div>
        </>
    );
}
