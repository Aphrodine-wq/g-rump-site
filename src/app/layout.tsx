/*
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                                                              ║
 * ║     ██████╗       ██████╗ ██╗   ██╗███╗   ███╗██████╗       ║
 * ║    ██╔════╝       ██╔══██╗██║   ██║████╗ ████║██╔══██╗      ║
 * ║    ██║  ███╗█████╗██████╔╝██║   ██║██╔████╔██║██████╔╝      ║
 * ║    ██║   ██║╚════╝██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝       ║
 * ║    ╚██████╔╝      ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║           ║
 * ║     ╚═════╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝          ║
 * ║                                                              ║
 * ║  Native macOS AI Coding Agent                                ║
 * ║  Built with Swift, SwiftUI & Next.js                         ║
 * ║                                                              ║
 * ║  Hey, you're reading the source! We like curious people.     ║
 * ║  Check out /matrix for a surprise.                           ║
 * ║                                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

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
const SITE_DESCRIPTION =
    "Native macOS AI coding agent with 100+ tools, multi-provider AI, 17 IDE intelligence panels, 40+ expert skills, and deep system integration. Built with Swift and SwiftUI for macOS 14+.";

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "G-Rump — Native macOS AI Coding Agent",
        template: "%s — G-Rump",
    },
    description: SITE_DESCRIPTION,
    keywords: [
        "AI coding agent",
        "macOS",
        "native app",
        "Swift",
        "SwiftUI",
        "coding assistant",
        "AI tools",
        "MCP servers",
        "developer tools",
        "code generation",
        "Anthropic",
        "OpenAI",
        "Ollama",
        "CoreML",
        "IDE",
        "agent modes",
        "build mode",
        "AI pair programming",
    ],
    authors: [{ name: "G-Rump Team", url: SITE_URL }],
    creator: "G-Rump",
    publisher: "G-Rump",
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
        title: "G-Rump — Native macOS AI Coding Agent",
        description: SITE_DESCRIPTION,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "G-Rump — Native macOS AI Coding Agent",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "G-Rump — Native macOS AI Coding Agent",
        description: SITE_DESCRIPTION,
        images: ["/og-image.png"],
        creator: "@grumpdev",
    },
    alternates: {
        canonical: SITE_URL,
    },
    category: "Developer Tools",
    other: {
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "G-Rump",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS 14+",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "49.99",
        priceCurrency: "USD",
        offerCount: 4,
    },
    featureList: [
        "100+ built-in tools",
        "7 agent modes (Chat, Plan, Build, Debate, Spec, Parallel, Explore)",
        "Multi-provider AI (Anthropic, OpenAI, Ollama, CoreML)",
        "17 IDE intelligence panels",
        "40+ expert skills",
        "58 MCP servers",
        "macOS Keychain integration",
        "Native Swift and SwiftUI",
    ],
};

const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "G-Rump",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
        "https://github.com/Aphrodine-wq/G-Rump_MAC_OS",
        "https://twitter.com/grumpdev",
    ],
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${SITE_URL}/contact`,
    },
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={`${inter.variable} ${mono.variable} antialiased`}>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white focus:text-sm">
                    Skip to content
                </a>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
