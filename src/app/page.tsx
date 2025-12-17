import { Suspense } from 'react';
import { Confetti } from '@/components/Confetti';
import { FloatingIcons } from '@/components/icons/FloatingIcons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8">
      <Suspense>
        <Confetti />
      </Suspense>
      <FloatingIcons />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-headline text-6xl font-black tracking-tight text-white sm:text-8xl md:text-9xl" style={{ textShadow: '4px 4px 0px hsl(var(--primary-foreground)), 8px 8px 0px hsla(var(--primary-foreground) / 0.3)' }}>
          IMPOSTOR
        </h1>
        <h2 className="font-headline -mt-2 text-4xl font-black tracking-tight text-white sm:-mt-4 sm:text-6xl md:-mt-6 md:text-7xl" style={{ textShadow: '4px 4px 0px hsl(var(--primary-foreground)), 8px 8px 0px hsla(var(--primary-foreground) / 0.3)' }}>
          RECIBIDA
        </h2>
        <h2 className="font-headline -mt-2 text-4xl font-black tracking-tight text-white sm:-mt-4 sm:text-6xl md:-mt-6 md:text-7xl" style={{ textShadow: '4px 4px 0px hsl(var(--primary-foreground)), 8px 8px 0px hsla(var(--primary-foreground) / 0.3)' }}>
          LUCIA
        </h2>
      </div>
      <div className="relative z-10 mt-12 flex justify-center">
        <Link href="/create-room" passHref>
          <Button size="lg" className="w-full text-xl font-bold" variant="secondary">
            <FilePlus className="mr-3" />
            Crear Sala
          </Button>
        </Link>
      </div>
    </main>
  );
}
