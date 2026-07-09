export default function AgentModesDoc() {
  return (
    <article className="prose-grump">
      <h1>Agent Modes</h1>
      <p className="lead">
        G-Rump offers five distinct modes, each tailoring the AI&apos;s behavior,
        tool access, and output format to match your workflow. Switch modes
        mid-conversation.
      </p>

      <h2>Chat</h2>
      <p>
        Conversational coding assistance with full project context awareness.
        Ask questions, get explanations, brainstorm solutions. Chat mode
        maintains conversation history with automatic context compaction to
        keep responses relevant even in long sessions.
      </p>
      <ul>
        <li>Full access to all tools</li>
        <li>Maintains conversation history</li>
        <li>Context-aware of your entire codebase</li>
        <li>Best for: exploratory work, Q&amp;A, debugging</li>
      </ul>

      <h2>Plan</h2>
      <p>
        Architect solutions before writing a single line of code. Plan mode
        generates structured implementation plans with clear steps,
        dependency mapping, and verification criteria.
      </p>
      <ul>
        <li>Read-only tool access (no file modifications)</li>
        <li>Produces structured specs and plans</li>
        <li>Evaluates trade-offs and alternatives</li>
        <li>Best for: architecture decisions, feature planning</li>
      </ul>

      <h2>Build</h2>
      <p>
        Autonomous multi-step execution with tool orchestration. G-Rump writes
        code, runs tests, handles errors, and iterates independently — up to
        150 agentic steps per run with the Extended workflow preset.
      </p>
      <ul>
        <li>Full autonomous tool execution</li>
        <li>Handles file edits, shell commands, git operations</li>
        <li>Configurable max steps (default 30, extended 150)</li>
        <li>Best for: implementation, refactoring, multi-file changes</li>
      </ul>

      <h2>Debate</h2>
      <p>
        Challenge assumptions and explore trade-offs. The AI presents
        counterarguments to strengthen your technical decisions. Debate mode
        forces consideration of edge cases, failure modes, and alternative
        approaches.
      </p>
      <ul>
        <li>Adversarial but constructive feedback</li>
        <li>Identifies risks and blind spots</li>
        <li>Compares alternative approaches</li>
        <li>Best for: code review, architecture validation</li>
      </ul>

      <h2>Spec</h2>
      <p>
        Generate detailed technical specifications and documentation from
        high-level requirements. Spec mode outputs structured documents with
        acceptance criteria, data models, API contracts, and implementation
        notes.
      </p>
      <ul>
        <li>Structured document output</li>
        <li>Acceptance criteria generation</li>
        <li>Data model and API contract design</li>
        <li>Best for: PRDs, technical specs, API design</li>
      </ul>
    </article>
  );
}
