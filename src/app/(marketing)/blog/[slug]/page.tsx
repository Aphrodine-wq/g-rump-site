import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, formatDate } from "@/data/blog-posts";
import { FadeIn, TextReveal } from "@/ui/motion";

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found — G-Rump" };
    return {
        title: `${post.title} — G-Rump Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    return (
        <article className="px-5 py-16">
            <div className="mx-auto max-w-[680px]">
                {/* Breadcrumb */}
                <FadeIn>
                    <div className="flex items-center gap-2 text-xs text-tertiary mb-8">
                        <Link href="/blog" className="hover:text-secondary transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-secondary">{post.category}</span>
                    </div>
                </FadeIn>

                {/* Header */}
                <TextReveal>
                    <div className="flex items-center gap-3 text-xs text-tertiary mb-4">
                        <span className="rounded-full border border-black/[0.06] bg-black/[0.02] px-2.5 py-0.5">{post.category}</span>
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                    </div>
                </TextReveal>

                <TextReveal delay={0.1}>
                    <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-primary">
                        {post.title}
                    </h1>
                </TextReveal>

                <TextReveal delay={0.2}>
                    <p className="mt-5 text-[17px] leading-relaxed text-secondary">
                        {post.excerpt}
                    </p>
                </TextReveal>

                {/* Divider */}
                <FadeIn delay={0.3}>
                    <div className="my-10 border-t border-black/[0.04]" />
                </FadeIn>

                {/* Content */}
                <FadeIn delay={0.35}>
                    <div className="prose-grump">
                        {post.content.split("\n\n").map((block, i) => {
                            if (block.startsWith("### ")) {
                                return <h3 key={i}>{block.replace("### ", "")}</h3>;
                            }
                            if (block.startsWith("## ")) {
                                return <h2 key={i}>{block.replace("## ", "")}</h2>;
                            }
                            if (block.startsWith("**")) {
                                return <p key={i}><strong>{block.replace(/\*\*/g, "")}</strong></p>;
                            }
                            return <p key={i}>{block}</p>;
                        })}
                    </div>
                </FadeIn>

                {/* Share */}
                <FadeIn delay={0.2}>
                    <div className="mt-12 flex items-center gap-4 border-t border-black/[0.04] pt-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">Share</p>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.g-rump.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.04] bg-black/[0.02] text-secondary transition-all hover:bg-black/[0.04] hover:text-primary"
                            aria-label="Share on Twitter"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </FadeIn>

                {/* Prev / Next */}
                {(prev || next) && (
                    <FadeIn delay={0.1}>
                        <div className="mt-12 flex items-stretch gap-4 border-t border-black/[0.04] pt-8">
                            {prev ? (
                                <Link
                                    href={`/blog/${prev.slug}`}
                                    className="group flex-1 rounded-xl border border-black/[0.04] p-5 transition-all hover:border-black/[0.08] hover:bg-black/[0.02]"
                                >
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">Previous</p>
                                    <p className="mt-1.5 text-sm font-medium text-primary group-hover:text-blue transition-colors">
                                        <span className="mr-1 text-tertiary">&larr;</span> {prev.title}
                                    </p>
                                </Link>
                            ) : <div className="flex-1" />}
                            {next ? (
                                <Link
                                    href={`/blog/${next.slug}`}
                                    className="group flex-1 rounded-xl border border-black/[0.04] p-5 text-right transition-all hover:border-black/[0.08] hover:bg-black/[0.02]"
                                >
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">Next</p>
                                    <p className="mt-1.5 text-sm font-medium text-primary group-hover:text-blue transition-colors">
                                        {next.title} <span className="ml-1 text-tertiary">&rarr;</span>
                                    </p>
                                </Link>
                            ) : <div className="flex-1" />}
                        </div>
                    </FadeIn>
                )}
            </div>
        </article>
    );
}
