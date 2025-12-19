'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Confetti, type ConfettiHandle } from '@/components/Confetti';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from '@/lib/game-data';
import { Garlands } from '@/components/Garlands';
import { FloatingIcons } from '@/components/FloatingIcons';


function GameRules() {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Reglas del Juego</DialogTitle>
        <DialogDescription>
          ¡Descubre al impostor antes de que sea tarde!
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-4 text-sm text-foreground">
        <div>
          <h3 className="font-bold">1. Objetivo del Juego:</h3>
          <p>
            Los jugadores (Ciudadanos) deben identificar y votar para eliminar a los Impostores. Los Impostores ganan si no son descubiertos.
          </p>
        </div>
        <div>
          <h3 className="font-bold">2. Cómo Jugar:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Al comenzar, cada jugador recibe un rol en secreto: puede ser un "Ciudadano" (con una palabra secreta) o un "Impostor".</li>
            <li>Por turnos, cada jugador dice una palabra o frase relacionada con la palabra secreta.</li>
            <li>El Impostor no conoce la palabra, así que debe improvisar para no ser descubierto.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">3. Debate y Votación:</h3>
          <p>
            Después de que todos hayan hablado, se abre un tiempo de debate para discutir quién podría ser el impostor. Al final, todos votan para eliminar a un jugador.
          </p>
        </div>
         <div>
          <h3 className="font-bold">4. Fin de la Ronda:</h3>
          <p>
            La ronda termina cuando se vota a un jugador. ¡Se revelará si era o no el impostor! Se juegan la cantidad de rondas configuradas al inicio.
          </p>
        </div>
      </div>
    </DialogContent>
  )
}

const categoryKeys = Object.keys(categories);
const cardColors = [
  'bg-primary/70',
  'bg-secondary/70',
  'bg-accent/70',
  'bg-violet-300',
  'bg-blue-300',
  'bg-emerald-300',
];

export default function Home() {
  const confettiRef = useRef<ConfettiHandle>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fireConfetti = (delay: number) => {
      setTimeout(() => {
        confettiRef.current?.fire();
      }, delay);
    };
    fireConfetti(0);
    fireConfetti(500);
    fireConfetti(1000);
  }, []);

  const handleTitleClick = () => {
    confettiRef.current?.fire();
  };

  return (
    <main className="relative flex h-svh flex-col items-center justify-center overflow-hidden p-4 sm:p-6">
      <Suspense>
        <Confetti ref={confettiRef}/>
        <Garlands />
        <FloatingIcons />
      </Suspense>


      {/* Main content area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div onClick={handleTitleClick} className="cursor-pointer">
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

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/create-room" passHref>
            <Button size="lg" className="w-full sm:w-auto text-xl font-bold" variant="secondary">
              <FilePlus className="mr-3" />
              Crear Sala
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full sm:w-auto text-xl font-bold" variant="outline">
                <BookOpen className="mr-3" />
                Ver Reglas
              </Button>
            </DialogTrigger>
            <GameRules />
          </Dialog>
        </div>
      </div>

      {/* Carousel Footer */}
      <div className="relative z-10 w-full max-w-sm shrink-0 sm:max-w-md md:max-w-lg pb-4">
        <h3 className="mb-2 text-center text-base font-semibold text-white sm:mb-4 sm:text-lg" style={{ textShadow: '2px 2px 4px hsl(var(--primary-foreground))' }}>
          Probá cualquiera de estas categorías
        </h3>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {categoryKeys.map((category, index) => (
              <CarouselItem key={index} className="basis-auto sm:basis-1/3">
                <div className="p-1">
                  <Card className={`${cardColors[index % cardColors.length]}`}>
                    <CardContent className="flex items-center justify-center p-4 text-center">
                      <span className="text-sm font-semibold whitespace-nowrap text-primary-foreground">{category}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
