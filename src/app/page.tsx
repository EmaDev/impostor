import { Suspense } from 'react';
import { Confetti } from '@/components/Confetti';
import { FloatingIcons } from '@/components/icons/FloatingIcons';
import GameSetupForm from '@/components/game/GameSetupForm';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8">
      <Suspense>
        <Confetti />
      </Suspense>
      <FloatingIcons />
      <div className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="font-headline text-5xl font-black tracking-tight text-foreground/90 sm:text-7xl md:text-8xl" style={{ textShadow: '3px 3px 0 hsl(var(--primary)), 6px 6px 0 hsl(var(--accent) / 0.7)' }}>
          Impostor
        </h1>
        <p className="font-headline mt-2 text-3xl font-bold text-primary sm:text-5xl">Recibida Lucía</p>
      </div>
      <Suspense>
        <GameSetupForm />
      </Suspense>
    </main>
  );
}
