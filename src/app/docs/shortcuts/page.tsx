export default function ShortcutsDoc() {
  return (
    <article className="prose-grump">
      <h1>Keyboard Shortcuts</h1>
      <p className="lead">
        G-Rump is built for keyboard-first workflows. Every action has a
        shortcut, and every shortcut is customizable.
      </p>

      <h2>General</h2>
      <ShortcutTable
        shortcuts={[
          { keys: "⌘,", action: "Open Settings" },
          { keys: "⌘N", action: "New File" },
          { keys: "⌘O", action: "Open File" },
          { keys: "⌘S", action: "Save" },
          { keys: "⌘⇧S", action: "Save All" },
          { keys: "⌘W", action: "Close Tab" },
          { keys: "⌘Q", action: "Quit G-Rump" },
        ]}
      />

      <h2>Navigation</h2>
      <ShortcutTable
        shortcuts={[
          { keys: "⌘P", action: "Quick Open (file search)" },
          { keys: "⌘⇧P", action: "Command Palette" },
          { keys: "⌘⇧F", action: "Project-wide Search" },
          { keys: "⌘G", action: "Go to Line" },
          { keys: "⌘⇧O", action: "Go to Symbol" },
          { keys: "⌃Tab", action: "Switch Tab" },
          { keys: "⌘1-9", action: "Switch to Tab N" },
        ]}
      />

      <h2>Editor</h2>
      <ShortcutTable
        shortcuts={[
          { keys: "⌘/", action: "Toggle Comment" },
          { keys: "⌘D", action: "Select Next Occurrence" },
          { keys: "⌘⇧L", action: "Select All Occurrences" },
          { keys: "⌥↑", action: "Move Line Up" },
          { keys: "⌥↓", action: "Move Line Down" },
          { keys: "⌘⇧K", action: "Delete Line" },
          { keys: "⌘]", action: "Indent" },
          { keys: "⌘[", action: "Outdent" },
          { keys: "⌘\\", action: "Split Editor Vertically" },
        ]}
      />

      <h2>AI Agent</h2>
      <ShortcutTable
        shortcuts={[
          { keys: "⌘L", action: "Focus AI Chat" },
          { keys: "⌘⇧L", action: "Send Selection to Chat" },
          { keys: "⌘⇧A", action: "Toggle Agent Mode" },
          { keys: "⌘⇧1-5", action: "Switch Agent Mode (Chat/Plan/Build/Debate/Spec)" },
          { keys: "Esc", action: "Stop Agent Execution" },
        ]}
      />

      <h2>Panels</h2>
      <ShortcutTable
        shortcuts={[
          { keys: "⌘B", action: "Toggle Sidebar" },
          { keys: "⌘J", action: "Toggle Bottom Panel" },
          { keys: "⌘⇧Z", action: "Toggle Zen Mode" },
          { keys: "⌘⇧E", action: "File Navigator" },
          { keys: "⌃⇧G", action: "Git Panel" },
          { keys: "⌘⇧T", action: "Terminal" },
          { keys: "⌘⇧U", action: "Tests Panel" },
        ]}
      />

      <h2>Customization</h2>
      <p>
        Customize any shortcut in <strong>Settings → Keyboard
        Shortcuts</strong>. Search for any action and assign your preferred key
        combination. Conflicts are detected automatically.
      </p>
      <p>
        You can also export and import shortcut configurations to share across
        machines or with your team.
      </p>
    </article>
  );
}

function ShortcutTable({
  shortcuts,
}: {
  shortcuts: { keys: string; action: string }[];
}) {
  return (
    <div className="mt-3 mb-6 overflow-hidden rounded-xl border border-stroke/50">
      {shortcuts.map((s, i) => (
        <div
          key={s.keys}
          className={`flex items-center justify-between px-4 py-2.5 ${
            i !== shortcuts.length - 1 ? "border-b border-stroke/30" : ""
          }`}
        >
          <span className="text-sm text-secondary">{s.action}</span>
          <kbd className="rounded-lg bg-bg-alt px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-primary">
            {s.keys}
          </kbd>
        </div>
      ))}
    </div>
  );
}
