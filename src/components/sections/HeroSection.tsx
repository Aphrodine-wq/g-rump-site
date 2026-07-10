import Link from "next/link";
import { AppWindowMock } from "@/components/AppWindowMock";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL } from "@/lib/facts";

export function HeroSection() {
    return (
        <section className="overflow-x-clip">
            <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <Reveal>
                        <p className="eyebrow">Open source AI harness · macOS · MIT</p>
                        <h1 className="text-display mt-5 text-[var(--text-1)]">
                            The open-source AI harness that lives on your Mac.
                        </h1>
                        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--text-2)]">
                            G-Rump is the agent loop, 153 tools, memory, and safety gates
                            that let a model actually do work — shipped as a native Swift
                            app that learns from every run. Bring your own key. It&rsquo;s
                            free.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link href="/download" className="btn-primary">
                                Download for macOS
                            </Link>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </Reveal>
                </div>
                <div className="lg:col-span-6">
                    <Reveal delay={60}>
                        {/* Bleeds past the container edge on large screens. */}
                        <div className="lg:w-[120%]">
                            <AppWindowMock />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
