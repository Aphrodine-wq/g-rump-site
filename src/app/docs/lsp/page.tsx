export default function LSPDoc() {
  return (
    <article className="prose-grump">
      <h1>LSP Integration</h1>
      <p className="lead">
        G-Rump integrates with SourceKit-LSP for live diagnostics, symbol
        navigation, and intelligent code analysis. Your AI agent sees the same
        compiler issues you do — in real time.
      </p>

      <h2>How It Works</h2>
      <p>
        G-Rump connects to Apple&apos;s SourceKit-LSP server, which powers
        Xcode&apos;s code intelligence. This gives your agent access to:
      </p>
      <ul>
        <li><strong>Real-time diagnostics</strong> — Errors and warnings as you type</li>
        <li><strong>Error badges</strong> — Visual indicators on files with issues</li>
        <li><strong>Go to definition</strong> — Jump to symbol definitions instantly</li>
        <li><strong>Find references</strong> — Locate all usages of a symbol</li>
        <li><strong>Symbol navigation</strong> — Browse classes, structs, protocols, and functions</li>
        <li><strong>Code completion</strong> — Context-aware suggestions from the compiler</li>
      </ul>

      <h2>Agent-Powered Fixes</h2>
      <p>
        When LSP reports an error, G-Rump&apos;s AI agent can:
      </p>
      <div className="mt-4 space-y-3">
        <StepCard step="1" title="Detect" desc="LSP surfaces a compiler error or warning in real time." />
        <StepCard step="2" title="Analyze" desc="The agent reads the diagnostic, understands the context, and identifies the root cause." />
        <StepCard step="3" title="Fix" desc="The agent applies a surgical edit to resolve the issue — type mismatches, missing imports, protocol conformance, and more." />
        <StepCard step="4" title="Verify" desc="LSP re-evaluates the file. The agent confirms the fix resolved the diagnostic." />
      </div>

      <h2>Supported Languages</h2>
      <p>
        SourceKit-LSP primarily supports Swift and Objective-C. G-Rump&apos;s
        LSP integration is optimized for:
      </p>
      <ul>
        <li><strong>Swift 5.9+</strong> — Full support including macros and parameter packs</li>
        <li><strong>Objective-C</strong> — Headers, implementation files, and bridging</li>
        <li><strong>C / C++</strong> — Via clangd integration</li>
        <li><strong>SwiftUI</strong> — View builder diagnostics and preview support</li>
      </ul>

      <h2>Configuration</h2>
      <p>
        LSP integration is automatic when Xcode is installed. G-Rump
        discovers the SourceKit-LSP binary from your Xcode installation. No
        manual configuration needed.
      </p>
      <CodeBlock
        code={`# G-Rump auto-detects SourceKit-LSP from:
/Applications/Xcode.app/Contents/Developer/Toolchains/
  XcodeDefault.xctoolchain/usr/bin/sourcekit-lsp`}
      />

      <h2>Performance</h2>
      <p>
        LSP runs as a background process with minimal CPU and memory usage.
        Diagnostics update in under 100ms for most files. Large projects with
        thousands of files may see slightly longer indexing times on first
        launch.
      </p>
    </article>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-stroke/50 p-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-500">
        {step}
      </span>
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-secondary">{desc}</p>
      </div>
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
