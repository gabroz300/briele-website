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

export const metadata = {
  title: "Briele | Frequenze, introspezione, identità musicale",
  description: "Briele è un artista che unisce musica, colore e luce in un'unica esperienza evocativa. Scopri la sua visione tra frequenze, introspezione e identità musicale.",
  keywords: ["Briele", "musica", "frequenze", "introspezione", "identità musicale", "artista"],
  openGraph: {
    title: "Briele | Frequenze, introspezione, identità musicale",
    description: "Briele è un artista che unisce musica, colore e luce in un'unica esperienza evocativa. Scopri la sua visione tra frequenze, introspezione e identità musicale.",
    url: "https://www.brielebriele.com/",
    siteName: "Briele",
    images: [
      {
        url: "/covers/lenti.png",
        width: 1200,
        height: 630,
        alt: "Briele artista copertina"
      }
    ],
    locale: "it_IT",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Briele | Frequenze, introspezione, identità musicale",
    description: "Briele è un artista che unisce musica, colore e luce in un'unica esperienza evocativa.",
    images: ["/covers/lenti.png"]
  }
};
