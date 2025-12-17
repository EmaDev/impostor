'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { Users, Repeat, Trophy } from 'lucide-react';

interface DebateScreenProps {
  players: string[];
  onNextRound: () => void;
  currentRound: number;
  totalRounds: number;
}

export default function DebateScreen({ players, onNextRound, currentRound, totalRounds }: DebateScreenProps) {
  const isLastRound = currentRound === totalRounds;

  return (
    <Card className="w-full max-w-md text-center shadow-2xl animate-in fade-in zoom-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">¡A debatir!</CardTitle>
        <CardDescription>Ronda {currentRound} de {totalRounds}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CountdownTimer initialMinutes={2} />
        <div>
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2 mb-2"><Users/>Jugadores</h3>
          <ul className="grid grid-cols-2 gap-2 text-left">
            {players.map(player => (
              <li key={player} className="rounded-md bg-muted/50 p-2">{player}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" onClick={onNextRound} className="w-full">
          {isLastRound ? <Trophy className="mr-2" /> : <Repeat className="mr-2" />}
          {isLastRound ? 'Finalizar Partida' : 'Siguiente Ronda'}
        </Button>
      </CardFooter>
    </Card>
  );
}
