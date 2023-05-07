import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FloatIcon from "../components/FloatIcon";
import List from "./List";
import Search from "./Search";

const Tabs = createMaterialTopTabNavigator();

export default function Home() {
  const { colors } = useTheme();
  const { navigate }: any = useNavigation();

  return (
    <>
      <FloatIcon
        name="text-box-plus-outline"
        color="#2c974b"
        onPress={() => navigate("CreatePost", { mode: "creation" })}
      />

      <Tabs.Navigator
        key={1}
        tabBarPosition="bottom"
        initialRouteName="Relevantes"
        screenOptions={({ route }: any) => ({
          tabBarOnPress: "navigation",
          tabBarIndicatorStyle: { backgroundColor: "#2c974b" },
          tabBarStyle: {
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            margin: 0,
            padding: 0,
            width: 1000,
          },
          tabBarIcon: ({ focused, color, size }: any) => {
            let iconName = "";

            if (route.name === "Buscar") {
              iconName = "search";
            } else if (route.name === "Relevantes") {
              iconName = "new-releases";
            } else if (route.name === "Recentes") {
              iconName = "timelapse";
            } else if (route.name === "Favorites") {
              iconName = "favorite";
            }
            return (
              <Icon
                name={iconName}
                size={25}
                color={focused ? colors.text : "gray"}
                style={{ textAlign: "center" }}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="Buscar" children={() => <Search />} />
        <Tabs.Screen
          name="Favorites"
          children={() => <List strategy="favorites" key={4} />}
        />
        <Tabs.Screen
          name="Relevantes"
          children={() => <List strategy="relevant" key={1} />}
        />
        <Tabs.Screen
          name="Recentes"
          children={() => <List strategy="new" key={2} />}
        />
      </Tabs.Navigator>
    </>
  );
}
