import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import AuthContext from "../context/AuthContext";

export default function HeaderIcons({ type }) {
  const { colors } = useTheme();
  const { navigate }: any = useNavigation();

  const { isLogged, signOut } = useContext(AuthContext);

  const signOutConfirm = () => {
    Alert.alert("Deseja realmente sair?", "", [
      {
        text: "Sim",
        onPress: () => {
          signOut();
          navigate("Home");
        },
      },
      { text: "Não" },
    ]);
  };

  const navigateTo = () => {
    if (!isLogged) navigate("Login");
    else navigate("Perfil");
  };

  return (
    <View style={styles.viewIcon}>
      {!type && (
        <Icon
          onPress={navigateTo}
          name="user"
          color={colors.text}
          solid={true}
          style={styles.icon}
        />
      )}
      {isLogged && (
        <IconMaterial
          onPress={signOutConfirm}
          name="logout"
          color={colors.text}
          style={styles.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    fontSize: 30,
  },
});
