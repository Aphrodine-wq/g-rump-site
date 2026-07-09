export default function ProjectConfig() {
  return (
    <article className="prose-grump">
      <h1>Project Config</h1>
      <p className="lead">
        Configure G-Rump on a per-project basis with a simple JSON file.
        Every project can have its own model, system prompt, tool access,
        and context.
      </p>

      <h2>Configuration File</h2>
      <p>
        Add <code>.grump/config.json</code> to your project root:
      </p>
      <CodeBlock
        code={`{
  "model": "anthropic/claude-3.7-sonnet",
  "systemPrompt": "Custom instructions for this project…",
  "toolAllowlist": ["read_file", "run_command", "web_search"],
  "projectFacts": ["Uses Swift 5.9", "SwiftLint enabled"],
  "maxAgentSteps": 30,
  "contextFile": ".grump/context.md"
}`}
      />

      <h2>Options</h2>

      <h3>model</h3>
      <p>
        The AI model to use for this project. Supports provider-prefixed
        format (e.g., <code>anthropic/claude-3.7-sonnet</code>,
        <code>openai/gpt-4o</code>).
      </p>

      <h3>systemPrompt</h3>
      <p>
        Custom instructions injected into every conversation within this
        project. Use this for coding conventions, preferred libraries, or
        project-specific context.
      </p>

      <h3>toolAllowlist</h3>
      <p>
        Restrict which tools the agent can use in this project. When set,
        only listed tools are available. Omit to allow all tools.
      </p>

      <h3>projectFacts</h3>
      <p>
        Short factual statements about the project injected into context.
        Useful for framework versions, linting rules, or deployment targets.
      </p>

      <h3>maxAgentSteps</h3>
      <p>
        Maximum number of autonomous steps the agent can take in Build mode.
        Default is 30. Extended workflow preset sets this to 150.
      </p>

      <h3>contextFile</h3>
      <p>
        Path to a markdown file with persistent project context. Contents
        are injected into every conversation. Use this for architecture
        decisions, coding standards, or onboarding notes.
      </p>

      <h2>Persistent Context</h2>
      <p>
        Add <code>.grump/context.md</code> for persistent context injected
        into every conversation:
      </p>
      <CodeBlock
        code={`# Project Context

## Architecture
This is a SwiftUI app using MVVM pattern with Combine.

## Conventions
- Use async/await over Combine where possible
- All new views must support VoiceOver
- Run SwiftLint before committing`}
      />

      <h2>Workflow Presets</h2>
      <p>
        Access workflow presets in <strong>Settings → AI &amp; Model →
        Workflow Presets</strong>. One-click presets available:
      </p>
      <ul>
        <li><strong>Refactor</strong> — Focused on code restructuring</li>
        <li><strong>Debug</strong> — Enhanced diagnostic tool access</li>
        <li><strong>Read-only</strong> — Research mode, no file modifications</li>
        <li><strong>Extended run</strong> — 150 autonomous steps for large tasks</li>
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
