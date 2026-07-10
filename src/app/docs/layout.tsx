import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { getDocsByGroup } from "@/lib/docs-manifest";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const groups = getDocsByGroup().map(({ group, pages }) => ({
        group,
        pages: pages.map(({ slug, title }) => ({ slug, title })),
    }));

    return (
        <>
            <Nav />
            <div className="mx-auto flex min-h-screen max-w-[1280px] flex-col gap-2 px-6 pt-28 lg:flex-row lg:gap-12">
                <DocsSidebar groups={groups} />
                <main id="main-content" className="min-w-0 flex-1 pb-24">
                    {children}
                </main>
            </div>
            <DocsSearch />
            <Footer />
        </>
    );
}
