"use client";

import { useRef, useEffect } from 'react';

interface LetterGlitchProps {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<any[]>([]);
  const grid = useRef<{ columns: number; rows: number }>({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef<number>(Date.now());
  const isInitialized = useRef<boolean>(false);

  const fontSize = 14;
  const charWidth = 8;
  const charHeight = 16;

  const lettersAndSymbols = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
    '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'
  ];

  const getRandomChar = (): string => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = (): string => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex: string): RGB | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const interpolateColor = (start: RGB, end: RGB, factor: number): string => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number): { columns: number; rows: number } => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number): void => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);

      drawLetters();
    } catch (error) {
      console.error('Error in resizeCanvas:', error);
    }
  };

  const drawLetters = (): void => {
    if (!context.current || letters.current.length === 0) return;
    
    try {
      const ctx = context.current;
      const { width, height } = canvasRef.current!.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * charWidth;
        const y = Math.floor(index / grid.current.columns) * charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    } catch (error) {
      console.error('Error in drawLetters:', error);
    }
  };

  const updateLetters = (): void => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.02));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = (): void => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.03;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = (): void => {
    if (!isInitialized.current) return;

    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      context.current = canvas.getContext('2d');
      if (!context.current) {
        console.error('Could not get 2D context');
        return;
      }

      resizeCanvas();
      isInitialized.current = true;
      animate();

      let resizeTimeout: NodeJS.Timeout;

      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          resizeCanvas();
          animate();
        }, 200);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isInitialized.current = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error initializing LetterGlitch:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  const containerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden' as const,
    zIndex: 0,
  };

  const canvasStyle = {
    display: 'block' as const,
    width: '100%',
    height: '100%',
  };

  const outerVignetteStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
  };

  const centerVignetteStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default LetterGlitch; 