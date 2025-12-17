import { type SecretWord, type CategoryContent } from './game-data';

export function assignRoles(players: string[], impostorCount: number, word: SecretWord): Map<string, SecretWord | 'Impostor'> {
  const assignments = new Map<string, SecretWord | 'Impostor'>();
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

export function getSecretWord(availableWords: CategoryContent): SecretWord | null {
  if (availableWords.length === 0) {
    return null;
  }
  const item = availableWords[Math.floor(Math.random() * availableWords.length)];
  return item;
}
