import { Theme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";
import { useTheme } from "../hooks/useTheme";

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(13, 17, 23)",
    card: "rgb(22, 27, 34)",
    text: "rgb(230, 237, 243)",
    border: "rgb(48, 54, 61)",
    notification: "rgb(255, 69, 58)",
  },
};

const DefaultTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(227, 228, 230)",
    notification: "rgb(255, 59, 48)",
  },
};

export const colorScheme = () => {
  const { getTheme } = useTheme();

  const [colorScheme, setScheme] = useState<ColorSchemeName>("light");

  useEffect(() => {
    changeTheme();
  }, []);

  async function changeTheme() {
    const theme = await getTheme();
    if (theme !== undefined) setScheme(!theme ? "light" : "dark");
  }
  return { colorScheme };
};

export { DarkTheme, DefaultTheme };
