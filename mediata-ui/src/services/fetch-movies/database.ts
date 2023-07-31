import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";
import { Movie, TheMovieDb } from "./fetch-movies-interface";

interface schemaTheMovieDb {
  movies?: TheMovieDb[];
}

interface schemaApp {
  movies?: Movie[];
}

const defaultDataTmdb: schemaTheMovieDb = { movies: [] };
const adapterTmdb = new LocalStorage<schemaTheMovieDb>("db-tmdb");
export const dbTheMovieDb = new LowSync<schemaTheMovieDb>(
  adapterTmdb,
  defaultDataTmdb
);

const defaultDataApp: schemaApp = { movies: [] };
const adapterApp = new LocalStorage<schemaApp>("db-app");
export const dbApp = new LowSync<schemaApp>(adapterApp, defaultDataApp);
