import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@tabnews-app:THEME";

export const useTheme = () => {
  const saveTheme = async (theme: string) => {
    console.log(theme);
    await AsyncStorage.setItem(THEME_KEY, theme);
  };

  const getTheme = async (): Promise<any> => {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    if (theme !== null) {
      return theme;
    }
    return undefined;
  };

  return {
    getTheme,
    saveTheme,
  };
};
