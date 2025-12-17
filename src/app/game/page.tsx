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
    <Suspense fallback={<LoadingFallback />}>
      <GameClient />
    </Suspense>
  );
}
