export default function ProvidersDoc() {
  return (
    <article className="prose-grump">
      <h1>Multi-Provider AI</h1>
      <p className="lead">
        G-Rump connects to multiple AI providers through a unified interface.
        Switch providers mid-conversation, run models locally, or let G-Rump
        pick the best model for each task.
      </p>

      <h2>Supported Providers</h2>

      <div className="mt-6 space-y-4">
        <ProviderCard
          name="Anthropic"
          models="Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku"
          desc="Industry-leading reasoning and code generation. Claude 3.5 Sonnet is the default recommended model for most coding tasks."
          accent="#f59e0b"
        />
        <ProviderCard
          name="OpenAI"
          models="GPT-4o, o1, o1-mini"
          desc="Versatile model family with strong general-purpose capabilities. GPT-4o offers fast responses with vision support."
          accent="#22c55e"
        />
        <ProviderCard
          name="Ollama"
          models="Llama 3, CodeLlama, Mistral, Phi-3, and more"
          desc="Run open-source models locally with full privacy. No data leaves your machine. Requires local Ollama installation."
          accent="#94a3b8"
        />
        <ProviderCard
          name="OpenRouter"
          models="100+ models from multiple providers"
          desc="Access models from Anthropic, OpenAI, Google, Meta, Mistral, and more through a single API. Pay per token across all providers."
          accent="#a855f7"
        />
        <ProviderCard
          name="CoreML"
          models="On-device Apple Silicon models"
          desc="Run models natively on Apple Silicon with zero latency and complete privacy. No internet required. Best for quick, lightweight tasks."
          accent="#3b82f6"
        />
      </div>

      <h2>Configuration</h2>
      <p>
        Configure providers in <strong>Settings → AI &amp; Model</strong> within
        G-Rump. You can also set providers per-project using{" "}
        <code>.grump/config.json</code>:
      </p>
      <CodeBlock
        code={`{
  "model": "anthropic/claude-3.7-sonnet"
}`}
      />

      <h3>Provider Format</h3>
      <p>
        Models use the <code>provider/model-name</code> format:
      </p>
      <ul>
        <li><code>anthropic/claude-3.5-sonnet</code></li>
        <li><code>openai/gpt-4o</code></li>
        <li><code>ollama/llama3</code></li>
        <li><code>openrouter/google/gemini-pro</code></li>
      </ul>

      <h2>Mid-Conversation Switching</h2>
      <p>
        Switch providers at any point in a conversation. G-Rump preserves your
        full conversation context when switching. This is useful for:
      </p>
      <ul>
        <li><strong>Cost optimization</strong> — Start with a fast, cheap model, escalate to Opus for complex reasoning</li>
        <li><strong>Privacy-sensitive tasks</strong> — Switch to Ollama when working with proprietary code</li>
        <li><strong>Comparison</strong> — Test the same prompt across providers</li>
      </ul>

      <h2>API Key Storage</h2>
      <p>
        All API keys are stored in your macOS Keychain — the same secure
        storage used by Safari, Mail, and other Apple apps. Keys are never
        stored in plaintext config files or environment variables.
      </p>
    </article>
  );
}

function ProviderCard({
  name,
  models,
  desc,
  accent,
}: {
  name: string;
  models: string;
  desc: string;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-stroke/50 p-5">
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: accent }}
      />
      <div className="flex items-center gap-3">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: accent }}
        />
        <p className="text-sm font-semibold text-primary">{name}</p>
      </div>
      <p className="mt-1 text-xs text-tertiary">{models}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-stroke/50 bg-bg-alt p-5 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-primary">
      <code>{code}</code>
    </pre>
  );
}
