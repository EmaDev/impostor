'use client';

import { useState, useMemo } from 'react';
import { categories } from '@/lib/game-data';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle } from 'lucide-react';

const knownPeople = categories['Conocidos de Lucia'];
const BOARD_SIZE = 40;

// Function to get a unique list of characters
const getUniqueCharacters = () => {
    const unique = new Map();
    (knownPeople as any[]).forEach(person => {
        if (!unique.has(person.name)) {
            unique.set(person.name, person);
        }
    });
    return Array.from(unique.values());
};

// Shuffle array
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};


export default function WhoIsWhoGame() {
    const allCharacters = useMemo(() => getUniqueCharacters(), []);
    const [boardCharacters, setBoardCharacters] = useState(() => shuffleArray(allCharacters).slice(0, BOARD_SIZE));
    const [secretCharacter, setSecretCharacter] = useState(() => boardCharacters[Math.floor(Math.random() * boardCharacters.length)]);
    const [flippedStates, setFlippedStates] = useState<{[key: string]: boolean}>(() => 
        boardCharacters.reduce((acc, char) => ({...acc, [char.name]: false }), {})
    );

    const toggleFlip = (name: string) => {
        setFlippedStates(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const resetGame = () => {
        const newBoardChars = shuffleArray(allCharacters).slice(0, BOARD_SIZE);
        setBoardCharacters(newBoardChars);
        setSecretCharacter(newBoardChars[Math.floor(Math.random() * newBoardChars.length)]);
        setFlippedStates(newBoardChars.reduce((acc, char) => ({...acc, [char.name]: false }), {}));
    };
  
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-full text-center my-4 p-4 rounded-lg bg-primary/10 shadow-md">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 flex items-center justify-center gap-2">
                    <HelpCircle className="h-8 w-8" />
                    Tu personaje secreto es...
                </h1>
                <p className="text-3xl sm:text-4xl font-black text-primary animate-pulse">{secretCharacter.name}</p>
            </div>
            
            <div className="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-2">
                {boardCharacters.map((char) => (
                    <CharacterCard 
                        key={char.name}
                        character={char}
                        isFlipped={flippedStates[char.name]}
                        onToggleFlip={() => toggleFlip(char.name)}
                    />
                ))}
            </div>

            <Button onClick={resetGame} className="mt-6 text-lg" size="lg">
                <RefreshCcw className="mr-2 h-5 w-5" />
                Reiniciar Juego
            </Button>
        </div>
    );
}
