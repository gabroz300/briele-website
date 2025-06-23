import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import VideoSection from "@/components/VideoSection";
import SocialLinks from "@/components/SocialLinks";
import AnimatedOceanBackground from "@/components/AnimatedOceanBackground";

export default function Home() {
  return (
    <>
      <AnimatedOceanBackground />
      <div className="flex flex-col relative z-10">
        <Hero />
        <MusicSection />
        <VideoSection />
        <SocialLinks />
      </div>
    </>
  );
}
