"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            className="rounded-md border border-[var(--hairline)] px-2 py-0.5 font-mono text-xs text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
            onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }}
        >
            {copied ? "Copied" : label}
        </button>
    );
}
