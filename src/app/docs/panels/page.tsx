export default function PanelsDoc() {
  return (
    <article className="prose-grump">
      <h1>IDE Panels</h1>
      <p className="lead">
        G-Rump includes 17 purpose-built intelligence panels. Every panel is
        designed for AI-assisted development — navigate files, inspect git
        history, run tests, profile performance, and browse Apple documentation
        without leaving the app.
      </p>

      <h2>Panel Overview</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <PanelCard name="File Navigator" desc="Browse and manage project files with tree view. Drag-and-drop support. Quick file creation and deletion." />
        <PanelCard name="Git" desc="Full git integration — stage, commit, diff, log, branch, and merge. Visual diff viewer with inline annotations." />
        <PanelCard name="Tests" desc="Run and monitor test suites. View pass/fail status, filter by state, and jump to failing test code." />
        <PanelCard name="Assets" desc="Browse and manage project assets — images, colors, data files. Preview assets inline." />
        <PanelCard name="Localization" desc="Manage localizable strings across languages. Auto-detect missing translations." />
        <PanelCard name="Profiling" desc="Performance profiling with flame graphs and memory allocation tracking. Powered by Instruments." />
        <PanelCard name="Logs" desc="Unified log viewer for os_log, print statements, and crash reports. Filter by severity and source." />
        <PanelCard name="Terminal" desc="Built-in terminal with full shell access. Multiple tabs, split views, and command history." />
        <PanelCard name="App Store Tools" desc="App Store Connect integration — manage builds, TestFlight, reviews, and metadata." />
        <PanelCard name="Apple Docs" desc="Browse Apple developer documentation inline. Context-aware suggestions based on your code." />
        <PanelCard name="Search" desc="Project-wide search with regex support. Find and replace across files with preview." />
        <PanelCard name="Bookmarks" desc="Bookmark important code locations. Organize with tags and notes for quick reference." />
        <PanelCard name="Symbols" desc="Symbol navigator — classes, structs, enums, functions. Jump to definition instantly." />
        <PanelCard name="Breakpoints" desc="Manage breakpoints across your project. Conditional breakpoints with log actions." />
        <PanelCard name="Extensions" desc="Browse and manage installed extensions. Discover community extensions." />
        <PanelCard name="Environment" desc="Environment variable management. Set per-scheme and per-configuration variables." />
        <PanelCard name="Network" desc="Network request inspector. Monitor API calls, view headers, payloads, and response times." />
      </div>

      <h2>Panel Customization</h2>
      <p>
        Every panel can be rearranged, resized, or hidden. Use the Activity Bar
        for quick panel switching, or use keyboard shortcuts for instant access.
      </p>
      <ul>
        <li><strong>Drag to reorder</strong> — Rearrange panels in the sidebar</li>
        <li><strong>Double-click to detach</strong> — Pop panels into floating windows</li>
        <li><strong>Right-click to hide</strong> — Remove panels you don&apos;t need</li>
        <li><strong>Zen Mode</strong> — Hide all panels for distraction-free coding</li>
      </ul>

      <h2>AI-Aware Panels</h2>
      <p>
        Panels are deeply integrated with G-Rump&apos;s AI agent. The agent can
        read from and interact with panels — viewing test results, reading git
        diffs, browsing Apple documentation, and inspecting network requests to
        provide contextually aware assistance.
      </p>
    </article>
  );
}

function PanelCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="rounded-xl border border-stroke/50 p-4">
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <p className="text-sm font-semibold text-primary">{name}</p>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}
