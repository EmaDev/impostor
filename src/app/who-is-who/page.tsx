import { Suspense } from 'react';
import WhoIsWhoGame from '@/components/who-is-who/WhoIsWhoGame';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 p-4">
      <Skeleton className="h-12 w-3/4 max-w-md" />
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-md" />
        ))}
      </div>
      <Skeleton className="h-10 w-48" />
    </div>
  );
}

export default function WhoIsWhoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-2 sm:p-4">
      <Suspense fallback={<LoadingFallback />}>
        <WhoIsWhoGame />
      </Suspense>
    </main>
  );
}
