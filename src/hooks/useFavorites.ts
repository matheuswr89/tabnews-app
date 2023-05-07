import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const FAVORITES_KEY = "@tabnews-app:FAVORITES";

export const useFavorites = () => {
  const saveFavorite = async (favorites) => {
    storage.set(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const getFavorite = async (): Promise<any> => {
    const data = await storage.getString(FAVORITES_KEY);

    return JSON.parse(data ?? "[]");
  };

  return {
    getFavorite,
    saveFavorite,
  };
};
