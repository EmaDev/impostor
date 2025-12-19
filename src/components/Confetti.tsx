"use client";

import { useRef, useImperativeHandle, forwardRef } from 'react';
import confetti from 'canvas-confetti';

type ConfettiHandle = {
  fire: () => void;
};

const ConfettiComponent = forwardRef<ConfettiHandle>((_props, ref) => {

  const fire = () => {
    const duration = 3 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const colors = ['#fde68a', '#d8b4fe', '#a78bfa', '#60a5fa', '#facc15'];

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors });
    }, 250);
  };
  
  useImperativeHandle(ref, () => ({
    fire,
  }));

  return null;
});

ConfettiComponent.displayName = "Confetti";

export const Confetti = ConfettiComponent;
export type { ConfettiHandle };
