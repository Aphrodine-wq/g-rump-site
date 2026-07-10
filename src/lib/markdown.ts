import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export type TocItem = { id: string; text: string; depth: number };

export type CompiledDoc = {
    html: string;
    toc: TocItem[];
    title: string;
    description: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

/* eslint-disable @typescript-eslint/no-explicit-any */
function nodeText(node: any): string {
    if (node.type === "text") return node.value;
    return (node.children ?? []).map(nodeText).join("");
}

/** Collect h2/h3 ids + text after rehype-slug has assigned ids. */
function rehypeExtractToc(toc: TocItem[]) {
    return () => (tree: any) => {
        const walk = (node: any) => {
            if (node.tagName === "h2" || node.tagName === "h3") {
                toc.push({
                    id: node.properties?.id ?? "",
                    text: nodeText(node),
                    depth: node.tagName === "h2" ? 2 : 3,
                });
            }
            for (const child of node.children ?? []) walk(child);
        };
        walk(tree);
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function compileMarkdownFile(relPath: string): Promise<CompiledDoc> {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8");
    const { data, content } = matter(raw);
    const toc: TocItem[] = [];

    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        .use(rehypeExtractToc(toc))
        .use(rehypePrettyCode, {
            theme: "github-light",
            keepBackground: false,
            defaultLang: "text",
        })
        .use(rehypeStringify)
        .process(content);

    return {
        html: String(file),
        toc,
        title: data.title ?? "",
        description: data.description ?? "",
    };
}

export function compileDoc(slug: string): Promise<CompiledDoc> {
    return compileMarkdownFile(path.join("docs", `${slug}.md`));
}

export function compileChangelog(): Promise<CompiledDoc> {
    return compileMarkdownFile("changelog.md");
}
