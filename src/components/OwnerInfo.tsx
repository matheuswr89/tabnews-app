import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { time_ago } from "../util/util";

export default function OwnerInfo({ data }) {
  const { colors } = useTheme();
  const { push }: any = useNavigation();

  const redirectToUserPage = () => {
    push("Perfil", { name: data.owner_username });
  };

  return (
    <View style={styles.ownerInfo}>
      <TouchableOpacity style={styles.owner} onPress={redirectToUserPage}>
        <Text>{data?.owner_username}</Text>
      </TouchableOpacity>
      <Text style={{ color: colors.text }}>
        <Text style={{ fontWeight: "900" }}>{" · "}</Text>
        {time_ago(data.created_at)}
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  owner: {
    alignSelf: "flex-start",
    padding: 2,
    color: "#0969da",
    backgroundColor: "#ddf4ff",
    fontSize: 12,
    borderRadius: 3,
  },
  ownerInfo: {
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    marginBottom: 4,
  },
});
