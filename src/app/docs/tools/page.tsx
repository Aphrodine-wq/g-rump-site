export default function ToolsDoc() {
  return (
    <article className="prose-grump">
      <h1>100+ Tools</h1>
      <p className="lead">
        G-Rump ships with over 100 built-in tools spanning file operations,
        shell execution, version control, containers, browser automation, cloud
        deployment, and Apple-native integrations.
      </p>

      <h2>Tool Categories</h2>

      <div className="mt-6 space-y-8">
        <ToolCategory
          name="File Operations"
          accent="#3b82f6"
          tools={[
            { name: "read_file", desc: "Read file contents with line numbers" },
            { name: "write_file", desc: "Create new files with content" },
            { name: "edit_file", desc: "Surgical find-and-replace edits" },
            { name: "list_dir", desc: "List directory contents recursively" },
            { name: "find_files", desc: "Search files by name pattern" },
            { name: "grep_search", desc: "Regex and literal text search" },
          ]}
        />
        <ToolCategory
          name="Shell & Terminal"
          accent="#22c55e"
          tools={[
            { name: "system_run", desc: "Execute shell commands with approval controls" },
            { name: "background_run", desc: "Run long-lived processes asynchronously" },
            { name: "command_status", desc: "Check status of background processes" },
          ]}
        />
        <ToolCategory
          name="Git Integration"
          accent="#f97316"
          tools={[
            { name: "git_status", desc: "Working tree status and diff" },
            { name: "git_commit", desc: "Stage and commit changes" },
            { name: "git_log", desc: "View commit history" },
            { name: "git_branch", desc: "Create, switch, and manage branches" },
            { name: "git_diff", desc: "View staged and unstaged diffs" },
          ]}
        />
        <ToolCategory
          name="Docker & Containers"
          accent="#06b6d4"
          tools={[
            { name: "docker_build", desc: "Build container images" },
            { name: "docker_run", desc: "Run containers with port mapping" },
            { name: "docker_compose", desc: "Manage multi-container setups" },
          ]}
        />
        <ToolCategory
          name="Browser Automation"
          accent="#a855f7"
          tools={[
            { name: "browser_open", desc: "Open URLs and capture screenshots" },
            { name: "browser_click", desc: "Interact with web page elements" },
            { name: "browser_read", desc: "Extract text content from pages" },
          ]}
        />
        <ToolCategory
          name="Cloud Deploy"
          accent="#ef4444"
          tools={[
            { name: "deploy_preview", desc: "Deploy to preview environments" },
            { name: "deploy_production", desc: "Push to production with safety checks" },
          ]}
        />
        <ToolCategory
          name="Apple-Native"
          accent="#f59e0b"
          tools={[
            { name: "spotlight_search", desc: "System-wide file and content search via Spotlight" },
            { name: "keychain_read", desc: "Securely read credentials from macOS Keychain" },
            { name: "calendar_events", desc: "Access Calendar for scheduling context" },
            { name: "ocr_extract", desc: "Extract text from images using native Vision framework" },
            { name: "xcodebuild", desc: "Build, test, and archive Xcode projects" },
            { name: "notarize", desc: "Submit apps for Apple notarization" },
          ]}
        />
      </div>

      <h2>Tool Access Control</h2>
      <p>
        Control which tools are available per-project with{" "}
        <code>toolAllowlist</code> in <code>.grump/config.json</code>:
      </p>
      <CodeBlock
        code={`{
  "toolAllowlist": ["read_file", "write_file", "system_run", "git_status"]
}`}
      />
      <p>
        When set, only listed tools are available. Omit the field to allow all
        tools. Combined with <a href="/docs/exec-approvals">Exec Approvals</a>,
        you get fine-grained security control over what your agent can do.
      </p>

      <h2>Custom Tools via MCP</h2>
      <p>
        Extend the tool set with <a href="/docs/mcp">MCP servers</a>. Any
        MCP-compatible server automatically adds its tools to G-Rump&apos;s
        agent.
      </p>
    </article>
  );
}

function ToolCategory({
  name,
  accent,
  tools,
}: {
  name: string;
  accent: string;
  tools: { name: string; desc: string }[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <h3 className="!mt-0 !mb-0 text-sm font-semibold text-primary">{name}</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {tools.map((t) => (
          <div key={t.name} className="rounded-lg border border-stroke/40 px-4 py-3">
            <code className="text-xs">{t.name}</code>
            <p className="mt-1 text-xs text-secondary">{t.desc}</p>
          </div>
        ))}
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
