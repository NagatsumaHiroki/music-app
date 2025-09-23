'use client';

import { useState, useEffect, useCallback } from 'react';
import { SongList } from './song-list';
import { LoadingSpinner } from './loading-spinner';
import { getCategoryPlaylists, getPlaylistTracks, getPopularSongs } from '../../lib/spotify-api';
import { log } from '../../lib/logging';
import { PopularSongsList, CategoryPlaylist } from '../../types/spotify';

interface CategorySongsProps {
  categoryId: string;
  onSongsLoaded: (songs: PopularSongsList[]) => void;
}

export function CategorySongs({ categoryId, onSongsLoaded }: CategorySongsProps) {
  const [songs, setSongs] = useState<PopularSongsList[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCategorySongs = useCallback(async () => {
    setLoading(true);
    setSongs([]);
    
    try {
      // カテゴリーのプレイリストを取得
      const playlistsResult = await getCategoryPlaylists(categoryId, 0, 5);
      const playlists = playlistsResult.items as CategoryPlaylist[];
      
      if (playlists.length === 0) {
        log.info(`カテゴリー ${categoryId} のプレイリストが見つかりません。人気楽曲を使用します。`);
        // プレイリストが見つからない場合は人気楽曲を使用
        const popularResult = await getPopularSongs(0, 20);
        const popularSongs = popularResult.items as PopularSongsList[];
        setSongs(popularSongs);
        onSongsLoaded(popularSongs);
        return;
      }
      
      // 最初のプレイリストの楽曲を取得
      const firstPlaylist = playlists[0];
      const tracksResult = await getPlaylistTracks(firstPlaylist.id, 0, 20);
      const playlistSongs = tracksResult.items as PopularSongsList[];
      
      setSongs(playlistSongs);
      onSongsLoaded(playlistSongs);
    } catch (error) {
      console.error('カテゴリー楽曲取得エラー:', error);
      log.error('カテゴリー楽曲取得に失敗、人気楽曲を代替使用:', error);
      try {
        // エラー時は人気楽曲を代替として使用
        const fallbackResult = await getPopularSongs(0, 20);
        const fallbackSongs = fallbackResult.items as PopularSongsList[];
        setSongs(fallbackSongs);
        onSongsLoaded(fallbackSongs);
      } catch (fallbackError) {
        console.error('代替楽曲取得もエラー:', fallbackError);
        setSongs([]);
        onSongsLoaded([]);
      }
    } finally {
      setLoading(false);
    }
  }, [categoryId, onSongsLoaded]);

  useEffect(() => {
    loadCategorySongs();
  }, [loadCategorySongs]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return null; // SongListは親コンポーネントで表示
}
