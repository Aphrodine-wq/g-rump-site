---
title: "Quick Start"
description: "Download G-Rump, add an API key, and run your first agent task in about five minutes."
owned: site
---

G-Rump is free and open source. You bring an API key from a provider you already use — nothing else to sign up for.

## 1. Download and install

Grab the latest build from the [download page](/download), or from [GitHub Releases](https://github.com/Aphrodine-wq/G-Rump/releases/latest).

1. Unzip `G-Rump-x.y.z.zip`.
2. Drag **G-Rump.app** into **Applications**.
3. Current builds are ad-hoc signed, so macOS quarantines them on first launch. Clear it once:

```bash
xattr -dr com.apple.quarantine /Applications/G-Rump.app
```

4. Launch G-Rump.

Requirements are short: [macOS 14 or later](/docs/requirements), Apple silicon or Intel.

## 2. Add an API key

On first launch, onboarding asks for a key from one provider — Anthropic (default), OpenAI, Google, or OpenRouter. Paste it and G-Rump validates it with a cheap authenticated request.

Keys are stored in the **macOS Keychain only**. They never touch UserDefaults, config files, or disk. See [AI Providers](/docs/providers) for models and routing.

## 3. Open a project

Point G-Rump at any folder — a Swift package, an Xcode project, or a plain repo. The [project navigator](/docs/panels) (⌘0) shows your tree; `.grump/config.json` holds [per-project settings](/docs/project-config).

## 4. Run your first task

Pick an [agent mode](/docs/agent-modes) — **Plan** to think first, **Build** to make changes, **Spec** to write one — and describe what you want. The agent works through its [160 tools](/docs/tools) with streaming output, and every shell command passes through [exec approvals](/docs/security) before it runs.

As you correct it and it succeeds or fails, the experimental [learning loop](/docs/learning-loop) distills lessons that ride along on future runs. Skill changes it wants to make are proposed as diffs you approve in the Learning panel — never applied silently.

## Build from source

```bash
git clone https://github.com/Aphrodine-wq/G-Rump.git
cd G-Rump
make run
```

`make run` builds the debug app with Swift Package Manager and launches it. See [Distribution](/docs/distribution) for release packaging, signing, and notarization.
