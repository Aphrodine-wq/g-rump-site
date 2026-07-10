import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import download from "@/data/download.json";
import { FACTS, GITHUB_URL, LICENSE_URL } from "@/lib/facts";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const mono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

const SITE_URL = "https://www.g-rump.com";
const SITE_NAME = "G-Rump";
const SITE_TITLE = "G-Rump — The Open-Source AI Harness for macOS";
const SITE_DESCRIPTION =
    "G-Rump is a free, open-source AI harness for macOS: a 200-step agent loop, 153 tools, a learning loop that improves with use, and bring-your-own-key across four providers. Native Swift, no Electron, MIT licensed.";

export const viewport: Viewport = {
    themeColor: "#fbfbfd",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s — G-Rump",
    },
    description: SITE_DESCRIPTION,
    keywords: [
        "open source AI harness",
        "AI harness",
        "AI coding agent",
        "coding agent harness",
        "macOS",
        "Swift",
        "SwiftUI",
        "BYOK",
        "MCP",
        "open source coding agent",
        "developer tools",
    ],
    authors: [{ name: "James Walton", url: GITHUB_URL }],
    creator: "James Walton",
    publisher: SITE_NAME,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    manifest: "/manifest.json",
    category: "Developer Tools",
};

const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS 14.0 or later",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    softwareVersion: download.version,
    downloadUrl: `${SITE_URL}${download.path}`,
    license: LICENSE_URL,
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    featureList: [
        `${FACTS.tools} native tools`,
        `${FACTS.agentModes} agent modes (Plan, Build, Spec)`,
        "Bring-your-own-key: Anthropic, OpenAI, Google, OpenRouter",
        "Recursive learning loop with approval-gated skill proposals",
        `${FACTS.panels} IDE panels with build-and-run to simulator`,
        `MCP client and server (${FACTS.mcpPresets} presets)`,
        "Three-tier cross-session memory",
        "macOS Keychain-only key storage",
    ],
};

const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    sameAs: [GITHUB_URL],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${mono.variable} antialiased`}>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white focus:text-sm"
                >
                    Skip to content
                </a>
                {children}
            </body>
        </html>
    );
}
