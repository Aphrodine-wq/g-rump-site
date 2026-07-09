import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEggs } from "@/components/EasterEggs";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BreadcrumbJsonLd />
            <ScrollProgress />
            <CursorSpotlight />
            <Nav />
            <main id="main-content" className="min-h-screen pt-16">{children}</main>
            <Footer />
            <CommandPalette />
            <EasterEggs />
        </>
    );
}
