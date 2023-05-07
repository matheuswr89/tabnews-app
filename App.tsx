import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar"; // automatically switches bar style based on theme!
import { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    backgroundColor: !mode ? DarkTheme.colors.card : DefaultTheme.colors.card,
  };

  useEffect(() => {
    async function changeTheme() {
      setMode(await getTheme());
    }
    changeTheme();
  }, []);

  function handler(arg) {
    setMode(arg);
    saveTheme(arg);
  }

  DeviceEventEmitter.addListener("changeTheme", handler);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ReloadContentProvider>
          <NavigationContainer theme={!mode ? DarkTheme : DefaultTheme}>
            <SafeAreaView style={{ height: "100%" }}>
              <ExpoStatusBar
                style={!mode ? "light" : "dark"}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <AppRoutes />
            </SafeAreaView>
          </NavigationContainer>
        </ReloadContentProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
