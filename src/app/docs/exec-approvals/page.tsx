export default function ExecApprovals() {
  return (
    <article className="prose-grump">
      <h1>Exec Approvals</h1>
      <p className="lead">
        G-Rump&apos;s <code>system_run</code> tool executes shell commands with
        user-controlled security levels. You decide what runs, when, and how.
      </p>

      <h2>How It Works</h2>
      <p>
        Every shell command executed by the AI agent goes through the exec
        approval system. You control the security level per-command, per-tool,
        or globally.
      </p>

      <h2>Security Levels</h2>

      <div className="mt-4 space-y-4">
        <LevelCard
          level="Deny"
          desc="Block all shell command execution. The AI agent cannot run any commands. This is the default."
          isDefault
        />
        <LevelCard
          level="Ask"
          desc="A dialog appears for every command, letting you choose: Run Once, Always Allow, or Deny."
        />
        <LevelCard
          level="Allowlist"
          desc="Only pre-approved commands can run. All others are blocked silently."
        />
        <LevelCard
          level="Allow"
          desc="All commands execute without prompts. Use only in trusted environments."
        />
      </div>

      <h2>Configuration</h2>
      <p>Exec approvals are stored at:</p>
      <CodeBlock code="~/Library/Application Support/GRump/exec-approvals.json" />

      <p>
        Configure in <strong>Settings → Security</strong> within G-Rump.
      </p>

      <h2>Ask Mode Dialog</h2>
      <p>
        When Ask mode is enabled, G-Rump shows a native macOS dialog for
        each command with three options:
      </p>
      <ul>
        <li><strong>Run Once</strong> — Execute this command, ask again next time</li>
        <li><strong>Always Allow</strong> — Add to allowlist, never ask again</li>
        <li><strong>Deny</strong> — Block this command</li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Start with <strong>Ask</strong> mode to build your allowlist gradually</li>
        <li>Use <strong>Allowlist</strong> for production/shared environments</li>
        <li>Review your allowlist periodically in Settings → Security</li>
        <li>Use project-level <code>toolAllowlist</code> in <code>.grump/config.json</code> for additional control</li>
      </ul>
    </article>
  );
}

function LevelCard({
  level,
  desc,
  isDefault,
}: {
  level: string;
  desc: string;
  isDefault?: boolean;
}) {
  return (
    <div className="rounded-xl border border-stroke/50 p-4">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-primary">{level}</p>
        {isDefault && (
          <span className="rounded-full bg-bg-alt px-2 py-0.5 text-[10px] font-medium text-tertiary">
            Default
          </span>
        )}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-secondary">{desc}</p>
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
