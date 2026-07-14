import download from "@/data/download.json";
import { FACTS } from "@/lib/facts";
import { CopyButton } from "./CopyButton";
import { TrackedLink } from "./TrackedLink";

function formatSize(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function DownloadCard() {
    return (
        <div className="glass max-w-xl rounded-2xl p-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-2xl font-semibold tracking-tight text-[var(--text-1)]">
                    G-Rump {download.version}
                </span>
                <span className="font-mono text-sm text-[var(--text-3)]">
                    {formatSize(download.sizeBytes)}
                </span>
            </div>
            <p className="mt-2 text-sm text-[var(--text-2)]">
                {FACTS.macOSRequirement} · Apple silicon &amp; Intel · Free, {FACTS.license} licensed
            </p>
            <TrackedLink
                href={download.path}
                className="btn-primary mt-6 w-full sm:w-auto"
                download
                event="download_app"
                eventData={{ version: download.version }}
            >
                Download for macOS
            </TrackedLink>
            <div className="mt-6 flex items-center gap-2 border-t border-[var(--hairline-soft)] pt-4">
                <span className="font-mono text-xs text-[var(--text-3)]">SHA-256</span>
                <code className="min-w-0 flex-1 truncate font-mono text-xs text-[var(--text-2)]">
                    {download.sha256}
                </code>
                <CopyButton text={download.sha256} />
            </div>
        </div>
    );
}
