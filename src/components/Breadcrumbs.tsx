"use client";

import { usePathname } from "next/navigation";

const SITE_URL = "https://www.g-rump.com";

const pageNames: Record<string, string> = {
    features: "Features",
    pricing: "Pricing",
    blog: "Blog",
    changelog: "Changelog",
    about: "About",
    contact: "Contact",
    security: "Security",
    docs: "Documentation",
    matrix: "Matrix",
};

export function BreadcrumbJsonLd() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const items = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
        },
        ...segments.map((segment, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
        })),
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
