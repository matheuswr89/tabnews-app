import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItemInterface } from "../models/ComponentsModel";
import { time_ago } from "../util/util";

import uuid from "react-native-uuid";

export default function ListItem({ post, index }: ListItemInterface) {
  const { colors } = useTheme();
  const { push }: any = useNavigation();

  const getContent = async (v) => {
    push("Content", {
      url: !v?.url ? `${v.owner_username}/${v.slug}` : v.url,
      title: v.title,
    });
  };
  const date = time_ago(post.created_at);
  const userName = post.owner_username || post.url.split("/")[0];

  return (
    <TouchableOpacity
      style={styles({ colors }).card}
      onPress={() => getContent(post)}
      key={`_button${uuid.v4()}${index}`}
    >
      <Text style={styles({ colors }).index}>{index + 1}.</Text>
      <View style={styles({ colors }).name}>
        <Text style={styles({ colors }).name}>{post.title || post.body}</Text>
        <View style={styles({ colors }).postInfoContainer}>
          <Text style={styles({ colors }).postInfoText}>
            {userName}
            <Text style={{ fontWeight: "900" }}>{" · "}</Text>
            {post.tabcoins | 0} tabcoins
            <Text style={{ fontWeight: "900" }}>{" · "}</Text>
            {post.children_deep_count | 0} comentários
            <Text style={{ fontWeight: "900" }}>{" · "}</Text>
            {date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles: any = StyleSheet.create((props) => {
  return {
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderRadius: 9,
      marginVertical: 2,
    },
    name: {
      fontSize: 18,
      marginLeft: 5,
      width: "95%",
      fontWeight: "600",
      color: props.colors.text,
    },
    index: {
      fontSize: 18,
      fontWeight: "bold",
      color: props.colors.text,
    },
    postInfoContainer: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    postInfoText: {
      fontSize: 14,
      marginLeft: 5,
      lineHeight: 20,
      color: props.colors.text,
    },
  };
});
