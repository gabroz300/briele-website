"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink } from 'react-icons/fi';
import { FaSpotify, FaApple, FaAmazon, FaDeezer } from 'react-icons/fa';
import { SiItunes } from 'react-icons/si';
import CosmicPurpleBackground from '../../components/CosmicPurpleBackground';
import Link from 'next/link';

interface Track {
  id: string;
  title: string;
  cover: string;
  year: number;
  links: {
    spotify?: string;
    appleMusic?: string;
    itunes?: string;
    amazonMusic?: string;
    deezer?: string;
  };
}

const tracks: Track[] = [
  {
    id: 'lenti',
    title: 'Lenti',
    cover: '/covers/lenti.png',
    year: 2024,
    links: {
      spotify: 'https://open.spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      itunes: 'https://itunes.apple.com/...',
      amazonMusic: 'https://music.amazon.com/...',
      deezer: 'https://www.deezer.com/...',
    }
  },
  {
    id: 'roja',
    title: 'Roja',
    cover: '/covers/roja.png',
    year: 2024,
    links: {
      spotify: 'https://open.spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      itunes: 'https://itunes.apple.com/...',
      amazonMusic: 'https://music.amazon.com/...',
      deezer: 'https://www.deezer.com/...',
    }
  },
  {
    id: 'stare-meglio',
    title: 'Stare Meglio',
    cover: '/covers/stare-bene.jpg',
    year: 2023,
    links: {
      spotify: 'https://open.spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      itunes: 'https://itunes.apple.com/...',
      amazonMusic: 'https://music.amazon.com/...',
      deezer: 'https://www.deezer.com/...',
    }
  },
  {
    id: 'stare-male',
    title: 'Stare Male',
    cover: '/covers/stare-bene.jpg',
    year: 2023,
    links: {
      spotify: 'https://open.spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      itunes: 'https://itunes.apple.com/...',
      amazonMusic: 'https://music.amazon.com/...',
      deezer: 'https://www.deezer.com/...',
    }
  },
  {
    id: 'stare-bene',
    title: 'Stare Bene',
    cover: '/covers/stare-bene.jpg',
    year: 2023,
    links: {
      spotify: 'https://open.spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      itunes: 'https://itunes.apple.com/...',
      amazonMusic: 'https://music.amazon.com/...',
      deezer: 'https://www.deezer.com/...',
    }
  }
];

const StreamingPopup = ({ track, isOpen, onClose }: { track: Track; isOpen: boolean; onClose: () => void }) => {
  const streamingServices = [
    { name: 'Spotify', icon: FaSpotify, link: track.links.spotify, color: 'text-green-400' },
    { name: 'Apple Music', icon: FaApple, link: track.links.appleMusic, color: 'text-pink-400' },
    { name: 'iTunes', icon: SiItunes, link: track.links.itunes, color: 'text-blue-400' },
    { name: 'Amazon Music', icon: FaAmazon, link: track.links.amazonMusic, color: 'text-orange-400' },
    { name: 'Deezer', icon: FaDeezer, link: track.links.deezer, color: 'text-purple-400' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Popup content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {track.title}
            </h3>

            {/* Streaming links */}
            <div className="space-y-4">
              {streamingServices.map((service) => (
                <a
                  key={service.name}
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 group`}
                >
                  <div className="flex items-center gap-3">
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                    <span className="text-white font-medium">{service.name}</span>
                  </div>
                  <FiExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TrackCard = ({ track, onOpenPopup }: { track: Track; onOpenPopup: (track: Track) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onClick={() => onOpenPopup(track)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
        {/* Cover image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Track info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
          <p className="text-gray-400">{track.year}</p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default function DiscografiaPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = (track: Track) => {
    setSelectedTrack(track);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTrack(null);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-[#05010a]" />
      <div className="fixed inset-0 -z-10">
        <CosmicPurpleBackground />
      </div>

      {/* Back to home */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" passHref>
          <motion.div 
            className="flex items-center space-x-2 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-sm font-light hidden sm:inline">Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Main content */}
      <main className="relative z-10 pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
              Discografia
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
              Esplora la musica di Briele attraverso tutti i brani pubblicati
            </p>
          </motion.div>

          {/* Tracks grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                onOpenPopup={handleOpenPopup}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Streaming popup */}
      {selectedTrack && (
        <StreamingPopup
          track={selectedTrack}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
} 