import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { isUserLogged } from "../hooks/isLogged";
import { TabCoinInteface } from "../models/ComponentsModel";
import { giveVote } from "../service/contents";

import Icon from "react-native-vector-icons/MaterialIcons";
import AuthContext from "../context/AuthContext";
import ReloadContentContext from "../context/ReloadContentContext";

export default function TabCoin({ data, color }: TabCoinInteface) {
  const { colors } = useTheme();
  const { navigate }: any = useNavigation();
  const { toggleReload } = useContext(ReloadContentContext);
  const { isLogged, logInUser } = useContext(AuthContext);

  const tapTabcoin = (strategy: string) => {
    isUserLogged(isLogged, navigate);
    if (isLogged) {
      const type = strategy === "up" ? "credit" : "debit";
      Alert.alert(
        `Confimar ${strategy === "up" ? "credito" : "debito"} de tabcoin?`,
        "",
        [
          {
            text: "Sim",
            onPress: () =>
              giveVote(data.owner_username, data.slug, type).then(() => {
                logInUser();
                toggleReload();
              }),
          },
          { text: "Não" },
        ]
      );
    }
  };

  return (
    <>
      <View style={[styles.tabcoins, { backgroundColor: color }]}>
        <Icon
          name="keyboard-arrow-up"
          color={colors.text}
          size={28}
          onPress={() => tapTabcoin("up")}
        />
        <Text style={{ color: colors.text }}>{data.tabcoins}</Text>
        <Icon
          name="keyboard-arrow-down"
          color={colors.text}
          size={28}
          onPress={() => tapTabcoin("down")}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View style={[styles.line, { borderLeftColor: colors.text }]} />
    </>
  );
}

export const styles = StyleSheet.create({
  line: {
    left: -10,
    borderLeftWidth: 2,
    height: "100%",
    position: "absolute",
    zIndex: -2,
  },
  tabcoins: {
    alignItems: "center",
    position: "absolute",
    left: -23,
    zIndex: 20,
  },
});
