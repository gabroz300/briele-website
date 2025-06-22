"use client";

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;

    // Stars
    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = [];
    const numStars = 200;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    // Wave layers configuration
    const waveLayers = [
      { amplitude: 80, frequency: 0.008, speed: 0.5, opacity: 0.15, yOffset: 0.2 },
      { amplitude: 60, frequency: 0.012, speed: 0.7, opacity: 0.12, yOffset: 0.3 },
      { amplitude: 100, frequency: 0.006, speed: 0.3, opacity: 0.18, yOffset: 0.4 },
      { amplitude: 40, frequency: 0.015, speed: 0.9, opacity: 0.1, yOffset: 0.5 },
      { amplitude: 120, frequency: 0.005, speed: 0.2, opacity: 0.2, yOffset: 0.6 },
      { amplitude: 70, frequency: 0.01, speed: 0.6, opacity: 0.13, yOffset: 0.7 },
      { amplitude: 90, frequency: 0.007, speed: 0.4, opacity: 0.16, yOffset: 0.8 },
      { amplitude: 50, frequency: 0.013, speed: 0.8, opacity: 0.11, yOffset: 0.9 },
      { amplitude: 110, frequency: 0.006, speed: 0.35, opacity: 0.17, yOffset: 1.0 },
      { amplitude: 30, frequency: 0.018, speed: 1.0, opacity: 0.09, yOffset: 1.1 },
      { amplitude: 130, frequency: 0.004, speed: 0.15, opacity: 0.22, yOffset: 1.2 },
      { amplitude: 80, frequency: 0.009, speed: 0.55, opacity: 0.14, yOffset: 1.3 },
      { amplitude: 60, frequency: 0.014, speed: 0.75, opacity: 0.12, yOffset: 1.4 },
      { amplitude: 100, frequency: 0.007, speed: 0.4, opacity: 0.18, yOffset: 1.5 },
      { amplitude: 40, frequency: 0.016, speed: 0.85, opacity: 0.1, yOffset: 1.6 }
    ];

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create aurora boreale gradient background (blue to purple)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a2e');      // Deep space blue
      gradient.addColorStop(0.2, '#1a1a4a');    // Dark blue
      gradient.addColorStop(0.4, '#2d1b69');    // Deep purple-blue
      gradient.addColorStop(0.6, '#4a1b8a');    // Rich purple
      gradient.addColorStop(0.8, '#6b1b9a');    // Bright purple
      gradient.addColorStop(1, '#8a1baa');      // Light purple

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple wave layers to create ocean effect
      waveLayers.forEach((layer, index) => {
        ctx.strokeStyle = `rgba(100, 150, 255, ${layer.opacity})`;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 1) {
          const y = canvas.height * layer.yOffset + 
                   Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude +
                   Math.sin(x * layer.frequency * 0.5 + time * layer.speed * 0.7) * (layer.amplitude * 0.3) +
                   Math.sin(x * layer.frequency * 2 + time * layer.speed * 1.3) * (layer.amplitude * 0.2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Add a second wave with slight offset for more depth
        ctx.strokeStyle = `rgba(150, 100, 255, ${layer.opacity * 0.7})`;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 1) {
          const y = canvas.height * layer.yOffset + 
                   Math.sin(x * layer.frequency + time * layer.speed + Math.PI * 0.3) * layer.amplitude +
                   Math.sin(x * layer.frequency * 0.7 + time * layer.speed * 0.8) * (layer.amplitude * 0.4) +
                   Math.sin(x * layer.frequency * 1.8 + time * layer.speed * 1.1) * (layer.amplitude * 0.25);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Update and draw stars with aurora colors
      stars.forEach((star, index) => {
        // Update star position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Draw star with aurora boreale colors and twinkling effect
        const twinkle = Math.sin(time * 3 + index) * 0.4 + 0.6;
        const colorIntensity = Math.sin(time * 2 + index * 0.5) * 0.3 + 0.7;
        
        // Aurora boreale color palette (blue to purple)
        const colors = [
          `rgba(100, 150, 255, ${star.opacity * twinkle})`,  // Blue
          `rgba(150, 100, 255, ${star.opacity * twinkle})`,  // Purple-blue
          `rgba(200, 100, 255, ${star.opacity * twinkle})`,  // Purple
          `rgba(255, 100, 200, ${star.opacity * twinkle})`   // Pink-purple
        ];
        
        ctx.fillStyle = colors[index % colors.length];
        ctx.globalAlpha = colorIntensity;
        
        // Draw star as a small circle with glow effect
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = colors[index % colors.length];
        ctx.shadowBlur = star.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
} 