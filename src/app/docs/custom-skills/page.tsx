export default function CustomSkillsDoc() {
  return (
    <article className="prose-grump">
      <h1>Custom Skills</h1>
      <p className="lead">
        Create custom SKILL.md files for any project, team, or domain. Custom
        skills give your AI agent deep expertise in your specific workflows,
        conventions, and architecture.
      </p>

      <h2>Creating a Custom Skill</h2>
      <p>
        Place SKILL.md files in your project&apos;s{" "}
        <code>.grump/skills/</code> directory. G-Rump automatically discovers
        and activates them when working in that project.
      </p>
      <CodeBlock
        code={`.grump/
├── config.json
├── context.md
├── SOUL.md
└── skills/
    ├── our-api-patterns.md
    ├── team-conventions.md
    ├── deployment-checklist.md
    └── database-migrations.md`}
      />

      <h2>Skill File Structure</h2>
      <p>
        A skill file is plain markdown with a recommended structure:
      </p>
      <CodeBlock
        code={`# Skill: [Domain Name]

## Overview
Brief description of what this skill covers.

## Patterns
- Recommended patterns and best practices
- Preferred libraries and tools
- Architecture decisions

## Anti-Patterns
- Common mistakes to avoid
- Deprecated approaches
- Performance pitfalls

## Common Tasks
### Task Name
\`\`\`language
// Code example for the task
\`\`\`

## References
- Links to internal docs
- Links to external resources`}
      />

      <h2>Example: Team API Conventions</h2>
      <CodeBlock
        code={`# Skill: Our REST API Conventions

## Overview
API patterns for our backend services.

## Patterns
- All endpoints return JSON with { data, error, meta }
- Use snake_case for JSON keys
- Pagination uses cursor-based approach
- Auth via Bearer token in Authorization header

## Anti-Patterns
- Never return raw database IDs — use UUIDs
- Don't nest resources more than 2 levels deep
- Avoid query parameters for write operations

## Common Tasks
### Create a new endpoint
\`\`\`swift
router.post("/api/v1/items") { req async throws -> ItemResponse in
    let input = try req.content.decode(CreateItemInput.self)
    let item = try await ItemService.create(input, on: req.db)
    return ItemResponse(data: item.toDTO())
}
\`\`\``}
      />

      <h2>Skill Activation</h2>
      <ul>
        <li><strong>Automatic</strong> — G-Rump loads all skills from <code>.grump/skills/</code> when opening a project</li>
        <li><strong>Context-aware</strong> — Skills are weighted based on relevance to the current task</li>
        <li><strong>Stackable</strong> — Project skills stack with G-Rump&apos;s 40+ bundled skills</li>
        <li><strong>Hot reload</strong> — Edit a skill file and G-Rump picks up changes instantly</li>
      </ul>

      <h2>Tips</h2>
      <ul>
        <li>Keep skills focused — one domain per file</li>
        <li>Include real code examples from your codebase</li>
        <li>Document anti-patterns to prevent common mistakes</li>
        <li>Reference internal documentation and runbooks</li>
        <li>Share skills across projects via git submodules or symlinks</li>
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
