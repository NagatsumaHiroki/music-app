import Link from 'next/link';
import { getPopularSongs } from '../../lib/spotify-api';
import { SongDisplaySection } from './song-display-section';
import { PopularSongsList } from '../../types/spotify';

export async function MusicPageContent() {
  let initialSongs: PopularSongsList[] = [];
  let totalSongs = 0;
  
  try {
    const result = await getPopularSongs(0, 8);
    initialSongs = result.items;
    totalSongs = result.total;
  } catch {
    console.error('初期データの取得に失敗しました');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            <Link href="/">Musci App</Link>
          </h1>
        </header>
        
        <SongDisplaySection initialSongs={initialSongs} totalSongs={totalSongs} />
      </main>
    </div>
  );
}
