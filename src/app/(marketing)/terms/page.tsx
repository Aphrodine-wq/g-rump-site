import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms",
    description:
        "Terms of use for G-Rump: MIT-licensed software provided as-is. You are responsible for what you run and for your API provider costs.",
};

export default function TermsPage() {
    return (
        <div className="mx-auto max-w-[680px] px-6 py-16">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-1)]">
                Terms
            </h1>
            <p className="mt-3 font-mono text-sm text-[var(--text-3)]">
                Effective July 10, 2026
            </p>
            <div className="prose-grump mt-8">
                <h2>The software</h2>
                <p>
                    G-Rump is open-source software released under the{" "}
                    <a
                        href="https://github.com/Aphrodine-wq/G-Rump/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        MIT License
                    </a>
                    . That license governs your use of the app: it is provided{" "}
                    <strong>&ldquo;as is&rdquo;, without warranty of any kind</strong>,
                    and the authors are not liable for claims or damages arising from its
                    use.
                </p>
                <h2>You are the operator</h2>
                <ul>
                    <li>
                        G-Rump executes commands and edits files at the direction of a
                        language model, under safety gates you configure. You are
                        responsible for reviewing what it does, especially with permissive
                        approval settings, and for anything run on your machine.
                    </li>
                    <li>
                        You bring your own API keys. Costs charged by your provider, and
                        compliance with your provider&rsquo;s terms of service, are your
                        responsibility.
                    </li>
                    <li>
                        Back up your work. The agent can modify and delete files — git is
                        your friend.
                    </li>
                </ul>
                <h2>This website</h2>
                <p>
                    Site content is provided for information. Downloads are offered
                    as-is; verify checksums before installing. We may update the site and
                    these terms at any time — material changes will show a new effective
                    date above.
                </p>
            </div>
        </div>
    );
}
