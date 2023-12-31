import { filesystem } from "@neutralinojs/lib";
import { useMutation, useQuery } from "react-query";
import { api } from "../http-client";
import { AxiosResponse } from "axios";
import {
  FetchMoviesResponseDto,
  FileInfo,
  Genres,
  Movie,
  TheMovieDb,
} from "./fetch-movies-interface";
import { dbTheMovieDb, dbApp } from "./database";
import sanitize from "sanitize-filename-truncate";
import { queryClient } from "../query-client";

const REGEX_MOVIE_EXT = /\.(avi|mkv|mp4|mov|wmv)$/i;
const REGEX_MOVIE_TITLE = new RegExp(
  /^(.*?)\W(?:(\d{4})(?:\W(\d+p)?)|(\d+p)(?:\W(\d{4}))?)\b/m
);

export const useGetMovies = () =>
  useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      new Promise<Movie[]>((resolve) => {
        dbApp.read();
        const movies = dbApp.data.movies as Movie[];
        resolve(movies);
      }),
  });

export const useFetchMovies = () =>
  useMutation((folder: string) => searchInFolder(folder), {
    onSuccess() {
      queryClient.invalidateQueries("movies");
    },
  });

export const useFindMovieInTmdbById = () =>
  useMutation((id: number) => findTmdbById(id));

export const useGetGenresMovies = () =>
  useQuery({
    queryKey: ["genre"],
    queryFn: () => apiGenres(),
  });

const apiGenres = (): Promise<Genres> => {
  dbTheMovieDb.read();

  return new Promise<Genres>((resolve, reject) => {
    if (dbTheMovieDb.data?.genres?.length! > 0) {
      // exist offline data
      resolve({ genres: dbTheMovieDb.data.genres! });
    } else {
      // get online genres
      resolve(
        api
          .get(`/genre/movie/list?language=en`)
          .then((response: AxiosResponse) => {
            dbTheMovieDb.data.genres?.push(response?.data);
            dbTheMovieDb.write();
            return response?.data
          })
      );
    }
  });
};

const apiSearch = (title: string): Promise<FetchMoviesResponseDto> =>
  api
    .get(`/search/movie?query=${title}`)
    .then((response: AxiosResponse) => response?.data);

const searchInFolder = (folder: string) =>
  filesystem
    .readDirectory(folder)
    .then((items) => {
      items
        .filter(
          (item) =>
            item.type == "DIRECTORY" &&
            item.entry !== "." &&
            item.entry !== ".."
        )
        .map((file) => {
          if (file.type == "DIRECTORY")
            searchInFolder(folder + "\\" + file.entry);
        });

      items
        .filter(
          (item) =>
            item.type == "FILE" &&
            REGEX_MOVIE_EXT.test(item.entry) &&
            REGEX_MOVIE_TITLE.test(item.entry)
        )
        .map((file) => searchInFile(file, folder));
    })
    .catch(() => console.error("Folder not found!"));

const searchInFile = (file: filesystem.DirectoryEntry, folder: string) => {
  dbTheMovieDb.read();
  dbApp.read();

  const movieInfo = extractMovieName(file.entry);
  const foundedInLocal = dbTheMovieDb.data.movies?.find(
    (i) =>
      i.original_title == movieInfo.title &&
      new Date(i.release_date).getFullYear() == Number(movieInfo.year)
  );
  if (foundedInLocal) {
    findFromLocal(foundedInLocal, movieInfo, folder, file);
  } else {
    findFromOnline(movieInfo, folder, file);
  }
};

const findFromOnline = async (
  fileInfo: FileInfo,
  folder: string,
  file: any
) => {
  const fileState = await filesystem.getStats(folder + "/" + file.entry);
  const movies = await apiSearch(fileInfo.title);
  if (movies.total_results > 1) {
    saveResultToLocalDb(movies);

    const movieItem = movies.results.find(
      (i) =>
        i.original_title === fileInfo.title &&
        new Date(i.release_date).getFullYear() == Number(fileInfo.year)
    );

    // save movie to db
    dbApp.data.movies?.push({
      title: fileInfo.title,
      year: Number(fileInfo.year),
      directory: folder,
      fileName: file.entry,
      fileSize: fileState.size,
      tmdbId: movieItem ? movieItem.id : undefined,
    });
    dbApp.write();
  }
};

const findFromLocal = async (
  movie: TheMovieDb,
  fileInfo: FileInfo,
  folder: string,
  file: any
) => {
  const fileState = await filesystem.getStats(folder + "/" + file.entry);
  // save movie to db
  dbApp.data.movies?.push({
    title: fileInfo.title,
    year: Number(fileInfo.year),
    directory: folder,
    fileName: file.entry,
    fileSize: fileState.size,
    tmdbId: movie ? movie.id : undefined,
  });
  dbApp.write();
};

const extractMovieName = (title: string): FileInfo => {
  const movie = title.match(REGEX_MOVIE_TITLE);
  if (movie) {
    const sanitized = sanitize(movie.at(1)!).toString().replaceAll(".", " ");
    return { title: sanitized, year: movie?.at(2)! };
  }
  return { title: "", year: "" };
};

const saveResultToLocalDb = (movies: FetchMoviesResponseDto) => {
  movies.results.map((item) => {
    const foundedInLocal = dbTheMovieDb.data.movies?.find(
      (i) => i.id == item.id
    );
    // added to db when item doesn't exist in local db
    if (!foundedInLocal) dbTheMovieDb.data.movies?.push(item);
  });
  dbTheMovieDb.write();
};

const findTmdbById = (id: number): Promise<TheMovieDb | undefined> => {
  return new Promise((resolve) => {
    let item: TheMovieDb | undefined;
    dbTheMovieDb.read();
    item = dbTheMovieDb.data.movies?.find((i) => i.id == id);
    resolve(item);
  });
};
