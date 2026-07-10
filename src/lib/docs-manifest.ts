import manifest from "@/data/docs-manifest.json";

export type DocPage = {
    slug: string;
    title: string;
    group: string;
    owned: "site" | "app";
    source?: string;
};

export const DOCS_GROUPS: string[] = manifest.groups;
export const DOCS_PAGES: DocPage[] = manifest.pages as DocPage[];

export function getDocPage(slug: string): DocPage | undefined {
    return DOCS_PAGES.find((p) => p.slug === slug);
}

export function getDocsByGroup(): { group: string; pages: DocPage[] }[] {
    return DOCS_GROUPS.map((group) => ({
        group,
        pages: DOCS_PAGES.filter((p) => p.group === group),
    }));
}

export function getPrevNext(slug: string): { prev?: DocPage; next?: DocPage } {
    const i = DOCS_PAGES.findIndex((p) => p.slug === slug);
    if (i === -1) return {};
    return {
        prev: i > 0 ? DOCS_PAGES[i - 1] : undefined,
        next: i < DOCS_PAGES.length - 1 ? DOCS_PAGES[i + 1] : undefined,
    };
}
