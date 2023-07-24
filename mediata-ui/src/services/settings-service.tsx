import { storage } from "@neutralinojs/lib";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "./queryClient";

const KEY_SETTINGS_FOLDERS = "folders";

export const useSettingsGetFolders = () =>
  useQuery({
    queryKey: ["settings-folders"],
    queryFn: () =>
      storage.getData(KEY_SETTINGS_FOLDERS).then((data) => {
        if (data?.length > 0) return JSON.parse(data);
      }),
  });

export const useSettingsAddFolder = () =>
  useMutation((folder: string) => saveSettings(folder), {
    onSuccess() {
      queryClient.invalidateQueries("settings-folders");
    },
  });

const saveSettings = (folder: string): Promise<any> => {
  return storage
    .getData(KEY_SETTINGS_FOLDERS)
    .then((data) => {
      if (data) {
        let folders: string[] = [];
        const folderList = JSON.parse(data);
        folderList.map((item: string) => folders.push(item));
        folders.push(folder);
        storage.setData(KEY_SETTINGS_FOLDERS, JSON.stringify(folders));
      } else {
        storage.setData(KEY_SETTINGS_FOLDERS, JSON.stringify(Array(folder)));
      }
    })
    .catch((error) => {
      // Unable to find storage key: folders
      if (error.code == "NE_ST_NOSTKEX") {
        storage
          .setData(KEY_SETTINGS_FOLDERS, "")
          .then(() => saveSettings(folder));
      }
    });
};
