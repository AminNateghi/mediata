import { useMutation, useQuery } from "react-query";
import { dbApp } from "../fetch-movies/database";
import { queryClient } from "../query-client";

export const useSettingsGetFolders = () =>
  useQuery({
    queryKey: ["settings-folders"],
    queryFn: () =>
      new Promise<string[]>((resolve) => {
        dbApp.read();
        const folders = dbApp.data.folders as string[];
        resolve(folders);
      }),
  });

export const useSettingsAddFolder = () =>
  useMutation(
    (folder: string) =>
      new Promise((resolve) => {
        dbApp.data.folders?.push(folder);
        dbApp.write();
        resolve(true);
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries("settings-folders");
      },
    }
  );

export const useSettingsDeleteFolder = () =>
  useMutation(
    (folder: string) =>
      new Promise((resolve) => {
        const index = dbApp.data.folders?.indexOf(folder);
        if (index! > -1) {
          dbApp.read();
          dbApp.data.folders?.splice(index!, 1);
          dbApp.write();
          resolve(true);
        }
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries("settings-folders");
      },
    }
  );

export const checkFolderIsDuplicate = (folder: string): boolean => {
  const item = dbApp.data.folders?.find((i) => i == folder);
  return Boolean(item);
};

export const clearAllCollection = () => {
  dbApp.data.folders = [];
  dbApp.data.movies = [];
  dbApp.write();
  queryClient.invalidateQueries("settings-folders");
};
