import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import VideoSection from "@/components/VideoSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import AnimatedOceanBackground from "@/components/AnimatedOceanBackground";

export default function Home() {
  return (
    <>
      <AnimatedOceanBackground />
      <main className="flex flex-col relative z-10">
        <Hero />
        <MusicSection />
        <VideoSection />
        <SocialLinks />
        <Footer />
      </main>
    </>
  );
}
