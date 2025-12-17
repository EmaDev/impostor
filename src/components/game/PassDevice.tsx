'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, ArrowRight } from 'lucide-react';

interface PassDeviceProps {
  nextPlayer: string;
  onNext: () => void;
}

export default function PassDevice({ nextPlayer, onNext }: PassDeviceProps) {
  return (
    <Card className="w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in">
        <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Smartphone />
                Pasa el celular
            </CardTitle>
        </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <p className="text-lg">
          Ahora es el turno de <strong className="text-primary">{nextPlayer}</strong>.
        </p>
        <Button size="lg" onClick={onNext} className="w-full">
          ¡Estoy listo!
          <ArrowRight className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
