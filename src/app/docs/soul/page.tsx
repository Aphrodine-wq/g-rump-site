export default function SoulDoc() {
  return (
    <article className="prose-grump">
      <h1>SOUL.md</h1>
      <p className="lead">
        SOUL.md defines your AI agent&apos;s personality, tone, and behavioral
        preferences. Create a global SOUL.md or per-project versions to shape
        how G-Rump communicates and writes code.
      </p>

      <h2>What is SOUL.md?</h2>
      <p>
        While <a href="/docs/skills">Skills</a> provide domain expertise (what
        the AI knows), SOUL.md defines personality (how the AI behaves). It
        controls tone, verbosity, coding style, and focus areas across all
        interactions.
      </p>

      <h2>Global vs. Project SOUL</h2>
      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-stroke/50 p-4">
          <p className="text-sm font-semibold text-primary">Global SOUL.md</p>
          <p className="mt-1 text-xs text-tertiary">~/Library/Application Support/GRump/SOUL.md</p>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Applies to all projects. Sets your baseline preferences for how the
            AI communicates, formats code, and handles ambiguity.
          </p>
        </div>
        <div className="rounded-xl border border-stroke/50 p-4">
          <p className="text-sm font-semibold text-primary">Project SOUL.md</p>
          <p className="mt-1 text-xs text-tertiary">.grump/SOUL.md</p>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Overrides the global SOUL for a specific project. Use this for
            team-specific conventions or project-specific tone requirements.
          </p>
        </div>
      </div>

      <h2>Example SOUL.md</h2>
      <CodeBlock
        code={`# SOUL: Senior iOS Engineer

## Personality
- Direct and concise — no filler words
- Opinionated about architecture — advocate for clean patterns
- Proactively suggest improvements, don't just do what's asked

## Coding Style
- Swift: prefer value types, use @Observable over ObservableObject
- Always use explicit access control (public, private, internal)
- Favor composition over inheritance
- Write self-documenting code; minimize comments

## Communication
- Lead with the answer, then explain
- Use code examples over prose when possible
- Flag potential issues proactively
- Keep responses under 200 words unless asked for detail

## Priorities
1. Correctness
2. Readability
3. Performance
4. Brevity`}
      />

      <h2>What You Can Control</h2>
      <ul>
        <li><strong>Tone</strong> — Casual, formal, terse, verbose, encouraging, critical</li>
        <li><strong>Coding conventions</strong> — Naming, formatting, architecture preferences</li>
        <li><strong>Response format</strong> — Code-first vs. explanation-first, length limits</li>
        <li><strong>Proactivity</strong> — Whether the agent suggests improvements unprompted</li>
        <li><strong>Domain focus</strong> — Emphasize security, performance, accessibility, etc.</li>
        <li><strong>Language</strong> — Respond in any natural language</li>
      </ul>

      <h2>Templates</h2>
      <p>
        G-Rump includes starter templates you can customize:
      </p>
      <ul>
        <li><strong>Default</strong> — Balanced, helpful, concise</li>
        <li><strong>Senior Engineer</strong> — Opinionated, architecture-focused</li>
        <li><strong>Mentor</strong> — Patient, educational, explains reasoning</li>
        <li><strong>Minimalist</strong> — Code only, minimal prose</li>
        <li><strong>Reviewer</strong> — Critical, finds edge cases, questions assumptions</li>
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
