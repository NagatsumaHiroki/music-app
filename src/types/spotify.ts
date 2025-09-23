export type PopularSongsList = {
  track: {
    album: {
      artists: Array<{ name: string; id: string; external_urls: { spotify: string } }>;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Array<{
        url: string;
        height: number;
        width: number;
      }>;
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
    };
    artists: Array<{
      name: string;
      external_urls: {
        spotify: string;
      };
    }>;
    external_urls: {
      spotify: string;
    };
    id: string;
    name: string;
  };
};

export type SearchSongList = {
  album: {
    artists: Array<{ name: string; id: string; external_urls: { spotify: string } }>;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
  };
  artists: Array<{
    name: string;
    external_urls: {
      spotify: string;
    };
  }>;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
};

export type Songs = SearchSongList[] | PopularSongsList[];

export interface SearchProps {
  keyword: string;
}

export type SpotifyCategory = {
  id: string;
  name: string;
  icons: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  href: string;
};

export type CategoryPlaylist = {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  external_urls: {
    spotify: string;
  };
  tracks: {
    href: string;
    total: number;
  };
};
