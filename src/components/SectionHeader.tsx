export function SectionHeader({ label, heading, description }: { label: string; heading: string; description?: string }) {
    return (
        <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue">
                {label}
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-primary">
                {heading}
            </h2>
            {description && (
                <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-secondary">
                    {description}
                </p>
            )}
        </div>
    );
}
