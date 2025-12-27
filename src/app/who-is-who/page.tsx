import { Suspense } from 'react';
import WhoIsWhoGame from '@/components/who-is-who/WhoIsWhoGame';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 p-4">
      <Skeleton className="h-24 w-full max-w-md" />
       <Skeleton className="h-10 w-48" />
    </div>
  );
}

export default function WhoIsWhoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Suspense fallback={<LoadingFallback />}>
        <WhoIsWhoGame />
      </Suspense>
    </main>
  );
}
