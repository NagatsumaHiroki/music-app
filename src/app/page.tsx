import { Suspense } from 'react';
import { MusicPageContent } from './_components/music-page-content';
import { LoadingSpinner } from './_components/loading-spinner';

export default function HomePage() {
  return (
    <div className="music-app">
      <Suspense fallback={<LoadingSpinner />}>
        <MusicPageContent />
      </Suspense>
    </div>
  );
}
