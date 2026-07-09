import type { MetadataRoute } from "next";

const SITE_URL = "https://www.g-rump.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const marketingPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/features", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
        { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
        { path: "/security", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/releases", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/billing/success", priority: 0.3, changeFrequency: "yearly" as const },
        { path: "/billing/cancel", priority: 0.3, changeFrequency: "yearly" as const },
    ];

    const blogSlugs = [
        "introducing-grump-2",
        "why-native-macos-matters",
        "mastering-agent-modes",
    ];

    const docsSlugs = [
        "",
        "/quick-start",
        "/requirements",
        "/providers",
        "/tools",
        "/panels",
        "/agent-modes",
        "/lsp",
        "/skills",
        "/soul",
        "/custom-skills",
        "/mcp",
        "/project-config",
        "/workflow-presets",
        "/exec-approvals",
        "/keychain",
        "/permissions",
        "/themes",
        "/layout",
        "/shortcuts",
        "/building",
        "/packaging",
    ];

    return [
        ...marketingPages.map((page) => ({
            url: `${SITE_URL}${page.path}`,
            lastModified: now,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),
        ...blogSlugs.map((slug) => ({
            url: `${SITE_URL}/blog/${slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
        ...docsSlugs.map((slug) => ({
            url: `${SITE_URL}/docs${slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];
}
