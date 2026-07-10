"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type IndexEntry = {
    route: string;
    title: string;
    group: string;
    headings: string[];
    body: string;
};

type Result = { entry: IndexEntry; score: number };

function search(index: IndexEntry[], query: string): Result[] {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    const results: Result[] = [];
    for (const entry of index) {
        let score = 0;
        const title = entry.title.toLowerCase();
        const headings = entry.headings.join(" ").toLowerCase();
        const body = entry.body.toLowerCase();
        for (const token of tokens) {
            if (title.includes(token)) score += 3;
            if (headings.includes(token)) score += 2;
            if (body.includes(token)) score += 1;
        }
        if (score >= tokens.length) results.push({ entry, score });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

export function DocsSearch() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const [index, setIndex] = useState<IndexEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // The index is lazy-loaded on first open so it never weighs on page load.
    useEffect(() => {
        if (open && !index.length) {
            import("@/data/search-index.json").then((mod) =>
                setIndex(mod.default as IndexEntry[]),
            );
        }
    }, [open, index.length]);

    const results = useMemo(() => search(index, query), [index, query]);

    const close = useCallback(() => {
        setOpen(false);
        setQuery("");
        setSelected(0);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            } else if (e.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="glass fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
            >
                Search
                <kbd className="font-mono text-xs text-[var(--text-3)]">⌘K</kbd>
            </button>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 px-4 pt-[15vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            onClick={close}
        >
            <div
                className="glass w-full max-w-xl rounded-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder="Search docs…"
                    className="w-full border-b border-[var(--hairline-soft)] bg-transparent px-5 py-4 text-[15px] text-[var(--text-1)] outline-none placeholder:text-[var(--text-3)]"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelected(0);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setSelected((s) => Math.min(s + 1, results.length - 1));
                        } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setSelected((s) => Math.max(s - 1, 0));
                        } else if (e.key === "Enter" && results[selected]) {
                            router.push(results[selected].entry.route);
                            close();
                        }
                    }}
                />
                <ul className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
                    {query && !results.length && (
                        <li className="px-4 py-6 text-center text-sm text-[var(--text-3)]">
                            No results for &ldquo;{query}&rdquo;
                        </li>
                    )}
                    {results.map(({ entry }, i) => (
                        <li key={entry.route}>
                            <button
                                type="button"
                                className={`w-full rounded-lg px-4 py-2.5 text-left transition-colors duration-150 ${
                                    i === selected ? "bg-[var(--bg-inset)]" : ""
                                }`}
                                onMouseEnter={() => setSelected(i)}
                                onClick={() => {
                                    router.push(entry.route);
                                    close();
                                }}
                            >
                                <span className="block text-sm font-medium text-[var(--text-1)]">
                                    {entry.title}
                                </span>
                                <span className="block font-mono text-xs text-[var(--text-3)]">
                                    {entry.group}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
