"use client";

import { useEffect, useState } from "react";

export default function CosmicOceanBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate more natural particle positions
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        opacity: 0.1 + Math.random() * 0.4,
        movement: Math.random() > 0.5 ? 'float' : 'drift'
      });
    }
    return particles;
  };

  const particles = generateParticles();

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f1c47 0%, #241b68 50%, #382b82 100%)'
        }}
      />
      
      {/* Animated waves using CSS */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q250,50 500,100 T1000,100"
            stroke="url(#waveGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-wave"
          />
          <path
            d="M0,120 Q250,70 500,120 T1000,120"
            stroke="url(#waveGradient)"
            strokeWidth="0.5"
            fill="none"
            className="animate-wave-delayed"
          />
        </svg>
      </div>

      {/* Improved floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-white/30 backdrop-blur-sm ${
              particle.movement === 'float' ? 'animate-float-natural' : 'animate-drift-natural'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.5})`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            d: path("M0,100 Q250,50 500,100 T1000,100");
          }
          50% {
            d: path("M0,100 Q250,150 500,100 T1000,100");
          }
        }
        
        @keyframes wave-delayed {
          0%, 100% {
            d: path("M0,120 Q250,70 500,120 T1000,120");
          }
          50% {
            d: path("M0,120 Q250,170 500,120 T1000,120");
          }
        }
        
        @keyframes float-natural {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(0.9);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) translateX(12px) scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes drift-natural {
          0%, 100% {
            transform: translateX(0px) translateY(0px) scale(1);
            opacity: 0.4;
          }
          33% {
            transform: translateX(20px) translateY(-8px) scale(1.2);
            opacity: 0.7;
          }
          66% {
            transform: translateX(-15px) translateY(-20px) scale(0.8);
            opacity: 0.5;
          }
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .animate-wave-delayed {
          animation: wave-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-natural {
          animation: float-natural 8s ease-in-out infinite;
        }
        
        .animate-drift-natural {
          animation: drift-natural 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 