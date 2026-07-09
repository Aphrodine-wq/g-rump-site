"use client";

import { useState } from "react";
import { FadeIn, SlideIn, TextReveal } from "@/ui/motion";
import { SectionHeader } from "@/components/SectionHeader";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />
                <div className="relative">
                    <TextReveal>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Contact</p>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                            Let&apos;s talk.
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                        <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-relaxed text-secondary">
                            Questions about G-Rump? Enterprise inquiries? We&apos;d love to hear from you.
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Form + Info */}
            <section className="px-5 py-16">
                <div className="mx-auto max-w-[1000px] grid gap-12 lg:grid-cols-5">
                    {/* Form */}
                    <SlideIn direction="left" className="lg:col-span-3">
                        {submitted ? (
                            <div className="glass-card rounded-2xl p-12 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-6">
                                    <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-primary">Message sent.</h3>
                                <p className="mt-2 text-sm text-secondary">We&apos;ll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSubmitted(true);
                                }}
                                className="glass-card rounded-2xl p-8 space-y-5"
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-widest text-tertiary mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-widest text-tertiary mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-widest text-tertiary mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-secondary outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all appearance-none">
                                        <option value="general">General Inquiry</option>
                                        <option value="enterprise">Enterprise / Sales</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="careers">Careers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-widest text-tertiary mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3 text-sm text-primary placeholder:text-tertiary outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </SlideIn>

                    {/* Info */}
                    <SlideIn direction="right" className="lg:col-span-2 space-y-6">
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-primary mb-3">Enterprise</h3>
                            <p className="text-[13px] leading-relaxed text-secondary">
                                Need centralized API key management, SSO, audit logging, or custom model routing for your team?
                                We&apos;ll set up a call to discuss your requirements.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-primary mb-3">Technical Support</h3>
                            <p className="text-[13px] leading-relaxed text-secondary">
                                Check our{" "}
                                <a href="/docs" className="text-blue hover:opacity-80 transition-opacity">documentation</a>{" "}
                                first. If you&apos;re still stuck, file an issue on{" "}
                                <a href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS" target="_blank" rel="noopener noreferrer" className="text-blue hover:opacity-80 transition-opacity">GitHub</a>{" "}
                                or use the form.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-primary mb-3">Connect</h3>
                            <div className="space-y-2">
                                <a href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-secondary hover:text-primary transition-colors">
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                                <a href="#" className="flex items-center gap-2.5 text-[13px] text-secondary hover:text-primary transition-colors">
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    Twitter / X
                                </a>
                                <a href="#" className="flex items-center gap-2.5 text-[13px] text-secondary hover:text-primary transition-colors">
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                                    </svg>
                                    Discord
                                </a>
                            </div>
                        </div>
                    </SlideIn>
                </div>
            </section>
        </>
    );
}
