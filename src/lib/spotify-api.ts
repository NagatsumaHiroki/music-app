import axios from 'axios';
import { fetchToken } from './spotify-token';
import { SearchProps, SpotifyCategory, CategoryPlaylist } from '../types/spotify';
import { log } from './logging';

export async function getPopularSongs(offset: number = 0, limit: number = 8) {
  try {
    log.info(`人気曲を取得中... (offset: ${offset}, limit: ${limit})`);
    
    const token = await fetchToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe/tracks`,
      {
        headers: { Authorization: 'Bearer ' + token },
        params: {
          offset,
          limit,
        }
      }
    );
    
    log.info('人気曲取得成功:', response.data.items.length + '曲');
    log.info('全体の曲数:', response.data.total + '曲');
    return response.data;
  } catch (error) {
    log.error('人気曲取得エラー:', error);
    throw error;
  }
}

export async function searchSongInfo(props: SearchProps & { offset?: number; limit?: number }) {
  try {
    const { keyword, offset = 0, limit = 8 } = props;
    log.info(`楽曲検索中: ${keyword} (offset: ${offset}, limit: ${limit})`);
    
    const token = await fetchToken();
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: 'Bearer ' + token },
      params: { 
        q: keyword, 
        type: 'track',
        offset,
        limit
      }
    });
    
    log.info('楽曲検索成功:', response.data.tracks.items.length + '曲見つかりました');
    return response.data.tracks;
  } catch (error) {
    log.error('楽曲検索エラー:', error);
    throw error;
  }
}

export async function getCategories(limit: number = 20) {
  try {
    log.info(`カテゴリー一覧取得中... (limit: ${limit})`);
    
    const token = await fetchToken();
    const response = await axios.get("https://api.spotify.com/v1/browse/categories", {
      headers: { Authorization: 'Bearer ' + token },
      params: { 
        limit,
        country: 'JP' // 日本地域を指定
      }
    });
    
    log.info('カテゴリー取得成功:', response.data.categories.items.length + '件');
    return response.data.categories;
  } catch (error) {
    log.error('カテゴリー取得エラー:', error);
    // カテゴリー取得に失敗した場合はデフォルトカテゴリーを返す
    return {
      items: [
        { id: 'pop', name: 'ポップ', icons: [], href: '' },
        { id: 'rock', name: 'ロック', icons: [], href: '' },
        { id: 'hiphop', name: 'ヒップホップ', icons: [], href: '' },
        { id: 'jazz', name: 'ジャズ', icons: [], href: '' },
        { id: 'classical', name: 'クラシック', icons: [], href: '' }
      ]
    };
  }
}

export async function getCategoryPlaylists(categoryId: string, offset: number = 0, limit: number = 10) {
  try {
    log.info(`カテゴリーのプレイリスト取得中... (category: ${categoryId}, offset: ${offset}, limit: ${limit})`);
    
    const token = await fetchToken();
    const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
      headers: { Authorization: 'Bearer ' + token },
      params: { 
        offset, 
        limit,
        country: 'JP' // 日本地域を指定
      }
    });
    
    log.info('カテゴリープレイリスト取得成功:', response.data.playlists.items.length + '件');
    return response.data.playlists;
  } catch (error) {
    log.error('カテゴリープレイリスト取得エラー:', error);
    // カテゴリープレイリスト取得に失敗した場合は空の結果を返す
    return {
      items: [],
      total: 0
    };
  }
}

export async function getPlaylistTracks(playlistId: string, offset: number = 0, limit: number = 10) {
  try {
    log.info(`プレイリストの楽曲取得中... (playlist: ${playlistId}, offset: ${offset}, limit: ${limit})`);
    
    const token = await fetchToken();
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: 'Bearer ' + token },
      params: { offset, limit }
    });
    
    log.info('プレイリスト楽曲取得成功:', response.data.items.length + '曲');
    return response.data;
  } catch (error) {
    log.error('プレイリスト楽曲取得エラー:', error);
    throw error;
  }
}
