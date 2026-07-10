import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            <main id="main-content" className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
        </>
    );
}
