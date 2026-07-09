export default function PermissionsDoc() {
  return (
    <article className="prose-grump">
      <h1>Permissions</h1>
      <p className="lead">
        G-Rump integrates deeply with macOS. Some features require explicit
        system permissions. Here&apos;s what each permission unlocks and how to
        configure them.
      </p>

      <h2>Required Permissions</h2>

      <div className="mt-6 space-y-4">
        <PermCard
          name="Notifications"
          path="System Settings → Notifications → G-Rump"
          desc="Receive alerts when agent tasks complete, when approval is needed for shell commands, and for error notifications. Strongly recommended for Build mode."
          required
        />
        <PermCard
          name="Screen Recording"
          path="System Settings → Privacy & Security → Screen Recording"
          desc="Required for the screenshot and OCR tools. Allows G-Rump to capture screen content for visual analysis, UI testing, and text extraction from images."
          required
        />
        <PermCard
          name="Accessibility"
          path="System Settings → Privacy & Security → Accessibility"
          desc="Required for UI automation tools. Allows G-Rump to interact with other applications, read window contents, and perform automated UI testing."
          required
        />
      </div>

      <h2>Optional Permissions</h2>

      <div className="mt-6 space-y-4">
        <PermCard
          name="Full Disk Access"
          path="System Settings → Privacy & Security → Full Disk Access"
          desc="Access files outside your home directory, including system logs, other user directories, and protected locations. Only needed for advanced system-level tasks."
        />
        <PermCard
          name="Contacts"
          path="System Settings → Privacy & Security → Contacts"
          desc="Access contact information for context-aware features. Only needed if using calendar and contact-related MCP servers."
        />
        <PermCard
          name="Calendar"
          path="System Settings → Privacy & Security → Calendars"
          desc="Read calendar events for scheduling context. Enables the agent to be aware of your schedule when planning tasks."
        />
      </div>

      <h2>Granting Permissions</h2>
      <p>
        macOS will prompt you to grant permissions the first time G-Rump tries
        to use a protected feature. You can also pre-configure permissions:
      </p>
      <ul>
        <li>Open <strong>System Settings</strong></li>
        <li>Navigate to <strong>Privacy &amp; Security</strong></li>
        <li>Find the relevant category</li>
        <li>Toggle G-Rump on</li>
      </ul>

      <h2>Revoking Permissions</h2>
      <p>
        You can revoke any permission at any time through System Settings.
        G-Rump will gracefully degrade — features that require the revoked
        permission will be disabled, but all other functionality continues
        normally.
      </p>

      <h2>Privacy</h2>
      <p>
        G-Rump never sends screen recordings, contacts, or calendar data to
        external servers. These permissions are used exclusively for local
        processing by the AI agent. When using local models (Ollama, CoreML),
        all data stays entirely on your machine.
      </p>
    </article>
  );
}

function PermCard({
  name,
  path,
  desc,
  required,
}: {
  name: string;
  path: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <div className="rounded-xl border border-stroke/50 p-5">
      <div className="flex items-center gap-2.5">
        <p className="text-sm font-semibold text-primary">{name}</p>
        {required && (
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-500">
            Recommended
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-tertiary">{path}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}
