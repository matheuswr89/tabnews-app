import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const THEME_KEY = "@tabnews-app:THEME";

export const useTheme = () => {
  const saveTheme = async (theme) => {
    storage.set(THEME_KEY, theme);
  };

  const getTheme = async (): Promise<any> => {
    return await storage.getBoolean(THEME_KEY);
  };

  return {
    getTheme,
    saveTheme,
  };
};
