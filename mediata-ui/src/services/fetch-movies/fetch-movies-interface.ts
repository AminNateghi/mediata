export interface FetchMoviesResponseDto {
  page: number;
  results: TheMovieDb[];
  total_pages: number;
  total_results: number;
}

export interface TheMovieDb {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  title: string;
  year: number;
  directory: string;
  fileName: string;
  fileSize: number;
  tmdbId?: number;
}


export interface FileInfo {
  title: string;
  year: string;
}