import {
    HeroSection,
    AnatomySection,
    LearningLoopSection,
    NativeSection,
    SecuritySection,
    FreeSection,
    DownloadCTASection,
} from "@/components/sections";

export default function Home() {
    return (
        <>
            <HeroSection />
            <AnatomySection />
            <LearningLoopSection />
            <NativeSection />
            <SecuritySection />
            <FreeSection />
            <DownloadCTASection />
        </>
    );
}
