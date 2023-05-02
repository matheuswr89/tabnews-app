import { Alert } from "react-native";

export const isUserLogged = (isLogged, navigate) => {
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
