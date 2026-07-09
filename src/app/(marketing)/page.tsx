import { Metadata } from "next";
import {
    HeroSection,
    LogoCloudSection,
    NumbersSection,
    HowItWorksSection,
    FeaturesTeaserSection,
    AgentModesSection,
    ComparisonSection,
    TestimonialsSection,
    TrustStripSection,
    KeyboardShortcutsSection,
    NewsletterSection,
    CTASection,
} from "@/components/sections";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { CodePlayground } from "@/components/CodePlayground";

export const metadata: Metadata = {
    title: "G-Rump — Native macOS AI Coding Agent",
    description:
        "100+ tools, multi-provider AI, IDE intelligence panels, 40+ skills, and deep macOS integration. Built with Swift and SwiftUI for macOS 14+.",
};

export default function Home() {
    return (
        <>
            <HeroSection />
            <LogoCloudSection />
            <ProductShowcase />
            <CodePlayground />
            <NumbersSection />
            <HowItWorksSection />
            <ArchitectureDiagram />
            <FeaturesTeaserSection />
            <AgentModesSection />
            <ComparisonSection />
            <TestimonialsSection />
            <LiveActivityFeed />
            <KeyboardShortcutsSection />
            <TrustStripSection />
            <NewsletterSection />
            <CTASection />
        </>
    );
}
