import { categories, type Category } from './game-data';

export function assignRoles(players: string[], impostorCount: number, word: string): Map<string, string> {
  const assignments = new Map<string, string>();
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffledPlayers.length; i++) {
    const player = shuffledPlayers[i];
    if (i < impostorCount) {
      assignments.set(player, 'Impostor');
    } else {
      assignments.set(player, word);
    }
  }
  return assignments;
}

export function getSecretWord(availableWords: string[]): string | null {
  if (availableWords.length === 0) {
    return null;
  }
  const word = availableWords[Math.floor(Math.random() * availableWords.length)];
  return word;
}
