import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@tabnews-app:FAVORITES";

export const useFavorites = () => {
  const saveFavorite = async (favorites) => {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const getFavorite = async (): Promise<any> => {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);

    return JSON.parse(data ?? "[]");
  };

  return {
    getFavorite,
    saveFavorite,
  };
};
