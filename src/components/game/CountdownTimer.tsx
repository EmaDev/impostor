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
      setSeconds(s => s > 0 ? s - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  const timeColorClass = seconds <= 60 ? 'text-destructive' : 'text-primary';

  return (
    <div className="rounded-lg bg-primary/10 p-4">
      <p className={`font-mono text-6xl font-bold transition-colors ${timeColorClass}`}>
        {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
      </p>
    </div>
  );
}
