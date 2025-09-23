'use client';

import { useState, useEffect } from 'react';
import { SpotifyCategory } from '../../types/spotify';
import { getCategories } from '../../lib/spotify-api';

interface CategorySelectorProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export function CategorySelector({ onCategorySelect, selectedCategory }: CategorySelectorProps) {
  const [categories, setCategories] = useState<SpotifyCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await getCategories(20);
      setCategories(result.items);
    } catch (error) {
      console.error('カテゴリー取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-6">
        <p className="text-gray-400">カテゴリー読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-white">音楽カテゴリー</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          すべて
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
