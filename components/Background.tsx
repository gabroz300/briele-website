"use client";
import { useRef, useEffect } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let width: number, height: number;
    let frame = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      frame += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f172a"); // blu notte
      gradient.addColorStop(1, "#3b0764"); // viola profondo
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Sinusoidal waves
      for (let i = 0; i < 80; i++) {
        const alpha = 0.03 + Math.sin(frame + i) * 0.02;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 2) {
          const y = height / 2 +
            Math.sin(x * 0.01 + i * 0.3 + frame) * (5 + i * 0.1);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(173, 216, 230, ${alpha})`; // light blue
        ctx.stroke();
      }

      // Stars
      for (let i = 0; i < 200; i++) {
        const x = (Math.sin(i * 12.9898 + frame) * 43758.5453) % width;
        const y = (Math.cos(i * 78.233 + frame) * 43758.5453) % height;
        ctx.beginPath();
        ctx.arc(Math.abs(x), Math.abs(y), 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
} 