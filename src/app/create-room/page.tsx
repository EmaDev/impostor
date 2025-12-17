import { Suspense } from 'react';
import GameSetupForm from '@/components/game/GameSetupForm';
import { FloatingIcons } from '@/components/icons/FloatingIcons';

export default function CreateRoomPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8">
        <FloatingIcons />
        <div className="relative z-10 w-full max-w-2xl text-center mb-8">
            <h1 className="font-headline text-5xl font-black tracking-tight text-foreground/90 sm:text-7xl md:text-8xl" style={{ textShadow: '3px 3px 0 hsl(var(--primary)), 6px 6px 0 hsl(var(--accent) / 0.7)' }}>
                Crear Sala
            </h1>
        </div>
        <Suspense>
            <GameSetupForm />
        </Suspense>
    </main>
  );
}
