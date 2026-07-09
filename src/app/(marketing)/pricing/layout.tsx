import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "Simple, credit-based pricing for G-Rump. Start free with 500 credits/month. Upgrade to Starter ($9.99), Pro ($19.99), or Team ($49.99) for more credits and model access.",
    openGraph: {
        title: "Pricing — G-Rump",
        description:
            "Simple, credit-based pricing for G-Rump. Free tier with 500 credits/month. Starter $9.99, Pro $19.99, Team $49.99.",
    },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How do credits work?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Credits are deducted based on token usage when you use AI through the G-Rump platform (1 credit per 1,000 tokens). Your monthly credit allowance replenishes each billing cycle. You can also purchase credit packs that never expire.",
            },
        },
        {
            "@type": "Question",
            name: "Can I bring my own API keys?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. G-Rump supports Bring Your Own Key (BYOK) on every tier. Connect your Anthropic, OpenAI, or Ollama keys directly — stored securely in macOS Keychain. BYOK usage doesn't consume platform credits.",
            },
        },
        {
            "@type": "Question",
            name: "What macOS version do I need?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "G-Rump requires macOS 14 (Sonoma) or later and Swift 5.9+. It's built with SwiftUI and leverages modern macOS APIs.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a free trial?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Starter comes with a 7-day free trial and Pro comes with a 14-day free trial. Full access to all features and model tiers during the trial.",
            },
        },
        {
            "@type": "Question",
            name: "How is my data handled?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "G-Rump never collects telemetry without explicit consent. When using BYOK, your code goes directly to your AI provider. Credentials are stored in macOS Keychain, never in config files.",
            },
        },
        {
            "@type": "Question",
            name: "Can I use G-Rump offline?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, with local models. Connect Ollama or use CoreML to run models entirely on your Mac. All 100+ tools work offline. Only cloud AI providers and platform credits require internet.",
            },
        },
    ],
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {children}
        </>
    );
}
