import { Metadata } from "next";
import { FadeIn, TextReveal } from "@/ui/motion";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms and conditions governing your use of the G-Rump macOS AI coding agent and related services.",
};

export default function TermsPage() {
    return (
        <>
            <TermsHero />
            <TermsContent />
        </>
    );
}

/* ───────────────────────── Hero ───────────────────────── */

function TermsHero() {
    return (
        <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple/[0.03] blur-[140px]" />
            <div className="relative">
                <TextReveal>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Legal</p>
                </TextReveal>
                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                        Terms of Service
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-relaxed text-secondary">
                        Please read these terms carefully before using G-Rump. By using the Service, you agree to be bound by these terms.
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

function TermsContent() {
    return (
        <section className="px-5 pb-28">
            <FadeIn>
                <div className="mx-auto max-w-[760px]">
                    <div className="prose-legal space-y-12">

                        {/* 1. Acceptance */}
                        <TermsSection number="1" title="Acceptance of Terms">
                            <p>
                                By accessing or using G-Rump (the &quot;Service&quot;), including the macOS application,
                                website, API, and backend services, you agree to be bound by these Terms of Service
                                (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service.
                                These Terms constitute a legally binding agreement between you and G-Rump
                                (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                            </p>
                        </TermsSection>

                        {/* 2. Description of Service */}
                        <TermsSection number="2" title="Description of Service">
                            <p>
                                G-Rump is a native macOS AI coding agent that provides chat-based AI assistance
                                with file system, shell, git, and system control tools. The Service includes:
                            </p>
                            <ul className="mt-4 space-y-2">
                                <TermsListItem>The G-Rump macOS and iOS applications</TermsListItem>
                                <TermsListItem>Backend proxy and authentication services</TermsListItem>
                                <TermsListItem>AI model routing via OpenRouter and direct provider APIs</TermsListItem>
                                <TermsListItem>MCP (Model Context Protocol) server integrations</TermsListItem>
                                <TermsListItem>The G-Rump website and documentation</TermsListItem>
                            </ul>
                        </TermsSection>

                        {/* 3. Account Registration */}
                        <TermsSection number="3" title="Account Registration">
                            <p>
                                To access certain features of the Service, you must create an account. You agree to
                                provide accurate, current, and complete information during registration and to keep
                                your account information updated. You are responsible for maintaining the security
                                of your account credentials and for all activities that occur under your account.
                                You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </TermsSection>

                        {/* 4. Acceptable Use */}
                        <TermsSection number="4" title="Acceptable Use">
                            <p className="mb-4">You agree not to use the Service to:</p>
                            <ul className="space-y-2">
                                <TermsListItem>
                                    Violate any applicable local, state, national, or international law or regulation
                                </TermsListItem>
                                <TermsListItem>
                                    Generate, distribute, or facilitate malware, ransomware, or other malicious software
                                </TermsListItem>
                                <TermsListItem>
                                    Attempt to gain unauthorized access to other computer systems, networks, or data
                                </TermsListItem>
                                <TermsListItem>
                                    Circumvent, disable, or interfere with security features of the Service
                                </TermsListItem>
                                <TermsListItem>
                                    Use the Service to infringe upon the intellectual property rights of others
                                </TermsListItem>
                                <TermsListItem>
                                    Reverse engineer, decompile, or disassemble the Service beyond what is permitted
                                    by applicable open-source licenses
                                </TermsListItem>
                                <TermsListItem>
                                    Use automated means to access the Service in a manner that exceeds reasonable usage
                                    or places undue burden on our infrastructure
                                </TermsListItem>
                                <TermsListItem>
                                    Resell, redistribute, or sublicense access to the Service without our written consent
                                </TermsListItem>
                            </ul>
                        </TermsSection>

                        {/* 5. Payment Terms */}
                        <TermsSection number="5" title="Payment Terms">
                            <TermsSubsection title="Subscription Plans">
                                <p>
                                    G-Rump offers multiple subscription tiers (Free, Pro, and Team) with varying
                                    feature access and usage limits. Plan details and pricing are available on our{" "}
                                    <Link href="/pricing" className="text-blue hover:text-blue-400 transition-colors">
                                        pricing page
                                    </Link>
                                    . We reserve the right to modify pricing with 30 days&apos; advance notice.
                                </p>
                            </TermsSubsection>

                            <TermsSubsection title="Credit Packs">
                                <p>
                                    In addition to subscription plans, you may purchase credit packs for pay-as-you-go
                                    AI usage. Credits are non-transferable and are deducted based on model usage and
                                    token consumption. Unused credits do not expire as long as your account remains active.
                                </p>
                            </TermsSubsection>

                            <TermsSubsection title="Billing and Refunds">
                                <p>
                                    Subscription fees are billed in advance on a monthly or annual basis. All payments
                                    are processed by Stripe. Refunds are available within 14 days of initial purchase
                                    if you have not consumed more than 10% of your included credits or usage allocation.
                                    After usage exceeds 10%, no refunds will be issued for the current billing period.
                                    Credit pack purchases are non-refundable once any credits have been consumed.
                                </p>
                            </TermsSubsection>

                            <TermsSubsection title="Free Tier">
                                <p>
                                    The free tier provides limited access to the Service at no cost. We reserve the right
                                    to modify free tier limits at any time. Free tier users may be subject to rate limiting
                                    during periods of high demand.
                                </p>
                            </TermsSubsection>
                        </TermsSection>

                        {/* 6. Intellectual Property */}
                        <TermsSection number="6" title="Intellectual Property">
                            <TermsSubsection title="Your Content">
                                <p>
                                    You retain all ownership rights to the code, files, and content you create using
                                    the Service. G-Rump does not claim any ownership interest in your content. You
                                    grant us a limited license to process your content solely for the purpose of
                                    providing the Service (e.g., sending code context to AI providers for completion).
                                </p>
                            </TermsSubsection>

                            <TermsSubsection title="AI-Generated Output">
                                <p>
                                    Code and content generated by AI models through the Service is provided &quot;as is&quot;
                                    without any warranty of originality, correctness, or fitness for a particular purpose.
                                    You are responsible for reviewing, testing, and validating all AI-generated output
                                    before use in production. We make no representations regarding intellectual property
                                    rights in AI-generated content.
                                </p>
                            </TermsSubsection>

                            <TermsSubsection title="G-Rump Software">
                                <p>
                                    The G-Rump application is open source and licensed under the terms specified in our{" "}
                                    <a
                                        href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue hover:text-blue-400 transition-colors"
                                    >
                                        GitHub repository
                                    </a>
                                    . The backend services, brand assets, and website content remain proprietary and
                                    may not be reproduced without permission.
                                </p>
                            </TermsSubsection>
                        </TermsSection>

                        {/* 7. Third-Party Services */}
                        <TermsSection number="7" title="Third-Party Services">
                            <p>
                                The Service integrates with third-party AI providers (OpenRouter, Anthropic, OpenAI,
                                and others), payment processors (Stripe), and MCP servers. Your use of these
                                third-party services is subject to their respective terms of service. We are not
                                responsible for the availability, accuracy, or content provided by third-party
                                services. When using your own API keys for direct provider access, you are solely
                                responsible for compliance with those providers&apos; terms.
                            </p>
                        </TermsSection>

                        {/* 8. Limitation of Liability */}
                        <TermsSection number="8" title="Limitation of Liability">
                            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.03] p-5">
                                <p className="text-[14px] leading-relaxed text-secondary">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, G-RUMP AND ITS OFFICERS, DIRECTORS,
                                    EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                                    CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
                                    DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
                                </p>
                                <p className="mt-3 text-[14px] leading-relaxed text-secondary">
                                    OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE
                                    SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                                </p>
                                <p className="mt-3 text-[14px] leading-relaxed text-secondary">
                                    THE SERVICE EXECUTES COMMANDS ON YOUR LOCAL SYSTEM WITH YOUR EXPLICIT APPROVAL.
                                    YOU ARE SOLELY RESPONSIBLE FOR REVIEWING AND APPROVING ALL COMMANDS BEFORE EXECUTION.
                                    WE ARE NOT LIABLE FOR ANY DAMAGES RESULTING FROM COMMANDS YOU APPROVE.
                                </p>
                            </div>
                        </TermsSection>

                        {/* 9. Disclaimer of Warranties */}
                        <TermsSection number="9" title="Disclaimer of Warranties">
                            <p>
                                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
                                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
                                WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. AI-GENERATED
                                OUTPUT MAY CONTAIN ERRORS, INACCURACIES, OR SECURITY VULNERABILITIES. YOU USE ALL
                                OUTPUT AT YOUR OWN RISK.
                            </p>
                        </TermsSection>

                        {/* 10. Termination */}
                        <TermsSection number="10" title="Termination">
                            <p className="mb-4">
                                Either party may terminate this agreement at any time:
                            </p>
                            <ul className="space-y-2">
                                <TermsListItem>
                                    <strong>By you:</strong> You may stop using the Service and delete your account at
                                    any time. Subscription cancellations take effect at the end of the current billing period.
                                </TermsListItem>
                                <TermsListItem>
                                    <strong>By us:</strong> We may suspend or terminate your access if you violate these
                                    Terms, engage in abusive behavior, or fail to pay applicable fees. We will provide
                                    reasonable notice when possible.
                                </TermsListItem>
                            </ul>
                            <p className="mt-4">
                                Upon termination, your right to use the Service ceases immediately. Locally stored data
                                remains on your device. We will retain your account data for 30 days after termination
                                to allow for reactivation, after which it will be permanently deleted.
                            </p>
                        </TermsSection>

                        {/* 11. Indemnification */}
                        <TermsSection number="11" title="Indemnification">
                            <p>
                                You agree to indemnify and hold harmless G-Rump and its affiliates, officers, directors,
                                employees, and agents from any claims, damages, losses, or expenses (including reasonable
                                attorney&apos;s fees) arising from your use of the Service, your violation of these Terms,
                                or your infringement of any third-party rights.
                            </p>
                        </TermsSection>

                        {/* 12. Governing Law */}
                        <TermsSection number="12" title="Governing Law">
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the
                                United States and the State of California, without regard to conflict of law principles.
                                Any disputes arising from these Terms or the Service shall be resolved in the state
                                or federal courts located in San Francisco County, California. You consent to the
                                personal jurisdiction of these courts.
                            </p>
                        </TermsSection>

                        {/* 13. Changes */}
                        <TermsSection number="13" title="Changes to These Terms">
                            <p>
                                We reserve the right to modify these Terms at any time. We will provide at least 30 days&apos;
                                notice of material changes by posting the updated Terms on this page and updating the
                                &quot;Last updated&quot; date. For significant changes, we will notify you via email or through
                                the app. Your continued use of the Service after changes take effect constitutes
                                acceptance of the revised Terms.
                            </p>
                        </TermsSection>

                        {/* 14. Privacy */}
                        <TermsSection number="14" title="Privacy">
                            <p>
                                Your use of the Service is also governed by our{" "}
                                <Link href="/privacy" className="text-blue hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                , which describes how we collect, use, and protect your information. By using the
                                Service, you consent to the data practices described in the Privacy Policy.
                            </p>
                        </TermsSection>

                        {/* 15. Contact */}
                        <TermsSection number="15" title="Contact Us">
                            <p className="mb-4">
                                If you have questions about these Terms, please contact us:
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
                        </TermsSection>

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

function TermsSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
    return (
        <div>
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

function TermsSubsection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-4">
            <h3 className="text-[15px] font-semibold text-primary mb-2">{title}</h3>
            <div className="text-[14px] leading-relaxed text-secondary">{children}</div>
        </div>
    );
}

function TermsListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5 text-[14px] text-secondary leading-relaxed">
            <svg className="h-4 w-4 shrink-0 mt-0.5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{children}</span>
        </li>
    );
}
