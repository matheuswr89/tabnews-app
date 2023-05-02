import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { ReloadContentProvider } from "./src/context/ReloadContentContext";
import { AppRoutes } from "./src/routes/Router";

export default function App() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ReloadContentProvider>
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <SafeAreaView style={{ height: "100%" }}>
              <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
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
