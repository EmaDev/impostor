'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories, type KnownPerson, type Category } from '@/lib/game-data';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle, Home } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const BOARD_SIZE = 40;

const compatibleCategories: Category[] = [
    "Conocidos de Lucia",
    "Famosos Argentina",
    "Famosos Mundial",
    "Músicos y bandas"
];

const getCharactersForCategory = (category: Category): KnownPerson[] => {
    const categoryData = categories[category];
    if (typeof categoryData[0] === 'string') {
        return (categoryData as string[]).map(name => ({ name }));
    }
    return categoryData as KnownPerson[];
};

const getUniqueCharacters = (people: KnownPerson[]): KnownPerson[] => {
    const unique = new Map<string, KnownPerson>();
    people.forEach(person => {
        if (!unique.has(person.name)) {
            unique.set(person.name, person);
        }
    });
    return Array.from(unique.values());
};

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function WhoIsWhoGame() {
    const router = useRouter();
    
    const [selectedCategory, setSelectedCategory] = useState<Category>(compatibleCategories[0]);
    const [boardCharacters, setBoardCharacters] = useState<KnownPerson[]>([]);
    const [secretCharacter, setSecretCharacter] = useState<KnownPerson | null>(null);
    const [flippedStates, setFlippedStates] = useState<{[key: string]: boolean}>({});

    const setupGame = (category: Category) => {
        const characters = getUniqueCharacters(getCharactersForCategory(category));
        
        const newBoardChars = shuffleArray(characters).slice(0, BOARD_SIZE);
        setBoardCharacters(newBoardChars);

        if (newBoardChars.length > 0) {
            const secret = newBoardChars[Math.floor(Math.random() * newBoardChars.length)];
            setSecretCharacter(secret);
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
