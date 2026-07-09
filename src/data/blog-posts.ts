export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    featured?: boolean;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "introducing-grump-2",
        title: "Introducing G-Rump 2.0: The Future of AI-Powered Coding on macOS",
        excerpt:
            "Today we're launching G-Rump 2.0 with 50 new tools, multi-provider AI routing, and the most advanced agent mode system ever built for macOS developers.",
        date: "2026-02-25",
        readTime: "8 min read",
        category: "Product",
        featured: true,
        content: `We've been building G-Rump for two years with a single obsession: making AI coding feel native to macOS. Today, G-Rump 2.0 ships with 100+ tools, five agent modes, and deep integration with every part of your Mac.

## What's New

### Multi-Provider AI Routing
G-Rump 2.0 can route your requests across Anthropic, OpenAI, Ollama, OpenRouter, and CoreML. The system picks the best model for each task — or you choose manually. Switch providers mid-conversation without losing context.

### 50 New Tools
We've added browser automation, Docker management, cloud deployment, Apple Calendar integration, OCR, and Spotlight search. Every tool is accessible to the agent in Build mode, and all shell commands go through our exec approval system.

### Seven Agent Modes
Chat, Plan, Build, Debate, and Spec modes each tailor the agent's behavior, tool access, and output format. Build mode supports up to 150 autonomous steps with full file, git, and shell access.

## What's Next
We're working on collaborative multi-agent sessions, real-time pair programming, and a plugin marketplace. The future of coding is here, and it runs on your Mac.`,
    },
    {
        slug: "why-native-macos-matters",
        title: "Why We Built G-Rump as a Native macOS App (Not Another Electron Wrapper)",
        excerpt:
            "Performance, privacy, and deep system integration. Here's why going native was the only option for a serious AI coding agent.",
        date: "2026-02-18",
        readTime: "6 min read",
        category: "Engineering",
        featured: false,
        content: `When we started building G-Rump, we had a choice: ship fast with Electron or go native with Swift and SwiftUI. We chose native. Here's why.

## Performance That Respects Your Machine
Native apps don't eat 500MB of RAM just to render a text input. G-Rump uses SwiftUI for its entire interface, which means every panel, every animation, every interaction is rendered by the same framework that powers Xcode, Finder, and Safari.

## Deep System Integration
Because G-Rump is a first-class macOS citizen, it can access Spotlight, Keychain, Calendar, Notification Center, and the full Accessibility API. Try doing that from an Electron sandbox.

### Keychain-Backed Security
Every API key and credential is stored in your macOS Keychain — the same vault that protects your passwords, certificates, and SSH keys. No .env files. No plaintext config.

### Spotlight Search
G-Rump can search your entire filesystem through Spotlight's index, which is orders of magnitude faster than recursive grep.

## The Trade-Off
Going native means we only support macOS. We're okay with that. G-Rump is built for developers who chose a Mac for a reason, and we think they deserve tools that feel like they belong.`,
    },
    {
        slug: "mastering-agent-modes",
        title: "Mastering G-Rump's Seven Agent Modes: A Deep Dive",
        excerpt:
            "Chat, Plan, Build, Debate, and Spec — each mode unlocks a different way of working with AI. Learn when and how to use each one.",
        date: "2026-02-10",
        readTime: "10 min read",
        category: "Tutorial",
        featured: false,
        content: `G-Rump ships with five distinct agent modes, each designed for a specific phase of the development workflow. Understanding when to switch modes is the key to getting the most out of your AI coding agent.

## Chat Mode
The default conversational mode. Use it for quick questions, code explanations, brainstorming, and lightweight code generation. Chat mode maintains full conversation history with automatic context compaction.

**Best for:** Quick questions, code review, learning, exploration.

## Plan Mode
When you need to think before you build. Plan mode generates structured implementation plans with clear steps, verification criteria, and dependency maps. It won't write code — it helps you architect solutions.

**Best for:** New features, refactoring strategy, system design, technical specs.

## Build Mode
The autonomous execution engine. Build mode can run up to 150 steps, writing files, executing shell commands, running tests, and iterating on errors independently. It uses all 100+ tools.

**Best for:** Feature implementation, bug fixes, test writing, CI/CD setup.

## Debate Mode
Challenge your assumptions. Debate mode presents counterarguments, explores edge cases, and forces you to consider failure modes. It's the mode that makes your code better by making you think harder.

**Best for:** Architecture decisions, code review, security analysis, trade-off evaluation.

## Spec Mode
Generate detailed technical specifications from high-level requirements. Spec mode outputs structured documents with acceptance criteria, data models, API contracts, and sequence diagrams.

**Best for:** PRDs, API design, database schemas, feature specs.

## Switching Modes
You can switch modes mid-conversation with a single command. Context carries over, so you can plan in Plan mode and then switch to Build mode to execute.`,
    },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
