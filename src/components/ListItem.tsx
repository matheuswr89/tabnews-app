import { memo, PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import { time_ago } from "../util/util";

class ListItem extends PureComponent<any> {
  render() {
    const { post, index, push }: any = this.props;

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
        style={styles.card}
        onPress={() => getContent(post)}
        key={`_button${uuid.v4()}${index}`}
      >
        <Text style={styles.index}>{index + 1}.</Text>
        <View style={styles.name}>
          <Text style={styles.name} numberOfLines={1}>
            {post.title || post.body}
          </Text>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postInfoText}>
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
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "97.5%",
    backgroundColor: "#CFDCEF",
    borderRadius: 9,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  name: {
    fontSize: 18,
    marginLeft: 5,
    width: "95%",
    fontWeight: "600",
  },
  index: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
});

export default memo(ListItem);
