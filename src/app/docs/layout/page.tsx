export default function LayoutDoc() {
  return (
    <article className="prose-grump">
      <h1>Layout</h1>
      <p className="lead">
        G-Rump&apos;s interface is fully customizable. Rearrange panels, toggle
        the Activity Bar, enter Zen Mode, and configure every aspect of the
        workspace to match your workflow.
      </p>

      <h2>Workspace Layout</h2>
      <p>
        The default layout consists of four main areas:
      </p>
      <div className="mt-4 space-y-3">
        <LayoutArea
          name="Activity Bar"
          desc="Vertical icon strip on the far left. Quick access to all panels. Click an icon to toggle its panel. Right-click to reorder or hide icons."
        />
        <LayoutArea
          name="Sidebar"
          desc="Panel container on the left side. Shows the active panel's content — File Navigator, Git, Search, etc. Resizable by dragging the edge."
        />
        <LayoutArea
          name="Editor"
          desc="Central content area. Code editor with syntax highlighting, inline diagnostics, and AI chat. Supports split views — vertical and horizontal."
        />
        <LayoutArea
          name="Bottom Panel"
          desc="Collapsible bottom area for Terminal, Logs, Tests, and other output panels. Toggle with keyboard shortcut or drag handle."
        />
      </div>

      <h2>Zen Mode</h2>
      <p>
        Hide all panels, the Activity Bar, and the status bar for distraction-free
        coding. Toggle Zen Mode with:
      </p>
      <ul>
        <li><strong>Menu</strong> — View → Toggle Zen Mode</li>
        <li><strong>Shortcut</strong> — <code>⌘⇧Z</code></li>
        <li><strong>Settings</strong> — Appearance → Zen Mode</li>
      </ul>
      <p>
        In Zen Mode, panels slide out of view with a smooth animation. Move
        your cursor to the left edge to temporarily reveal the sidebar.
      </p>

      <h2>Split Views</h2>
      <p>
        Split the editor horizontally or vertically to view multiple files
        side-by-side:
      </p>
      <ul>
        <li><strong>Vertical split</strong> — <code>⌘\</code></li>
        <li><strong>Horizontal split</strong> — <code>⌘⇧\</code></li>
        <li><strong>Close split</strong> — <code>⌘W</code> in the split pane</li>
      </ul>

      <h2>Panel Management</h2>
      <ul>
        <li><strong>Drag to reorder</strong> — Rearrange panels in the sidebar and bottom area</li>
        <li><strong>Double-click to detach</strong> — Pop any panel into a floating window</li>
        <li><strong>Right-click to hide</strong> — Remove panels you don&apos;t need</li>
        <li><strong>Resize</strong> — Drag panel edges to adjust width and height</li>
        <li><strong>Reset layout</strong> — Settings → Appearance → Reset Layout</li>
      </ul>

      <h2>Window Management</h2>
      <p>
        G-Rump supports native macOS window management:
      </p>
      <ul>
        <li><strong>Full Screen</strong> — <code>⌃⌘F</code></li>
        <li><strong>Split Screen</strong> — Drag to screen edge for macOS split view</li>
        <li><strong>Stage Manager</strong> — Full compatibility with macOS Stage Manager</li>
        <li><strong>Multiple windows</strong> — Open multiple G-Rump windows for different projects</li>
      </ul>
    </article>
  );
}

function LayoutArea({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="rounded-xl border border-stroke/50 p-4">
      <p className="text-sm font-semibold text-primary">{name}</p>
      <p className="mt-1 text-xs leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}
