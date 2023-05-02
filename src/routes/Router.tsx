import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderIcons from "../components/HeaderIcons";
import Content from "../pages/Content";
import { CreateAccount } from "../pages/CreateAccount";
import { CreatePost } from "../pages/CreatePost";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import User from "../pages/User";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Buscar">
      <Screen
        name="Home"
        component={Home}
        options={{
          title: "TabNews",
          headerRight: () => <HeaderIcons type={false} />,
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
          headerRight: () => <HeaderIcons type={true} />,
        }}
      />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen name="CreatePost" component={CreatePost} />
    </Navigator>
  );
}
