import type { MetadataRoute } from "next";
import { DOCS_PAGES } from "@/lib/docs-manifest";

const SITE_URL = "https://www.g-rump.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const marketingPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/download", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/features", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/what-is-an-ai-harness", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/roadmap", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/contribute", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/vs/claude-code", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/vs/aider", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/vs/openhands", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
        { path: "/security", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
        { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ];

    return [
        ...marketingPages.map((page) => ({
            url: `${SITE_URL}${page.path}`,
            lastModified: now,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),
        {
            url: `${SITE_URL}/docs`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        ...DOCS_PAGES.map((page) => ({
            url: `${SITE_URL}/docs/${page.slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
