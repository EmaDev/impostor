'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { categories, type Category } from '@/lib/game-data';
import { assignRoles, getSecretWord } from '@/lib/game';
import PlayerTurn from '@/components/game/PlayerTurn';
import PassDevice from '@/components/game/PassDevice';
import DebateScreen from '@/components/game/DebateScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper, XSquare } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type GameState = 'loading' | 'turn' | 'pass' | 'debate' | 'end';

export default function GameClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [gameState, setGameState] = useState<GameState>('loading');
  const [settings, setSettings] = useState<{ players: string[]; impostors: number; rounds: number; category: Category } | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [assignments, setAssignments] = useState<Map<string, string>>(new Map());
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  useEffect(() => {
    try {
      const players = JSON.parse(searchParams.get('players') || '[]');
      const impostors = parseInt(searchParams.get('impostors') || '1', 10);
      const rounds = parseInt(searchParams.get('rounds') || '1', 10);
      const category = searchParams.get('category') as Category;

      if (players.length < 3 || !category) {
        router.replace('/');
        return;
      }
      setSettings({ players, impostors, rounds, category });
      setAvailableWords(categories[category] || []);
    } catch (error) {
      router.replace('/');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (settings && availableWords.length > 0) {
      const word = getSecretWord(availableWords);
      if (word) {
        const newAssignments = assignRoles(settings.players, settings.impostors, word);
        setAssignments(newAssignments);
        setAvailableWords(prev => prev.filter(w => w !== word));
        setGameState('turn');
        setCurrentPlayerIndex(0);
      } else {
        // No more words, end game or handle appropriately
        setGameState('end');
      }
    }
  }, [currentRound, settings, availableWords.length]); // availableWords.length to trigger when list is initialized

  const handleNext = () => {
    if (!settings) return;

    if (gameState === 'turn') {
      if (currentPlayerIndex < settings.players.length - 1) {
        setGameState('pass');
      } else {
        setGameState('debate');
      }
    } else if (gameState === 'pass') {
      setCurrentPlayerIndex(prev => prev + 1);
      setGameState('turn');
    }
  };

  const handleNextRound = () => {
    if (!settings) return;
    if (currentRound < settings.rounds) {
      setCurrentRound(prev => prev + 1);
      setGameState('loading');
    } else {
      setGameState('end');
    }
  };

  const handleEndGame = () => {
    setGameState('end');
  };

  const currentPlayer = useMemo(() => settings?.players[currentPlayerIndex], [settings, currentPlayerIndex]);
  const nextPlayer = useMemo(() => settings?.players[currentPlayerIndex + 1], [settings, currentPlayerIndex]);

  if (gameState === 'loading' || !settings) {
    return <div className="flex h-screen w-full items-center justify-center">Preparando ronda...</div>;
  }
  
  if (gameState === 'end') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              <PartyPopper className="h-8 w-8 text-accent"/>
              ¡Fin de la partida!
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">¡Gracias por jugar!</p>
            <Button onClick={() => router.push('/')} className="w-full">Volver al inicio</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <XSquare className="mr-2 h-4 w-4" />
              Finalizar Juego
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro que quieres finalizar?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción terminará la partida para todos los jugadores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleEndGame}>Finalizar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {gameState === 'turn' && currentPlayer && (
        <PlayerTurn
          player={currentPlayer}
          role={assignments.get(currentPlayer) || ''}
          onNext={handleNext}
        />
      )}
      {gameState === 'pass' && nextPlayer && (
        <PassDevice
          nextPlayer={nextPlayer}
          onNext={handleNext}
        />
      )}
      {gameState === 'debate' && (
        <DebateScreen
          players={settings.players}
          onNextRound={handleNextRound}
          currentRound={currentRound}
          totalRounds={settings.rounds}
        />
      )}
    </main>
  );
}
