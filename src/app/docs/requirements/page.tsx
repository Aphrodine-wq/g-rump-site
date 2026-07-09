export default function RequirementsDoc() {
  return (
    <article className="prose-grump">
      <h1>System Requirements</h1>
      <p className="lead">
        G-Rump is built exclusively for macOS. Here&apos;s what you need to get
        started.
      </p>

      <h2>Minimum Requirements</h2>
      <div className="mt-4 space-y-3">
        <ReqRow label="Operating System" value="macOS 14+ (Sonoma or later)" />
        <ReqRow label="Swift" value="Swift 5.9+" />
        <ReqRow label="Xcode" value="Xcode 15+ (building from source)" />
        <ReqRow label="Architecture" value="Apple Silicon (M1+) or Intel x86_64" />
        <ReqRow label="RAM" value="8 GB minimum, 16 GB recommended" />
        <ReqRow label="Disk Space" value="~500 MB for app + dependencies" />
      </div>

      <h2>Recommended Setup</h2>
      <ul>
        <li><strong>Apple Silicon Mac</strong> — CoreML on-device models run natively on M-series chips</li>
        <li><strong>16 GB+ RAM</strong> — For running local Ollama models alongside G-Rump</li>
        <li><strong>macOS 15 (Sequoia)</strong> — Latest APIs and best performance</li>
        <li><strong>Xcode 16+</strong> — For full SourceKit-LSP integration</li>
      </ul>

      <h2>AI Provider Requirements</h2>
      <p>
        G-Rump supports multiple AI providers. Each has its own requirements:
      </p>
      <ul>
        <li><strong>Anthropic</strong> — API key from <code>console.anthropic.com</code></li>
        <li><strong>OpenAI</strong> — API key from <code>platform.openai.com</code></li>
        <li><strong>Ollama</strong> — Local installation. No API key needed. Full privacy.</li>
        <li><strong>OpenRouter</strong> — API key. Access 100+ models through one endpoint.</li>
        <li><strong>CoreML</strong> — No external dependencies. Runs on Apple Silicon natively.</li>
      </ul>

      <h2>macOS Permissions</h2>
      <p>
        For full functionality, grant the following permissions in System
        Settings:
      </p>
      <ul>
        <li><strong>Notifications</strong> — System Settings → Notifications → G-Rump</li>
        <li><strong>Screen Recording</strong> — System Settings → Privacy &amp; Security → Screen Recording</li>
        <li><strong>Accessibility</strong> — System Settings → Privacy &amp; Security → Accessibility</li>
        <li><strong>Full Disk Access</strong> — Optional, for accessing files outside your home directory</li>
      </ul>

      <h2>Network</h2>
      <p>
        Internet access is required for cloud AI providers (Anthropic, OpenAI,
        OpenRouter) and MCP servers. Ollama and CoreML models work fully
        offline.
      </p>
    </article>
  );
}

function ReqRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-stroke/50 p-4">
      <p className="w-[140px] shrink-0 text-xs font-semibold text-primary">{label}</p>
      <p className="text-sm text-secondary">{value}</p>
    </div>
  );
}
