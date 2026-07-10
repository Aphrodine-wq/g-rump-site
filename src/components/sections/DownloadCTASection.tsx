import { DownloadCard } from "@/components/DownloadCard";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL } from "@/lib/facts";

export function DownloadCTASection() {
    return (
        <section className="border-t border-[var(--hairline)]">
            <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 py-24 lg:grid-cols-2">
                <Reveal>
                    <p className="eyebrow">Get started</p>
                    <h2 className="text-h2 mt-4 max-w-[18ch] text-[var(--text-1)]">
                        Five minutes from download to first task.
                    </h2>
                    <p className="mt-4 max-w-[46ch] text-[var(--text-2)]">
                        Or clone it and read every line before you run it — that&rsquo;s
                        the point of open source.
                    </p>
                    <pre className="mt-6 max-w-md overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-raised)] px-4 py-3 font-mono text-[13px] text-[var(--text-1)]">
                        {`git clone ${GITHUB_URL.replace("https://", "")}.git`}
                    </pre>
                </Reveal>
                <Reveal delay={60}>
                    <DownloadCard />
                </Reveal>
            </div>
        </section>
    );
}
