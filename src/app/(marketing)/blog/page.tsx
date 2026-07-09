import { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem, TextReveal, HoverCard } from "@/ui/motion";
import { blogPosts, formatDate } from "@/data/blog-posts";

export const metadata: Metadata = {
    title: "Blog — G-Rump",
    description: "Product updates, engineering deep dives, and tutorials from the G-Rump team.",
};

export default function BlogPage() {
    const featured = blogPosts.find((p) => p.featured);
    const rest = blogPosts.filter((p) => !p.featured);

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue/[0.04] blur-[120px]" />
                <div className="relative">
                    <TextReveal>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue">Blog</p>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
                            News &amp; insights.
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                        <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-relaxed text-secondary">
                            Product updates, engineering deep dives, and tutorials from the G-Rump team.
                        </p>
                    </TextReveal>
                </div>
            </section>

            {/* Featured post */}
            {featured && (
                <section className="px-5 pt-8 pb-4">
                    <FadeIn className="mx-auto max-w-[1100px]">
                        <Link href={`/blog/${featured.slug}`} className="group block">
                            <HoverCard className="glass-card overflow-hidden rounded-2xl transition-all hover:border-black/[0.1]">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Gradient placeholder for image */}
                                    <div className="relative h-[240px] lg:h-auto lg:w-[45%] shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple/20 to-blue-500/10" />
                                        <div className="absolute inset-0 bg-grid opacity-40" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 text-xs text-tertiary mb-3">
                                            <span className="rounded-full border border-black/[0.06] bg-black/[0.02] px-2.5 py-0.5">{featured.category}</span>
                                            <span>{formatDate(featured.date)}</span>
                                            <span>{featured.readTime}</span>
                                        </div>
                                        <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-primary group-hover:text-blue transition-colors">
                                            {featured.title}
                                        </h2>
                                        <p className="mt-3 text-sm leading-relaxed text-secondary line-clamp-3">
                                            {featured.excerpt}
                                        </p>
                                        <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue transition-all group-hover:gap-3">
                                            Read article
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </p>
                                    </div>
                                </div>
                            </HoverCard>
                        </Link>
                    </FadeIn>
                </section>
            )}

            {/* Post grid */}
            <section className="px-5 py-16">
                <Stagger className="mx-auto grid max-w-[1100px] gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                    {rest.map((post) => (
                        <StaggerItem key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <HoverCard className="glass-card h-full rounded-2xl overflow-hidden transition-all hover:border-black/[0.1]">
                                    {/* Gradient placeholder */}
                                    <div className="relative h-[160px]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-black/[0.01]" />
                                        <div className="absolute inset-0 bg-grid opacity-30" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-xs text-tertiary mb-3">
                                            <span className="rounded-full border border-black/[0.06] bg-black/[0.02] px-2.5 py-0.5">{post.category}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-[15px] font-semibold text-primary group-hover:text-blue transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 text-[13px] leading-relaxed text-secondary line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <p className="mt-4 text-xs text-tertiary">{formatDate(post.date)}</p>
                                    </div>
                                </HoverCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </>
    );
}
