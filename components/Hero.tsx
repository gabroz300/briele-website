"use client";

import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";
import TerminalPopup from "./TerminalPopup";
import { useRouter } from "next/navigation";

const Hero = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDecrypting, setShowDecrypting] = useState(false);
  const [hasAnimatedOnLoad, setHasAnimatedOnLoad] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [dots, setDots] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Animazione di decriptazione al caricamento
  useEffect(() => {
    if (mounted && !hasAnimatedOnLoad) {
      const timer = setTimeout(() => {
        setShowDecrypting(true);
        setHasAnimatedOnLoad(true);
        // Nasconde "Decrypting..." dopo un po' per tornare a "Briele"
        setTimeout(() => setShowDecrypting(false), 2000); 
      }, 1000); // Ritardo iniziale
      return () => clearTimeout(timer);
    }
  }, [mounted, hasAnimatedOnLoad]);

  // Gestione dell'hover per desktop
  useEffect(() => {
    if (!isHovered) {
      // Non resettare se l'animazione di caricamento è in corso
      if (hasAnimatedOnLoad) {
        setShowDecrypting(false);
      }
      setDots(0);
      return;
    }

    // Effetto di decriptazione all'hover
    const timer = setTimeout(() => {
      setShowDecrypting(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      setShowDecrypting(false);
    };
  }, [isHovered, hasAnimatedOnLoad]);

  useEffect(() => {
    if (!showDecrypting) {
      setDots(0);
      return;
    }

    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4); // 0, 1, 2, 3 dots
    }, 600); // Aumentato da 500ms per ridurre la frequenza

    return () => clearInterval(interval);
  }, [showDecrypting]);

  const shadowAnimation = {
    dark: [
      "0 0 8px rgba(255,255,255,0.4)",
      "0 0 24px rgba(255,255,255,0.6)",
      "0 0 8px rgba(255,255,255,0.4)"
    ],
    light: [
      "0 0 8px rgba(0,0,0,0.4)",
      "0 0 24px rgba(0,0,0,0.6)",
      "0 0 8px rgba(0,0,0,0.4)"
    ]
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative">
      
      <div className="text-center z-10 px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8 cursor-pointer select-none"
          animate={{
            textShadow: shadowAnimation.dark
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => setShowTerminal(true)}
        >
          {showDecrypting ? (
            <span className="text-6xl md:text-8xl font-bold">
              {subtitle}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {'.'.repeat(dots)}
              </motion.span>
            </span>
          ) : (
            <DecryptedText 
              text={title}
              speed={80}
              maxIterations={6}
              className="text-6xl md:text-8xl font-bold"
              isHovering={isHovered}
            />
          )}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <a href="#about">
            <FiArrowDown className="text-4xl" />
          </a>
        </motion.div>
      </div>

      <TerminalPopup 
        isOpen={showTerminal} 
        onClose={() => setShowTerminal(false)}
        onComplete={() => {
          setShowTerminal(false)
          router.push('/briele')
        }}
      />
    </section>
  );
};

export default Hero; 