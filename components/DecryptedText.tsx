"use client";

import { useEffect, useState } from 'react'

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  isHovering?: boolean;
  animateOn?: 'hover' | 'view' | 'both';
  revealDirection?: 'left' | 'right' | 'center';
}

export default function DecryptedText({
  text,
  speed = 80,
  maxIterations = 30,
  className = '',
  isHovering = false,
  animateOn = 'hover',
  revealDirection = 'center'
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

  // Determina se dovremmo animare
  const shouldAnimate = () => {
    if (animateOn === 'hover') return isHovering;
    if (animateOn === 'view') return isInView && !hasAnimated;
    if (animateOn === 'both') return isHovering || (isInView && !hasAnimated);
    return false;
  };

  useEffect(() => {
    if (!shouldAnimate()) {
      setDisplayText(text);
      setCurrentIteration(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIteration(prev => {
        if (prev >= maxIterations) {
          setDisplayText(text);
          if (animateOn === 'view' || animateOn === 'both') {
            setHasAnimated(true);
          }
          return prev;
        }

        const scrambledText = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (prev > index) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        setDisplayText(scrambledText);
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isHovering, isInView, text, speed, maxIterations, characters, animateOn, hasAnimated, maxIterations]);

  // Intersection Observer per l'animazione al viewport
  useEffect(() => {
    if (animateOn === 'hover') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector(`[data-decrypted-text="${text}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [text, animateOn]);

  // Reset animation when text changes
  useEffect(() => {
    setHasAnimated(false);
    setCurrentIteration(0);
    setDisplayText(text);
  }, [text]);

  return (
    <span 
      className={className}
      data-decrypted-text={text}
    >
      {displayText}
    </span>
  );
} 