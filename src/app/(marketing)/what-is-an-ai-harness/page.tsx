import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL, FACTS } from "@/lib/facts";

export const metadata: Metadata = {
    title: "What Is an AI Harness?",
    description:
        "An AI harness is the machinery between a language model and your machine: the agent loop, tools, approvals, memory, and extension surface. Here's what each part does and why open source matters for all of them.",
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is an AI harness?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "An AI harness is the software machinery that sits between a language model and a real computer: the agent loop that lets the model take multiple steps, the tools it can call, the approval gates that constrain what it may do, the memory that persists between sessions, and the extension surface that lets it grow. The model supplies judgment; the harness supplies hands, guardrails, and continuity.",
            },
        },
        {
            "@type": "Question",
            name: "How is a harness different from an AI agent?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "An agent is the running combination of a model plus a harness pointed at a goal. The harness is the reusable machinery underneath — swap the model and the same harness produces a different agent.",
            },
        },
        {
            "@type": "Question",
            name: "Why should an AI harness be open source?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "A harness executes model-directed shell commands and file writes on your machine. Open source means you can read exactly what stands between the model and your system — the approval gates, the safety checks, where your API keys go — instead of taking a vendor's word for it.",
            },
        },
    ],
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2
            id={id}
            className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-[var(--text-1)]"
        >
            {children}
        </h2>
    );
}

function P({ children }: { children: React.ReactNode }) {
    return <p className="mt-4 leading-relaxed text-[var(--text-2)]">{children}</p>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
    return href.startsWith("/") ? (
        <Link href={href} className="text-[var(--accent)]">
            {children}
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">
            {children}
        </a>
    );
}

export default function AiHarnessPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <article className="mx-auto max-w-[680px] px-6 py-16">
                <p className="eyebrow">Concepts</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--text-1)]">
                    What is an AI harness?
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[var(--text-2)]">
                    A language model can write code, but it cannot run a build, read your
                    repository, or fix the test it just broke. An{" "}
                    <strong className="font-semibold text-[var(--text-1)]">AI harness</strong>{" "}
                    is everything that closes that gap: the machinery between the model
                    and a real computer. The model supplies judgment. The harness supplies
                    hands, guardrails, and continuity.
                </p>

                <H2 id="harness-vs-agent">Harness, agent, or IDE plugin?</H2>
                <P>
                    The words get used interchangeably, but they name different layers.
                    An <em>agent</em> is the running combination of a model plus a harness
                    pointed at a goal — &ldquo;fix this bug&rdquo; in, working code out. The{" "}
                    <em>harness</em> is the reusable machinery underneath: swap Claude for
                    GPT and the same harness produces a different agent. An{" "}
                    <em>IDE plugin</em> or copilot is narrower still — it suggests text
                    into an editor, but it does not own a loop, execute tools, or carry
                    memory of its own.
                </P>
                <P>
                    When people compare tools like Claude Code, Aider, OpenHands, or{" "}
                    <A href="/">G-Rump</A>, they are really comparing harnesses: the same
                    frontier models are available to all of them, so the difference is
                    entirely in the machinery.
                </P>

                <H2 id="five-components">The five components of a harness</H2>
                <P>
                    <strong className="font-semibold text-[var(--text-1)]">1. The agent loop.</strong>{" "}
                    One prompt, one answer is a chatbot. A harness runs a loop: the model
                    acts, observes the result, and acts again until the task is done or a
                    limit is hit. The loop needs streaming, parallelism, retries, and a
                    ceiling — G-Rump&rsquo;s runs {FACTS.agentLoopMaxTurns} steps by
                    default, configurable from 5 to 1,000 (
                    <A href="/docs/architecture">architecture</A>).
                </P>
                <P>
                    <strong className="font-semibold text-[var(--text-1)]">2. Tools.</strong>{" "}
                    Tools are the verbs the model can use: read a file, run a command,
                    query a database, take a screenshot. The breadth and quality of the
                    tool set bounds what the agent can do at all. G-Rump ships{" "}
                    {FACTS.tools} native tools (<A href="/docs/tools">the full list</A>),
                    from file operations to OCR to <code className="rounded border border-[var(--hairline-soft)] bg-[var(--bg-inset)] px-1 py-0.5 font-mono text-[13px]">xcodebuild</code>.
                </P>
                <P>
                    <strong className="font-semibold text-[var(--text-1)]">3. Approval gates.</strong>{" "}
                    A harness executes model-directed shell commands — the part everyone
                    should be nervous about. Serious harnesses make the safety model
                    explicit: per-binary exec approvals, deterministic fail-closed checks
                    before mutating actions, protected paths the model cannot touch
                    without sign-off (<A href="/docs/security">G-Rump&rsquo;s security model</A>).
                    If a harness can&rsquo;t tell you exactly what stands between the
                    model and your machine, that is the answer.
                </P>
                <P>
                    <strong className="font-semibold text-[var(--text-1)]">4. Memory.</strong>{" "}
                    Without persistence, every session starts from zero and the agent
                    re-learns your codebase daily. A harness with memory carries context
                    across sessions — and the interesting frontier is harnesses that{" "}
                    <em>learn</em>: G-Rump records every run&rsquo;s outcome, distills
                    lessons from failures and corrections, and proposes new skills as
                    diffs you approve (<A href="/docs/learning-loop">the learning loop</A>).
                </P>
                <P>
                    <strong className="font-semibold text-[var(--text-1)]">5. The extension surface.</strong>{" "}
                    No tool set is complete. A harness needs a standard way to grow —
                    today that is MCP, the Model Context Protocol. G-Rump is both an MCP
                    client with {FACTS.mcpPresets} one-click presets and an MCP server
                    that exposes its own tools to other apps (<A href="/docs/mcp">MCP docs</A>).
                </P>

                <H2 id="why-open-source">Why open source matters here</H2>
                <P>
                    For most software, open source is a preference. For a harness it is
                    closer to a requirement, because of what the software <em>is</em>: a
                    program that runs model-directed commands on your machine, with your
                    credentials nearby. Three things you can only truly verify with
                    source access: what the approval gates actually check, where your API
                    keys go, and what leaves your machine.
                </P>
                <P>
                    G-Rump&rsquo;s answers are checkable:{" "}
                    <A href={GITHUB_URL}>the entire app is MIT-licensed on GitHub</A> —
                    keys live in the macOS Keychain only, requests go straight to your
                    provider, and there is no backend to trust. That is the standard an
                    open-source AI harness should be held to.
                </P>

                <H2 id="try-one">Try one</H2>
                <P>
                    The fastest way to understand a harness is to watch one work.{" "}
                    <A href="/download">Download G-Rump</A> — it&rsquo;s free, runs on{" "}
                    {FACTS.macOSRequirement}, and takes about five minutes from download
                    to first task (<A href="/docs/quick-start">quick start</A>). Or start
                    from the <A href="/docs/architecture">architecture docs</A> if you&rsquo;d
                    rather read the machinery first.
                </P>
            </article>
        </>
    );
}
