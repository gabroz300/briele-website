'use client';

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import VideoSection from "@/components/VideoSection";
import SocialLinks from "@/components/SocialLinks";
import AnimatedOceanBackground from "@/components/AnimatedOceanBackground";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <>
      <AnimatedOceanBackground />
      <div className="flex flex-col relative z-10">
        <Hero title={t('title')} subtitle={t('subtitle')} />
        <AboutSection />
        <MusicSection />
        <VideoSection />
        <SocialLinks />
      </div>
    </>
  );
}
