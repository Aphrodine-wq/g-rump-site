export default function SkillsDoc() {
  return (
    <article className="prose-grump">
      <h1>Skills System</h1>
      <p className="lead">
        G-Rump ships with 40+ expert-crafted SKILL.md files that give your AI
        agent deep domain expertise. Skills activate automatically based on
        project context, or you can invoke them manually.
      </p>

      <h2>How Skills Work</h2>
      <p>
        Each skill is a structured markdown file containing domain expertise,
        best practices, common patterns, and anti-patterns. When G-Rump
        detects relevant context (e.g., a SwiftUI project), it automatically
        loads the matching skills into the AI&apos;s context.
      </p>

      <h2>Bundled Skills</h2>

      <h3>Frameworks</h3>
      <SkillGrid skills={["SwiftUI", "React", "Vue.js", "Tailwind CSS", "Next.js", "Nuxt"]} />

      <h3>Languages</h3>
      <SkillGrid skills={["Swift", "Python", "Go", "TypeScript", "Rust", "Kotlin"]} />

      <h3>Infrastructure</h3>
      <SkillGrid skills={["Kubernetes", "Docker", "Terraform", "CI/CD", "AWS", "GCP"]} />

      <h3>Quality</h3>
      <SkillGrid skills={["Code Review", "Testing", "Accessibility", "Security", "Performance"]} />

      <h3>Patterns</h3>
      <SkillGrid skills={["async/await", "State Management", "Error Handling", "Design Patterns", "MVVM", "Clean Architecture"]} />

      <h3>Workflow</h3>
      <SkillGrid skills={["Git Workflow", "Documentation", "Refactoring", "Debugging", "Architecture", "API Design"]} />

      <h2>Custom Skills</h2>
      <p>
        Create custom skills for any project or team. Place SKILL.md files
        in your project&apos;s <code>.grump/skills/</code> directory:
      </p>
      <CodeBlock
        code={`.grump/
├── config.json
├── context.md
└── skills/
    ├── our-api-patterns.md
    ├── team-conventions.md
    └── deployment-checklist.md`}
      />

      <h2>Skill File Format</h2>
      <p>
        Skills are plain markdown files with a specific structure:
      </p>
      <CodeBlock
        code={`# Skill: SwiftUI Best Practices

## Overview
Expert guidance for building SwiftUI applications.

## Patterns
- Use @Observable macro (iOS 17+) over ObservableObject
- Prefer value types (structs) over reference types
- Keep views small and composable

## Anti-Patterns
- Avoid putting business logic in views
- Don't use AnyView — use @ViewBuilder instead
- Avoid deeply nested view hierarchies

## Common Tasks
### Creating a list with navigation
\`\`\`swift
NavigationStack {
    List(items) { item in
        NavigationLink(value: item) {
            ItemRow(item: item)
        }
    }
    .navigationDestination(for: Item.self) { item in
        ItemDetail(item: item)
    }
}
\`\`\``}
      />

      <h2>SOUL.md — AI Personality</h2>
      <p>
        While skills provide domain expertise, SOUL.md defines personality
        and behavior. Create a global SOUL.md or per-project versions to
        control tone, verbosity, coding style, and focus areas.
      </p>
      <p>
        See <a href="/docs/soul">SOUL.md documentation</a> for details.
      </p>
    </article>
  );
}

function SkillGrid({ skills }: { skills: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {skills.map((s) => (
        <span
          key={s}
          className="rounded-full border border-stroke/60 px-3 py-1 text-xs text-primary"
        >
          {s}
        </span>
      ))}
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
