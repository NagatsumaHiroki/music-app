import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import {
  getPopularSongs,
  searchSongInfo,
  getCategories,
  getCategoryPlaylists,
  getPlaylistTracks
} from '../spotify-api'

// axiosのモック
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

// spotify-tokenのモック
vi.mock('../spotify-token', () => ({
  fetchToken: vi.fn().mockResolvedValue('mock_access_token')
}))

// loggingのモック
vi.mock('../logging', () => ({
  log: {
    info: vi.fn(),
    error: vi.fn(),
  },
}))

describe('spotify-api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPopularSongs', () => {
    it('人気曲を正常に取得できること', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              track: {
                id: 'track1',
                name: 'Test Song 1',
                artists: [{ name: 'Test Artist 1', external_urls: { spotify: 'https://spotify.com/artist1' } }],
                album: {
                  name: 'Test Album',
                  images: [{ url: 'https://example.com/image1.jpg', height: 640, width: 640 }]
                },
                external_urls: { spotify: 'https://spotify.com/track1' }
              }
            }
          ],
          total: 100
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getPopularSongs(0, 8)

      expect(result).toEqual(mockResponse.data)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe/tracks',
        {
          headers: { Authorization: 'Bearer mock_access_token' },
          params: { offset: 0, limit: 8 }
        }
      )
    })

    it('カスタムパラメータで人気曲を取得できること', async () => {
      const mockResponse = { data: { items: [], total: 0 } }
      mockedAxios.get.mockResolvedValue(mockResponse)

      await getPopularSongs(20, 15)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: { offset: 20, limit: 15 }
        })
      )
    })

    it('APIエラー時に例外をスローすること', async () => {
      const mockError = new Error('API Error')
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(getPopularSongs()).rejects.toThrow('API Error')
    })
  })

  describe('searchSongInfo', () => {
    it('楽曲検索を正常に実行できること', async () => {
      const mockResponse = {
        data: {
          tracks: {
            items: [
              {
                id: 'search_track1',
                name: 'Search Result Song',
                artists: [{ name: 'Search Artist', external_urls: { spotify: 'https://spotify.com/artist' } }],
                album: {
                  name: 'Search Album',
                  images: [{ url: 'https://example.com/search_image.jpg', height: 640, width: 640 }]
                },
                external_urls: { spotify: 'https://spotify.com/search_track1' }
              }
            ],
            total: 50
          }
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await searchSongInfo({ keyword: 'test song' })

      expect(result).toEqual(mockResponse.data.tracks)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/search',
        {
          headers: { Authorization: 'Bearer mock_access_token' },
          params: {
            q: 'test song',
            type: 'track',
            offset: 0,
            limit: 8
          }
        }
      )
    })

    it('カスタムパラメータで検索できること', async () => {
      const mockResponse = { data: { tracks: { items: [], total: 0 } } }
      mockedAxios.get.mockResolvedValue(mockResponse)

      await searchSongInfo({
        keyword: 'custom search',
        offset: 10,
        limit: 20
      })

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: {
            q: 'custom search',
            type: 'track',
            offset: 10,
            limit: 20
          }
        })
      )
    })

    it('検索APIエラー時に例外をスローすること', async () => {
      const mockError = new Error('Search API Error')
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(searchSongInfo({ keyword: 'test' })).rejects.toThrow('Search API Error')
    })
  })

  describe('getCategories', () => {
    it('カテゴリー一覧を正常に取得できること', async () => {
      const mockResponse = {
        data: {
          categories: {
            items: [
              { id: 'pop', name: 'ポップ', icons: [], href: 'https://api.spotify.com/v1/browse/categories/pop' },
              { id: 'rock', name: 'ロック', icons: [], href: 'https://api.spotify.com/v1/browse/categories/rock' }
            ]
          }
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getCategories(20)

      expect(result).toEqual(mockResponse.data.categories)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/browse/categories',
        {
          headers: { Authorization: 'Bearer mock_access_token' },
          params: { limit: 20, country: 'JP' }
        }
      )
    })

    it('APIエラー時にデフォルトカテゴリーを返すこと', async () => {
      const mockError = new Error('Categories API Error')
      mockedAxios.get.mockRejectedValue(mockError)

      const result = await getCategories()

      expect(result.items).toHaveLength(5)
      expect(result.items[0]).toEqual({ id: 'pop', name: 'ポップ', icons: [], href: '' })
    })
  })

  describe('getCategoryPlaylists', () => {
    it('カテゴリーのプレイリストを正常に取得できること', async () => {
      const mockResponse = {
        data: {
          playlists: {
            items: [
              {
                id: 'playlist1',
                name: 'Pop Hits',
                description: 'Popular pop songs',
                images: [{ url: 'https://example.com/playlist.jpg', height: 300, width: 300 }],
                external_urls: { spotify: 'https://spotify.com/playlist1' },
                tracks: { href: 'https://api.spotify.com/v1/playlists/playlist1/tracks', total: 50 }
              }
            ]
          }
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getCategoryPlaylists('pop', 0, 10)

      expect(result).toEqual(mockResponse.data.playlists)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/browse/categories/pop/playlists',
        {
          headers: { Authorization: 'Bearer mock_access_token' },
          params: { offset: 0, limit: 10, country: 'JP' }
        }
      )
    })

    it('APIエラー時に空の結果を返すこと', async () => {
      const mockError = new Error('Category Playlists API Error')
      mockedAxios.get.mockRejectedValue(mockError)

      const result = await getCategoryPlaylists('nonexistent')

      expect(result).toEqual({ items: [], total: 0 })
    })
  })

  describe('getPlaylistTracks', () => {
    it('プレイリストの楽曲を正常に取得できること', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              track: {
                id: 'playlist_track1',
                name: 'Playlist Song 1',
                artists: [{ name: 'Playlist Artist', external_urls: { spotify: 'https://spotify.com/artist' } }],
                album: {
                  name: 'Playlist Album',
                  images: [{ url: 'https://example.com/playlist_track.jpg', height: 640, width: 640 }]
                },
                external_urls: { spotify: 'https://spotify.com/playlist_track1' }
              }
            }
          ],
          total: 30
        }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getPlaylistTracks('playlist_id_123', 0, 10)

      expect(result).toEqual(mockResponse.data)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/playlists/playlist_id_123/tracks',
        {
          headers: { Authorization: 'Bearer mock_access_token' },
          params: { offset: 0, limit: 10 }
        }
      )
    })

    it('プレイリスト楽曲取得のAPIエラー時に例外をスローすること', async () => {
      const mockError = new Error('Playlist Tracks API Error')
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(getPlaylistTracks('invalid_playlist')).rejects.toThrow('Playlist Tracks API Error')
    })
  })
})
