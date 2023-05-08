import { Alert } from "react-native";

export const isUserLogged = (
  isLogged: boolean,
  navigate: (screen?: string) => void
) => {
  if (!isLogged) {
    Alert.alert("Você não está logado!", "Deseja fazer o login agora?", [
      {
        text: "Sim",
        onPress: () => navigate("Login"),
      },
      {
        text: "Não",
      },
    ]);
  }
};
