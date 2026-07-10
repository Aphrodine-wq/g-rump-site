"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarGroup = {
    group: string;
    pages: { slug: string; title: string }[];
};

export function DocsSidebar({ groups }: { groups: SidebarGroup[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const nav = (
        <nav aria-label="Docs">
            <Link
                href="/docs"
                className={`mb-6 block text-sm font-semibold ${
                    pathname === "/docs" ? "text-[var(--accent)]" : "text-[var(--text-1)]"
                }`}
                onClick={() => setOpen(false)}
            >
                Documentation
            </Link>
            {groups.map(({ group, pages }) => (
                <div key={group} className="mb-6">
                    <h3 className="eyebrow mb-2.5">{group}</h3>
                    <ul className="space-y-0.5 border-l border-[var(--hairline-soft)]">
                        {pages.map((page) => {
                            const href = `/docs/${page.slug}`;
                            const active = pathname === href;
                            return (
                                <li key={page.slug}>
                                    <Link
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className={`-ml-px block border-l py-1 pl-3.5 text-sm transition-colors duration-150 ${
                                            active
                                                ? "border-[var(--accent)] font-medium text-[var(--accent)]"
                                                : "border-transparent text-[var(--text-2)] hover:border-[var(--hairline)] hover:text-[var(--text-1)]"
                                        }`}
                                    >
                                        {page.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile: disclosure bar */}
            <div className="sticky top-20 z-30 -mx-6 mb-6 px-6 lg:hidden">
                <button
                    type="button"
                    className="glass flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--text-1)]"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    Docs navigation
                    <span aria-hidden="true" className="text-[var(--text-3)]">
                        {open ? "−" : "+"}
                    </span>
                </button>
                {open && (
                    <div className="glass mt-2 max-h-[60vh] overflow-y-auto rounded-xl p-5 scrollbar-thin">
                        {nav}
                    </div>
                )}
            </div>
            {/* Desktop: sticky rail */}
            <aside className="sticky top-28 hidden max-h-[calc(100vh-9rem)] w-56 shrink-0 self-start overflow-y-auto pr-2 scrollbar-thin lg:block">
                {nav}
            </aside>
        </>
    );
}
