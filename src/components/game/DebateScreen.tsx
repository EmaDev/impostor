'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { Users, Repeat, Trophy, TimerOff, XSquare } from 'lucide-react';

interface DebateScreenProps {
  players: string[];
  onNextRound: () => void;
  onEndGame: () => void;
  currentRound: number;
  totalRounds: number;
}

export default function DebateScreen({ players, onNextRound, onEndGame, currentRound, totalRounds }: DebateScreenProps) {
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const isLastRound = currentRound === totalRounds;

  return (
    <Card className="w-full max-w-md text-center shadow-2xl animate-in fade-in zoom-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">¡A debatir!</CardTitle>
        <CardDescription>Ronda {currentRound} de {totalRounds}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isTimerVisible ? (
          <div className="space-y-4">
            <CountdownTimer initialMinutes={5} />
            <Button variant="secondary" onClick={() => setIsTimerVisible(false)}>
              <TimerOff className="mr-2 h-4 w-4" />
              Jugar sin tiempo
            </Button>
          </div>
        ) : (
          <p className="text-lg font-semibold text-muted-foreground">El tiempo corre libremente...</p>
        )}
        <div>
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2 mb-2"><Users/>Jugadores</h3>
          <ul className="grid grid-cols-2 gap-2 text-left">
            {players.map(player => (
              <li key={player} className="rounded-md bg-muted/50 p-2">{player}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button size="lg" onClick={onNextRound} className="w-full">
          <Repeat className="mr-2" />
          {isLastRound ? 'Ver resultados' : 'Siguiente Ronda'}
        </Button>
         <Button size="lg" variant="destructive" onClick={onEndGame} className="w-full">
            <Trophy className="mr-2" />
            Finalizar Partida
        </Button>
      </CardFooter>
    </Card>
  );
}
