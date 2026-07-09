import { Metadata } from "next";
import { FadeIn, TextReveal } from "@/ui/motion";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How G-Rump collects, uses, and protects your data. We believe in privacy by default and transparency by design.",
};

export default function PrivacyPage() {
    return (
        <>
            <PrivacyHero />
            <PrivacyContent />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function PrivacyHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[140px]" />
            <div className="relative">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Legal</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        Privacy Policy
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-relaxed text-secondary">
                        Your privacy matters. G-Rump is built with privacy by default and transparency by design.
                    </p>
                </TextReveal>
                <TextReveal delay={0.3}>
                    <p className="mt-4 text-xs text-tertiary">
                        Last updated: March 1, 2026
                    </p>
                </TextReveal>
            </div>
        </section>
    );
}

/* ───────────────────────── Content ───────────────────────── */

function PrivacyContent() {
    return (
        <section className="px-5 pb-28">
            <FadeIn>
                <div className="mx-auto max-w-[760px]">
                    <div className="prose-legal space-y-12">

                        {/* 1. Introduction */}
                        <PolicySection number="1" title="Introduction">
                            <p>
                                This Privacy Policy describes how G-Rump (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
                                protects information when you use the G-Rump macOS application, website, and related services
                                (collectively, the &quot;Service&quot;). By using the Service, you agree to the collection and use of
                                information in accordance with this policy.
                            </p>
                        </PolicySection>

                        {/* 2. Data We Collect */}
                        <PolicySection number="2" title="Data We Collect">
                            <p className="mb-4">We collect the following categories of information:</p>

                            <PolicySubsection title="Account Information">
                                <p>
                                    When you create an account, we collect your name, email address, and authentication
                                    credentials (via Google Sign-In). This information is stored in our Turso database
                                    and used to manage your account, subscription tier, and credit balance.
                                </p>
                            </PolicySubsection>

                            <PolicySubsection title="Chat Messages and AI Interactions">
                                <p>
                                    Chat messages you send through G-Rump are transmitted to your selected AI provider
                                    (OpenRouter, Anthropic, OpenAI, or others) for processing. We do not store the
                                    content of your conversations on our servers. When using our backend proxy,
                                    messages pass through our server for credit deduction but are not persisted.
                                    Conversation history is stored locally on your device.
                                </p>
                            </PolicySubsection>

                            <PolicySubsection title="Usage Analytics">
                                <p>
                                    With your explicit opt-in consent, we may collect anonymized usage analytics
                                    including feature usage patterns, agent mode selections, and tool execution
                                    frequency. No code content, file paths, or personally identifiable information
                                    is included in analytics data.
                                </p>
                            </PolicySubsection>

                            <PolicySubsection title="Payment Information">
                                <p>
                                    Payment processing is handled by Stripe. We do not store credit card numbers
                                    or payment method details on our servers. We retain transaction records
                                    (amounts, dates, subscription tier) for billing purposes.
                                </p>
                            </PolicySubsection>
                        </PolicySection>

                        {/* 3. Data Storage */}
                        <PolicySection number="3" title="Data Storage and Security">
                            <div className="space-y-4">
                                <div className="rounded-xl border border-stroke/50 bg-black/[0.01] p-5">
                                    <p className="text-sm font-semibold text-primary mb-2">Account Data</p>
                                    <p className="text-[13px] text-secondary leading-relaxed">
                                        Stored in Turso (distributed SQLite) with encryption at rest.
                                        Includes user profiles, credit balances, and subscription information.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-stroke/50 bg-black/[0.01] p-5">
                                    <p className="text-sm font-semibold text-primary mb-2">API Keys and Credentials</p>
                                    <p className="text-[13px] text-secondary leading-relaxed">
                                        Stored exclusively in the macOS Keychain — Apple&apos;s hardware-backed credential
                                        store. API keys are never written to disk in plaintext, never stored in
                                        configuration files, and never transmitted to our servers.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-stroke/50 bg-black/[0.01] p-5">
                                    <p className="text-sm font-semibold text-primary mb-2">Conversation History</p>
                                    <p className="text-[13px] text-secondary leading-relaxed">
                                        Stored locally on your device using SwiftData (or a local JSON store for
                                        SPM builds). Conversations are never synced to our servers or any cloud service.
                                    </p>
                                </div>
                            </div>
                        </PolicySection>

                        {/* 4. Third-Party Services */}
                        <PolicySection number="4" title="Third-Party Services">
                            <p className="mb-4">
                                G-Rump integrates with the following third-party services. Each has its own privacy
                                policy governing how they handle your data:
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        name: "OpenRouter",
                                        purpose: "AI model routing and chat completion",
                                        url: "https://openrouter.ai/privacy",
                                    },
                                    {
                                        name: "Anthropic",
                                        purpose: "Claude AI model provider",
                                        url: "https://www.anthropic.com/privacy",
                                    },
                                    {
                                        name: "OpenAI",
                                        purpose: "GPT AI model provider",
                                        url: "https://openai.com/privacy",
                                    },
                                    {
                                        name: "Google",
                                        purpose: "Authentication (Google Sign-In)",
                                        url: "https://policies.google.com/privacy",
                                    },
                                    {
                                        name: "Stripe",
                                        purpose: "Payment processing",
                                        url: "https://stripe.com/privacy",
                                    },
                                    {
                                        name: "Turso",
                                        purpose: "Account database hosting",
                                        url: "https://turso.tech/privacy-policy",
                                    },
                                ].map((service) => (
                                    <div key={service.name} className="rounded-lg border border-stroke/40 p-4">
                                        <p className="text-sm font-semibold text-primary">{service.name}</p>
                                        <p className="mt-1 text-xs text-secondary">{service.purpose}</p>
                                        <a
                                            href={service.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-1 text-xs text-blue transition-colors hover:text-blue-400"
                                        >
                                            Privacy policy
                                            <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </PolicySection>

                        {/* 5. Data Retention */}
                        <PolicySection number="5" title="Data Retention">
                            <ul className="space-y-3">
                                <PolicyListItem>
                                    <strong>Usage logs:</strong> Anonymized usage logs are retained for 90 days
                                    from the date of collection, then permanently deleted.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Account data:</strong> Retained for the duration of your account.
                                    Upon account deletion, all associated data is removed within 30 days.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Transaction records:</strong> Retained for 7 years as required
                                    by applicable financial regulations.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Local data:</strong> Conversation history, preferences, and cached
                                    data stored on your device are under your control and can be deleted at
                                    any time via the app settings or by running <code className="text-xs bg-black/[0.04] px-1.5 py-0.5 rounded">make reset</code>.
                                </PolicyListItem>
                            </ul>
                        </PolicySection>

                        {/* 6. Your Rights */}
                        <PolicySection number="6" title="Your Rights">
                            <p className="mb-4">You have the following rights regarding your data:</p>
                            <ul className="space-y-3">
                                <PolicyListItem>
                                    <strong>Access and export:</strong> You can export your account data at any time
                                    via the G-Rump API. Local conversation data can be exported from the app settings.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Deletion:</strong> You can request complete account deletion by contacting
                                    us at{" "}
                                    <a href="mailto:legal@g-rump.com" className="text-blue hover:text-blue-400 transition-colors">
                                        legal@g-rump.com
                                    </a>
                                    . All server-side data will be removed within 30 days.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Correction:</strong> You can update your account information through the
                                    app settings or by contacting us.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Portability:</strong> Your data can be exported in standard JSON format
                                    for use with other services.
                                </PolicyListItem>
                                <PolicyListItem>
                                    <strong>Opt-out:</strong> You can disable analytics collection at any time in the
                                    app settings. Using local AI models (Ollama, CoreML) ensures no data leaves your device.
                                </PolicyListItem>
                            </ul>
                        </PolicySection>

                        {/* 7. Cookies */}
                        <PolicySection number="7" title="Cookies and Tracking" id="cookies">
                            <p>
                                The G-Rump macOS application does not use cookies or tracking technologies.
                                The G-Rump website uses minimal, strictly necessary cookies for authentication
                                and session management only. We do not use advertising cookies, social media
                                tracking pixels, or third-party analytics on our website.
                            </p>
                        </PolicySection>

                        {/* 8. Ambient Monitoring */}
                        <PolicySection number="8" title="Ambient Monitoring">
                            <p>
                                G-Rump includes an optional ambient monitoring feature that can observe file
                                changes, git activity, and build events in your working directory to provide
                                proactive suggestions. This feature is <strong>strictly opt-in</strong> and
                                disabled by default. When enabled, all monitoring data is processed locally
                                on your device and is never transmitted to our servers or any third party.
                                You can disable ambient monitoring at any time in the app settings.
                            </p>
                        </PolicySection>

                        {/* 9. Children's Privacy */}
                        <PolicySection number="9" title="Children&apos;s Privacy">
                            <p>
                                G-Rump is not intended for use by individuals under the age of 13. We do not
                                knowingly collect personal information from children under 13. If we become
                                aware that we have collected personal data from a child under 13, we will
                                take steps to delete that information promptly. If you believe a child under
                                13 has provided us with personal information, please contact us at{" "}
                                <a href="mailto:legal@g-rump.com" className="text-blue hover:text-blue-400 transition-colors">
                                    legal@g-rump.com
                                </a>
                                .
                            </p>
                        </PolicySection>

                        {/* 10. Changes */}
                        <PolicySection number="10" title="Changes to This Policy">
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of
                                any material changes by posting the new policy on this page and updating the
                                &quot;Last updated&quot; date. For significant changes, we will provide additional
                                notice through the app or via email. Your continued use of the Service after
                                changes constitutes acceptance of the updated policy.
                            </p>
                        </PolicySection>

                        {/* 11. Contact */}
                        <PolicySection number="11" title="Contact Us">
                            <p className="mb-4">
                                If you have questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="rounded-xl border border-stroke/50 bg-black/[0.01] p-5">
                                <p className="text-sm text-secondary">
                                    Email:{" "}
                                    <a href="mailto:legal@g-rump.com" className="text-blue hover:text-blue-400 transition-colors">
                                        legal@g-rump.com
                                    </a>
                                </p>
                                <p className="mt-2 text-sm text-secondary">
                                    You can also reach us via our{" "}
                                    <Link href="/contact" className="text-blue hover:text-blue-400 transition-colors">
                                        contact page
                                    </Link>
                                    .
                                </p>
                            </div>
                        </PolicySection>

                        {/* Copyright */}
                        <div className="border-t border-stroke/30 pt-8">
                            <p className="text-xs text-tertiary">
                                &copy; 2025&ndash;2026 James Walton. All rights reserved.
                            </p>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    );
}

/* ───────────────────────── Shared Components ───────────────────────── */

function PolicySection({ number, title, id, children }: { number: string; title: string; id?: string; children: React.ReactNode }) {
    return (
        <div id={id}>
            <h2 className="text-xl font-bold text-primary mb-4">
                <span className="text-blue mr-2">{number}.</span>
                {title}
            </h2>
            <div className="text-[14px] leading-relaxed text-secondary">
                {children}
            </div>
        </div>
    );
}

function PolicySubsection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-4">
            <h3 className="text-[15px] font-semibold text-primary mb-2">{title}</h3>
            <div className="text-[14px] leading-relaxed text-secondary">{children}</div>
        </div>
    );
}

function PolicyListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5 text-[14px] text-secondary leading-relaxed">
            <svg className="h-4 w-4 shrink-0 mt-0.5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{children}</span>
        </li>
    );
}
