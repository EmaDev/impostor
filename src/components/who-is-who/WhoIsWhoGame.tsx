'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories, type KnownPerson, type Category } from '@/lib/game-data';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle, Home } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const BOARD_SIZE = 40;

// Filter categories that are compatible with Who is Who (i.e., have avatar images)
const compatibleCategories = Object.keys(categories).filter(key => 
    Array.isArray(categories[key as Category]) &&
    typeof (categories[key as Category] as any[])[0] === 'object' &&
    'avatar' in (categories[key as Category] as any[])[0]
) as Category[];


// Function to get a unique list of characters
const getUniqueCharacters = (people: KnownPerson[]): KnownPerson[] => {
    const unique = new Map<string, KnownPerson>();
    people.forEach(person => {
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
    const router = useRouter();
    
    const [selectedCategory, setSelectedCategory] = useState<Category>(compatibleCategories[0]);
    const [allCharacters, setAllCharacters] = useState<KnownPerson[]>([]);
    const [boardCharacters, setBoardCharacters] = useState<KnownPerson[]>([]);
    const [secretCharacter, setSecretCharacter] = useState<KnownPerson | null>(null);
    const [flippedStates, setFlippedStates] = useState<{[key: string]: boolean}>({});

    const setupGame = (category: Category) => {
        const characters = getUniqueCharacters(categories[category] as KnownPerson[]);
        setAllCharacters(characters);

        const newBoardChars = shuffleArray(characters).slice(0, BOARD_SIZE);
        setBoardCharacters(newBoardChars);

        if (newBoardChars.length > 0) {
            setSecretCharacter(newBoardChars[Math.floor(Math.random() * newBoardChars.length)]);
            setFlippedStates(newBoardChars.reduce((acc, char) => ({...acc, [char.name]: false }), {}));
        } else {
            setSecretCharacter(null);
            setFlippedStates({});
        }
    };
    
    useEffect(() => {
        setupGame(selectedCategory);
    }, [selectedCategory]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as Category);
    };

    const toggleFlip = (name: string) => {
        setFlippedStates(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const resetGame = () => {
        setupGame(selectedCategory);
    };
  
    if (!secretCharacter) {
        return (
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-screen">
                <p>Cargando juego...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
             <div className="w-full flex flex-col sm:flex-row justify-between items-center my-4 p-4 rounded-lg bg-primary/10 shadow-md gap-4">
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                        <HelpCircle className="h-8 w-8" />
                        Tu personaje secreto es...
                    </h1>
                    <p className="text-3xl sm:text-4xl font-black text-primary animate-pulse">{secretCharacter.name}</p>
                </div>
                <div className="w-full sm:w-auto">
                    <Label htmlFor="category-select" className="mb-2 block text-center sm:text-left font-semibold text-primary-foreground/80">Categoría</Label>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger id="category-select" className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Elige una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {compatibleCategories.map(cat => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
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

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button onClick={resetGame} className="text-lg" size="lg">
                    <RefreshCcw className="mr-2 h-5 w-5" />
                    Reiniciar Juego
                </Button>
                 <Button onClick={() => router.push('/')} className="text-lg" size="lg" variant="secondary">
                    <Home className="mr-2 h-5 w-5" />
                    Volver al Inicio
                </Button>
            </div>
        </div>
    );
}
