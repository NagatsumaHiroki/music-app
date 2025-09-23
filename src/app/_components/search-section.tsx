'use client';

import { useState } from 'react';
import { SearchInput } from './search-input';
import { searchSongInfo } from '../../lib/spotify-api';
import { SearchSongList } from '../../types/spotify';
import { clientLog } from '../../lib/logging';

interface SearchSectionProps {
  onSearchResults?: (results: SearchSongList[] | null, keyword?: string) => void;
}

export function SearchSection({ onSearchResults }: SearchSectionProps = {}) {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    if (keyword === '') {
      clientLog.info('検索をクリア');
      onSearchResults?.(null);
      return;
    }

    clientLog.info('楽曲検索開始:', keyword);
    setIsLoading(true);
    try {
      const params = { keyword, offset: 0, limit: 8 };
      const result = await searchSongInfo(params);
      clientLog.info('検索結果取得成功:', result.items.length + '曲');
      onSearchResults?.(result.items, keyword);
    } catch (error) {
      clientLog.error('検索エラー:', error);
      onSearchResults?.(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchInput
      onInputChange={handleInputChange}
      onSubmit={handleSearch}
      isLoading={isLoading}
    />
  );
}
