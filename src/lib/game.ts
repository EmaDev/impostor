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

export function getSecretWord(category: Category): string {
  const words = categories[category];
  return words[Math.floor(Math.random() * words.length)];
}
