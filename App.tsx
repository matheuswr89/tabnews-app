import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar as ExpoStatusBar } from "expo-status-bar"; // automatically switches bar style based on theme!
import { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { ReloadContentProvider } from "./src/context/ReloadContentContext";
import { DarkTheme, DefaultTheme } from "./src/context/ThemeContext";
import { useTheme } from "./src/hooks/useTheme";
import { AppRoutes } from "./src/routes/Router";

export default function App() {
  const { getTheme, saveTheme } = useTheme();
  const [mode, setMode]: any = useState(false);
  const backgroundStyle = {
    backgroundColor: !mode ? DefaultTheme.colors.card : DarkTheme.colors.card,
  };
  NavigationBar.setBackgroundColorAsync(
    !mode ? DefaultTheme.colors.card : DarkTheme.colors.card
  );
  NavigationBar.setBackgroundColorAsync(
    !mode ? DefaultTheme.colors.card : DarkTheme.colors.card
  );
  useEffect(() => {
    changeTheme();
  }, []);

  async function changeTheme() {
    const theme = await getTheme();
    if (theme !== undefined) setMode(theme);
  }

  function handler(arg) {
    setMode(arg);
    saveTheme(arg);
  }

  DeviceEventEmitter.addListener("changeTheme", handler);

  return (
    <NavigationContainer theme={!mode ? DefaultTheme : DarkTheme}>
      <AuthProvider>
        <FavoritesProvider>
          <ReloadContentProvider>
            <ExpoStatusBar
              style={mode ? "light" : "dark"}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AppRoutes />
          </ReloadContentProvider>
        </FavoritesProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
