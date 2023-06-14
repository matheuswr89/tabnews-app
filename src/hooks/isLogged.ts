import { Alert } from "react-native";
import { useAuth } from "./useAuth";

export const isUserLogged = (
  isLogged: boolean,
  navigate: (screen?: string) => void
) => {
  const { deleteAll } = useAuth();
  if (!isLogged) {
    Alert.alert("Você não está logado!", "Deseja fazer o login agora?", [
      {
        text: "Sim",
        onPress: () => navigate("Login"),
      },
      {
        text: "Não",
        onPress: () => deleteAll(),
      },
    ]);
  }
};
