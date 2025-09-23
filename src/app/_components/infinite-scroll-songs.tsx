'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SongList } from './song-list';
import { LoadingSpinner } from './loading-spinner';
import { getPopularSongs, searchSongInfo } from '../../lib/spotify-api';
import { PopularSongsList, SearchSongList } from '../../types/spotify';
import { clientLog } from '../../lib/logging';

interface InfiniteScrollSongsProps {
  initialSongs: PopularSongsList[];
  totalSongs: number;
  searchResults?: SearchSongList[] | null;
  searchKeyword?: string;
  isSearchMode?: boolean;
}

export function InfiniteScrollSongs({ 
  initialSongs, 
  totalSongs, 
  searchResults,
  searchKeyword,
  isSearchMode = false 
}: InfiniteScrollSongsProps) {
  const [popularSongs, setPopularSongs] = useState<PopularSongsList[]>(initialSongs);
  const [searchSongs, setSearchSongs] = useState<SearchSongList[]>(searchResults || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    isSearchMode ? true : initialSongs.length < totalSongs
  );
  const [offset, setOffset] = useState(isSearchMode ? 0 : initialSongs.length);

  const songs = isSearchMode ? searchSongs : popularSongs;
  const observer = useRef<IntersectionObserver | null>(null);

  // 検索モードが変わったときに状態をリセット
  useEffect(() => {
    if (isSearchMode) {
      setSearchSongs(searchResults || []);
      setOffset(searchResults?.length || 0);
      setHasMore(true);
    } else {
      setPopularSongs(initialSongs);
      setOffset(initialSongs.length);
      setHasMore(initialSongs.length < totalSongs);
    }
  }, [isSearchMode, searchResults, initialSongs, totalSongs, searchKeyword]);

  const loadMoreSongs = useCallback(async () => {
    if (loading || !hasMore) return;

    clientLog.info('無限スクロール: 追加楽曲を取得中...', { offset, isSearchMode });
    setLoading(true);
    try {
      if (isSearchMode && searchKeyword) {
        const result = await searchSongInfo({ 
          keyword: searchKeyword, 
          offset, 
          limit: 8 
        });
        const newSongs = result.items as SearchSongList[];
        
        if (newSongs.length === 0 || offset + newSongs.length >= result.total) {
          setHasMore(false);
          clientLog.info('検索結果: すべての楽曲を表示しました');
        }
        
        setSearchSongs(prevSongs => [...prevSongs, ...newSongs]);
        setOffset(prevOffset => prevOffset + newSongs.length);
        clientLog.info('検索結果: 追加楽曲を取得', newSongs.length + '曲');
      } else {
        const result = await getPopularSongs(offset, 8);
        const newSongs = result.items as PopularSongsList[];
        
        if (newSongs.length === 0 || offset + newSongs.length >= result.total) {
          setHasMore(false);
          clientLog.info('人気楽曲: すべての楽曲を表示しました');
        }
        
        setPopularSongs(prevSongs => [...prevSongs, ...newSongs]);
        setOffset(prevOffset => prevOffset + newSongs.length);
        clientLog.info('人気楽曲: 追加楽曲を取得', newSongs.length + '曲');
      }
    } catch (error) {
      clientLog.error('追加データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, isSearchMode, searchKeyword, offset]);

  const lastSongElementRef = useCallback((node: HTMLAnchorElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreSongs();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreSongs]);

  return (
    <div>
      <SongList songs={songs} lastElementRef={lastSongElementRef} />
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
