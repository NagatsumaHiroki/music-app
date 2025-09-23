import React from 'react';
import { PopularSongsList, SearchSongList } from '../../types/spotify';
import Image from 'next/image';

interface SongListProps {
  songs: PopularSongsList[] | SearchSongList[];
  lastElementRef?: (node: HTMLAnchorElement | null) => void;
}

export function SongList({ songs, lastElementRef }: SongListProps) {
  if (!songs || songs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        楽曲が見つかりませんでした
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
      {songs.map((song, index) => {
        // PopularSongsList と SearchSongList の型を判定
        const isPopularSong = 'track' in song;
        const trackData = isPopularSong ? song.track : song;
        
        const imageUrl = trackData?.album?.images?.[0]?.url;
        const songName = trackData?.name || '不明な楽曲';
        const artistName = trackData?.artists?.[0]?.name || '不明なアーティスト';
        const spotifyUrl = trackData?.external_urls?.spotify || '#';
        const songId = trackData?.id || index;

        const isLastElement = index === songs.length - 1;
        
        return (
          <React.Fragment key={`${songId}-${index}`}>
            <a
              ref={isLastElement ? lastElementRef : undefined}
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="relative mb-2 rounded overflow-hidden aspect-square">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${songName}のアルバムアート`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold truncate">
                {songName}
              </h3>
              <p className="text-gray-400 truncate">
                {artistName}
              </p>
            </a>
          </React.Fragment>
        );
      })}
    </div>
  );
}
