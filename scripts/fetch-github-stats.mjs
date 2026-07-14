// Fetches GitHub repo stats at build time into src/data/github.json.
// Degrades gracefully: on any failure the existing (checked-in) JSON stays.
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(import.meta.dirname, "../src/data/github.json");
const REPO = "Aphrodine-wq/G-Rump";

try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repo = await res.json();
    const data = {
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        fetchedAt: new Date().toISOString(),
    };
    writeFileSync(OUT, JSON.stringify(data, null, 4) + "\n");
    console.log(`github.json updated: ${data.stars} stars`);
} catch (err) {
    let stale = "missing";
    try {
        stale = JSON.parse(readFileSync(OUT, "utf8")).fetchedAt;
    } catch {
        // keep "missing"
    }
    console.warn(`github stats fetch failed (${err.message}); keeping existing json (${stale})`);
}
