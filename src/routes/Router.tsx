import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { showAlert } from "../hooks/showAlert";
import { CreateAccount } from "../pages/CreateAccount";
import { CreatePost } from "../pages/CreatePost";
import { Login } from "../pages/Login";

import HeaderIcons from "../components/HeaderIcons";
import AuthContext from "../context/AuthContext";
import Content from "../pages/Content";
import Home from "../pages/Home";
import User from "../pages/User";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { navigate }: any = useNavigation();
  const { isTokenExpired } = useContext(AuthContext);
  useEffect(() => {
    isTokenExpired().then((isExpired) => {
      if (isExpired === true) {
        showAlert({
          title: "Sessão expirada!",
          message: "Deseja logar novamente?",
          onPressYes: () => navigate("Login"),
        });
      }
    });
  }, []);
  return (
    <Navigator initialRouteName="Buscar">
      <Screen
        name="Home"
        component={Home}
        options={{
          title: "TabNews",
          headerRight: () => <HeaderIcons show={false} />,
        }}
      />
      <Screen
        name="Content"
        component={Content}
        options={{
          title: "",
        }}
      />
      <Screen name="Login" component={Login} />
      <Screen
        name="Perfil"
        component={User}
        options={{
          headerRight: () => <HeaderIcons show={true} />,
        }}
      />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen name="CreatePost" component={CreatePost} />
    </Navigator>
  );
}
