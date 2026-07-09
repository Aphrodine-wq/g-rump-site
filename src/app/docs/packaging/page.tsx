export default function PackagingDoc() {
  return (
    <article className="prose-grump">
      <h1>Packaging &amp; Signing</h1>
      <p className="lead">
        Distribute G-Rump as a signed and notarized macOS application. This
        guide covers code signing, notarization, DMG creation, and distribution.
      </p>

      <h2>Code Signing</h2>
      <p>
        macOS requires apps to be code-signed for distribution. G-Rump uses
        Apple&apos;s standard code signing workflow:
      </p>
      <CodeBlock
        code={`# Sign with your Developer ID
codesign --deep --force --verify --verbose \\
  --sign "Developer ID Application: Your Name (TEAM_ID)" \\
  --options runtime \\
  build/Release/G-Rump.app`}
      />
      <ul>
        <li><strong>Developer ID</strong> — Required for distribution outside the Mac App Store</li>
        <li><strong>Hardened Runtime</strong> — Enabled by default with <code>--options runtime</code></li>
        <li><strong>Deep signing</strong> — Signs all nested frameworks and binaries</li>
      </ul>

      <h2>Notarization</h2>
      <p>
        Apple notarization scans your app for malicious content and issues a
        ticket that allows macOS Gatekeeper to verify it:
      </p>
      <CodeBlock
        code={`# Create a ZIP for notarization
ditto -c -k --keepParent \\
  build/Release/G-Rump.app \\
  build/G-Rump.zip

# Submit for notarization
xcrun notarytool submit build/G-Rump.zip \\
  --apple-id "your@email.com" \\
  --team-id "TEAM_ID" \\
  --password "@keychain:AC_PASSWORD" \\
  --wait

# Staple the ticket to the app
xcrun stapler staple build/Release/G-Rump.app`}
      />

      <h2>DMG Creation</h2>
      <p>
        Create a distributable DMG disk image:
      </p>
      <CodeBlock
        code={`# Using make (recommended)
make dmg

# Manual DMG creation
hdiutil create -volname "G-Rump" \\
  -srcfolder build/Release/G-Rump.app \\
  -ov -format UDZO \\
  build/G-Rump.dmg

# Sign the DMG
codesign --sign "Developer ID Application: Your Name (TEAM_ID)" \\
  build/G-Rump.dmg

# Notarize the DMG
xcrun notarytool submit build/G-Rump.dmg \\
  --apple-id "your@email.com" \\
  --team-id "TEAM_ID" \\
  --password "@keychain:AC_PASSWORD" \\
  --wait

xcrun stapler staple build/G-Rump.dmg`}
      />

      <h2>Distribution Checklist</h2>
      <div className="mt-4 space-y-2">
        <CheckItem label="Build release .app with make app" />
        <CheckItem label="Code sign with Developer ID" />
        <CheckItem label="Enable Hardened Runtime" />
        <CheckItem label="Submit for Apple notarization" />
        <CheckItem label="Staple notarization ticket" />
        <CheckItem label="Create DMG with make dmg" />
        <CheckItem label="Sign and notarize the DMG" />
        <CheckItem label="Test on a clean macOS installation" />
      </div>

      <h2>Entitlements</h2>
      <p>
        G-Rump requires the following entitlements for full functionality:
      </p>
      <CodeBlock
        code={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.app-sandbox</key>
  <false/>
  <key>com.apple.security.cs.allow-jit</key>
  <true/>
  <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
  <true/>
  <key>com.apple.security.automation.apple-events</key>
  <true/>
</dict>
</plist>`}
      />

      <h2>References</h2>
      <ul>
        <li>
          <a href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS/blob/main/DISTRIBUTION.md">
            DISTRIBUTION.md on GitHub
          </a> — Full packaging and distribution guide
        </li>
        <li>
          <a href="https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution">
            Apple: Notarizing macOS Software
          </a>
        </li>
      </ul>
    </article>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-stroke/40 px-4 py-2.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-stroke/60">
        <svg className="h-3 w-3 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm text-secondary">{label}</span>
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
