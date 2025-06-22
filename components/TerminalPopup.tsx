"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const TerminalPopup = ({ isOpen, onClose, onComplete }: TerminalPopupProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentCommand, setCurrentCommand] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const commands = [
    '> Initializing decryption...',
    '> Loading Briele protocols...',
    '> Decrypting matrix...',
    '> Accessing core...',
    '> Complete!'
  ];

  const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const getGlitchedText = (text: string) => {
    return text.split('').map((char, index) => {
      if (char === ' ') return ' ';
      if (Math.random() < 0.3) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  // Carica l'audio e ottiene la durata
  useEffect(() => {
    if (isOpen && !audioRef.current) {
      audioRef.current = new Audio('/audio/riser_black.wav');
      audioRef.current.addEventListener('loadedmetadata', () => {
        setAudioDuration(audioRef.current?.duration || 0);
      });
      
      // Aggiungi listener per la fine dell'audio
      audioRef.current.addEventListener('ended', () => {
        setShowGlitch(true);
        setTimeout(() => {
          onComplete();
        }, 300); // Breve delay per mostrare il glitch
      });
    }
  }, [isOpen, onComplete]);

  // Avvia l'audio quando il terminale si apre
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || audioDuration === 0) return;

    // Calcola i tempi basati sulla durata dell'audio
    const totalDuration = audioDuration * 1000; // Converti in millisecondi
    const typingSpeed = totalDuration / (commands.join('').length + 50); // Velocità typing basata su audio
    const commandDelay = totalDuration / (commands.length + 1); // Delay tra comandi
    
    let currentIndex = 0;
    const fullText = commands[currentCommand];
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setCurrentText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (currentCommand < commands.length - 1) {
            setCurrentCommand(prev => prev + 1);
            setCurrentText('');
          }
          // Rimuovo la logica di chiusura da qui - ora gestita dall'evento 'ended' dell'audio
        }, commandDelay);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isOpen, currentCommand, audioDuration]);

  useEffect(() => {
    if (!isOpen || audioDuration === 0) return;

    // Sincronizza la progress bar con l'audio
    const totalDuration = audioDuration * 1000;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (totalDuration / 50)); // Aggiorna ogni 50ms
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isOpen, audioDuration]);

  useEffect(() => {
    if (isOpen) {
      setCurrentText('');
      setCurrentCommand(0);
      setProgress(0);
      setShowGlitch(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-900 border border-green-400 rounded-lg shadow-2xl w-96 max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-green-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 text-sm font-mono">Terminal - Decryption</span>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-64 overflow-y-auto">
              <div className="font-mono text-green-400 text-sm space-y-2">
                <div>Welcome to Briele Decryption Terminal</div>
                <div>=====================================</div>
                <div className="mt-4">
                  {currentText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-green-400 ml-1"
                  />
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-1">Progress: {progress}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-green-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Glitch Effect */}
                {showGlitch && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-lg font-bold"
                  >
                    <motion.div
                      animate={{
                        x: [0, -2, 2, -1, 1, 0],
                        opacity: [1, 0.8, 1, 0.9, 1]
                      }}
                      transition={{ duration: 0.2, repeat: 3 }}
                    >
                      DECRYPTION COMPLETE!
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalPopup; 