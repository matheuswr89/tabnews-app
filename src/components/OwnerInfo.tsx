import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OwnerInfoInterface } from "../models/ComponentsModel";
import { time_ago } from "../util/util";

import AuthContext from "../context/AuthContext";
import ActionsComments from "./ActionsComments";

export default function OwnerInfo({
  data,
  setIsEdit,
  setDeleted,
}: OwnerInfoInterface) {
  const { colors } = useTheme();
  const { push }: any = useNavigation();
  const { user } = useContext(AuthContext);

  const isCommentUser = data.owner_id === user?.id;

  const redirectToUserPage = () => {
    push("Perfil", { name: data.owner_username });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        zIndex: 300,
        marginBottom: 4,
      }}
    >
      <View style={styles.ownerInfo}>
        <TouchableOpacity style={styles.owner} onPress={redirectToUserPage}>
          <Text>{data?.owner_username}</Text>
        </TouchableOpacity>
        <Text style={{ color: colors.text }}>
          <Text style={{ fontWeight: "900" }}>{" · "}</Text>
          {time_ago(data.created_at)}
        </Text>
      </View>
      {isCommentUser && (
        <View style={{ right: 0, position: "absolute" }}>
          <ActionsComments
            post={data}
            setIsEdit={setIsEdit}
            setDeleted={setDeleted}
          />
        </View>
      )}
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
