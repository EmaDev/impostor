'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RoleCard } from '@/components/game/RoleCard';
import { ArrowRight } from 'lucide-react';

interface PlayerTurnProps {
  player: string;
  role: string;
  onNext: () => void;
}

export default function PlayerTurn({ player, role, onNext }: PlayerTurnProps) {
  const [roleRevealed, setRoleRevealed] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
      <h2 className="text-3xl font-bold">Turno de <span className="text-primary">{player}</span></h2>
      <RoleCard role={role} onReveal={() => setRoleRevealed(true)} />
      <Button size="lg" onClick={onNext} disabled={!roleRevealed}>
        Listo, pasar al siguiente
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}
