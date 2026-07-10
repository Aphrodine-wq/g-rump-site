import type { Metadata } from "next";
import { compileChangelog } from "@/lib/markdown";
import { GITHUB_RELEASES_URL } from "@/lib/facts";

export const metadata: Metadata = {
    title: "Changelog",
    description:
        "Every G-Rump release, synced straight from the repository's CHANGELOG.md.",
};

export default async function ChangelogPage() {
    const doc = await compileChangelog();

    return (
        <div className="mx-auto max-w-[760px] px-6 py-16">
            <p className="eyebrow">Changelog</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--text-1)]">
                What shipped
            </h1>
            <p className="mt-4 text-[var(--text-2)]">
                Synced from the repository&rsquo;s CHANGELOG.md. Artifacts for every
                release live on{" "}
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
            <div
                className="prose-grump mt-10"
                dangerouslySetInnerHTML={{ __html: doc.html }}
            />
        </div>
    );
}
