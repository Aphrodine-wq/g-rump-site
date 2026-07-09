import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with the G-Rump team. Enterprise inquiries, technical support, partnerships, and career opportunities.",
    openGraph: {
        title: "Contact — G-Rump",
        description:
            "Questions about G-Rump? Enterprise inquiries? We'd love to hear from you.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
