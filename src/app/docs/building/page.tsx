export default function BuildingDoc() {
  return (
    <article className="prose-grump">
      <h1>Building</h1>
      <p className="lead">
        Build G-Rump from source with a single command. The build system uses
        Make for simplicity and Swift Package Manager for dependency resolution.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li><strong>macOS 14+</strong> (Sonoma or later)</li>
        <li><strong>Swift 5.9+</strong></li>
        <li><strong>Xcode 15+</strong> with command line tools installed</li>
      </ul>
      <CodeBlock
        code={`# Verify prerequisites
swift --version    # Swift 5.9+
xcodebuild -version  # Xcode 15+
xcode-select -p    # Command line tools path`}
      />

      <h2>Build Commands</h2>

      <div className="mt-4 space-y-4">
        <BuildCmd
          cmd="make run"
          desc="Build and launch G-Rump in debug mode. Fast incremental builds for development. Includes debug logging and assertions."
        />
        <BuildCmd
          cmd="make app"
          desc="Build a release .app bundle. Optimized with full compiler optimizations. Output in build/Release/G-Rump.app."
        />
        <BuildCmd
          cmd="make dmg"
          desc="Build a release .app bundle and package it into a .dmg disk image for distribution."
        />
        <BuildCmd
          cmd="make reset"
          desc="Reset app state for fresh-boot testing. Clears preferences, caches, and stored data from ~/Library/Application Support/GRump."
        />
      </div>

      <h2>Quick Launch</h2>
      <p>
        Double-click <code>G-Rump.command</code> in the project root to build
        and launch automatically. This script runs <code>make run</code> in a
        Terminal window.
      </p>

      <h2>Project Structure</h2>
      <CodeBlock
        code={`G-Rump/
├── Sources/
│   ├── App/           # App entry point and lifecycle
│   ├── Agent/         # AI agent core and tool execution
│   ├── Providers/     # AI provider implementations
│   ├── Tools/         # 100+ built-in tools
│   ├── Panels/        # 17 IDE panels
│   ├── Skills/        # Bundled SKILL.md files
│   ├── MCP/           # MCP server management
│   ├── LSP/           # SourceKit-LSP integration
│   └── UI/            # SwiftUI views and themes
├── Tests/
├── Resources/
├── Makefile
├── Package.swift
└── G-Rump.command`}
      />

      <h2>Build Configuration</h2>
      <p>
        The build system supports several configuration options:
      </p>
      <ul>
        <li><strong>Debug</strong> — Default for <code>make run</code>. Includes debug symbols, assertions, and verbose logging.</li>
        <li><strong>Release</strong> — Default for <code>make app</code> and <code>make dmg</code>. Full optimizations, stripped symbols.</li>
        <li><strong>Architecture</strong> — Universal binary (arm64 + x86_64) by default. Set <code>ARCH=arm64</code> for Apple Silicon only.</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/packaging">Packaging &amp; Signing</a> — Code signing, notarization, and distribution</li>
      </ul>
    </article>
  );
}

function BuildCmd({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div className="rounded-xl border border-stroke/50 p-4">
      <code className="text-sm font-semibold text-blue">{cmd}</code>
      <p className="mt-2 text-xs leading-relaxed text-secondary">{desc}</p>
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
