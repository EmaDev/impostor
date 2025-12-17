'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, UserX } from 'lucide-react';
import { type SecretWord } from '@/lib/game-data';
import Image from 'next/image';

interface RoleCardProps {
  role: SecretWord | 'Impostor';
  onReveal: () => void;
}

export function RoleCard({ role, onReveal }: RoleCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isImpostor = role === 'Impostor';

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  const handleConceal = () => {
    setIsRevealed(false);
  };
  
  const content = () => {
    if (isImpostor) {
      return (
        <>
          <UserX className="h-16 w-16" />
          <h3 className="mt-4 text-2xl font-black">
            Eres el
          </h3>
          <p className="mt-2 text-4xl font-bold">IMPOSTOR</p>
        </>
      );
    }

    if (typeof role === 'string') {
      return (
        <>
          <UserCheck className="h-16 w-16" />
          <h3 className="mt-4 text-2xl font-black">
            La palabra es:
          </h3>
          <p className="mt-2 text-4xl font-bold">{`"${role}"`}</p>
        </>
      );
    }
    
    // It's a KnownPerson object
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-black">El personaje es:</h3>
            <div className="relative mt-4 h-32 w-32 rounded-full overflow-hidden border-4 border-primary-foreground/50">
                <Image src={role.avatar} alt={role.name} layout="fill" objectFit="cover" />
            </div>
            <p className="mt-4 text-4xl font-bold">{role.name}</p>
        </div>
    );
  };


  return (
    <div
      className="relative h-80 w-64 cursor-pointer select-none rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
      onMouseDown={handleReveal}
      onMouseUp={handleConceal}
      onTouchStart={handleReveal}
      onTouchEnd={handleConceal}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleReveal()}
      onKeyUp={(e) => (e.key === 'Enter' || e.key === ' ') && handleConceal()}
      role="button"
      tabIndex={0}
      aria-label="Mantén presionado para ver tu rol"
    >
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-card p-4"
          >
            <div className="text-center">
              <p className="text-lg font-bold">Mantén presionado</p>
              <p className="text-muted-foreground">para ver tu rol</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 ${
              isImpostor ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
            }`}
          >
            {content()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
