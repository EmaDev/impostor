'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, type KnownPerson, type Category } from '@/lib/game-data';
import CharacterCard from './CharacterCard';
import { Button } from '@/components/ui/button';
import { HelpCircle, Home, Share2, ClipboardCopy, Grid3x3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';


const compatibleCategories: Category[] = [
    "Conocidos de Lucia",
    "Famosos Argentina",
    "Famosos Mundial",
    "Músicos y bandas"
];

const getCharactersForCategory = (category: Category): KnownPerson[] => {
    const categoryData = categories[category];
    return (categoryData as any[]).map(item => 
        typeof item === 'string' ? { name: item } : { ...item, avatar: item.avatar || undefined }
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

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export default function WhoIsWhoGame() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [gameState, setGameState] = useState<'selecting' | 'sharing' | 'playing'>('selecting');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [characterCount, setCharacterCount] = useState<number>(25);
    const [boardCharacters, setBoardCharacters] = useState<KnownPerson[]>([]);
    const [secretCharacter, setSecretCharacter] = useState<KnownPerson | null>(null);
    const [flippedStates, setFlippedStates] = useState<{[key: string]: boolean}>({});
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        const boardParam = searchParams.get('board');
        const countParam = searchParams.get('count');
        
        if (boardParam && countParam) {
            try {
                const characterNames = JSON.parse(atob(boardParam));
                const count = parseInt(countParam, 10);
                const allChars = compatibleCategories.flatMap(getCharactersForCategory);
                const uniqueChars = getUniqueCharacters(allChars);
                
                const board: KnownPerson[] = characterNames.map((name: string) => 
                    uniqueChars.find(char => char.name === name)
                ).filter((c: KnownPerson | undefined): c is KnownPerson => c !== undefined);

                if (board.length > 0) {
                    setBoardCharacters(board);
                    setCharacterCount(count);
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

        if (characters.length < characterCount) {
            toast.warning(`La categoría "${category}" no tiene suficientes personajes (${characters.length}) para la selección de ${characterCount}. Se usarán todos los disponibles.`);
        }

        const newBoardChars = shuffleArray(characters).slice(0, characterCount);
        
        const characterNames = newBoardChars.map(c => c.name);
        const encodedBoard = btoa(JSON.stringify(characterNames));
        
        const url = new URL(window.location.href);
        url.searchParams.set('board', encodedBoard);
        url.searchParams.set('count', String(characterCount));
        
        setShareUrl(url.toString());
        setGameState('sharing');
    };
    
    const copyShareUrl = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('¡Enlace copiado! Compártelo con otro jugador.');
    };

    const shareOnWhatsApp = () => {
        const message = encodeURIComponent(`¡Juguemos Adivina Quién! Aquí está el tablero: ${shareUrl}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank');
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
                        <CardDescription className="text-center">Elige la cantidad de personajes y una categoría para generar una partida.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cantidad de Personajes</label>
                            <Select value={String(characterCount)} onValueChange={(val) => setCharacterCount(Number(val))}>
                                <SelectTrigger>
                                    <Grid3x3 className="mr-2 h-5 w-5" />
                                    <SelectValue placeholder="Selecciona cantidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="25">25 personajes</SelectItem>
                                    <SelectItem value="36">36 personajes</SelectItem>
                                    <SelectItem value="64">64 personajes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {compatibleCategories.map(cat => (
                                <Button key={cat} size="lg" variant="secondary" onClick={() => handleCategorySelect(cat)}>
                                    <Share2 className="mr-2 h-5 w-5" />
                                    {cat}
                                </Button>
                            ))}
                        </div>
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
                        <CardDescription>Copia este enlace o compártelo por WhatsApp. Luego, presiona "Empezar Juego" para usar el mismo tablero.</CardDescription>
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
                       <Button onClick={shareOnWhatsApp} size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                           <WhatsAppIcon />
                           Compartir en WhatsApp
                       </Button>
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
            
            <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-2">
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

    