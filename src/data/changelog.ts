export interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    description: string;
    changes: {
        type: "new" | "improved" | "fixed";
        text: string;
    }[];
}

export const changelog: ChangelogEntry[] = [
    {
        version: "2.0.4",
        date: "2025-01-15",
        title: "MCP Server Improvements",
        description: "Major reliability improvements for MCP server connections and new server additions.",
        changes: [
            { type: "new", text: "Added 6 new MCP servers: Linear, Notion, Jira, Confluence, Datadog, PagerDuty" },
            { type: "new", text: "MCP server health monitoring dashboard in IDE panel" },
            { type: "improved", text: "Server reconnection logic with exponential backoff" },
            { type: "improved", text: "Tool discovery now caches schemas for faster startup" },
            { type: "fixed", text: "MCP server connections dropping after 30 minutes of idle" },
            { type: "fixed", text: "Custom server configs not persisting across sessions" },
        ],
    },
    {
        version: "2.0.3",
        date: "2024-12-20",
        title: "Build Mode Enhancements",
        description: "Build mode now supports up to 150 steps with improved planning and execution.",
        changes: [
            { type: "new", text: "Build mode step limit increased from 100 to 150 for Pro users" },
            { type: "new", text: "Step-by-step progress visualization with live status updates" },
            { type: "new", text: "Automatic checkpoint creation every 25 steps for safe rollback" },
            { type: "improved", text: "Build planning accuracy improved by 40% with better context gathering" },
            { type: "improved", text: "Shell command approval UI with syntax highlighting" },
            { type: "fixed", text: "Build mode occasionally skipping test verification steps" },
            { type: "fixed", text: "Memory usage spike when processing large file diffs" },
        ],
    },
    {
        version: "2.0.2",
        date: "2024-12-05",
        title: "Debate Mode & CoreML",
        description: "New Debate agent mode and CoreML integration for on-device inference.",
        changes: [
            { type: "new", text: "Debate mode: challenge assumptions and explore architectural trade-offs" },
            { type: "new", text: "CoreML support for Apple Silicon — run models on-device with Metal acceleration" },
            { type: "new", text: "SOUL.md personality file support for customizing agent behavior" },
            { type: "improved", text: "Spec mode output now includes Mermaid diagrams for architecture visualization" },
            { type: "improved", text: "Model switching mid-conversation is now seamless" },
            { type: "fixed", text: "Anthropic API timeout on large context windows" },
        ],
    },
    {
        version: "2.0.1",
        date: "2024-11-18",
        title: "Skills System Launch",
        description: "Introducing the Expert Skills system with 40+ built-in skills.",
        changes: [
            { type: "new", text: "Expert Skills system with 40+ built-in skills for common frameworks and patterns" },
            { type: "new", text: "Custom skill creation — teach G-Rump your team's conventions" },
            { type: "new", text: "Skill auto-detection based on project tech stack" },
            { type: "new", text: "Skills for SwiftUI, React, Next.js, Python, Rust, Go, and more" },
            { type: "improved", text: "Context window utilization improved by 25% with smarter file selection" },
            { type: "fixed", text: "Git panel not showing uncommitted changes in nested repositories" },
            { type: "fixed", text: "Spotlight integration returning stale file metadata" },
        ],
    },
    {
        version: "2.0.0",
        date: "2024-11-01",
        title: "G-Rump 2.0",
        description: "Major release with 5 agent modes, 100+ tools, and a completely redesigned native UI.",
        changes: [
            { type: "new", text: "Completely redesigned native SwiftUI interface" },
            { type: "new", text: "5 agent modes: Chat, Plan, Build, Debate, Spec" },
            { type: "new", text: "100+ built-in tools including Apple-native integrations" },
            { type: "new", text: "17 IDE intelligence panels" },
            { type: "new", text: "Multi-provider AI with Anthropic, OpenAI, Ollama, OpenRouter support" },
            { type: "new", text: "macOS Keychain integration for secure credential storage" },
            { type: "new", text: "Accessibility framework integration for UI automation" },
            { type: "improved", text: "Performance: 3x faster startup, 60% lower memory usage" },
            { type: "improved", text: "Native macOS keyboard shortcuts throughout" },
            { type: "fixed", text: "Complete rewrite resolves all known issues from 1.x" },
        ],
    },
    {
        version: "1.5.0",
        date: "2024-09-15",
        title: "Ollama Integration",
        description: "Local model support via Ollama for fully private, offline AI coding.",
        changes: [
            { type: "new", text: "Ollama integration for local model inference" },
            { type: "new", text: "Model management panel — download, update, and switch models" },
            { type: "new", text: "Privacy mode: route all requests through local models only" },
            { type: "improved", text: "File watcher performance for large monorepos" },
            { type: "fixed", text: "Terminal output truncation on commands with >10k lines" },
        ],
    },
];
