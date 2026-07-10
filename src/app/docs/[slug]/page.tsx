import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_PAGES, getDocPage, getPrevNext } from "@/lib/docs-manifest";
import { compileDoc } from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
    return DOCS_PAGES.map((page) => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getDocPage(slug);
    if (!page) return {};
    const doc = await compileDoc(slug);
    return {
        title: { absolute: `${page.title} — G-Rump Docs` },
        description: doc.description,
    };
}

export default async function DocPage({ params }: Props) {
    const { slug } = await params;
    const page = getDocPage(slug)!;
    const doc = await compileDoc(slug);
    const { prev, next } = getPrevNext(slug);

    return (
        <div className="flex gap-10">
            <article className="min-w-0 max-w-[720px] flex-1">
                <nav aria-label="Breadcrumb" className="font-mono text-xs text-[var(--text-3)]">
                    <Link href="/docs" className="transition-colors duration-150 hover:text-[var(--text-1)]">
                        Docs
                    </Link>
                    <span aria-hidden="true"> / </span>
                    <span>{page.group}</span>
                    <span aria-hidden="true"> / </span>
                    <span className="text-[var(--text-2)]">{page.title}</span>
                </nav>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-1)]">
                    {page.title}
                </h1>
                <div
                    className="prose-grump mt-6"
                    dangerouslySetInnerHTML={{ __html: doc.html }}
                />
                <nav
                    aria-label="Docs pagination"
                    className="mt-16 flex gap-4 border-t border-[var(--hairline)] pt-6"
                >
                    {prev && (
                        <Link
                            href={`/docs/${prev.slug}`}
                            className="group flex-1 rounded-xl border border-[var(--hairline)] p-4 transition-colors duration-150 hover:border-[var(--accent)]"
                        >
                            <span className="font-mono text-xs text-[var(--text-3)]">Previous</span>
                            <span className="mt-1 block text-sm font-medium text-[var(--text-1)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                                {prev.title}
                            </span>
                        </Link>
                    )}
                    {next && (
                        <Link
                            href={`/docs/${next.slug}`}
                            className="group flex-1 rounded-xl border border-[var(--hairline)] p-4 text-right transition-colors duration-150 hover:border-[var(--accent)]"
                        >
                            <span className="font-mono text-xs text-[var(--text-3)]">Next</span>
                            <span className="mt-1 block text-sm font-medium text-[var(--text-1)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                                {next.title}
                            </span>
                        </Link>
                    )}
                </nav>
            </article>
            {doc.toc.length > 1 && (
                <aside className="sticky top-28 hidden max-h-[calc(100vh-9rem)] w-52 shrink-0 self-start overflow-y-auto scrollbar-thin xl:block">
                    <h2 className="eyebrow">On this page</h2>
                    <ul className="mt-3 space-y-1.5 border-l border-[var(--hairline-soft)]">
                        {doc.toc.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`-ml-px block border-l border-transparent py-0.5 text-[13px] text-[var(--text-2)] transition-colors duration-150 hover:border-[var(--hairline)] hover:text-[var(--text-1)] ${
                                        item.depth === 3 ? "pl-6" : "pl-3.5"
                                    }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>
            )}
        </div>
    );
}
