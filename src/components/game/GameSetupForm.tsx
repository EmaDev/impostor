'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, type Category } from '@/lib/game-data';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, X, Users, Repeat, ThumbsUp, Play, Star } from 'lucide-react';

const categoryKeys = Object.keys(categories) as Category[];

export default function GameSetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [impostorCount, setImpostorCount] = useState('1');
  const [rounds, setRounds] = useState('3');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    try {
      const playersParam = searchParams.get('players');
      if (playersParam) {
        const preloadedPlayers = JSON.parse(playersParam);
        if (Array.isArray(preloadedPlayers)) {
          setPlayers(preloadedPlayers);
        }
      }

      const impostorsParam = searchParams.get('impostors');
      if (impostorsParam) setImpostorCount(impostorsParam);
      
      const roundsParam = searchParams.get('rounds');
      if (roundsParam) setRounds(roundsParam);

      const categoryParam = searchParams.get('category') as Category;
      if (categoryParam && categoryKeys.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }
    } catch (e) {
      console.error("Failed to parse game settings from URL", e);
      // Silently fail, user can just re-enter settings
    }
  }, [searchParams]);

  const addPlayer = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName('');
    }
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter(p => p !== name));
  };

  const handleStartGame = () => {
    if (players.length < 3) {
      toast({ title: "Jugadores insuficientes", description: "Necesitas al menos 3 jugadores para empezar.", variant: "destructive" });
      return;
    }
    if (parseInt(impostorCount) >= players.length) {
      toast({ title: "Demasiados impostores", description: "El número de impostores debe ser menor que el número de jugadores.", variant: "destructive" });
      return;
    }
    if (!selectedCategory) {
      toast({ title: "Falta categoría", description: "Por favor, elige una categoría.", variant: "destructive" });
      return;
    }

    const params = new URLSearchParams();
    params.set('players', JSON.stringify(players));
    params.set('impostors', impostorCount);
    params.set('rounds', rounds);
    params.set('category', selectedCategory);
    router.push(`/game?${params.toString()}`);
  };

  return (
    <Card className="z-10 mt-8 w-full max-w-lg rounded-2xl bg-card/80 shadow-2xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Configurar Partida</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="player-name">Nombres de Jugadores</Label>
          <div className="flex gap-2">
            <Input
              id="player-name"
              placeholder="Escribe un nombre..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            />
            <Button onClick={addPlayer} aria-label="Agregar jugador">
              <UserPlus />
              Agregar
            </Button>
          </div>
          <ul className="mt-2 space-y-2">
            {players.map(p => (
              <li key={p} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5 text-sm">
                <span>{p}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removePlayer(p)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Impostores</Label>
            <Select value={impostorCount} onValueChange={setImpostorCount}>
              <SelectTrigger><Users /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Impostor</SelectItem>
                <SelectItem value="2">2 Impostores</SelectItem>
                <SelectItem value="3">3 Impostores</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Rondas</Label>
            <Select value={rounds} onValueChange={setRounds}>
              <SelectTrigger><Repeat /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ronda</SelectItem>
                <SelectItem value="3">3 Rondas</SelectItem>
                <SelectItem value="5">5 Rondas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Categorías</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {categoryKeys.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="w-full justify-center"
              >
                {cat === 'Conocidos de Lucia' && <Star className="mr-2 h-4 w-4 text-yellow-400" />}
                {selectedCategory === cat && <ThumbsUp className="mr-2 h-4 w-4" />}
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <Button size="lg" className="w-full text-lg font-bold" onClick={handleStartGame}>
          <Play className="mr-2" />
          ¡Empezar a Jugar!
        </Button>
      </CardContent>
    </Card>
  );
}
