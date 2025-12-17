import { Suspense } from 'react';
import GameClient from './GameClient';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-8 p-4">
      <Skeleton className="h-16 w-3/4 max-w-md" />
      <Skeleton className="h-64 w-full max-w-sm" />
      <Skeleton className="h-12 w-48" />
    </div>
  );
}

export default function GamePage() {
  return (
    // The key ensures the component remounts when navigating to the same page with different query params.
    // However, for "Play Again" we will manage state internally in GameClient.
    // Using a key here that depends on query params would force a full remount,
    // which is what we want to avoid if we are just re-starting a game.
    // The internal state management in GameClient will handle resets.
    <Suspense fallback={<LoadingFallback />}>
      <GameClient />
    </Suspense>
  );
}
