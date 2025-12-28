'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, type KnownPerson, type Category } from '@/lib/game-data';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { HelpCircle, Home, Share2, ClipboardCopy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

const BOARD_SIZE = 40;

const compatibleCategories: Category[] = [
    "Conocidos de Lucia",
    "Famosos Argentina",
    "Famosos Mundial",
    "Músicos y bandas"
];

const getCharactersForCategory = (category: Category): KnownPerson[] => {
    const categoryData = categories[category];
    return (categoryData as any[]).map(item => 
        typeof item === 'string' ? { name: item } : item
    );
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
    const searchParams = useSearchParams();
    
    const [gameState, setGameState] = useState<'selecting' | 'sharing' | 'playing'>('selecting');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [boardCharacters, setBoardCharacters] = useState<KnownPerson[]>([]);
    const [secretCharacter, setSecretCharacter] = useState<KnownPerson | null>(null);
    const [flippedStates, setFlippedStates] = useState<{[key: string]: boolean}>({});
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        const boardParam = searchParams.get('board');
        if (boardParam) {
            try {
                const characterNames = JSON.parse(atob(boardParam));
                const allChars = compatibleCategories.flatMap(getCharactersForCategory);
                const uniqueChars = getUniqueCharacters(allChars);
                
                const board: KnownPerson[] = characterNames.map((name: string) => 
                    uniqueChars.find(char => char.name === name)
                ).filter((c: KnownPerson | undefined): c is KnownPerson => c !== undefined);

                if (board.length > 0) {
                    setBoardCharacters(board);
                    const secret = board[Math.floor(Math.random() * board.length)];
                    setSecretCharacter(secret);
                    setFlippedStates(board.reduce((acc, char) => ({ ...acc, [char.name]: false }), {}));
                    setGameState('playing');
                }
            } catch (error) {
                console.error("Failed to parse board from URL, returning to selection.", error);
                router.replace('/who-is-who');
                setGameState('selecting');
            }
        }
    }, [searchParams, router]);


    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        const characters = getUniqueCharacters(getCharactersForCategory(category));
        const newBoardChars = shuffleArray(characters).slice(0, BOARD_SIZE);
        
        const characterNames = newBoardChars.map(c => c.name);
        const encodedBoard = btoa(JSON.stringify(characterNames));
        
        const url = new URL(window.location.href);
        url.searchParams.set('board', encodedBoard);
        
        setShareUrl(url.toString());
        setGameState('sharing');
    };
    
    const copyShareUrl = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('¡Enlace copiado! Compártelo con otro jugador.');
    };

    const startGameFromUrl = () => {
        router.push(shareUrl);
    };

    const toggleFlip = (name: string) => {
        setFlippedStates(prev => ({ ...prev, [name]: !prev[name] }));
    };

    if (gameState === 'selecting') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Elige una Categoría</CardTitle>
                        <CardDescription className="text-center">Elige una categoría para generar un tablero y compartirlo.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {compatibleCategories.map(cat => (
                            <Button key={cat} size="lg" variant="secondary" onClick={() => handleCategorySelect(cat)}>
                                <Share2 className="mr-2 h-5 w-5" />
                                {cat}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
                 <Button onClick={() => router.push('/')} className="mt-6" size="lg" variant="outline">
                    <Home className="mr-2 h-5 w-5" />
                    Volver al Inicio
                </Button>
            </div>
        );
    }
    
    if (gameState === 'sharing') {
         return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">¡Listo para compartir!</CardTitle>
                        <CardDescription>Copia este enlace y envíalo a otro jugador. Luego, presiona "Empezar Juego" para jugar con el mismo tablero.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex gap-2">
                         <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="w-full rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground"
                         />
                         <Button onClick={copyShareUrl} variant="outline" size="icon" aria-label="Copiar enlace">
                            <ClipboardCopy className="h-5 w-5"/>
                         </Button>
                       </div>
                       <Button onClick={startGameFromUrl} size="lg" className="w-full">
                           Empezar Juego
                       </Button>
                        <Button onClick={() => setGameState('selecting')} variant="ghost">
                           Volver a elegir
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (gameState === 'playing' && !secretCharacter) {
        return (
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-screen">
                <p>Cargando juego...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center p-2 sm:p-4">
             <div className="w-full flex flex-col sm:flex-row justify-between items-center my-4 p-4 rounded-lg bg-primary/10 shadow-md gap-4">
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                        <HelpCircle className="h-8 w-8" />
                        Tu personaje secreto es...
                    </h1>
                    <p className="text-3xl sm:text-4xl font-black text-primary animate-pulse">{secretCharacter?.name}</p>
                </div>
            </div>
            
            <div className="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-2">
                {boardCharacters.map((char) => (
                    <CharacterCard 
                        key={char.name}
                        character={char}
                        isFlipped={!!flippedStates[char.name]}
                        onToggleFlip={() => toggleFlip(char.name)}
                    />
                ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
                 <Button onClick={() => router.push('/')} className="text-lg" size="lg" variant="outline">
                    <Home className="mr-2 h-5 w-5" />
                    Volver al Inicio
                </Button>
            </div>
        </div>
    );
}
