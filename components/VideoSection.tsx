"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from "react-icons/fi";
import useIsMobile from "./hooks/useIsMobile";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Genera dinamicamente il poster dal primo frame del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || video.poster) {
      return;
    }

    const generatePoster = () => {
      if (!videoRef.current) return;
      const videoNode = videoRef.current;
      
      // Assicurati che il video sia pronto e abbastanza grande da avere senso
      if (videoNode.readyState >= 2 && videoNode.videoWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = videoNode.videoWidth;
        canvas.height = videoNode.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoNode, 0, 0, canvas.width, canvas.height);
          try {
            videoNode.poster = canvas.toDataURL();
          } catch (e) {
            console.error("Errore nella generazione del poster:", e);
          }
        }
        videoNode.removeEventListener('loadeddata', generatePoster); // Rimuovi il listener dopo l'uso
      }
    };

    video.addEventListener('loadeddata', generatePoster);
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', generatePoster);
      }
    };
  }, [src]);

  const handlePlayInteraction = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    
    if (videoRef.current) {
      // Se il video è muto (primo click dopo l'hover), attiva l'audio e continua la riproduzione.
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        // Assicura che il video sia in play, nel caso l'hover non sia partito
        if (videoRef.current.paused) {
          videoRef.current.play();
        }
      } else {
        // Se l'audio è già attivo, il click funge da normale play/pausa.
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleMouseEnter = async () => {
    if (!isMobile && videoRef.current && videoRef.current.paused) {
      try {
        await videoRef.current.play();
      } catch (error) {
        // Ignora l'errore di interruzione che si verifica
        // quando il mouse lascia l'area del video rapidamente.
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    video.muted = true;
    setIsMuted(true);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Observer per mettere in pausa il video quando esce dallo schermo (solo su mobile)
  useEffect(() => {
    const video = videoRef.current;
    const container = playerContainerRef.current;

    if (!isMobile || !video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se il video non è più visibile, mettilo in pausa
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0 } // Si attiva quando l'elemento scompare completamente
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [isMobile]);

  return (
    <div
      ref={playerContainerRef}
      className="max-w-4xl mx-auto relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayInteraction}
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-2xl bg-gray-900">
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          preload="metadata" // Lo manteniamo come fallback/suggerimento
          className="w-full h-full object-cover"
        >
          <source src="/videos/islanda.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePlayInteraction}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full"
            aria-label="Toggle Play"
          >
            {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full"
            aria-label="Toggle Mute"
          >
            {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoSection = () => {
  const videos = [
    { src: "/videos/islanda.mp4" },
    // Aggiungi qui altri video in futuro
  ];

  return (
    <section id="video" className="py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-12 font-serif">Video</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-12"
      >
        {videos.map((video, index) => (
          <VideoPlayer key={index} src={video.src} />
        ))}
      </motion.div>
    </section>
  );
};

export default VideoSection; 