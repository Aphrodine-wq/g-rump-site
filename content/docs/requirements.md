---
title: "Requirements"
description: "What you need to run G-Rump: macOS 14 or later, an API key from one supported provider, and nothing else."
owned: site
---

## Running G-Rump

| Requirement | Detail |
|---|---|
| **macOS** | macOS 14 (Sonoma) or later |
| **Hardware** | Apple silicon or Intel — the release build is a universal binary |
| **API key** | One of: Anthropic (default), OpenAI, Google, OpenRouter |
| **Disk** | The app is about 13 MB unzipped |
| **Account** | None. No sign-up, no telemetry, no backend — the app calls your provider directly |

Your API key is stored in the macOS Keychain and used only for direct requests to the provider you chose. See [AI Providers](/docs/providers) for the supported model catalog.

## Optional capabilities

- **Accessibility permission** — required only for the global QuickChat hotkey (double-tap ⌃Space).
- **Xcode** — required only if you want G-Rump's [build engine](/docs/panels) to drive `xcodebuild` and the iOS simulator. Plain Swift packages need just the Command Line Tools.
- **Notifications** — optional, for proactive suggestions and [Focus Filter](/docs/notifications) integration.

## Building from source

- Xcode 16.2 or later (full Xcode, not just Command Line Tools, for `swift test`)
- Swift Package Manager resolves all dependencies on first build

See [Quick Start](/docs/quick-start) for the clone-and-run steps and [Distribution](/docs/distribution) for packaging.
