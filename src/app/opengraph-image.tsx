import { ImageResponse } from "next/og";

export const alt = "G-Rump — The open-source AI harness for macOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fbfbfd",
                    gap: 40,
                }}
            >
                <svg width="170" height="170" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#0060df" strokeWidth="6" />
                    <circle cx="33" cy="40" r="7.5" fill="#0060df" />
                    <circle cx="67" cy="40" r="7.5" fill="#0060df" />
                    <path
                        d="M 29.3 73.7 A 22 22 0 0 1 70.7 73.7"
                        fill="none"
                        stroke="#0060df"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                </svg>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            fontSize: 76,
                            fontWeight: 700,
                            color: "#1d1d1f",
                            letterSpacing: -2,
                        }}
                    >
                        G-Rump
                    </div>
                    <div style={{ fontSize: 32, color: "#6e6e73" }}>
                        The open-source AI harness for macOS
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
