export default function DocsHome() {
  return (
    <article className="prose-grump">
      <div className="mb-8 rounded-2xl border border-stroke/40 bg-gradient-to-br from-blue-500/[0.06] to-purple-500/[0.04] p-6 sm:p-8">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500">Documentation</p>
        <h1 className="!mb-3">G-Rump</h1>
        <p className="lead !mb-0">
          Native macOS AI coding agent with 100+ tools, multi-provider AI,
          17 IDE intelligence panels, and deep system integration. Built with
          Swift and SwiftUI for macOS&nbsp;14+.
        </p>
      </div>

      <h2>What is G-Rump?</h2>
      <p>
        G-Rump brings the power of AI coding agents to macOS as a first-class
        native application. Unlike Electron-based alternatives, G-Rump
        integrates deeply with macOS — accessing Spotlight, Keychain, Calendar,
        OCR, xcodebuild, and more through native Swift APIs.
      </p>
      <p>
        Think of it as your Mac&apos;s most powerful coding companion — an agent
        that understands your codebase, speaks to every tool you use, and adapts
        to how you work.
      </p>

      <h2>Key Capabilities</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <CapCard
          title="Multi-Provider AI"
          desc="Anthropic, OpenAI, Ollama, OpenRouter, and on-device CoreML models. Switch mid-conversation."
          accent="#f59e0b"
        />
        <CapCard
          title="100+ Tools"
          desc="File, shell, git, docker, browser, cloud deploy, Spotlight, Keychain, Calendar, OCR, xcodebuild."
          accent="#3b82f6"
        />
        <CapCard
          title="17 IDE Panels"
          desc="File Navigator, Git, Tests, Assets, Localization, Profiling, Logs, Terminal, Apple Docs, and more."
          accent="#22c55e"
        />
        <CapCard
          title="40+ Skills"
          desc="Bundled SKILL.md files for SwiftUI, async/await, Kubernetes, code review, and more."
          accent="#a855f7"
        />
        <CapCard
          title="SOUL.md"
          desc="Define global and per-project AI personality — tone, conventions, and priorities."
          accent="#ef4444"
        />
        <CapCard
          title="58 MCP Servers"
          desc="Pre-configured Model Context Protocol servers with Keychain-backed credential vault."
          accent="#06b6d4"
        />
        <CapCard
          title="7 Agent Modes"
          desc="Chat, Plan, Build, Debate, Spec — each with tailored behavior, tool access, and output."
          accent="#f97316"
        />
        <CapCard
          title="Themes & Customization"
          desc="Light, Dark, and Fun themes (Cursor, ChatGPT, Claude, Gemini, Kiro). Zen Mode. Custom shortcuts."
          accent="#8b5cf6"
        />
      </div>

      <h2>Quick Start</h2>
      <div className="mt-4 rounded-xl border border-stroke/50 bg-bg-alt p-5">
        <pre className="font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-primary">
          <code>{`# Clone and build
git clone https://github.com/Aphrodine-wq/G-Rump_MAC_OS.git
cd G-Rump_MAC_OS
make run`}</code>
        </pre>
      </div>
      <p className="mt-3">
        Or double-click <code>G-Rump.command</code> to build and launch.
        See the <a href="/docs/quick-start">Quick Start guide</a> for details.
      </p>

      <h2>Explore the Docs</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <QuickLink href="/docs/quick-start" label="Quick Start" desc="Get running in under a minute" />
        <QuickLink href="/docs/providers" label="Multi-Provider AI" desc="Configure AI model providers" />
        <QuickLink href="/docs/agent-modes" label="Agent Modes" desc="Chat, Plan, Build, Debate, Spec, Parallel, Explore" />
        <QuickLink href="/docs/tools" label="100+ Tools" desc="File, shell, git, docker, and more" />
        <QuickLink href="/docs/skills" label="Skills System" desc="40+ expert skills, create your own" />
        <QuickLink href="/docs/mcp" label="MCP Servers" desc="58 pre-configured servers" />
        <QuickLink href="/docs/project-config" label="Project Config" desc="Per-project .grump/config.json" />
        <QuickLink href="/docs/exec-approvals" label="Exec Approvals" desc="Security for shell commands" />
      </div>

      <h2>Requirements</h2>
      <ul>
        <li><strong>macOS 14+</strong> (Sonoma or later)</li>
        <li><strong>Swift 5.9+</strong></li>
        <li>Xcode 15+ (for building from source)</li>
      </ul>
      <p>
        See <a href="/docs/requirements">System Requirements</a> for full details.
      </p>

      <h2>Open Source</h2>
      <p>
        G-Rump is open source on{" "}
        <a href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>. Star the repo, report issues, and contribute.
      </p>
    </article>
  );
}

function CapCard({ title, desc, accent }: { title: string; desc: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-stroke/50 p-4 transition-all hover:border-stroke/70 hover:bg-black/[0.01]">
      <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: accent }} />
      <p className="text-sm font-semibold text-primary">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}

function QuickLink({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <a
      href={href}
      className="group rounded-xl border border-stroke/40 p-4 transition-all hover:border-stroke/70 hover:bg-black/[0.02]"
    >
      <p className="text-sm font-semibold text-primary group-hover:text-blue transition-colors">
        {label} <span className="text-tertiary">&rarr;</span>
      </p>
      <p className="mt-1 text-xs text-secondary">{desc}</p>
    </a>
  );
}
