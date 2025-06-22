"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const CosmicParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(400)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 3 - 1) * 20, 0],
            opacity: [0.1, 0.9, 0.1],
            scale: [0.3, 1.8, 0.3],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6 + (i % 8),
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}; 