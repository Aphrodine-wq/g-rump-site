export default function QuickStart() {
  return (
    <article className="prose-grump">
      <h1>Quick Start</h1>
      <p className="lead">
        Get G-Rump running in under a minute. Build from source or launch with
        a single command.
      </p>

      <h2>Build &amp; Run</h2>
      <CodeBlock
        code={`# Build and run (debug)
make run

# Build release .app bundle
make app

# Build release .app + .dmg
make dmg

# Reset app state for fresh-boot testing
make reset`}
      />

      <p>
        Or double-click <code>G-Rump.command</code> to build and launch
        automatically.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li><strong>macOS 14+</strong> (Sonoma or later)</li>
        <li><strong>Swift 5.9+</strong></li>
        <li>Xcode 15+ (for building from source)</li>
      </ul>

      <h2>First Launch</h2>
      <p>
        On first launch, G-Rump will ask you to configure an AI provider. You
        can start with any supported provider:
      </p>
      <ul>
        <li><strong>Anthropic</strong> — Claude 3.5 Sonnet, Opus, Haiku</li>
        <li><strong>OpenAI</strong> — GPT-4o, o1, o1-mini</li>
        <li><strong>Ollama</strong> — Run models locally with full privacy</li>
        <li><strong>OpenRouter</strong> — Access 100+ models through one API</li>
        <li><strong>CoreML</strong> — On-device models on Apple Silicon</li>
      </ul>

      <h2>macOS Permissions</h2>
      <p>
        For full functionality, grant G-Rump the following permissions in
        System Settings:
      </p>
      <ul>
        <li><strong>Notifications</strong> — System Settings → Notifications → G-Rump</li>
        <li><strong>Screen Recording</strong> — System Settings → Privacy &amp; Security → Screen Recording</li>
        <li><strong>Accessibility</strong> — System Settings → Privacy &amp; Security → Accessibility</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/project-config">Set up project configuration</a></li>
        <li><a href="/docs/agent-modes">Explore agent modes</a></li>
        <li><a href="/docs/skills">Browse available skills</a></li>
      </ul>
    </article>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-stroke/50 bg-bg-alt p-5 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-primary">
      <code>{code}</code>
    </pre>
  );
}
