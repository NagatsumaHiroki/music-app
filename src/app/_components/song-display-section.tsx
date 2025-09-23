'use client';

import { useState } from 'react';
import { InfiniteScrollSongs } from './infinite-scroll-songs';
import { ScrollToTopButton } from './scroll-to-top-button';
import { SearchSection } from './search-section';
// import { CategorySelector } from './category-selector';
// import { CategorySongs } from './category-songs';
import { PopularSongsList, SearchSongList } from '../../types/spotify';

interface SongDisplaySectionProps {
  initialSongs: PopularSongsList[];
  totalSongs: number;
}

export function SongDisplaySection({ initialSongs, totalSongs }: SongDisplaySectionProps) {
  const [searchResults, setSearchResults] = useState<SearchSongList[] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categorySongs, setCategorySongs] = useState<PopularSongsList[]>([]);
  const [isCategoryMode, setIsCategoryMode] = useState(false);

  const handleSearchResults = (results: SearchSongList[] | null, keyword?: string) => {
    setSearchResults(results);
    setSearchKeyword(keyword || '');
    setIsSearchMode(results !== null);
    if (results !== null) {
      setSelectedCategory(null);
      setIsCategoryMode(false);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setIsCategoryMode(categoryId !== null);
    if (categoryId !== null) {
      setSearchResults(null);
      setIsSearchMode(false);
      setSearchKeyword('');
    }
  };

  const handleCategorySongsLoaded = (songs: PopularSongsList[]) => {
    setCategorySongs(songs);
  };

  const getSectionTitle = () => {
    if (isSearchMode) return `Search Results for "${searchKeyword}"`;
    return 'Popular Songs';
  };

  const getDisplaySongs = () => {
    if (isSearchMode) return searchResults;
    if (isCategoryMode) return categorySongs;
    return initialSongs;
  };

  return (
    <>
      <SearchSection onSearchResults={handleSearchResults} />
      {/* カテゴリー機能を一時的に無効化
      <CategorySelector 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      
      {selectedCategory && (
        <CategorySongs 
          categoryId={selectedCategory}
          onSongsLoaded={handleCategorySongsLoaded}
        />
      )}
      */}
      
      <section>
        <h2 className="text-2xl font-semibold mb-5">{getSectionTitle()}</h2>
        <ScrollToTopButton />
        
        <InfiniteScrollSongs
          initialSongs={initialSongs}
          totalSongs={totalSongs}
          searchResults={searchResults}
          searchKeyword={searchKeyword}
          isSearchMode={isSearchMode}
        />
      </section>
    </>
  );
}
