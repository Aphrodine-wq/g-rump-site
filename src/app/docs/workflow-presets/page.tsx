export default function WorkflowPresetsDoc() {
  return (
    <article className="prose-grump">
      <h1>Workflow Presets</h1>
      <p className="lead">
        One-click presets that configure G-Rump&apos;s behavior for specific
        development workflows. Switch between Refactor, Debug, Read-only, and
        Extended run modes instantly.
      </p>

      <h2>Available Presets</h2>

      <div className="mt-6 space-y-4">
        <PresetCard
          name="Refactor"
          desc="Focused on code restructuring. The agent prioritizes clean architecture, consistent naming, and minimal behavior changes. Automatically runs tests after refactoring to verify correctness."
          tools="read_file, edit_file, grep_search, system_run (tests only)"
          steps={30}
          accent="#3b82f6"
        />
        <PresetCard
          name="Debug"
          desc="Enhanced diagnostic tool access. The agent adds logging, inspects stack traces, reads crash reports, and isolates root causes systematically before applying fixes."
          tools="All tools + enhanced logging"
          steps={30}
          accent="#ef4444"
        />
        <PresetCard
          name="Read-only"
          desc="Research mode with no file modifications. Perfect for codebase exploration, architecture review, and understanding unfamiliar code. The agent can read and search but never write."
          tools="read_file, grep_search, list_dir, find_files"
          steps={30}
          accent="#22c55e"
        />
        <PresetCard
          name="Extended Run"
          desc="For large, multi-file tasks that require deep autonomous execution. Increases the step limit to 150, allowing the agent to complete complex refactors, migrations, or feature implementations end-to-end."
          tools="All tools"
          steps={150}
          accent="#a855f7"
        />
      </div>

      <h2>How to Use</h2>
      <p>
        Access presets in <strong>Settings → AI &amp; Model → Workflow
        Presets</strong>. Click any preset to instantly apply its configuration.
        You can switch presets mid-conversation.
      </p>

      <h2>Custom Presets</h2>
      <p>
        Create your own presets by combining:
      </p>
      <ul>
        <li><strong>Tool allowlist</strong> — Which tools the agent can use</li>
        <li><strong>Max steps</strong> — How many autonomous steps the agent can take</li>
        <li><strong>System prompt additions</strong> — Extra instructions for the agent</li>
        <li><strong>Agent mode</strong> — Chat, Plan, Build, Debate, or Spec</li>
      </ul>

      <h2>Per-Project Presets</h2>
      <p>
        Override presets per-project in <code>.grump/config.json</code>:
      </p>
      <CodeBlock
        code={`{
  "maxAgentSteps": 150,
  "toolAllowlist": ["read_file", "edit_file", "system_run"],
  "systemPrompt": "Focus on performance optimization. Always benchmark before and after changes."
}`}
      />
    </article>
  );
}

function PresetCard({
  name,
  desc,
  tools,
  steps,
  accent,
}: {
  name: string;
  desc: string;
  tools: string;
  steps: number;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-stroke/50 p-5">
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: accent }}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">{name}</p>
        <span className="rounded-full bg-bg-alt px-2.5 py-0.5 text-[10px] font-medium text-tertiary">
          {steps} steps
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{desc}</p>
      <p className="mt-3 text-[11px] text-tertiary">
        <strong className="text-secondary">Tools:</strong> {tools}
      </p>
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
