"use client";

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function Confetti() {
  const isFired = useRef(false);

  useEffect(() => {
    if (isFired.current) return;
    isFired.current = true;
    
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D8B4FE', '#FDE68A', '#FBBF24', '#C084FC'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D8B4FE', '#FDE68A', '#FBBF24', '#C084FC'] });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
}
