/**
 * Single source of truth for every marketing claim on the site.
 * Verified against the app repo (docs/ + CLAUDE.md + CHANGELOG.md) — if a
 * number changes in the app, it changes here and nowhere else.
 */

export const GITHUB_URL = "https://github.com/Aphrodine-wq/G-Rump";
export const GITHUB_RELEASES_URL = `${GITHUB_URL}/releases`;
export const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;

export const FACTS = {
    tools: 153,
    agentModes: 3, // Plan, Build, Spec
    providers: 4, // Anthropic (default), OpenAI, Google, OpenRouter
    panels: 20, // dock panels; counted from PanelTab.swift (Learning is the 20th)
    mcpPresets: 67, // one-click MCP server presets, counted from MCPServerConfig.swift
    mcpServerPort: 18790,
    tests: 1564, // XCTest functions counted across Tests/ — marketed as "1,500+"
    skills: 73, // bundled SKILL.md files in 21 packs
    skillPacks: 21,
    agentLoopMaxTurns: 200, // default; clamps 5–1000
    macOSRequirement: "macOS 14 or later",
    license: "MIT",
} as const;

export const PROVIDERS = ["Anthropic", "OpenAI", "Google", "OpenRouter"] as const;
export const AGENT_MODES = ["Plan", "Build", "Spec"] as const;
