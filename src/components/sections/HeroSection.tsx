import Link from "next/link";
import { AppWindowMock } from "@/components/AppWindowMock";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
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
                            G-Rump is the agent loop, 160 tools, memory, and safety gates
                            a model needs to work on your machine — shipped as a native
                            Swift app that&rsquo;s early, rough in places, and honest
                            about which places. Bring your own key, or none with local
                            Ollama. It&rsquo;s free.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link href="/download" className="btn-primary">
                                Download for macOS
                            </Link>
                            <TrackedLink
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                                event="github_click"
                                eventData={{ placement: "hero" }}
                            >
                                View on GitHub
                            </TrackedLink>
                        </div>
                    </Reveal>
                </div>
                <div className="lg:col-span-6">
                    <Reveal delay={60}>
                        {/* Bleeds past the container edge on large screens. */}
                        <div className="lg:w-[120%]">
                            <AppWindowMock screenshotSrc="/product/hero-ide.png" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
