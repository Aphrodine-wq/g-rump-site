export default function ThemesDoc() {
  return (
    <article className="prose-grump">
      <h1>Themes</h1>
      <p className="lead">
        G-Rump ships with Light, Dark, and Fun themes inspired by popular
        coding tools. Every theme is built with native macOS vibrancy and
        material effects.
      </p>

      <h2>Built-in Themes</h2>

      <div className="mt-6 space-y-3">
        <ThemeCard
          name="Light"
          desc="Clean, high-contrast light theme optimized for well-lit environments. Uses system-native window materials."
          colors={["#ffffff", "#f5f5f7", "#1d1d1f", "#007aff"]}
        />
        <ThemeCard
          name="Dark"
          desc="G-Rump's default theme. Deep blacks with subtle contrast, designed for extended coding sessions."
          colors={["#000000", "#1c1c1e", "#f5f5f7", "#007aff"]}
        />
      </div>

      <h2>Fun Themes</h2>
      <p>
        Themed color palettes inspired by the tools you already love:
      </p>

      <div className="mt-4 space-y-3">
        <ThemeCard
          name="Cursor"
          desc="Inspired by Cursor's sleek dark aesthetic with purple accents."
          colors={["#1a1a2e", "#16213e", "#e2e8f0", "#7c3aed"]}
        />
        <ThemeCard
          name="ChatGPT"
          desc="OpenAI's signature dark green palette with warm undertones."
          colors={["#202123", "#343541", "#ececf1", "#19c37d"]}
        />
        <ThemeCard
          name="Claude"
          desc="Anthropic's warm, earthy tones with a sandy accent palette."
          colors={["#1a1612", "#2d2418", "#f5f0e8", "#da7756"]}
        />
        <ThemeCard
          name="Gemini"
          desc="Google's clean blue-tinted interface with material design influences."
          colors={["#1e1f20", "#282a2c", "#e3e3e3", "#4285f4"]}
        />
        <ThemeCard
          name="Kiro"
          desc="AWS's modern dark theme with teal accents and high contrast."
          colors={["#0d1117", "#161b22", "#c9d1d9", "#58a6ff"]}
        />
      </div>

      <h2>Switching Themes</h2>
      <p>
        Change themes in <strong>Settings → Appearance → Theme</strong>. The
        change applies instantly across all panels and windows. G-Rump also
        supports automatic switching based on macOS system appearance (light/dark).
      </p>

      <h2>System Integration</h2>
      <ul>
        <li><strong>Auto-switch</strong> — Follow macOS system appearance automatically</li>
        <li><strong>Vibrancy</strong> — Native macOS window materials and blur effects</li>
        <li><strong>Accent color</strong> — Respects your system accent color preference</li>
        <li><strong>Dynamic Type</strong> — Supports system font size settings</li>
      </ul>
    </article>
  );
}

function ThemeCard({
  name,
  desc,
  colors,
}: {
  name: string;
  desc: string;
  colors: string[];
}) {
  return (
    <div className="rounded-xl border border-stroke/50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">{name}</p>
        <div className="flex gap-1.5">
          {colors.map((c, i) => (
            <span
              key={i}
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-secondary">{desc}</p>
    </div>
  );
}
