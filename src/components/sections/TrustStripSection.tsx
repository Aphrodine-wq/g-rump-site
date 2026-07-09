"use client";

import {
    Stagger,
    StaggerItem,
} from "@/ui/motion";

const signals = [
    {
        icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
        title: "Keychain-Backed",
        desc: "Credentials stored in macOS Keychain",
    },
    {
        icon: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88",
        title: "No Telemetry",
        desc: "Zero data collection without consent",
    },
    {
        icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
        title: "Local Models",
        desc: "Run fully offline with Ollama & CoreML",
    },
    {
        icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
        title: "Sandboxed Exec",
        desc: "Every shell command requires approval",
    },
    {
        icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
        title: "Open Source",
        desc: "Full source code on GitHub",
    },
];

export function TrustStripSection() {
    return (
        <section className="px-5 py-20">
            <div className="mx-auto max-w-[1100px]">
                <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5" staggerDelay={0.06}>
                    {signals.map((s) => (
                        <StaggerItem key={s.title} className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.06] bg-black/[0.02] mb-3">
                                <svg className="h-5 w-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold text-primary">{s.title}</p>
                            <p className="mt-1 text-xs text-tertiary">{s.desc}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
