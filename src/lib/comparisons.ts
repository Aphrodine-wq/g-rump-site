/**
 * Data for the /vs/<tool> comparison pages. Honest by policy: every entry
 * says what the other tool does better. These pages exist to help someone
 * choose, not to win.
 */

export type Comparison = {
    slug: string;
    name: string;
    title: string;
    description: string;
    intro: string;
    rows: [string, string, string][]; // [aspect, G-Rump, them]
    chooseThem: string[];
    chooseGrump: string[];
    theirUrl: string;
    verdict: string;
};

export const COMPARISONS: Comparison[] = [
    {
        slug: "claude-code",
        name: "Claude Code",
        title: "G-Rump vs Claude Code",
        description:
            "An honest comparison of G-Rump and Claude Code: native macOS app vs terminal CLI, open source vs proprietary, BYOK multi-provider vs Anthropic-first.",
        intro:
            "Claude Code is Anthropic's agentic coding CLI — arguably the strongest agentic coder you can run today, with first-party model integration and a deep ecosystem. G-Rump is an open-source native Mac app that speaks to five providers. These are different bets, and one of them is made by a company with a frontier lab attached.",
        rows: [
            ["Runs as", "native macOS app", "terminal CLI (+ IDE extensions, web)"],
            ["Source", "MIT, fully open", "proprietary"],
            ["Providers", "Anthropic, OpenAI, Google, OpenRouter, local Ollama (BYOK)", "Anthropic models, subscription or API billing"],
            ["Task reliability", "honest answer: improving, needs steering on hard tasks", "state of the art"],
            ["Memory", "built-in three-tier cross-session memory (experimental learning loop)", "CLAUDE.md project files + auto-memory"],
            ["Extensibility", "MCP client + server, 73 bundled skills", "MCP, skills, hooks, subagents — larger ecosystem"],
            ["Cost", "free app, pay your provider directly", "subscription or API usage"],
        ],
        chooseThem: [
            "You want the most capable, battle-tested agentic coder available right now.",
            "You live in the terminal or want IDE integrations backed by a large team.",
            "You're all-in on Claude models and want first-party support the day they ship.",
        ],
        chooseGrump: [
            "You want a native Mac app — dock panels, Keychain, simulator, Spotlight — not a terminal process.",
            "You want to switch providers freely, or run local models with no key at all.",
            "You want to read every line of the harness you're trusting with shell access.",
        ],
        theirUrl: "https://claude.com/claude-code",
        verdict:
            "If raw capability is the only axis, use Claude Code — that's the honest call from a project that ships a comparison page. G-Rump's bet is different: open source, native, multi-provider, with a memory. If that bet matters to you, it's free to try.",
    },
    {
        slug: "aider",
        name: "Aider",
        title: "G-Rump vs Aider",
        description:
            "An honest comparison of G-Rump and Aider: native macOS app vs git-centric terminal pair programmer, both open source and BYOK.",
        intro:
            "Aider is the veteran open-source AI pair programmer — a Python CLI with tight git integration, years of refinement, and a benchmark culture. G-Rump shares its open-source, BYOK values and disagrees about the interface: it thinks a coding agent should be a Mac app with panels, memory, and an approval-gated tool system.",
        rows: [
            ["Runs as", "native macOS app (Swift)", "terminal CLI (Python)"],
            ["License", "MIT", "Apache-2.0"],
            ["Maturity", "young — v2.1, rough edges documented on the roadmap", "years of releases, well-benchmarked"],
            ["Git integration", "git tools in the loop + git panel", "deeply git-native: auto-commits every change"],
            ["Memory", "three-tier cross-session memory built in (experimental)", "none across sessions"],
            ["Beyond code edits", "160 tools: shell, HTTP, SQLite, OCR, simulator, Apple-native", "focused on code editing"],
            ["Platform", "macOS 14+ only", "anywhere Python runs"],
        ],
        chooseThem: [
            "You want a proven, benchmark-honed tool that's been refined for years.",
            "You work on Linux/Windows, or want the same tool on every machine.",
            "You want every AI change auto-committed with clean git hygiene.",
        ],
        chooseGrump: [
            "You want an app, not a REPL — with a UI for diffs, approvals, panels, and build output.",
            "You want the agent to remember your project between sessions.",
            "You want tools beyond editing: run the simulator, hit an API, read a screenshot.",
        ],
        theirUrl: "https://aider.chat",
        verdict:
            "Aider is more mature; G-Rump is more ambitious about surface area. If you're on a Mac and want the native-app version of the same open-source, BYOK philosophy, try G-Rump. If you want maximum stability today, Aider has earned its reputation.",
    },
    {
        slug: "openhands",
        name: "OpenHands",
        title: "G-Rump vs OpenHands",
        description:
            "An honest comparison of G-Rump and OpenHands: native macOS app vs sandboxed web platform, both MIT-licensed open source.",
        intro:
            "OpenHands (formerly OpenDevin) is an MIT-licensed agentic platform that runs agents in sandboxed Docker environments behind a web UI, with serious research energy behind it. G-Rump is also MIT — but it's a 13 MB native Mac app that runs on your machine directly, with explicit approval gates instead of a sandbox.",
        rows: [
            ["Runs as", "native macOS app", "web UI + Docker sandbox (or cloud)"],
            ["License", "MIT", "MIT"],
            ["Isolation model", "your machine, gated: exec approvals + fail-closed checks", "sandboxed containers — stronger isolation"],
            ["Setup", "unzip, add a key (or Ollama), go", "Docker (or their cloud)"],
            ["Footprint", "~13 MB, no Electron, no containers", "container images, browser UI"],
            ["Memory", "three-tier cross-session memory built in (experimental)", "per-task context; microagents for repo knowledge"],
            ["Autonomy", "opt-in daemon, scratch branches, never pushes", "designed for long autonomous runs in the sandbox"],
        ],
        chooseThem: [
            "You want hard isolation — the agent literally cannot touch your machine.",
            "You want long, hands-off autonomous runs, or a hosted cloud option.",
            "You work outside macOS.",
        ],
        chooseGrump: [
            "You want the agent working on your real machine and real toolchain — Xcode, simulators, Keychain — with gates instead of walls.",
            "You want a instant-start native app instead of a Docker stack.",
            "You want cross-session memory of you and your projects.",
        ],
        theirUrl: "https://github.com/All-Hands-AI/OpenHands",
        verdict:
            "Different isolation philosophies: OpenHands sandboxes the agent away from your machine; G-Rump gates the agent on your machine because the machine is the point — your simulators, your tools, your projects. Pick the philosophy that matches your risk tolerance.",
    },
];

export function getComparison(slug: string): Comparison | undefined {
    return COMPARISONS.find((c) => c.slug === slug);
}
