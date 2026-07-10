#!/usr/bin/env node
/**
 * Builds the client-side docs search index from content/docs/*.md.
 * Runs automatically before `next build` via the npm "prebuild" hook.
 * Output: src/data/search-index.json
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(path.join(SITE_ROOT, "src/data/docs-manifest.json"), "utf8"));

function plainText(markdown) {
    return markdown
        .replace(/^---[\s\S]*?---/, "") // frontmatter
        .replace(/```[\s\S]*?```/g, " ") // code blocks
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links
        .replace(/[#>*_`|-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

const index = [];
for (const page of manifest.pages) {
    const file = path.join(SITE_ROOT, "content/docs", `${page.slug}.md`);
    if (!existsSync(file)) {
        console.error(`search index: missing ${file} — run \`npm run sync\` first`);
        process.exit(1);
    }
    const raw = readFileSync(file, "utf8");
    const headings = [...raw.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1].trim());
    index.push({
        route: `/docs/${page.slug}`,
        title: page.title,
        group: page.group,
        headings,
        body: plainText(raw).slice(0, 1500),
    });
}

writeFileSync(
    path.join(SITE_ROOT, "src/data/search-index.json"),
    JSON.stringify(index, null, 0) + "\n",
);
console.log(`search index: ${index.length} pages`);
