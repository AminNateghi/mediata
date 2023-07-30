import { filesystem, storage } from "@neutralinojs/lib";
import { useMutation } from "react-query";
import { api } from "../http-client";
import { AxiosResponse } from "axios";
import { FetchMoviesResponseDto, Movie } from "./fetch-movies-interface";
import sanitize from "sanitize-filename-truncate";

const KEY_MOVIES_FILES = "movies_files";
const REGEX_MOVIE_EXT = /\.(avi|mkv|mp4|mov|wmv)$/i;
const REGEX_MOVIE_TITLE = new RegExp(
  /^(.*?)\W(?:(\d{4})(?:\W(\d+p)?)|(\d+p)(?:\W(\d{4}))?)\b/m
);

export const useFetchMovies = () =>
  useMutation((folder: string) => searchInFolder(folder), {
    onSuccess() {
      console.log("== success fetch");
    },
  });

const apiSearch = (title: string): Promise<FetchMoviesResponseDto> =>
  api
    .get(`/search/movie?query=${title}`)
    .then((response: AxiosResponse) => response?.data);

const searchInFolder = (folder: string) =>
  filesystem.readDirectory(folder).then((files) => {
    let movies: Movie[] = [];
    files.forEach(async (file) => {
      if (
        file.type == "FILE" &&
        REGEX_MOVIE_EXT.test(file.entry) &&
        REGEX_MOVIE_TITLE.test(file.entry)
      ) {
        const fileState = await filesystem.getStats(folder + "/" + file.entry);
        const fileInfo = extractMovieName(file.entry);
        const movie = await apiSearch(fileInfo.title);
        console.log(movie);

        movies.push({
          title: fileInfo.title,
          year: Number(fileInfo.year),
          directory: folder,
          fileName: file.entry,
          fileSize: fileState.size,
        });
      }
    });

    console.log(movies);
    addMovies(movies);
  });

const extractMovieName = (title: string): { title: string; year: string } => {
  const movie = title.match(REGEX_MOVIE_TITLE);
  if (movie) {
    const sanitized = sanitize(movie.at(1)!).toString().replaceAll(".", " ");
    return { title: sanitized, year: movie?.at(2)! };
  }
  return { title: "", year: "" };
};

const addMovies = (movies: Movie[]): Promise<any> =>
  storage.setData(KEY_MOVIES_FILES, JSON.stringify(movies));

const getMovies = (): Promise<any> =>
  storage
    .getData(KEY_MOVIES_FILES)
    .then((data) => console.log(JSON.parse(data)));
