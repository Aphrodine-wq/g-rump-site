"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Quick Start", href: "/docs/quick-start" },
      { label: "System Requirements", href: "/docs/requirements" },
    ],
  },
  {
    title: "Core Features",
    items: [
      { label: "Multi-Provider AI", href: "/docs/providers" },
      { label: "100+ Tools", href: "/docs/tools" },
      { label: "IDE Panels", href: "/docs/panels" },
      { label: "Agent Modes", href: "/docs/agent-modes" },
      { label: "LSP Integration", href: "/docs/lsp" },
    ],
  },
  {
    title: "Skills & Personality",
    items: [
      { label: "Skills System", href: "/docs/skills" },
      { label: "SOUL.md", href: "/docs/soul" },
      { label: "Custom Skills", href: "/docs/custom-skills" },
    ],
  },
  {
    title: "Integration",
    items: [
      { label: "MCP Servers", href: "/docs/mcp" },
      { label: "Project Config", href: "/docs/project-config" },
      { label: "Workflow Presets", href: "/docs/workflow-presets" },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "Exec Approvals", href: "/docs/exec-approvals" },
      { label: "Keychain Vault", href: "/docs/keychain" },
      { label: "Permissions", href: "/docs/permissions" },
    ],
  },
  {
    title: "Customization",
    items: [
      { label: "Themes", href: "/docs/themes" },
      { label: "Layout", href: "/docs/layout" },
      { label: "Keyboard Shortcuts", href: "/docs/shortcuts" },
    ],
  },
  {
    title: "Distribution",
    items: [
      { label: "Building", href: "/docs/building" },
      { label: "Packaging & Signing", href: "/docs/packaging" },
    ],
  },
];

const allPages = sections.flatMap((s) => s.items);

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentIndex = allPages.findIndex((p) => p.href === pathname);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-stroke/40 bg-bg/80 backdrop-blur-xl backdrop-saturate-[1.8]">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-5">
          <div className="flex items-center gap-5">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mr-1 flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary md:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>

            <Link href="/" className="text-[15px] font-semibold tracking-tight text-primary">
              G-Rump
            </Link>
            <span className="text-stroke">/</span>
            <Link href="/docs" className="text-sm text-secondary hover:text-primary transition-colors">
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-black/[0.04] hover:text-primary"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <Link
              href="/#download"
              className="rounded-full bg-blue px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-blue-hover hover:scale-[1.02]"
            >
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-12 bottom-0 w-[280px] overflow-y-auto border-r border-stroke/30 bg-bg px-5 py-6">
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="mx-auto flex max-w-[1200px] pt-12">
        {/* Desktop Sidebar */}
        <aside className="sticky top-12 hidden h-[calc(100vh-3rem)] w-[240px] shrink-0 overflow-y-auto border-r border-stroke/30 px-5 py-8 md:block scrollbar-thin">
          <SidebarContent pathname={pathname} />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-6 py-8 sm:px-8 lg:px-16">
          {children}

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="mt-16 flex items-stretch gap-4 border-t border-stroke/30 pt-8">
              {prev ? (
                <Link
                  href={prev.href}
                  className="group flex-1 rounded-xl border border-stroke/40 p-5 transition-all hover:border-stroke/70 hover:bg-black/[0.02]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">Previous</p>
                  <p className="mt-1.5 text-sm font-medium text-primary group-hover:text-blue transition-colors">
                    <span className="mr-1 text-tertiary">&larr;</span> {prev.label}
                  </p>
                </Link>
              ) : <div className="flex-1" />}
              {next ? (
                <Link
                  href={next.href}
                  className="group flex-1 rounded-xl border border-stroke/40 p-5 text-right transition-all hover:border-stroke/70 hover:bg-black/[0.02]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">Next</p>
                  <p className="mt-1.5 text-sm font-medium text-primary group-hover:text-blue transition-colors">
                    {next.label} <span className="ml-1 text-tertiary">&rarr;</span>
                  </p>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          )}

          {/* Docs footer */}
          <div className="mt-12 border-t border-stroke/20 pt-8 pb-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-tertiary">
                &copy; {new Date().getFullYear()} G-Rump. Built with Swift &amp; SwiftUI for macOS.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Aphrodine-wq/G-Rump_MAC_OS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary transition-colors hover:text-primary"
                >
                  GitHub
                </a>
                <a href="/" className="text-xs text-secondary transition-colors hover:text-primary">
                  Home
                </a>
                <a href="/#download" className="text-xs text-secondary transition-colors hover:text-primary">
                  Download
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">
            {section.title}
          </p>
          <div className="space-y-0.5">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block rounded-md px-2.5 py-1.5 text-[13px] transition-all ${
                  pathname === item.href
                    ? "bg-blue/10 font-medium text-blue shadow-[inset_2px_0_0_var(--accent-blue)]"
                    : "text-secondary hover:text-primary hover:bg-black/[0.02]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
