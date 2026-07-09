export default function KeychainDoc() {
  return (
    <article className="prose-grump">
      <h1>Keychain Vault</h1>
      <p className="lead">
        G-Rump stores all sensitive credentials — API keys, tokens, and MCP
        server secrets — in your macOS Keychain. The same battle-tested secure
        storage used by Safari, Mail, and every Apple application.
      </p>

      <h2>Why Keychain?</h2>
      <ul>
        <li><strong>Hardware-backed encryption</strong> — Keys are encrypted by the Secure Enclave on Apple Silicon</li>
        <li><strong>No plaintext files</strong> — Credentials never touch <code>.env</code> files, <code>config.json</code>, or environment variables</li>
        <li><strong>Access control</strong> — macOS prompts for authorization when apps access Keychain items</li>
        <li><strong>Sync via iCloud</strong> — Optionally sync credentials across your Apple devices</li>
        <li><strong>Industry standard</strong> — The same security model trusted by millions of macOS apps</li>
      </ul>

      <h2>Stored Credentials</h2>
      <p>
        G-Rump uses the Keychain to store:
      </p>
      <div className="mt-4 space-y-3">
        <CredRow label="AI Provider Keys" desc="Anthropic, OpenAI, OpenRouter API keys" />
        <CredRow label="MCP Server Tokens" desc="Authentication tokens for all 58+ MCP servers" />
        <CredRow label="Git Credentials" desc="Personal access tokens for GitHub, GitLab, Bitbucket" />
        <CredRow label="Cloud Deploy Keys" desc="AWS, GCP, Vercel, Netlify deployment credentials" />
        <CredRow label="Custom Secrets" desc="Any project-specific secrets you configure" />
      </div>

      <h2>How It Works</h2>
      <p>
        MCP servers and tools reference credentials using the{" "}
        <code>keychain://</code> URI scheme:
      </p>
      <CodeBlock
        code={`server: github-mcp
auth: keychain://github-token
tools: [search, pr, issues, actions]

server: custom-api
url: https://api.internal.dev
auth: keychain://internal-key`}
      />

      <h2>Managing Credentials</h2>
      <ul>
        <li><strong>Add</strong> — Settings → Security → Keychain Vault → Add Credential</li>
        <li><strong>Rotate</strong> — Update tokens without changing any configuration</li>
        <li><strong>Delete</strong> — Remove credentials from the vault</li>
        <li><strong>Export</strong> — Not supported by design — credentials stay in the Keychain</li>
      </ul>

      <h2>Security Model</h2>
      <p>
        G-Rump uses the <code>kSecClassGenericPassword</code> Keychain item
        class with the app&apos;s bundle identifier as the service name. Each
        credential is stored as a separate Keychain item with:
      </p>
      <ul>
        <li>App-specific access control (only G-Rump can read)</li>
        <li>Optional biometric authentication (Touch ID / Apple Watch)</li>
        <li>Automatic locking when the Mac sleeps</li>
      </ul>
    </article>
  );
}

function CredRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-stroke/50 p-4">
      <p className="w-[160px] shrink-0 text-xs font-semibold text-primary">{label}</p>
      <p className="text-sm text-secondary">{desc}</p>
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
