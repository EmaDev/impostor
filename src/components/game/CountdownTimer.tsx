'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
}

export default function CountdownTimer({ initialMinutes }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return (
    <div className="rounded-lg bg-primary/10 p-4">
      <p className="font-mono text-6xl font-bold text-primary">
        {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
      </p>
    </div>
  );
}
