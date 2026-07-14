"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    event: string;
    eventData?: Record<string, string>;
    children: ReactNode;
};

/** Plain anchor that fires a Vercel Analytics event on click. */
export function TrackedLink({ event, eventData, children, ...rest }: Props) {
    return (
        <a {...rest} onClick={() => track(event, eventData)}>
            {children}
        </a>
    );
}
