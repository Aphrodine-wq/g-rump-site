#!/usr/bin/env node
/**
 * Syncs content from the G-Rump app repo (single source of truth) into the
 * site:
 *   - manifest pages with owned:"app"  → content/docs/<slug>.md
 *   - CHANGELOG.md                     → content/changelog.md
 *   - dist/G-Rump.zip                  → public/downloads/G-Rump-<version>.zip
 *                                        (+ sha256/size → src/data/download.json)
 *
 * Never touches owned:"site" pages. Never hand-edit synced files — rerun this
 * script instead. Fails loudly on internal .md links it cannot map.
 *
 * Usage: npm run sync   (GRUMP_REPO env var overrides the app repo path)
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP_REPO = path.resolve(process.env.GRUMP_REPO ?? path.join(SITE_ROOT, "..", "_archive", "g-rump"));
const GITHUB_BLOB = "https://github.com/Aphrodine-wq/G-Rump/blob/main";

if (!existsSync(APP_REPO)) {
    console.error(`App repo not found at ${APP_REPO} (set GRUMP_REPO to override)`);
    process.exit(1);
}

const manifest = JSON.parse(readFileSync(path.join(SITE_ROOT, "src/data/docs-manifest.json"), "utf8"));

// Map every syncable source path (relative to docs/) → site route, so
// inter-doc links can be rewritten.
const sourceToRoute = new Map();
for (const page of manifest.pages) {
    if (page.owned === "app") {
        sourceToRoute.set(page.source.replace(/^docs\//, ""), `/docs/${page.slug}`);
    }
}
// Old hand-written pages that were merged — map their sources' neighbors too.
const ROOT_FILE_ROUTES = {
    "CHANGELOG.md": "/changelog",
    "README.md": `${GITHUB_BLOB}/README.md`,
    "ARCHITECTURE.md": `${GITHUB_BLOB}/ARCHITECTURE.md`,
    "CONTRIBUTING.md": `${GITHUB_BLOB}/CONTRIBUTING.md`,
    "SECURITY.md": `${GITHUB_BLOB}/SECURITY.md`,
    "CODE_OF_CONDUCT.md": `${GITHUB_BLOB}/CODE_OF_CONDUCT.md`,
    "LICENSE": `${GITHUB_BLOB}/LICENSE`,
};

const errors = [];

/** Rewrite one markdown link target. Returns null if untouched. */
function mapLink(target, sourcePath) {
    if (/^(https?:|mailto:|#)/.test(target)) return null;
    const [rawPath, anchor = ""] = target.split("#");
    const hash = anchor ? `#${anchor}` : "";

    // Root-of-repo files referenced as ../../FILE.md (or any ../ depth).
    const rootName = rawPath.replace(/^(\.\.\/)+/, "");
    if (ROOT_FILE_ROUTES[rootName]) {
        const route = ROOT_FILE_ROUTES[rootName];
        return route.startsWith("http") ? route : route + hash;
    }

    // Doc-relative links: strip leading ../ segments, resolve against docs/.
    const sourceDir = path.dirname(sourcePath.replace(/^docs\//, ""));
    const resolved = path.normalize(path.join(sourceDir === "." ? "" : sourceDir, rawPath));
    if (sourceToRoute.has(resolved)) return sourceToRoute.get(resolved) + hash;
    // Also try the path as written from docs/ root (README-style links).
    const fromRoot = path.normalize(rawPath.replace(/^(\.\.\/)+/, ""));
    if (sourceToRoute.has(fromRoot)) return sourceToRoute.get(fromRoot) + hash;

    // History docs are intentionally not synced — send to GitHub.
    if (resolved.startsWith("history/") || fromRoot.startsWith("history/")) {
        return `${GITHUB_BLOB}/docs/${fromRoot.startsWith("history/") ? fromRoot : resolved}`;
    }
    // release-notes.md is redundant with /changelog.
    if (resolved.endsWith("release-notes.md") || fromRoot.endsWith("release-notes.md")) {
        return "/changelog" + hash;
    }

    if (rawPath.endsWith(".md")) {
        errors.push(`${sourcePath}: unmapped internal link "${target}"`);
    }
    return null;
}

function transformLinks(markdown, sourcePath) {
    return markdown.replace(/\]\(([^)\s]+)\)/g, (match, target) => {
        const mapped = mapLink(target, sourcePath);
        return mapped ? `](${mapped})` : match;
    });
}

function firstParagraph(body) {
    for (const block of body.split(/\n\s*\n/)) {
        const line = block.trim();
        if (!line || line.startsWith("#") || line.startsWith("|") || line.startsWith("```") || line.startsWith("-") || line.startsWith(">")) continue;
        return line
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/[*_`]/g, "")
            .replace(/\s+/g, " ")
            .slice(0, 220);
    }
    return "";
}

function yamlEscape(value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// ── Docs pages ──
let synced = 0;
mkdirSync(path.join(SITE_ROOT, "content/docs"), { recursive: true });
for (const page of manifest.pages) {
    if (page.owned !== "app") continue;
    const sourceFile = path.join(APP_REPO, page.source);
    if (!existsSync(sourceFile)) {
        errors.push(`missing source: ${page.source}`);
        continue;
    }
    let body = readFileSync(sourceFile, "utf8");
    // Strip the H1 — the page title renders from frontmatter.
    body = body.replace(/^#\s+.*\n+/, "");
    body = transformLinks(body, page.source);
    const description = firstParagraph(body);
    const frontmatter = [
        "---",
        `title: ${yamlEscape(page.title)}`,
        `description: ${yamlEscape(description)}`,
        `source: ${yamlEscape(page.source)}`,
        "owned: app",
        "---",
        "",
    ].join("\n");
    writeFileSync(path.join(SITE_ROOT, "content/docs", `${page.slug}.md`), frontmatter + body);
    synced++;
}

// ── Changelog ──
const changelogSource = path.join(APP_REPO, "CHANGELOG.md");
let version = null;
if (existsSync(changelogSource)) {
    let changelog = readFileSync(changelogSource, "utf8");
    const versionMatch = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
    version = versionMatch ? versionMatch[1] : null;
    changelog = changelog.replace(/^#\s+.*\n+/, "");
    changelog = transformLinks(changelog, "CHANGELOG.md");
    mkdirSync(path.join(SITE_ROOT, "content"), { recursive: true });
    writeFileSync(
        path.join(SITE_ROOT, "content/changelog.md"),
        `---\ntitle: "Changelog"\ndescription: "Every G-Rump release, straight from the repository."\nsource: "CHANGELOG.md"\nowned: app\n---\n\n${changelog}`,
    );
} else {
    errors.push("missing CHANGELOG.md in app repo");
}

// ── Download artifact ──
const zipSource = path.join(APP_REPO, "dist", "G-Rump.zip");
if (existsSync(zipSource) && version) {
    const filename = `G-Rump-${version}.zip`;
    const dest = path.join(SITE_ROOT, "public/downloads", filename);
    mkdirSync(path.dirname(dest), { recursive: true });
    copyFileSync(zipSource, dest);
    const data = readFileSync(dest);
    const download = {
        version,
        filename,
        path: `/downloads/${filename}`,
        sizeBytes: statSync(dest).size,
        sha256: createHash("sha256").update(data).digest("hex"),
    };
    writeFileSync(
        path.join(SITE_ROOT, "src/data/download.json"),
        JSON.stringify(download, null, 4) + "\n",
    );
    console.log(`download: ${filename} (${(download.sizeBytes / 1024 / 1024).toFixed(1)} MB, sha256 ${download.sha256.slice(0, 12)}…)`);
} else {
    console.warn("skipping download artifact (no dist/G-Rump.zip or no version)");
}

if (errors.length) {
    console.error(`\nSYNC FAILED — ${errors.length} error(s):`);
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
}
console.log(`synced ${synced} docs pages + changelog from ${APP_REPO}`);
