import { filesystem, storage } from "@neutralinojs/lib";
import { useMutation } from "react-query";

const REGEX_MOVIES = /([a-zA-Z0-9\s_\\.\-\(\):])+(.mkv|.mp4|.mov)$/;

export const useFetchMovies = () =>
  useMutation((folder: string) => searchInFolder(folder), {
    onSuccess() {
      console.log("success fetch");
    },
  });

const searchInFolder = (folder: string) =>
  filesystem.readDirectory(folder).then((files) => {
    files.forEach((file) => {
      if (file.type == "FILE" && file.entry.match(REGEX_MOVIES)) {
        addToStorage(file.entry);
      }
    });
  });

interface Movie extends MovieMeta {
  title: string;
  rate: number;
  director: string;
  image: string;
}

interface MovieMeta {
  directory: string;
  fileName: string;
  fileSize: number;
}

const normalizeMovie = (file: string) => {};

const addToStorage = (file: string) => {};
