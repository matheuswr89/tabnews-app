import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";

import GroupButton from "./GroupButton";
import MarkdownView from "./Markdown";
import OwnerInfo from "./OwnerInfo";
import TabCoin from "./TabCoin";

export default function Comment({ comment }: any) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { borderColor: colors.text }]}
      key={`${uuid.v4()}${comment.slug}${comment.id}}`}
    >
      <TabCoin data={comment} color={colors.card} />
      <OwnerInfo data={comment} />
      <MarkdownView id={comment.id} body={comment.body} />
      <GroupButton content={comment} />
      {comment.children &&
        comment.children.map((reply: any) => (
          <Comment key={`comment${uuid.v4()}}`} comment={reply} />
        ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    paddingLeft: 5,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
});
