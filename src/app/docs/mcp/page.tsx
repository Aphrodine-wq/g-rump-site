export default function MCPDoc() {
  return (
    <article className="prose-grump">
      <h1>MCP Servers</h1>
      <p className="lead">
        G-Rump ships with 58 pre-configured Model Context Protocol servers.
        Every credential is stored in your macOS Keychain — not config files,
        not environment variables.
      </p>

      <h2>What is MCP?</h2>
      <p>
        The Model Context Protocol (MCP) is an open standard for connecting AI
        agents to external tools and data sources. G-Rump implements MCP
        natively, allowing your agent to interact with databases, APIs, cloud
        services, documentation providers, and custom toolchains.
      </p>

      <h2>Pre-configured Servers</h2>
      <p>
        G-Rump includes 58 ready-to-use MCP servers covering common
        development tools and services. Connect by providing your credentials
        through the secure Keychain vault.
      </p>

      <h2>Keychain-Backed Credentials</h2>
      <p>
        All MCP server credentials are stored in your macOS Keychain — the
        same secure storage used by Safari, Mail, and other Apple applications.
        No plaintext API keys in config files.
      </p>
      <CodeBlock
        code={`// Credentials stored securely in Keychain
server: github-mcp
auth: keychain://github-token
tools: [search, pr, issues, actions]

// Add your own servers
server: custom-api
url: https://api.internal.dev
auth: keychain://internal-key`}
      />

      <h2>Adding Custom Servers</h2>
      <p>
        Add any MCP-compatible server through G-Rump&apos;s settings. The
        MCP ecosystem grows daily — any server that implements the protocol
        works with G-Rump automatically.
      </p>

      <h2>Server Management</h2>
      <ul>
        <li><strong>Enable/Disable</strong> — Toggle individual servers without removing configuration</li>
        <li><strong>Credential Rotation</strong> — Update tokens through the Keychain vault</li>
        <li><strong>Per-Project Servers</strong> — Configure server availability per project in <code>.grump/config.json</code></li>
        <li><strong>Health Checks</strong> — G-Rump validates server connectivity on startup</li>
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
