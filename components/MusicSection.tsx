"use client";

import ChromaGrid from "./ChromaGrid";
import useIsMobile from "./hooks/useIsMobile";

const musicItems = [
  {
    image: "/covers/lenti.png",
    title: "Lenti",
    subtitle: "2024 • Singolo",
    url: "spotify:track:6sma5rULtZDaZj611XYHvB",
  },
  {
    image: "/covers/roja.png",
    title: "Roja",
    subtitle: "2023 • Singolo",
    url: "spotify:track:1mUGknWwRlUiTT8aTR80lC",
  },
  {
    image: "/covers/stare-bene.jpg",
    title: "Stare Bene",
    subtitle: "2022 • Singolo",
    url: "spotify:track:7Fug4L2UyO4MYfNr8L391i",
  },
];

const MusicSection = () => {
  return (
    <section id="music" className="py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-12 font-serif">
        Musica
      </h2>
      <div className="max-w-6xl mx-auto">
        <ChromaGrid items={musicItems} />
      </div>
    </section>
  );
};

export default MusicSection; 